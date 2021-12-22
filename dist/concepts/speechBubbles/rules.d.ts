import { PrendyStoreHelpers, PlaceholderPrendyConcepts } from "../typedStoreHelpers";
export declare function makeSpeechBubbleRules<StoreHelpers extends PrendyStoreHelpers, PrendyConcepts extends PlaceholderPrendyConcepts>(storeHelpers: StoreHelpers, prendyConcepts: PrendyConcepts): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
