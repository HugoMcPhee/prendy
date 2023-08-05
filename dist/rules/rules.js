import { useEffect } from "react";
import loadGoogleFonts from "../helpers/loadGoogleFonts";
import { get_characterDynamicRules, get_characterRules, get_startDynamicCharacterRulesForInitialState, } from "./characters";
import { get_dollDynamicRules, get_dollRules, startDynamicDollRulesForInitialState } from "./dolls";
import { get_startAllGlobalRules } from "./global/global";
import { get_keyboardConnectRules } from "./keyboards";
import { get_modelRules } from "./models";
import { get_playerRules } from "./players";
import { get_sliceVidRules } from "./sliceVids";
import { get_speechBubbleRules } from "./speechBubbles";
import { get_safeVidRules } from "./stateVids";
import { definiedPrendyRules } from "..";
import { get_placeRules } from "./places";
export function makeStartPrendyMainRules(storeHelpers, prendyStores, PRENDY_OPTIONS, prendyAssets) {
    const { dollNames, characterNames } = prendyAssets;
    // making rules
    const keyboardConnectRules = get_keyboardConnectRules(storeHelpers);
    const startAllGlobalRules = get_startAllGlobalRules(storeHelpers, prendyStores, PRENDY_OPTIONS, prendyAssets);
    const modelRules = get_modelRules(storeHelpers, prendyAssets);
    const playerRules = get_playerRules(storeHelpers, PRENDY_OPTIONS, prendyAssets);
    const dollDynamicRules = get_dollDynamicRules(storeHelpers, PRENDY_OPTIONS, prendyStores, prendyAssets);
    const dollRules = get_dollRules(PRENDY_OPTIONS, dollDynamicRules, storeHelpers, prendyStores, prendyAssets);
    const placeRules = get_placeRules(PRENDY_OPTIONS, storeHelpers, prendyStores, prendyAssets);
    definiedPrendyRules.dolls = dollRules;
    const speechBubbleRules = get_speechBubbleRules(storeHelpers, prendyStores);
    const safeVidRules = get_safeVidRules(storeHelpers);
    const safeSliceVidRules = get_sliceVidRules(storeHelpers, PRENDY_OPTIONS, prendyAssets);
    const characterDynamicRules = get_characterDynamicRules(storeHelpers, PRENDY_OPTIONS, prendyAssets);
    const characterRules = get_characterRules(storeHelpers, prendyAssets);
    const startDynamicCharacterRulesForInitialState = get_startDynamicCharacterRulesForInitialState(characterDynamicRules, characterNames, storeHelpers);
    function updateAppVisibility(event) {
        if (document.visibilityState === "visible") {
            storeHelpers.setState({ global: { main: { appBecameVisibleTime: Date.now() } } });
        }
    }
    // ----------------------------------------------
    // starting and stopping rules
    // TODO use the rule combiner here
    function startPrendyMainRules() {
        keyboardConnectRules.startAll();
        document.addEventListener("visibilitychange", updateAppVisibility);
        // pointerConnectRules.startAll();
        // keyboardRules.startAll(); // NOTE does nothing
        const stopAllGlobalRules = startAllGlobalRules();
        modelRules.startAll();
        /*characters*/
        characterRules.startAll();
        const stopDynamicCharacterRulesForInitialState = startDynamicCharacterRulesForInitialState();
        /*dolls*/
        dollRules.startAll();
        /*places*/
        placeRules.startAll();
        const stopDynamicDollRulesForInitialState = startDynamicDollRulesForInitialState(storeHelpers, dollDynamicRules, dollNames);
        /**/
        playerRules.startAll();
        speechBubbleRules.startAll();
        safeVidRules.startAll();
        safeSliceVidRules.startAll();
        return function stopPrendyMainRules() {
            keyboardConnectRules.stopAll();
            document.removeEventListener("visibilitychange", updateAppVisibility);
            // pointerConnectRules.stopAll();
            // keyboardRules.stopAll();
            stopAllGlobalRules();
            modelRules.stopAll();
            /*characters*/
            characterRules.stopAll();
            stopDynamicCharacterRulesForInitialState();
            /*dolls*/
            dollRules.stopAll();
            stopDynamicDollRulesForInitialState();
            /*places*/
            placeRules.stopAll();
            /**/
            playerRules.stopAll();
            speechBubbleRules.stopAll();
            safeVidRules.stopAll();
            safeSliceVidRules.stopAll();
        };
    }
    let didDoOneTimeStartStuff = false;
    return function startPrendyRules() {
        const stopPrendyMainRules = startPrendyMainRules();
        if (!didDoOneTimeStartStuff) {
            loadGoogleFonts(prendyAssets.fontNames); // Auto-import fonts from google fonts :)
            didDoOneTimeStartStuff = true;
        }
        return function stopPrendyRules() {
            stopPrendyMainRules();
        };
    };
}
// TODO move this to repond
// Takes a list of rules and returns a new function that runs startAll for each, and returns a function that runs stopAll for each
// NOTE it doesn't preoprly merge rules, just runs them all
export function rulesToSubscriber(rules) {
    return () => {
        rules.forEach((rule) => rule.startAll());
        return () => rules.forEach((rule) => rule.stopAll());
    };
}
// Takes a list of subscribers and returns a new combined subscriber
export function combineSubscribers(subscribers) {
    return () => {
        const unsubscribers = subscribers.map((subscriber) => subscriber());
        return () => unsubscribers.forEach((unsubscriber) => unsubscriber());
    };
}
export function makeStartPrendyRules({ customRules, prendyOptions, prendyAssets, stores, storeHelpers, }) {
    const startPrendyMainRules = makeStartPrendyMainRules(storeHelpers, stores, prendyOptions, prendyAssets);
    const startPrendyStoryRules = rulesToSubscriber(customRules);
    const startRules = combineSubscribers([startPrendyMainRules, startPrendyStoryRules]);
    return startRules;
}
export function makeStartAndStopRules(options) {
    const startRules = makeStartPrendyRules(options);
    return function StartAndStopRules() {
        useEffect(startRules);
        return null;
    };
}
