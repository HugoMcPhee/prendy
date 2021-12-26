import { PrendyStoreHelpers, PrendyOptionsUntyped } from "../../typedStoreHelpers";
export declare function makeGlobalScenePlaneRules<StoreHelpers extends PrendyStoreHelpers, PrendyOptions extends PrendyOptionsUntyped>(storeHelpers: StoreHelpers, prendyStartOptions: PrendyOptions): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
