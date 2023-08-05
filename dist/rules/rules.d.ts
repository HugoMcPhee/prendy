import { PrendyAssets, PrendyOptions, PrendyStoreHelpers, PrendyStores } from "../declarations";
export declare function makeStartPrendyMainRules(storeHelpers: PrendyStoreHelpers, prendyStores: PrendyStores, PRENDY_OPTIONS: PrendyOptions, prendyAssets: PrendyAssets): () => () => void;
export declare type SubscribableRules = Record<any, any> & {
    startAll: () => void;
    stopAll: () => void;
};
export declare function rulesToSubscriber(rules: SubscribableRules[]): () => () => void;
export declare function combineSubscribers(subscribers: (() => () => void)[]): () => () => void;
export declare type MakeStartRulesOptions = {
    customRules: SubscribableRules[];
    storeHelpers: PrendyStoreHelpers;
    stores: PrendyStores;
    prendyOptions: PrendyOptions;
    prendyAssets: PrendyAssets;
};
export declare function makeStartPrendyRules({ customRules, prendyOptions, prendyAssets, stores, storeHelpers, }: MakeStartRulesOptions): () => () => void;
export declare function makeStartAndStopRules(options: MakeStartRulesOptions): () => null;
