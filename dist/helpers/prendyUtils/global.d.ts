import { PrendyStoreHelpers } from "../../stores/typedStoreHelpers";
export declare function get_globalUtils<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers): {
    setGlobalState: <GlobalItemState extends ReturnType<StoreHelpers["getState"]>["global"]["main"] & Record<any, any>, PartialGlobalState extends Partial<GlobalItemState>>(newState: PartialGlobalState | ((state: GlobalItemState) => PartialGlobalState), callback?: () => void) => void;
    getGlobalState: () => ReturnType<StoreHelpers["getState"]>["global"]["main"];
};
