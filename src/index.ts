import { makeGlobalStoreUtils } from "./concepts/global/utils";
import { PrendyStoreHelpers } from "./concepts/typedStoreHelpers";
import { makeSetStoryState } from "./storyRuleMakers";
import { makeGetSceneOrEngineUtils } from "./utils/babylonjs/getSceneOrEngine";

export { makePrendyConcepts } from "./concepts";
export { getPrendyOptions } from "./getPrendyOptions";
export { makePrendyApp } from "./components/PrendyApp";
export { makePrendyStoryHelpers } from "./utils/story/helpers";
export { prendyStepNames } from "./concepts";
export { makeStartPrendyRules } from "./concepts/start";
export { makeUsePlaceUtils } from "./utils/babylonjs/usePlace/utils";
export { makeAllStoryRuleMakers } from "./storyRuleMakers";

export function makeOtherUsefulPrendyUtils<
  StoreHelpers extends PrendyStoreHelpers
>(storeHelpers: StoreHelpers) {
  const setStoryState = makeSetStoryState(storeHelpers);
  const { getGlobalState, setGlobalState } = makeGlobalStoreUtils(storeHelpers);
  const { getScene, getEngine } = makeGetSceneOrEngineUtils(storeHelpers);

  return { setStoryState, getGlobalState, setGlobalState, getScene, getEngine };
}

export * from "./declarations";

// moving dist to eggventure and trying
