import { MyTypes } from "../declarations";
export declare const rangeOptionsQuick: {
    readonly touch: number;
    readonly talk: number;
    readonly see: number;
};
export declare function get_dollDynamicRules<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"], prendyStores: T_MyTypes["Stores"], storeHelpers: T_MyTypes["Repond"]): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
export declare function startDynamicDollRulesForInitialState<DollDynamicRules extends ReturnType<typeof get_dollDynamicRules>, T_MyTypes extends MyTypes = MyTypes>(dollDynamicRules: DollDynamicRules, dollNames: readonly T_MyTypes["Types"]["DollName"][]): () => void;
export declare function get_dollRules<DollDynamicRules extends ReturnType<typeof get_dollDynamicRules>, T_MyTypes extends MyTypes = MyTypes>(dollDynamicRules: DollDynamicRules, prendyAssets: T_MyTypes["Assets"], storeHelpers: T_MyTypes["Repond"]): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
    run: (...args: any) => any;
    runAll: (...args: any) => any;
};
