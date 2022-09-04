import { PrendyStoreHelpers } from "../stores/typedStoreHelpers";
export declare function makeTyped_safeVidRules<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
