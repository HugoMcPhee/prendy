import { PrendyAssets, PrendyOptions } from "../../../declarations";
import { PrendyStoreHelpers, PlaceholderPrendyStores } from "../../typedStoreHelpers";
export declare function makeGlobalChangePlaceRules<StoreHelpers extends PrendyStoreHelpers, PrendyStores extends PlaceholderPrendyStores>(storeHelpers: StoreHelpers, _prendyStores: PrendyStores, prendyStartOptions: PrendyOptions, prendyAssets: PrendyAssets): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
