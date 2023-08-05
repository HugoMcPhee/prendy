import { PrendyStoreHelpers } from "../../declarations";
export declare function get_globalUtils(storeHelpers: PrendyStoreHelpers): {
    setGlobalState: <GlobalItemState extends Record<any, any>, PartialGlobalState extends Partial<GlobalItemState>>(newState: PartialGlobalState | ((state: GlobalItemState) => PartialGlobalState), callback?: () => void) => void;
    getGlobalState: () => Record<any, any>;
};
