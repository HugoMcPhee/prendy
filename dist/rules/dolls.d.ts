import { PrendyAssets, PrendyOptions, DollName } from "../declarations";
import { PrendyStoreHelpers, PlaceholderPrendyStores } from "../stores/typedStoreHelpers";
export declare const rangeOptionsQuick: {
    readonly touch: number;
    readonly talk: number;
    readonly see: number;
};
export declare function makeTyped_dollDynamicRules<StoreHelpers extends PrendyStoreHelpers, PrendyStores extends PlaceholderPrendyStores>(storeHelpers: StoreHelpers, prendyStartOptions: PrendyOptions, prendyStores: PrendyStores, prendyAssets: PrendyAssets): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
export declare function startDynamicDollRulesForInitialState<StoreHelpers extends PrendyStoreHelpers, DollDynamicRules extends ReturnType<typeof makeTyped_dollDynamicRules>>(storeHelpers: StoreHelpers, dollDynamicRules: DollDynamicRules, dollNames: readonly DollName[]): () => void;
export declare function makeTyped_dollRules<DollDynamicRules extends ReturnType<typeof makeTyped_dollDynamicRules>, StoreHelpers extends PrendyStoreHelpers, PrendyStores extends PlaceholderPrendyStores>(prendyStartOptions: PrendyOptions, dollDynamicRules: DollDynamicRules, storeHelpers: StoreHelpers, prendyStores: PrendyStores, prendyAssets: PrendyAssets): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
