import { PrendyAssets, PrendyOptions, PrendyStoreHelpers } from "../declarations";
export declare function get_playerRules(storeHelpers: PrendyStoreHelpers, PRENDY_OPTIONS: PrendyOptions, prendyAssets: PrendyAssets): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
