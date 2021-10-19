import { BackdopConcepFuncs } from "./concepts/typedConcepFuncs";
export { makeBackdopConcepts } from "./concepts";
export { makeGetBackdopOptions } from "./getBackdopOptions";
export { makeBackdopApp } from "./components/BackdopApp";
export { makeBackdopStoryHelpers } from "./utils/story/helpers";
export { backdopFlowNames } from "./concepts";
export { makeStartBackdopRules } from "./concepts/start";
export { makeUsePlaceUtils } from "./utils/babylonjs/usePlace/utils";
export { makeAllStoryRuleMakers } from "./storyRuleMakers";
export declare function makeOtherUsefulBackdopUtils<ConcepFuncs extends BackdopConcepFuncs>(concepFuncs: ConcepFuncs): {
    setStoryState: (newState: Partial<ReturnType<ConcepFuncs["getState"]>["story"]["main"]>) => void;
    getGlobalState: () => Record<any, any>;
    setGlobalState: <GlobalItemState extends ReturnType<ConcepFuncs["getState"]>["global"]["main"] & Record<any, any>, PartialGlobalState extends Partial<GlobalItemState>>(newState: PartialGlobalState | ((state: GlobalItemState) => PartialGlobalState)) => void;
    getScene: (sceneType?: "main" | "backdrop" | undefined) => import("@babylonjs/core").Scene | null;
    getEngine: () => import("@babylonjs/core").Engine | null;
};
