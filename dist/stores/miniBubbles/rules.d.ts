import { PrendyStoreHelpers } from "../typedStoreHelpers";
export declare function makeTyped_miniBubbleRules<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
