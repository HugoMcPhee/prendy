import { PrendyArt, PrendyOptions, DollName } from "../../declarations";
import { PrendyStoreHelpers, PlaceholderPrendyConcepts } from "../typedStoreHelpers";
export declare function makeDollDynamicRules<StoreHelpers extends PrendyStoreHelpers, PrendyConcepts extends PlaceholderPrendyConcepts>(storeHelpers: StoreHelpers, prendyStartOptions: PrendyOptions, prendyConcepts: PrendyConcepts, prendyArt: PrendyArt): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
export declare function startDynamicDollRulesForInitialState<StoreHelpers extends PrendyStoreHelpers, DollDynamicRules extends ReturnType<typeof makeDollDynamicRules>>(storeHelpers: StoreHelpers, dollDynamicRules: DollDynamicRules, dollNames: readonly DollName[]): () => void;
export declare function makeDollRules<DollDynamicRules extends ReturnType<typeof makeDollDynamicRules>, StoreHelpers extends PrendyStoreHelpers, PrendyConcepts extends PlaceholderPrendyConcepts>(prendyStartOptions: PrendyOptions, dollDynamicRules: DollDynamicRules, storeHelpers: StoreHelpers, prendyConcepts: PrendyConcepts, prendyArt: PrendyArt): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
