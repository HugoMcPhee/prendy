import { PrendyAssets, PrendyOptions } from "../../declarations";
import { PrendyStoreHelpers, PlaceholderPrendyStores } from "../../stores/typedStoreHelpers";
export declare function makeTyped_globalVideoRules<StoreHelpers extends PrendyStoreHelpers, PrendyStores extends PlaceholderPrendyStores>(storeHelpers: StoreHelpers, _prendyStores: PrendyStores, _prendyStartOptions: PrendyOptions, prendyAssets: PrendyAssets): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
