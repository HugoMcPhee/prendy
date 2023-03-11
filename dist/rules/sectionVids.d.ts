import { PrendyAssets } from "../declarations";
import { PrendyOptionsUntyped, PrendyStoreHelpers } from "../stores/typedStoreHelpers";
export declare function get_sectionVidRules<StoreHelpers extends PrendyStoreHelpers, PrendyOptions extends PrendyOptionsUntyped>(storeHelpers: StoreHelpers, prendyOptions: PrendyOptions, prendyAssets: PrendyAssets): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
