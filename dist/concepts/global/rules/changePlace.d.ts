import { PrendyArt, PrendyOptions } from "../../../declarations";
import { PrendyConcepFuncs, PlaceholderPrendyConcepts } from "../../typedConcepFuncs";
export declare function makeGlobalChangePlaceRules<ConcepFuncs extends PrendyConcepFuncs, PrendyConcepts extends PlaceholderPrendyConcepts>(concepFuncs: ConcepFuncs, _prendyConcepts: PrendyConcepts, prendyStartOptions: PrendyOptions, prendyArt: PrendyArt): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
