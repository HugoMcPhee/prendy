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
export function makeStartPrendyRules(storeHelpers, prendyStores, PRENDY_OPTIONS, prendyAssets) {
    const { dollNames, characterNames } = prendyAssets;
    // making rules
    const keyboardConnectRules = get_keyboardConnectRules(storeHelpers);
    const startAllGlobalRules = get_startAllGlobalRules(storeHelpers, prendyStores, PRENDY_OPTIONS, prendyAssets);
    const modelRules = get_modelRules(storeHelpers, prendyAssets);
    const playerRules = get_playerRules(storeHelpers, PRENDY_OPTIONS, prendyAssets);
    const dollDynamicRules = get_dollDynamicRules(storeHelpers, PRENDY_OPTIONS, prendyStores, prendyAssets);
    const dollRules = get_dollRules(PRENDY_OPTIONS, dollDynamicRules, storeHelpers, prendyStores, prendyAssets);
    const speechBubbleRules = get_speechBubbleRules(storeHelpers, prendyStores);
    const safeVidRules = get_safeVidRules(storeHelpers);
    const safeSliceVidRules = get_sliceVidRules(storeHelpers, PRENDY_OPTIONS, prendyAssets);
    const characterDynamicRules = get_characterDynamicRules(storeHelpers, PRENDY_OPTIONS, prendyAssets);
    const characterRules = get_characterRules(storeHelpers, prendyAssets);
    const startDynamicCharacterRulesForInitialState = get_startDynamicCharacterRulesForInitialState(characterDynamicRules, characterNames, storeHelpers);
    // ----------------------------------------------
    // starting and stopping rules
    function startPrendyMainRules() {
        keyboardConnectRules.startAll();
        // pointerConnectRules.startAll();
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
        safeSliceVidRules.startAll();
        return function stopPrendyMainRules() {
            keyboardConnectRules.stopAll();
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
            /**/
            playerRules.stopAll();
            speechBubbleRules.stopAll();
            safeVidRules.stopAll();
            safeSliceVidRules.stopAll();
        };
    }
    let didDoOneTimeStartStuff = false;
    return function startPrendyRules(fontNames) {
        const stopPrendyMainRules = startPrendyMainRules();
        if (!didDoOneTimeStartStuff) {
            loadGoogleFonts(fontNames); // Auto-import fonts from google fonts :)
            didDoOneTimeStartStuff = true;
        }
        return function stopPrendyRules() {
            stopPrendyMainRules();
        };
    };
}
