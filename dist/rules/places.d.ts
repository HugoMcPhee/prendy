import { PrendyAssets, PrendyOptions, PrendyStoreHelpers, PrendyStores } from "../declarations";
export declare function get_placeRules(prendyOptions: PrendyOptions, storeHelpers: PrendyStoreHelpers, prendyStores: PrendyStores, prendyAssets: PrendyAssets): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
