import { PrendyArt } from "../../declarations";
import { PrendyStoreHelpers } from "../typedStoreHelpers";
export declare function makeModelRules<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers, prendyArt: PrendyArt): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
