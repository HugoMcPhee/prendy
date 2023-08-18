import { PrendyAssets, PrendyStoreHelpers } from "../declarations";
export declare function get_playerRules(prendyAssets: PrendyAssets, storeHelpers: PrendyStoreHelpers): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
