import { PrendyAssets } from "../../declarations";
import { PrendyStoreHelpers, PlaceholderPrendyStores, PrendyOptionsUntyped } from "../../stores/typedStoreHelpers";
export declare function get_globalChangePlaceRules<StoreHelpers extends PrendyStoreHelpers, PrendyStores extends PlaceholderPrendyStores, PrendyOptions extends PrendyOptionsUntyped>(storeHelpers: StoreHelpers, _prendyStores: PrendyStores, prendyStartOptions: PrendyOptions, prendyAssets: PrendyAssets): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
