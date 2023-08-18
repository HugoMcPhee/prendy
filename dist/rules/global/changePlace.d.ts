import { MyTypes } from "../../declarations";
export declare function get_globalChangePlaceRules<T_MyTypes extends MyTypes = MyTypes>(storeHelpers: T_MyTypes["StoreHelpers"], prendyOptions: T_MyTypes["Main"]["PrendyOptions"], prendyAssets: T_MyTypes["Assets"]): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
