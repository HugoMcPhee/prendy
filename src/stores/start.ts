import { PrendyAssets, PrendyOptions, ModelInfoByName, ModelName } from "../declarations";
import loadGoogleFonts from "../utils/loadGoogleFonts";
import {
  makeTyped_characterDynamicRules,
  makeTyped_characterRules,
  makeTyped_startDynamicCharacterRulesForInitialState,
} from "./characters/rules";
import { makeDollDynamicRules, makeTyped_dollRules, startDynamicDollRulesForInitialState } from "./dolls/rules";
import { makeTyped_startAllGlobalRules } from "./global/rules/rules";
import { makeTyped_keyboardConnectRules } from "./keyboards/connect";
import { makeTyped_modelRules } from "./models/rules";
import { makeTyped_playerRules } from "./players/rules";
import { makePointersConnectRules } from "./pointers/pointers";
import { makeSafeVidRules } from "./safeVids/rules";
import { makeSectionVidRules } from "./sectionVids/rules";
import { makeSpeechBubbleRules } from "./speechBubbles/rules";
import { PrendyStoreHelpers, PlaceholderPrendyStores } from "./typedStoreHelpers";

export function makeStartPrendyRules<
  StoreHelpers extends PrendyStoreHelpers,
  PrendyStores extends PlaceholderPrendyStores
>(storeHelpers: StoreHelpers, prendyStores: PrendyStores, PRENDY_OPTIONS: PrendyOptions, prendyAssets: PrendyAssets) {
  const { dollNames, characterNames } = prendyAssets;

  // making rules

  const keyboardConnectRules = makeTyped_keyboardConnectRules(storeHelpers);
  const pointerConnectRules = makePointersConnectRules(storeHelpers);
  const startAllGlobalRules = makeTyped_startAllGlobalRules(storeHelpers, prendyStores, PRENDY_OPTIONS, prendyAssets);

  const modelRules = makeTyped_modelRules(storeHelpers, prendyAssets);
  const playerRules = makeTyped_playerRules(storeHelpers, PRENDY_OPTIONS, prendyAssets);
  const dollDynamicRules = makeDollDynamicRules(storeHelpers, PRENDY_OPTIONS, prendyStores, prendyAssets);
  const dollRules = makeTyped_dollRules(
    PRENDY_OPTIONS,
    dollDynamicRules as ReturnType<typeof makeDollDynamicRules>,
    storeHelpers,
    prendyStores,
    prendyAssets
  );
  const speechBubbleRules = makeSpeechBubbleRules(storeHelpers, prendyStores);
  const safeVidRules = makeSafeVidRules(storeHelpers);
  const safeSectionVidRules = makeSectionVidRules(storeHelpers, prendyAssets);

  const characterDynamicRules = makeTyped_characterDynamicRules(storeHelpers, PRENDY_OPTIONS, prendyAssets);
  const characterRules = makeTyped_characterRules(storeHelpers, prendyAssets);

  const startDynamicCharacterRulesForInitialState = makeTyped_startDynamicCharacterRulesForInitialState<
    StoreHelpers,
    ReturnType<typeof makeTyped_characterDynamicRules>
  >(characterDynamicRules, characterNames, storeHelpers);

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
    const stopDynamicDollRulesForInitialState = startDynamicDollRulesForInitialState<
      StoreHelpers,
      ReturnType<typeof makeDollDynamicRules>
    >(storeHelpers, dollDynamicRules as ReturnType<typeof makeDollDynamicRules>, dollNames);
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

  return function startPrendyRules(fontNames: readonly string[]) {
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
