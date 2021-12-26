import { makeGlobalStoreUtils } from "./stores/global/utils";
import { makeSetStoryState } from "./storyRuleMakers";
import { makeGetSceneOrEngineUtils } from "./utils/babylonjs/getSceneOrEngine";
export { makePrendyStores } from "./stores";
export { getPrendyOptions } from "./getPrendyOptions";
export { makePrendyApp } from "./components/PrendyApp";
export { makePrendyStoryHelpers } from "./utils/story/helpers";
export { prendyStepNames } from "./stores";
export { makeStartPrendyRules } from "./stores/start";
export { makeUsePlaceUtils } from "./utils/babylonjs/usePlace/utils";
export { makeAllStoryRuleMakers } from "./storyRuleMakers";
export function makeOtherUsefulPrendyUtils(storeHelpers) {
    const setStoryState = makeSetStoryState(storeHelpers);
    const { getGlobalState, setGlobalState } = makeGlobalStoreUtils(storeHelpers);
    const { getScene, getEngine } = makeGetSceneOrEngineUtils(storeHelpers);
    return { setStoryState, getGlobalState, setGlobalState, getScene, getEngine };
}
export * from "./declarations";
// moving dist to eggventure and trying
