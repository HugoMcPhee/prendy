import { makeGlobalStoreUtils } from "./concepts/global/utils";
import { makeSetStoryState } from "./storyRuleMakers";
import { makeGetSceneOrEngineUtils } from "./utils/babylonjs/getSceneOrEngine";
export { makePrendyConcepts } from "./concepts";
export { getPrendyOptions } from "./getPrendyOptions";
export { makePrendyApp } from "./components/PrendyApp";
export { makePrendyStoryHelpers } from "./utils/story/helpers";
export { prendyFlowNames } from "./concepts";
export { makeStartPrendyRules } from "./concepts/start";
export { makeUsePlaceUtils } from "./utils/babylonjs/usePlace/utils";
export { makeAllStoryRuleMakers } from "./storyRuleMakers";
export function makeOtherUsefulPrendyUtils(concepFuncs) {
    const setStoryState = makeSetStoryState(concepFuncs);
    const { getGlobalState, setGlobalState } = makeGlobalStoreUtils(concepFuncs);
    const { getScene, getEngine } = makeGetSceneOrEngineUtils(concepFuncs);
    return { setStoryState, getGlobalState, setGlobalState, getScene, getEngine };
}
export * from "./declarations";
// moving dist to eggventure and trying
