import { useEffect } from "react";
import { definiedPrendyRules } from "..";
import { MyTypes } from "../declarations";
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
import { get_placeRules } from "./places";
import { get_playerRules } from "./players";
import { get_sliceVidRules } from "./sliceVids";
import { get_speechBubbleRules } from "./speechBubbles";
import { get_safeVidRules } from "./stateVids";

export function makeStartPrendyMainRules<T_MyTypes extends MyTypes = MyTypes>(
  storeHelpers: T_MyTypes["StoreHelpers"],
  prendyStores: T_MyTypes["Stores"],
  prendyAssets: T_MyTypes["Assets"]
) {
  const { dollNames, characterNames } = prendyAssets;

  // making rules

  const keyboardConnectRules = get_keyboardConnectRules(storeHelpers);
  const startAllGlobalRules = get_startAllGlobalRules<T_MyTypes>(prendyAssets, prendyStores, storeHelpers);

  const modelRules = get_modelRules(prendyAssets, storeHelpers);
  const playerRules = get_playerRules(prendyAssets, storeHelpers);
  const dollDynamicRules = get_dollDynamicRules(prendyAssets, prendyStores, storeHelpers);
  const dollRules = get_dollRules(
    dollDynamicRules as ReturnType<typeof get_dollDynamicRules>,
    prendyAssets,
    storeHelpers
  );
  const placeRules = get_placeRules(prendyAssets, storeHelpers);
  definiedPrendyRules.dolls = dollRules;

  const speechBubbleRules = get_speechBubbleRules(storeHelpers, prendyStores);
  const safeVidRules = get_safeVidRules(storeHelpers);
  const safeSliceVidRules = get_sliceVidRules(prendyAssets, storeHelpers);

  const characterDynamicRules = get_characterDynamicRules(prendyAssets, storeHelpers);
  const characterRules = get_characterRules(prendyAssets, storeHelpers);

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

export type MakeStartRulesOptions<T_MyTypes extends MyTypes = MyTypes> = {
  customRules: SubscribableRules[];
  storeHelpers: T_MyTypes["StoreHelpers"];
  stores: T_MyTypes["Stores"];
  prendyAssets: T_MyTypes["Assets"];
};

export function makeStartPrendyRules<T_MyTypes extends MyTypes = MyTypes>({
  customRules,
  prendyAssets,
  stores,
  storeHelpers,
}: MakeStartRulesOptions<T_MyTypes>) {
  const startPrendyMainRules = makeStartPrendyMainRules<T_MyTypes>(storeHelpers, stores, prendyAssets);
  const startPrendyStoryRules = rulesToSubscriber(customRules);
  const startRules = combineSubscribers([startPrendyMainRules, startPrendyStoryRules]);

  return startRules;
}

export function makeStartAndStopRules<T_MyTypes extends MyTypes = MyTypes>(options: MakeStartRulesOptions<T_MyTypes>) {
  const startRules = makeStartPrendyRules<T_MyTypes>(options);
  return function StartAndStopRules() {
    useEffect(startRules);
    return null;
  };
}
