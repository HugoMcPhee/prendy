import loadGoogleFonts from "../utils/loadGoogleFonts";
import { makeCharacterDynamicRules, makeCharacterRules, makeStartDynamicCharacterRulesForInitialState, } from "./characters/rules";
import { makeDollDynamicRules, makeDollRules, startDynamicDollRulesForInitialState, } from "./dolls/rules";
import { makeStartAllGlobalRules } from "./global/rules";
import { makeKeyboardConnectRules } from "./keyboards/connect";
import { makeModelRules } from "./models/rules";
import { makePlayerRules } from "./players/rules";
import { makePointersConnectRules } from "./pointers";
import { makeSafeVidRules } from "./safeVids/rules";
import { makeSectionVidRules } from "./sectionVids/rules";
import { makeSpeechBubbleRules } from "./speechBubbles/rules";
export function makeStartPrendyRules(storeHelpers, prendyStores, PRENDY_OPTIONS, prendyAssets) {
    const { dollNames, characterNames } = prendyAssets;
    // making rules
    const keyboardConnectRules = makeKeyboardConnectRules(storeHelpers);
    const pointerConnectRules = makePointersConnectRules(storeHelpers);
    const startAllGlobalRules = makeStartAllGlobalRules(storeHelpers, prendyStores, PRENDY_OPTIONS, prendyAssets);
    const modelRules = makeModelRules(storeHelpers, prendyAssets);
    const playerRules = makePlayerRules(storeHelpers, PRENDY_OPTIONS, prendyAssets);
    const dollDynamicRules = makeDollDynamicRules(storeHelpers, PRENDY_OPTIONS, prendyStores, prendyAssets);
    const dollRules = makeDollRules(PRENDY_OPTIONS, dollDynamicRules, storeHelpers, prendyStores, prendyAssets);
    const speechBubbleRules = makeSpeechBubbleRules(storeHelpers, prendyStores);
    const safeVidRules = makeSafeVidRules(storeHelpers);
    const safeSectionVidRules = makeSectionVidRules(storeHelpers, prendyAssets);
    const characterDynamicRules = makeCharacterDynamicRules(storeHelpers, PRENDY_OPTIONS, prendyAssets);
    const characterRules = makeCharacterRules(storeHelpers, prendyAssets);
    const startDynamicCharacterRulesForInitialState = makeStartDynamicCharacterRulesForInitialState(characterDynamicRules, characterNames, storeHelpers);
    // ----------------------------------------------
    // starting and stopping rules
    function startPrendyMainRules() {
        keyboardConnectRules.startAll();
        pointerConnectRules.startAll();
        // keyboardRules.startAll(); // NOTE does nothing
        const stopAllGlobalRules = startAllGlobalRules();
        modelRules.startAll();
        /*characters*/
        characterRules.startAll();
        const stopDynamicCharacterRulesForInitialState = startDynamicCharacterRulesForInitialState();
        /*dolls*/
        dollRules.startAll();
        const stopDynamicDollRulesForInitialState = startDynamicDollRulesForInitialState(storeHelpers, dollDynamicRules, dollNames);
        /**/
        playerRules.startAll();
        speechBubbleRules.startAll();
        safeVidRules.startAll();
        safeSectionVidRules.startAll();
        return function stopPrendyMainRules() {
            keyboardConnectRules.stopAll();
            pointerConnectRules.stopAll();
            // keyboardRules.stopAll();
            stopAllGlobalRules();
            modelRules.stopAll();
            /*characters*/
            characterRules.stopAll();
            stopDynamicCharacterRulesForInitialState();
            /*dolls*/
            dollRules.stopAll();
            stopDynamicDollRulesForInitialState();
            /**/
            playerRules.stopAll();
            speechBubbleRules.stopAll();
            safeVidRules.stopAll();
            safeSectionVidRules.stopAll();
        };
    }
    function connectInputsToState() {
        // connectKeyboardInputsToState();
        // connectPointerInputsToState();
    }
    let didDoOneTimeStartStuff = false;
    return function startPrendyRules(fontNames) {
        const stopPrendyMainRules = startPrendyMainRules();
        if (!didDoOneTimeStartStuff) {
            loadGoogleFonts(fontNames); // Auto-import fonts from google fonts :)
            // connectInputsToState();
            didDoOneTimeStartStuff = true;
        }
        return function stopPrendyRules() {
            stopPrendyMainRules();
        };
    };
}
