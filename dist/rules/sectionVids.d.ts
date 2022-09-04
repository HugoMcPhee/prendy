import { PrendyAssets } from "../declarations";
import { PrendyStoreHelpers } from "../stores/typedStoreHelpers";
export declare function makeTyped_sectionVidRules<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers, prendyAssets: PrendyAssets): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
