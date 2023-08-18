import { MyTypes } from "../declarations";
export declare function makeStartPrendyMainRules<T_MyTypes extends MyTypes = MyTypes>(storeHelpers: T_MyTypes["StoreHelpers"], prendyStores: T_MyTypes["Stores"], prendyAssets: T_MyTypes["Assets"]): () => () => void;
export type SubscribableRules = Record<any, any> & {
    startAll: () => void;
    stopAll: () => void;
};
export declare function rulesToSubscriber(rules: SubscribableRules[]): () => () => void;
export declare function combineSubscribers(subscribers: (() => () => void)[]): () => () => void;
export type MakeStartRulesOptions<T_MyTypes extends MyTypes = MyTypes> = {
    customRules: SubscribableRules[];
    storeHelpers: T_MyTypes["StoreHelpers"];
    stores: T_MyTypes["Stores"];
    prendyAssets: T_MyTypes["Assets"];
};
export declare function makeStartPrendyRules<T_MyTypes extends MyTypes = MyTypes>({ customRules, prendyAssets, stores, storeHelpers, }: MakeStartRulesOptions<T_MyTypes>): () => () => void;
export declare function makeStartAndStopRules<T_MyTypes extends MyTypes = MyTypes>(options: MakeStartRulesOptions<T_MyTypes>): () => null;
