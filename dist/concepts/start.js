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
export function makeStartGameyRules(conceptoFuncs, gameyConcepts, gameyStartOptions, placeInfoByName, dollNames, characterNames, modelInfoByName) {
    // making rules
    const keyboardConnectRules = makeKeyboardConnectRules(conceptoFuncs);
    const pointerConnectRules = makePointersConnectRules(conceptoFuncs);
    const startAllGlobalRules = makeStartAllGlobalRules(conceptoFuncs, gameyConcepts, gameyStartOptions, placeInfoByName, dollNames);
    const modelRules = makeModelRules(conceptoFuncs, modelInfoByName);
    const playerRules = makePlayerRules(conceptoFuncs, placeInfoByName);
    const dollDynamicRules = makeDollDynamicRules(conceptoFuncs, gameyStartOptions, gameyConcepts, modelInfoByName, dollNames);
    const dollRules = makeDollRules(gameyStartOptions, dollDynamicRules, conceptoFuncs, gameyConcepts, modelInfoByName, dollNames);
    const speechBubbleRules = makeSpeechBubbleRules(conceptoFuncs, gameyConcepts);
    const safeVidRules = makeSafeVidRules(conceptoFuncs);
    const safeSectionStackVidRules = makeSectionVidRules(conceptoFuncs, placeInfoByName, dollNames);
    const safeStackVidRules = makeStackVidRules(conceptoFuncs);
    const characterDynamicRules = makeCharacterDynamicRules(conceptoFuncs, gameyStartOptions, characterNames, placeInfoByName);
    const characterRules = makeCharacterRules(conceptoFuncs, placeInfoByName);
    const startDynamicCharacterRulesForInitialState = makeStartDynamicCharacterRulesForInitialState(characterDynamicRules, characterNames, conceptoFuncs);
    // ----------------------------------------------
    // starting and stopping rules
    function startGameyMainRules() {
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
        const stopDynamicDollRulesForInitialState = startDynamicDollRulesForInitialState(conceptoFuncs, dollDynamicRules, dollNames);
        /**/
        playerRules.startAll();
        speechBubbleRules.startAll();
        safeVidRules.startAll();
        safeStackVidRules.startAll();
        safeSectionStackVidRules.startAll();
        return function stopGameyMainRules() {
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
    return function startGameyRules(fontNames) {
        const stopGameyMainRules = startGameyMainRules();
        if (!didDoOneTimeStartStuff) {
            loadGoogleFonts(fontNames); // Auto-import fonts from google fonts :)
            // connectInputsToState();
            didDoOneTimeStartStuff = true;
        }
        return function stopGameyRules() {
            stopGameyMainRules();
        };
    };
}
