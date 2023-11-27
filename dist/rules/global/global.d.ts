import { MyTypes } from "../../declarations";
import { get_globalGeneralRules } from "./general";
export type T_GlobalRules<T_MyTypes extends MyTypes = MyTypes> = ReturnType<typeof get_globalGeneralRules<T_MyTypes>>;
export declare const cachedRules: {
    globalGeneralRules: {
        stopAll: (...args: any) => any;
        startAll: (...args: any) => any;
        start: (...args: any) => any;
        stop: (...args: any) => any;
        ruleNames: any[];
        run: (...args: any) => any;
        runAll: (...args: any) => any;
    } | null;
};
export declare function get_startAllGlobalRules<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"], prendyStores: T_MyTypes["Stores"], storeHelpers: T_MyTypes["Repond"]): () => () => void;
