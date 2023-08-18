import { MyTypes } from "../declarations";
export declare function get_sliceVidRules<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"], storeHelpers: T_MyTypes["StoreHelpers"]): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
