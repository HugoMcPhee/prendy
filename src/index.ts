import "@babylonjs/loaders";

import { makeGlobalStoreUtils } from "./stores/global/utils";
import { PrendyStoreHelpers } from "./stores/typedStoreHelpers";
import { makeSetStoryState } from "./storyRuleMakers";
import { makeGetSceneOrEngineUtils } from "./utils/babylonjs/getSceneOrEngine";

export {
  vector3ToPoint3d,
  point3dToVector3,
  vector3ToSafePoint3d,
} from "./utils/babylonjs";
export { makePrendyStoryUtils } from "./utils/story/utils";
export { makePrendyStores } from "./stores";
export { getPrendyOptions } from "./getPrendyOptions";
export { makePrendyApp } from "./components/PrendyApp";
export { makePrendyStoryHelpers } from "./utils/story/helpers";
export { prendyStepNames } from "./stores";
export { makeStartPrendyRules } from "./stores/start";
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
