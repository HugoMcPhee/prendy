import { MyTypes } from "../../declarations";
export declare function get_globalUtils<T_MyTypes extends MyTypes = MyTypes>(storeHelpers: T_MyTypes["StoreHelpers"]): {
    setGlobalState: <GlobalItemState extends ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"] & Record<any, any>, PartialGlobalState extends Partial<GlobalItemState>>(newState: PartialGlobalState | ((state: GlobalItemState) => PartialGlobalState), callback?: () => void) => void;
    getGlobalState: () => ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"];
};
