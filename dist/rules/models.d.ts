import { PrendyAssets, PrendyStoreHelpers } from "../declarations";
export declare function get_modelRules(storeHelpers: PrendyStoreHelpers, prendyAssets: PrendyAssets): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
