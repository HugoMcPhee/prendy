import { PrendyAssets, PrendyOptions } from "../declarations";
import loadGoogleFonts from "../helpers/loadGoogleFonts";
import {
  get_characterDynamicRules,
  get_characterRules,
  get_startDynamicCharacterRulesForInitialState,
} from "./characters";
import { get_dollDynamicRules, get_dollRules, startDynamicDollRulesForInitialState } from "./dolls";
import { get_startAllGlobalRules } from "./global/global";
import { get_keyboardConnectRules } from "./keyboards";
import { get_modelRules } from "./models";
import { get_playerRules } from "./players";
import { get_pointersConnectRules } from "./pointers";
import { get_safeVidRules } from "./safeVids";
import { get_sectionVidRules } from "./sectionVids";
import { get_speechBubbleRules } from "./speechBubbles";
import { PlaceholderPrendyStores, PrendyStoreHelpers } from "../stores/typedStoreHelpers";

export function makeStartPrendyRules<
  StoreHelpers extends PrendyStoreHelpers,
  PrendyStores extends PlaceholderPrendyStores
>(storeHelpers: StoreHelpers, prendyStores: PrendyStores, PRENDY_OPTIONS: PrendyOptions, prendyAssets: PrendyAssets) {
  const { dollNames, characterNames } = prendyAssets;

  // making rules

  const keyboardConnectRules = get_keyboardConnectRules(storeHelpers);
  const pointerConnectRules = get_pointersConnectRules(storeHelpers);
  const startAllGlobalRules = get_startAllGlobalRules(storeHelpers, prendyStores, PRENDY_OPTIONS, prendyAssets);

  const modelRules = get_modelRules(storeHelpers, prendyAssets);
  const playerRules = get_playerRules(storeHelpers, PRENDY_OPTIONS, prendyAssets);
  const dollDynamicRules = get_dollDynamicRules(storeHelpers, PRENDY_OPTIONS, prendyStores, prendyAssets);
  const dollRules = get_dollRules(
    PRENDY_OPTIONS,
    dollDynamicRules as ReturnType<typeof get_dollDynamicRules>,
    storeHelpers,
    prendyStores,
    prendyAssets
  );
  const speechBubbleRules = get_speechBubbleRules(storeHelpers, prendyStores);
  const safeVidRules = get_safeVidRules(storeHelpers);
  const safeSectionVidRules = get_sectionVidRules(storeHelpers, PRENDY_OPTIONS, prendyAssets);

  const characterDynamicRules = get_characterDynamicRules(storeHelpers, PRENDY_OPTIONS, prendyAssets);
  const characterRules = get_characterRules(storeHelpers, prendyAssets);

  const startDynamicCharacterRulesForInitialState = get_startDynamicCharacterRulesForInitialState<
    StoreHelpers,
    ReturnType<typeof get_characterDynamicRules>
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
      ReturnType<typeof get_dollDynamicRules>
    >(storeHelpers, dollDynamicRules as ReturnType<typeof get_dollDynamicRules>, dollNames);
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
