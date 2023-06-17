import "@babylonjs/loaders";
import {
  CharacterName,
  DollName,
  PlaceInfoByName,
  PrendyAssets,
  PrendyOptions,
  PrendyStoreHelpers,
  PrendyStores,
} from "./declarations";
import { get_getSceneOrEngineUtils } from "./helpers/babylonjs/getSceneOrEngineUtils";
import { makePrendyStoryHelpers } from "./helpers/prendyHelpers/helpers";
import { get_setStoryState, makeAllStoryRuleMakers } from "./helpers/prendyRuleMakers/prendyRuleMakers";
import { get_globalUtils } from "./helpers/prendyUtils/global";
import { makePrendyStoryUtils } from "./helpers/prendyUtils/prendyUtils";
export { get_DebugFrameRate as makeDebugFrameRate } from "./components/DebugFrameRate";
export { makePrendyApp } from "./components/PrendyApp";
export * from "./declarations";
export { makePrendyOptions } from "./getPrendyOptions";
export { get_usePlaceUtils as makeUsePlaceUtils } from "./helpers/babylonjs/usePlace/utils";
export { point3dToVector3, vector3ToPoint3d, vector3ToSafePoint3d } from "./helpers/babylonjs/vectors";
export { makePrendyStoryHelpers } from "./helpers/prendyHelpers/helpers";
export { makeAllStoryRuleMakers } from "./helpers/prendyRuleMakers/prendyRuleMakers";
export { makePrendyStoryUtils } from "./helpers/prendyUtils/prendyUtils";
export { makeStartPrendyRules, makeStartPrendyMainRules, makeStartAndStopRules } from "./rules/rules";
export { makePrendyStores, prendyStepNames } from "./stores/stores";
export function makeOtherUsefulPrendyUtils(storeHelpers: PrendyStoreHelpers) {
  const setStoryState = get_setStoryState(storeHelpers);
  const { getGlobalState, setGlobalState } = get_globalUtils(storeHelpers);
  const { getScene, getEngine } = get_getSceneOrEngineUtils(storeHelpers);

  return { setStoryState, getGlobalState, setGlobalState, getScene, getEngine };
}

export function makePrendyHelpers(
  storeHelpers: PrendyStoreHelpers,
  prendyStores: PrendyStores,
  prendyStartOptions: PrendyOptions,
  prendyAssets: PrendyAssets
) {
  return {
    story: makePrendyStoryHelpers(storeHelpers, prendyStores, prendyStartOptions, prendyAssets),
    rules: makeAllStoryRuleMakers(
      storeHelpers,
      prendyAssets.placeInfoByName,
      prendyAssets.characterNames,
      prendyAssets.dollNames
    ),
    utils: {
      ...makePrendyStoryUtils(storeHelpers, prendyStores),
      ...makeOtherUsefulPrendyUtils(storeHelpers),
    },
  };
}
