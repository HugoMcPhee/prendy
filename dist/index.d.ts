import { PrendyConcepFuncs } from "./concepts/typedConcepFuncs";
export { makePrendyConcepts } from "./concepts";
export { getPrendyOptions } from "./getPrendyOptions";
export { makePrendyApp } from "./components/PrendyApp";
export { makePrendyStoryHelpers } from "./utils/story/helpers";
export { prendyFlowNames } from "./concepts";
export { makeStartPrendyRules } from "./concepts/start";
export { makeUsePlaceUtils } from "./utils/babylonjs/usePlace/utils";
export { makeAllStoryRuleMakers } from "./storyRuleMakers";
export declare function makeOtherUsefulPrendyUtils<ConcepFuncs extends PrendyConcepFuncs>(concepFuncs: ConcepFuncs): {
    setStoryState: (newState: Partial<ReturnType<ConcepFuncs["getState"]>["story"]["main"]>) => void;
    getGlobalState: () => ReturnType<ConcepFuncs["getState"]>["global"]["main"];
    setGlobalState: <GlobalItemState extends ReturnType<ConcepFuncs["getState"]>["global"]["main"] & Record<any, any>, PartialGlobalState extends Partial<GlobalItemState>>(newState: PartialGlobalState | ((state: GlobalItemState) => PartialGlobalState), callback?: (() => void) | undefined) => void;
    getScene: (sceneType?: "main" | "backdrop" | undefined) => import("@babylonjs/core").Scene | null;
    getEngine: () => import("@babylonjs/core").Engine | null;
};
export * from "./declarations";
