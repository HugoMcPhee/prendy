import { DollName, PrendyAssets, PrendyOptions, PrendyStoreHelpers, PrendyStores } from "../declarations";
export declare const rangeOptionsQuick: {
    readonly touch: number;
    readonly talk: number;
    readonly see: number;
};
export declare function get_dollDynamicRules(storeHelpers: PrendyStoreHelpers, prendyStartOptions: PrendyOptions, prendyStores: PrendyStores, prendyAssets: PrendyAssets): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
export declare function startDynamicDollRulesForInitialState<DollDynamicRules extends ReturnType<typeof get_dollDynamicRules>>(storeHelpers: PrendyStoreHelpers, dollDynamicRules: DollDynamicRules, dollNames: readonly DollName[]): () => void;
export declare function get_dollRules<DollDynamicRules extends ReturnType<typeof get_dollDynamicRules>>(prendyStartOptions: PrendyOptions, dollDynamicRules: DollDynamicRules, storeHelpers: PrendyStoreHelpers, prendyStores: PrendyStores, prendyAssets: PrendyAssets): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
