import "@babylonjs/loaders";

import { makeTyped_globalUtils } from "./helpers/prendyUtils/global";
import { PrendyStoreHelpers } from "./stores/typedStoreHelpers";
import { makeTyped_setStoryState } from "./helpers/prendyRuleMakers/prendyRuleMakers";
import { makeTyped_getSceneOrEngineUtils } from "./helpers/babylonjs/getSceneOrEngineUtils";

export { vector3ToPoint3d, point3dToVector3, vector3ToSafePoint3d } from "./helpers/babylonjs/babylonjs";
export { makePrendyStoryUtils } from "./helpers/prendyUtils/prendyUtils";
export { makePrendyStores } from "./stores/stores";
export { getPrendyOptions } from "./getPrendyOptions";
export { makePrendyApp as makePrendyApp } from "./components/PrendyApp";
export { makePrendyStoryHelpers } from "./helpers/prendyHelpers/helpers";
export { prendyStepNames } from "./stores/stores";
export { makeStartPrendyRules } from "./rules/rules";
export { makeTyped_usePlaceUtils as makeUsePlaceUtils } from "./helpers/babylonjs/usePlace/utils";
export { makeAllStoryRuleMakers } from "./helpers/prendyRuleMakers/prendyRuleMakers";

export function makeOtherUsefulPrendyUtils<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers) {
  const setStoryState = makeTyped_setStoryState(storeHelpers);
  const { getGlobalState, setGlobalState } = makeTyped_globalUtils(storeHelpers);
  const { getScene, getEngine } = makeTyped_getSceneOrEngineUtils(storeHelpers);

  return { setStoryState, getGlobalState, setGlobalState, getScene, getEngine };
}

export * from "./declarations";

// moving dist to eggventure and trying
