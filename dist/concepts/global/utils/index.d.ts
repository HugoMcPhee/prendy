import { PrendyStoreHelpers } from "../../typedStoreHelpers";
export declare function makeGlobalStoreUtils<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers): {
    setGlobalState: <GlobalItemState extends ReturnType<StoreHelpers["getState"]>["global"]["main"] & Record<any, any>, PartialGlobalState extends Partial<GlobalItemState>>(newState: PartialGlobalState | ((state: GlobalItemState) => PartialGlobalState), callback?: (() => void) | undefined) => void;
    getGlobalState: () => ReturnType<StoreHelpers["getState"]>["global"]["main"];
};
