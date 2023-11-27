import { MyTypes } from "../declarations";
export declare function get_playerRules<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"], storeHelpers: T_MyTypes["Repond"]): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
    run: (...args: any) => any;
    runAll: (...args: any) => any;
};
