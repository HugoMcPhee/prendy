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
export function makeStartBackdopRules(concepFuncs, backdopConcepts, BACKDOP_OPTIONS, backdopArt) {
    const { dollNames, characterNames } = backdopArt;
    // making rules
    const keyboardConnectRules = makeKeyboardConnectRules(concepFuncs);
    const pointerConnectRules = makePointersConnectRules(concepFuncs);
    const startAllGlobalRules = makeStartAllGlobalRules(concepFuncs, backdopConcepts, BACKDOP_OPTIONS, backdopArt);
    const modelRules = makeModelRules(concepFuncs, backdopArt);
    const playerRules = makePlayerRules(concepFuncs, BACKDOP_OPTIONS, backdopArt);
    const dollDynamicRules = makeDollDynamicRules(concepFuncs, BACKDOP_OPTIONS, backdopConcepts, backdopArt);
    const dollRules = makeDollRules(BACKDOP_OPTIONS, dollDynamicRules, concepFuncs, backdopConcepts, backdopArt);
    const speechBubbleRules = makeSpeechBubbleRules(concepFuncs, backdopConcepts);
    const safeVidRules = makeSafeVidRules(concepFuncs);
    const safeSectionVidRules = makeSectionVidRules(concepFuncs, backdopArt);
    const characterDynamicRules = makeCharacterDynamicRules(concepFuncs, BACKDOP_OPTIONS, backdopArt);
    const characterRules = makeCharacterRules(concepFuncs, backdopArt);
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
        safeSectionVidRules.startAll();
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
            safeSectionVidRules.stopAll();
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
