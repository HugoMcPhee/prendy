import { useEffect } from "react";
import loadGoogleFonts from "../helpers/loadGoogleFonts";
import { characterRules, startDynamicCharacterRulesForInitialState } from "./characters";
import { dollRules, startDynamicDollRulesForInitialState } from "./dolls";
import { keyboardConnectRules } from "./keyboards";
import { modelRules } from "./models";
import { placeRules } from "./places";
import { playerRules } from "./players";
import { sliceVidRules as safeSliceVidRules } from "./sliceVids";
import { speechBubbleRules } from "./speechBubbles";
import { safeVidRules } from "./stateVids";
import { startAllGlobalRules } from "./global/global";
import { getRefs, getState } from "repond";
export function makeStartPrendyMainRules(storeHelpers, prendyStores, prendyAssets) {
    function handlePausingVideoWhenHidden(isHidden) {
        const { nowPlaceName, gameTimeSpeed } = getState().global.main;
        const sliceVidState = getState().sliceVids[nowPlaceName];
        const { stateVidId_playing, stateVidId_waiting } = sliceVidState;
        const backdropVidRefs = getRefs().stateVids[stateVidId_playing];
        const backdropWaitVidRefs = getRefs().stateVids[stateVidId_waiting];
        if (isHidden) {
            // pause all videos
            backdropVidRefs.videoElement.playbackRate = 0;
            backdropWaitVidRefs.videoElement.playbackRate = 0;
        }
        else {
            // resume all videos
            backdropVidRefs.videoElement.playbackRate = gameTimeSpeed;
            backdropWaitVidRefs.videoElement.playbackRate = gameTimeSpeed;
        }
    }
    function updateAppVisibility(event) {
        if (document.visibilityState === "visible") {
            getRefs().global.main.gameIsInBackground = false;
            handlePausingVideoWhenHidden(false);
        }
        else if (document.visibilityState === "hidden") {
            getRefs().global.main.gameIsInBackground = true;
            handlePausingVideoWhenHidden(true);
        }
    }
    // ----------------------------------------------
    // starting and stopping rules
    // TODO use the rule combiner here
    function startPrendyMainRules() {
        keyboardConnectRules.startAll();
        document.addEventListener("visibilitychange", updateAppVisibility);
        const stopAllGlobalRules = startAllGlobalRules(); // TODO update to rule collection
        modelRules.startAll();
        characterRules.startAll();
        // TODO update to rule object (with startAll and stopAll)
        const stopDynamicCharacterRulesForInitialState = startDynamicCharacterRulesForInitialState();
        dollRules.startAll();
        placeRules.startAll();
        // TODO update to rule object (with startAll and stopAll)
        const stopDynamicDollRulesForInitialState = startDynamicDollRulesForInitialState();
        playerRules.startAll();
        speechBubbleRules.startAll();
        safeVidRules.startAll();
        safeSliceVidRules.startAll();
        return function stopPrendyMainRules() {
            keyboardConnectRules.stopAll();
            document.removeEventListener("visibilitychange", updateAppVisibility);
            stopAllGlobalRules();
            modelRules.stopAll();
            characterRules.stopAll();
            stopDynamicCharacterRulesForInitialState();
            dollRules.stopAll();
            stopDynamicDollRulesForInitialState();
            placeRules.stopAll();
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
export function makeStartPrendyRules({ customRules, prendyAssets, stores, storeHelpers, }) {
    const startPrendyMainRules = makeStartPrendyMainRules(storeHelpers, stores, prendyAssets);
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
