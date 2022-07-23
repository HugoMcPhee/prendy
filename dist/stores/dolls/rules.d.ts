import { PrendyAssets, PrendyOptions, DollName } from "../../declarations";
import { PrendyStoreHelpers, PlaceholderPrendyStores } from "../typedStoreHelpers";
export declare function makeDollDynamicRules<StoreHelpers extends PrendyStoreHelpers, PrendyStores extends PlaceholderPrendyStores>(storeHelpers: StoreHelpers, prendyStartOptions: PrendyOptions, prendyStores: PrendyStores, prendyAssets: PrendyAssets): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
export declare function startDynamicDollRulesForInitialState<StoreHelpers extends PrendyStoreHelpers, DollDynamicRules extends ReturnType<typeof makeDollDynamicRules>>(storeHelpers: StoreHelpers, dollDynamicRules: DollDynamicRules, dollNames: readonly DollName[]): () => void;
export declare function makeDollRules<DollDynamicRules extends ReturnType<typeof makeDollDynamicRules>, StoreHelpers extends PrendyStoreHelpers, PrendyStores extends PlaceholderPrendyStores>(prendyStartOptions: PrendyOptions, dollDynamicRules: DollDynamicRules, storeHelpers: StoreHelpers, prendyStores: PrendyStores, prendyAssets: PrendyAssets): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
