import { DollName, PlaceName, PrendyAssets, PrendyOptions, PrendyStoreHelpers, PrendyStores, SpotNameByPlace } from "../../declarations";
export declare function get_globalChangePlaceRules<A_DollName extends DollName = DollName, A_PlaceName extends PlaceName = PlaceName, A_PrendyAssets extends PrendyAssets = PrendyAssets, A_PrendyOptions extends PrendyOptions = PrendyOptions, A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers, A_PrendyStores extends PrendyStores = PrendyStores, A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace>(storeHelpers: A_PrendyStoreHelpers, _prendyStores: A_PrendyStores, prendyStartOptions: A_PrendyOptions, prendyAssets: A_PrendyAssets): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
