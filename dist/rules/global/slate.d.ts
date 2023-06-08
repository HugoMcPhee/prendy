import { PrendyOptions, PrendyStoreHelpers } from "../../declarations";
export declare function get_globalSlateRules(storeHelpers: PrendyStoreHelpers, prendyOptions: PrendyOptions): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
