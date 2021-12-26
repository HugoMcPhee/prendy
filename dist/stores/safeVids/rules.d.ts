import { PrendyStoreHelpers } from "../typedStoreHelpers";
export declare function makeSafeVidRules<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
