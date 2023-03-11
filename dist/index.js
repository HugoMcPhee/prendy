import "@babylonjs/loaders";
import { get_globalUtils } from "./helpers/prendyUtils/global";
import { get_setStoryState } from "./helpers/prendyRuleMakers/prendyRuleMakers";
import { get_getSceneOrEngineUtils } from "./helpers/babylonjs/getSceneOrEngineUtils";
export { vector3ToPoint3d, point3dToVector3, vector3ToSafePoint3d } from "./helpers/babylonjs/vectors";
export { makePrendyStoryUtils } from "./helpers/prendyUtils/prendyUtils";
export { makePrendyStores } from "./stores/stores";
export { getPrendyOptions } from "./getPrendyOptions";
export { makePrendyApp as makePrendyApp } from "./components/PrendyApp";
export { makePrendyStoryHelpers } from "./helpers/prendyHelpers/helpers";
export { prendyStepNames } from "./stores/stores";
export { makeStartPrendyRules } from "./rules/rules";
export { get_usePlaceUtils as makeUsePlaceUtils } from "./helpers/babylonjs/usePlace/utils";
export { makeAllStoryRuleMakers } from "./helpers/prendyRuleMakers/prendyRuleMakers";
export function makeOtherUsefulPrendyUtils(storeHelpers) {
    const setStoryState = get_setStoryState(storeHelpers);
    const { getGlobalState, setGlobalState } = get_globalUtils(storeHelpers);
    const { getScene, getEngine } = get_getSceneOrEngineUtils(storeHelpers);
    return { setStoryState, getGlobalState, setGlobalState, getScene, getEngine };
}
export * from "./declarations";
// moving dist to eggventure and trying
