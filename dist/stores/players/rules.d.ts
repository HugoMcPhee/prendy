import { PrendyAssets } from "../../declarations";
import { PrendyStoreHelpers, PrendyOptionsUntyped } from "../typedStoreHelpers";
export declare function makePlayerRules<StoreHelpers extends PrendyStoreHelpers, PrendyOptions extends PrendyOptionsUntyped>(storeHelpers: StoreHelpers, PRENDY_OPTIONS: PrendyOptions, prendyAssets: PrendyAssets): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
