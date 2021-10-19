import { makeGlobalStoreUtils } from "./concepts/global/utils";
import { BackdopConcepFuncs } from "./concepts/typedConcepFuncs";
import { makeSetStoryState } from "./storyRuleMakers";
import { makeGetSceneOrEngineUtils } from "./utils/babylonjs/getSceneOrEngine";

export { makeBackdopConcepts } from "./concepts";
export { makeGetBackdopOptions } from "./getBackdopOptions";
export { makeBackdopApp } from "./components/BackdopApp";
export { makeBackdopStoryHelpers } from "./utils/story/helpers";
export { backdopFlowNames } from "./concepts";
export { makeStartBackdopRules } from "./concepts/start";
export { makeUsePlaceUtils } from "./utils/babylonjs/usePlace/utils";
export { makeAllStoryRuleMakers } from "./storyRuleMakers";

export function makeOtherUsefulBackdopUtils<
  ConcepFuncs extends BackdopConcepFuncs
>(concepFuncs: ConcepFuncs) {
  const setStoryState = makeSetStoryState(concepFuncs);
  const { getGlobalState, setGlobalState } = makeGlobalStoreUtils(concepFuncs);
  const { getScene, getEngine } = makeGetSceneOrEngineUtils(concepFuncs);

  return { setStoryState, getGlobalState, setGlobalState, getScene, getEngine };
}
