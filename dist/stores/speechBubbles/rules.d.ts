import { PrendyStoreHelpers, PlaceholderPrendyStores } from "../typedStoreHelpers";
export declare function makeSpeechBubbleRules<StoreHelpers extends PrendyStoreHelpers, PrendyStores extends PlaceholderPrendyStores>(storeHelpers: StoreHelpers, prendyStores: PrendyStores): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
