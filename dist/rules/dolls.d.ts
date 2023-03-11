import { DollName, PrendyAssets, PrendyOptions } from "../declarations";
import { PlaceholderPrendyStores, PrendyStoreHelpers } from "../stores/typedStoreHelpers";
export declare const rangeOptionsQuick: {
    readonly touch: number;
    readonly talk: number;
    readonly see: number;
};
export declare function get_dollDynamicRules<StoreHelpers extends PrendyStoreHelpers, PrendyStores extends PlaceholderPrendyStores>(storeHelpers: StoreHelpers, prendyStartOptions: PrendyOptions, prendyStores: PrendyStores, prendyAssets: PrendyAssets): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
export declare function startDynamicDollRulesForInitialState<StoreHelpers extends PrendyStoreHelpers, DollDynamicRules extends ReturnType<typeof get_dollDynamicRules>>(storeHelpers: StoreHelpers, dollDynamicRules: DollDynamicRules, dollNames: readonly DollName[]): () => void;
export declare function get_dollRules<DollDynamicRules extends ReturnType<typeof get_dollDynamicRules>, StoreHelpers extends PrendyStoreHelpers, PrendyStores extends PlaceholderPrendyStores>(prendyStartOptions: PrendyOptions, dollDynamicRules: DollDynamicRules, storeHelpers: StoreHelpers, prendyStores: PrendyStores, prendyAssets: PrendyAssets): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
