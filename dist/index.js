import "@babylonjs/loaders";
import { get_getSceneOrEngineUtils } from "./helpers/babylonjs/getSceneOrEngineUtils";
import { makePrendyStoryHelpers } from "./helpers/prendyHelpers/helpers";
import { get_setStoryState, makeAllStoryRuleMakers } from "./helpers/prendyRuleMakers/prendyRuleMakers";
import { get_globalUtils } from "./helpers/prendyUtils/global";
import { makePrendyStoryUtils } from "./helpers/prendyUtils/prendyUtils";
export { makePrendyApp as makePrendyApp } from "./components/PrendyApp";
export * from "./declarations";
export { getPrendyOptions } from "./getPrendyOptions";
export { get_usePlaceUtils as makeUsePlaceUtils } from "./helpers/babylonjs/usePlace/utils";
export { point3dToVector3, vector3ToPoint3d, vector3ToSafePoint3d } from "./helpers/babylonjs/vectors";
export { makePrendyStoryHelpers } from "./helpers/prendyHelpers/helpers";
export { makeAllStoryRuleMakers } from "./helpers/prendyRuleMakers/prendyRuleMakers";
export { makePrendyStoryUtils } from "./helpers/prendyUtils/prendyUtils";
export { makeStartPrendyRules } from "./rules/rules";
export { makePrendyStores, prendyStepNames } from "./stores/stores";
export function makeOtherUsefulPrendyUtils(storeHelpers) {
    const setStoryState = get_setStoryState(storeHelpers);
    const { getGlobalState, setGlobalState } = get_globalUtils(storeHelpers);
    const { getScene, getEngine } = get_getSceneOrEngineUtils(storeHelpers);
    return { setStoryState, getGlobalState, setGlobalState, getScene, getEngine };
}
export function makePrendyHelpers(storeHelpers, prendyStores, prendyStartOptions, prendyAssets, placeInfoByName, characterNames, dollNames) {
    return {
        story: makePrendyStoryHelpers(storeHelpers, prendyStores, prendyStartOptions, prendyAssets),
        storyUtils: makePrendyStoryUtils(storeHelpers, prendyStores),
        storyRuleMakers: makeAllStoryRuleMakers(storeHelpers, placeInfoByName, characterNames, dollNames),
        otherUtils: makeOtherUsefulPrendyUtils(storeHelpers),
    };
}
