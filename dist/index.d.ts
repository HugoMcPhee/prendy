import { PrendyStoreHelpers } from "./stores/typedStoreHelpers";
export { makePrendyStores } from "./stores";
export { getPrendyOptions } from "./getPrendyOptions";
export { makePrendyApp } from "./components/PrendyApp";
export { makePrendyStoryHelpers } from "./utils/story/helpers";
export { prendyStepNames } from "./stores";
export { makeStartPrendyRules } from "./stores/start";
export { makeUsePlaceUtils } from "./utils/babylonjs/usePlace/utils";
export { makeAllStoryRuleMakers } from "./storyRuleMakers";
export declare function makeOtherUsefulPrendyUtils<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers): {
    setStoryState: (newState: Partial<ReturnType<StoreHelpers["getState"]>["story"]["main"]>) => void;
    getGlobalState: () => ReturnType<StoreHelpers["getState"]>["global"]["main"];
    setGlobalState: <GlobalItemState extends ReturnType<StoreHelpers["getState"]>["global"]["main"] & Record<any, any>, PartialGlobalState extends Partial<GlobalItemState>>(newState: PartialGlobalState | ((state: GlobalItemState) => PartialGlobalState), callback?: (() => void) | undefined) => void;
    getScene: (sceneType?: "main" | "backdrop" | undefined) => import("@babylonjs/core").Scene | null;
    getEngine: () => import("@babylonjs/core").Engine | null;
};
export * from "./declarations";
