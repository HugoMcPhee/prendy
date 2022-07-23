import { PrendyAssets } from "../../declarations";
import { PrendyStoreHelpers } from "../typedStoreHelpers";
export declare function makeSectionVidRules<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers, prendyAssets: PrendyAssets): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
