import { PrendyAssets, PrendyStoreHelpers, PrendyStores } from "../../declarations";
export declare function get_globalVideoRules(prendyAssets: PrendyAssets, prendyStores: PrendyStores, storeHelpers: PrendyStoreHelpers): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
