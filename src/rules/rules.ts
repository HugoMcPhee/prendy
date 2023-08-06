import { useEffect } from "react";
import {
  DollName,
  PlaceName,
  PrendyAssets,
  PrendyOptions,
  PrendyStoreHelpers,
  PrendyStores,
  SpotNameByPlace,
} from "../declarations";
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
import { get_sliceVidRules } from "./sliceVids";
import { get_speechBubbleRules } from "./speechBubbles";
import { get_safeVidRules } from "./stateVids";
import { definiedPrendyRules } from "..";
import { get_placeRules } from "./places";

export function makeStartPrendyMainRules<
  A_DollName extends DollName = DollName,
  A_PlaceName extends PlaceName = PlaceName,
  A_PrendyAssets extends PrendyAssets = PrendyAssets,
  A_PrendyOptions extends PrendyOptions = PrendyOptions,
  A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers,
  A_PrendyStores extends PrendyStores = PrendyStores,
  A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace
>(
  storeHelpers: A_PrendyStoreHelpers,
  prendyStores: A_PrendyStores,
  PRENDY_OPTIONS: A_PrendyOptions,
  prendyAssets: A_PrendyAssets
) {
  const { dollNames, characterNames } = prendyAssets;

  // making rules

  const keyboardConnectRules = get_keyboardConnectRules(storeHelpers);
  const startAllGlobalRules = get_startAllGlobalRules<
    A_DollName,
    A_PlaceName,
    A_PrendyAssets,
    A_PrendyOptions,
    A_PrendyStoreHelpers,
    A_PrendyStores,
    A_SpotNameByPlace
  >(storeHelpers, prendyStores, PRENDY_OPTIONS, prendyAssets);

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
  const placeRules = get_placeRules(PRENDY_OPTIONS, storeHelpers, prendyStores, prendyAssets);
  definiedPrendyRules.dolls = dollRules;

  const speechBubbleRules = get_speechBubbleRules(storeHelpers, prendyStores);
  const safeVidRules = get_safeVidRules(storeHelpers);
  const safeSliceVidRules = get_sliceVidRules(storeHelpers, PRENDY_OPTIONS, prendyAssets);

  const characterDynamicRules = get_characterDynamicRules(storeHelpers, PRENDY_OPTIONS, prendyAssets);
  const characterRules = get_characterRules(storeHelpers, prendyAssets);

  const startDynamicCharacterRulesForInitialState = get_startDynamicCharacterRulesForInitialState<
    ReturnType<typeof get_characterDynamicRules>
  >(characterDynamicRules, characterNames, storeHelpers);

  function updateAppVisibility(event: Event) {
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
    const stopDynamicDollRulesForInitialState = startDynamicDollRulesForInitialState<
      ReturnType<typeof get_dollDynamicRules>
    >(storeHelpers, dollDynamicRules as ReturnType<typeof get_dollDynamicRules>, dollNames);
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
export type SubscribableRules = Record<any, any> & { startAll: () => void; stopAll: () => void };

// TODO move this to repond
// Takes a list of rules and returns a new function that runs startAll for each, and returns a function that runs stopAll for each
// NOTE it doesn't preoprly merge rules, just runs them all
export function rulesToSubscriber(rules: SubscribableRules[]) {
  return () => {
    rules.forEach((rule) => rule.startAll());
    return () => rules.forEach((rule) => rule.stopAll());
  };
}

// Takes a list of subscribers and returns a new combined subscriber
export function combineSubscribers(subscribers: (() => () => void)[]) {
  return () => {
    const unsubscribers = subscribers.map((subscriber) => subscriber());
    return () => unsubscribers.forEach((unsubscriber) => unsubscriber());
  };
}

export type MakeStartRulesOptions<
  A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers,
  A_PrendyStores extends PrendyStores = PrendyStores,
  A_PrendyOptions extends PrendyOptions = PrendyOptions,
  A_PrendyAssets extends PrendyAssets = PrendyAssets
> = {
  customRules: SubscribableRules[];
  storeHelpers: A_PrendyStoreHelpers;
  stores: A_PrendyStores;
  prendyOptions: A_PrendyOptions;
  prendyAssets: A_PrendyAssets;
};

export function makeStartPrendyRules<
  A_DollName extends DollName = DollName,
  A_PlaceName extends PlaceName = PlaceName,
  A_PrendyAssets extends PrendyAssets = PrendyAssets,
  A_PrendyOptions extends PrendyOptions = PrendyOptions,
  A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers,
  A_PrendyStores extends PrendyStores = PrendyStores,
  A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace
>({
  customRules,
  prendyOptions,
  prendyAssets,
  stores,
  storeHelpers,
}: MakeStartRulesOptions<A_PrendyStoreHelpers, A_PrendyStores, A_PrendyOptions, A_PrendyAssets>) {
  const startPrendyMainRules = makeStartPrendyMainRules<
    A_DollName,
    A_PlaceName,
    A_PrendyAssets,
    A_PrendyOptions,
    A_PrendyStoreHelpers,
    A_PrendyStores,
    A_SpotNameByPlace
  >(storeHelpers, stores, prendyOptions, prendyAssets);
  const startPrendyStoryRules = rulesToSubscriber(customRules);
  const startRules = combineSubscribers([startPrendyMainRules, startPrendyStoryRules]);

  return startRules;
}

export function makeStartAndStopRules<
  A_DollName extends DollName = DollName,
  A_PlaceName extends PlaceName = PlaceName,
  A_PrendyAssets extends PrendyAssets = PrendyAssets,
  A_PrendyOptions extends PrendyOptions = PrendyOptions,
  A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers,
  A_PrendyStores extends PrendyStores = PrendyStores,
  A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace
>(options: MakeStartRulesOptions<A_PrendyStoreHelpers, A_PrendyStores, A_PrendyOptions, A_PrendyAssets>) {
  const startRules = makeStartPrendyRules<
    A_DollName,
    A_PlaceName,
    A_PrendyAssets,
    A_PrendyOptions,
    A_PrendyStoreHelpers,
    A_PrendyStores,
    A_SpotNameByPlace
  >(options);
  return function StartAndStopRules() {
    useEffect(startRules);
    return null;
  };
}
