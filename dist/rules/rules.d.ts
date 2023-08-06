import { DollName, PlaceName, PrendyAssets, PrendyOptions, PrendyStoreHelpers, PrendyStores, SpotNameByPlace } from "../declarations";
export declare function makeStartPrendyMainRules<A_DollName extends DollName = DollName, A_PlaceName extends PlaceName = PlaceName, A_PrendyAssets extends PrendyAssets = PrendyAssets, A_PrendyOptions extends PrendyOptions = PrendyOptions, A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers, A_PrendyStores extends PrendyStores = PrendyStores, A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace>(storeHelpers: A_PrendyStoreHelpers, prendyStores: A_PrendyStores, PRENDY_OPTIONS: A_PrendyOptions, prendyAssets: A_PrendyAssets): () => () => void;
export declare type SubscribableRules = Record<any, any> & {
    startAll: () => void;
    stopAll: () => void;
};
export declare function rulesToSubscriber(rules: SubscribableRules[]): () => () => void;
export declare function combineSubscribers(subscribers: (() => () => void)[]): () => () => void;
export declare type MakeStartRulesOptions<A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers, A_PrendyStores extends PrendyStores = PrendyStores, A_PrendyOptions extends PrendyOptions = PrendyOptions, A_PrendyAssets extends PrendyAssets = PrendyAssets> = {
    customRules: SubscribableRules[];
    storeHelpers: A_PrendyStoreHelpers;
    stores: A_PrendyStores;
    prendyOptions: A_PrendyOptions;
    prendyAssets: A_PrendyAssets;
};
export declare function makeStartPrendyRules<A_DollName extends DollName = DollName, A_PlaceName extends PlaceName = PlaceName, A_PrendyAssets extends PrendyAssets = PrendyAssets, A_PrendyOptions extends PrendyOptions = PrendyOptions, A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers, A_PrendyStores extends PrendyStores = PrendyStores, A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace>({ customRules, prendyOptions, prendyAssets, stores, storeHelpers, }: MakeStartRulesOptions<A_PrendyStoreHelpers, A_PrendyStores, A_PrendyOptions, A_PrendyAssets>): () => () => void;
export declare function makeStartAndStopRules<A_DollName extends DollName = DollName, A_PlaceName extends PlaceName = PlaceName, A_PrendyAssets extends PrendyAssets = PrendyAssets, A_PrendyOptions extends PrendyOptions = PrendyOptions, A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers, A_PrendyStores extends PrendyStores = PrendyStores, A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace>(options: MakeStartRulesOptions<A_PrendyStoreHelpers, A_PrendyStores, A_PrendyOptions, A_PrendyAssets>): () => null;
