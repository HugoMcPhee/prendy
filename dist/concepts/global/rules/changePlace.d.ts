import { PrendyArt, PrendyOptions } from "../../../declarations";
import { PrendyStoreHelpers, PlaceholderPrendyConcepts } from "../../typedStoreHelpers";
export declare function makeGlobalChangePlaceRules<StoreHelpers extends PrendyStoreHelpers, PrendyConcepts extends PlaceholderPrendyConcepts>(storeHelpers: StoreHelpers, _prendyConcepts: PrendyConcepts, prendyStartOptions: PrendyOptions, prendyArt: PrendyArt): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
