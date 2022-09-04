import { PrendyAssets, PrendyOptions } from "../declarations";
import loadGoogleFonts from "../helpers/loadGoogleFonts";
import {
  makeTyped_characterDynamicRules,
  makeTyped_characterRules,
  makeTyped_startDynamicCharacterRulesForInitialState,
} from "./characters";
import { makeTyped_dollDynamicRules, makeTyped_dollRules, startDynamicDollRulesForInitialState } from "./dolls";
import { makeTyped_startAllGlobalRules } from "./global/global";
import { makeTyped_keyboardConnectRules } from "./keyboards";
import { makeTyped_modelRules } from "./models";
import { makeTyped_playerRules } from "./players";
import { makeTyped_pointersConnectRules } from "./pointers";
import { makeTyped_safeVidRules } from "./safeVids";
import { makeTyped_sectionVidRules } from "./sectionVids";
import { makeTyped_speechBubbleRules } from "./speechBubbles";
import { PlaceholderPrendyStores, PrendyStoreHelpers } from "../stores/typedStoreHelpers";

export function makeStartPrendyRules<
  StoreHelpers extends PrendyStoreHelpers,
  PrendyStores extends PlaceholderPrendyStores
>(storeHelpers: StoreHelpers, prendyStores: PrendyStores, PRENDY_OPTIONS: PrendyOptions, prendyAssets: PrendyAssets) {
  const { dollNames, characterNames } = prendyAssets;

  // making rules

  const keyboardConnectRules = makeTyped_keyboardConnectRules(storeHelpers);
  const pointerConnectRules = makeTyped_pointersConnectRules(storeHelpers);
  const startAllGlobalRules = makeTyped_startAllGlobalRules(storeHelpers, prendyStores, PRENDY_OPTIONS, prendyAssets);

  const modelRules = makeTyped_modelRules(storeHelpers, prendyAssets);
  const playerRules = makeTyped_playerRules(storeHelpers, PRENDY_OPTIONS, prendyAssets);
  const dollDynamicRules = makeTyped_dollDynamicRules(storeHelpers, PRENDY_OPTIONS, prendyStores, prendyAssets);
  const dollRules = makeTyped_dollRules(
    PRENDY_OPTIONS,
    dollDynamicRules as ReturnType<typeof makeTyped_dollDynamicRules>,
    storeHelpers,
    prendyStores,
    prendyAssets
  );
  const speechBubbleRules = makeTyped_speechBubbleRules(storeHelpers, prendyStores);
  const safeVidRules = makeTyped_safeVidRules(storeHelpers);
  const safeSectionVidRules = makeTyped_sectionVidRules(storeHelpers, prendyAssets);

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
      ReturnType<typeof makeTyped_dollDynamicRules>
    >(storeHelpers, dollDynamicRules as ReturnType<typeof makeTyped_dollDynamicRules>, dollNames);
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

  let didDoOneTimeStartStuff = false;

  return function startPrendyRules(fontNames: readonly string[]) {
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
