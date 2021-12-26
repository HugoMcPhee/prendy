import { PrendyArt, PrendyOptions } from "../../../declarations";
import { PrendyStoreHelpers, PlaceholderPrendyConcepts } from "../../typedStoreHelpers";
export declare function makeGlobalVideoRules<StoreHelpers extends PrendyStoreHelpers, PrendyConcepts extends PlaceholderPrendyConcepts>(storeHelpers: StoreHelpers, _prendyConcepts: PrendyConcepts, _prendyStartOptions: PrendyOptions, prendyArt: PrendyArt): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
