import { PrendyStoreHelpers } from "../../declarations";
export declare function get_globalUtils<A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers>(storeHelpers: A_PrendyStoreHelpers): {
    setGlobalState: <GlobalItemState extends ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"] & Record<any, any>, PartialGlobalState extends Partial<GlobalItemState>>(newState: PartialGlobalState | ((state: GlobalItemState) => PartialGlobalState), callback?: () => void) => void;
    getGlobalState: () => ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"];
};
