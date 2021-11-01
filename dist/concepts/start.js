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
import { makeStackVidRules } from "./stackVids/rules";
export function makeStartBackdopRules(concepFuncs, backdopConcepts, BACKDOP_OPTIONS, placeInfoByName, dollNames, characterNames, modelInfoByName) {
    // making rules
    const keyboardConnectRules = makeKeyboardConnectRules(concepFuncs);
    const pointerConnectRules = makePointersConnectRules(concepFuncs);
    const startAllGlobalRules = makeStartAllGlobalRules(concepFuncs, backdopConcepts, BACKDOP_OPTIONS, placeInfoByName, dollNames);
    const modelRules = makeModelRules(concepFuncs, modelInfoByName);
    const playerRules = makePlayerRules(concepFuncs, BACKDOP_OPTIONS, placeInfoByName);
    const dollDynamicRules = makeDollDynamicRules(concepFuncs, BACKDOP_OPTIONS, backdopConcepts, modelInfoByName, dollNames);
    const dollRules = makeDollRules(BACKDOP_OPTIONS, dollDynamicRules, concepFuncs, backdopConcepts, modelInfoByName, dollNames);
    const speechBubbleRules = makeSpeechBubbleRules(concepFuncs, backdopConcepts);
    const safeVidRules = makeSafeVidRules(concepFuncs);
    const safeSectionStackVidRules = makeSectionVidRules(concepFuncs, placeInfoByName, dollNames);
    const safeStackVidRules = makeStackVidRules(concepFuncs);
    const characterDynamicRules = makeCharacterDynamicRules(concepFuncs, BACKDOP_OPTIONS, characterNames, placeInfoByName);
    const characterRules = makeCharacterRules(concepFuncs, placeInfoByName);
    const startDynamicCharacterRulesForInitialState = makeStartDynamicCharacterRulesForInitialState(characterDynamicRules, characterNames, concepFuncs);
    // ----------------------------------------------
    // starting and stopping rules
    function startBackdopMainRules() {
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
        const stopDynamicDollRulesForInitialState = startDynamicDollRulesForInitialState(concepFuncs, dollDynamicRules, dollNames);
        /**/
        playerRules.startAll();
        speechBubbleRules.startAll();
        safeVidRules.startAll();
        safeStackVidRules.startAll();
        safeSectionStackVidRules.startAll();
        return function stopBackdopMainRules() {
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
            safeStackVidRules.stopAll();
            safeSectionStackVidRules.stopAll();
        };
    }
    function connectInputsToState() {
        // connectKeyboardInputsToState();
        // connectPointerInputsToState();
    }
    let didDoOneTimeStartStuff = false;
    return function startBackdopRules(fontNames) {
        const stopBackdopMainRules = startBackdopMainRules();
        if (!didDoOneTimeStartStuff) {
            loadGoogleFonts(fontNames); // Auto-import fonts from google fonts :)
            // connectInputsToState();
            didDoOneTimeStartStuff = true;
        }
        return function stopBackdopRules() {
            stopBackdopMainRules();
        };
    };
}
