import { PrendyOptionsUntyped, PrendyStoreHelpers } from "../../stores/typedStoreHelpers";
export declare function get_globalScenePlaneRules<StoreHelpers extends PrendyStoreHelpers, PrendyOptions extends PrendyOptionsUntyped>(storeHelpers: StoreHelpers, prendyOptions: PrendyOptions): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
