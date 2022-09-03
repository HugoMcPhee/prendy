import "@babylonjs/loaders";
import { makeTyped_globalUtils } from "./stores/global/utils/utils";
import { makeTyped_setStoryState } from "./storyRuleMakers/storyRuleMakers";
import { makeTyped_getSceneOrEngineUtils } from "./utils/babylonjs/getSceneOrEngineUtils";
export { vector3ToPoint3d, point3dToVector3, vector3ToSafePoint3d } from "./utils/babylonjs/babylonjs";
export { makePrendyStoryUtils } from "./utils/story/utils/utils";
export { makePrendyStores } from "./stores/stores";
export { getPrendyOptions } from "./getPrendyOptions";
export { makePrendyApp as makePrendyApp } from "./components/PrendyApp";
export { makePrendyStoryHelpers } from "./utils/story/helpers/helpers";
export { prendyStepNames } from "./stores/stores";
export { makeStartPrendyRules } from "./stores/start";
export { makeTyped_usePlaceUtils as makeUsePlaceUtils } from "./utils/babylonjs/usePlace/utils";
export { makeAllStoryRuleMakers } from "./storyRuleMakers/storyRuleMakers";
export function makeOtherUsefulPrendyUtils(storeHelpers) {
    const setStoryState = makeTyped_setStoryState(storeHelpers);
    const { getGlobalState, setGlobalState } = makeTyped_globalUtils(storeHelpers);
    const { getScene, getEngine } = makeTyped_getSceneOrEngineUtils(storeHelpers);
    return { setStoryState, getGlobalState, setGlobalState, getScene, getEngine };
}
export * from "./declarations";
// moving dist to eggventure and trying
