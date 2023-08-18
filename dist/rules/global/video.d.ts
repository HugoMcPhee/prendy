import { PrendyAssets, PrendyOptions, PrendyStoreHelpers, PrendyStores } from "../../declarations";
export declare function get_globalVideoRules(storeHelpers: PrendyStoreHelpers, _prendyStores: PrendyStores, prendyOptions: PrendyOptions, prendyAssets: PrendyAssets): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
