import { PrendyArt } from "../../declarations";
import { PrendyConcepFuncs } from "../typedConcepFuncs";
export declare function makeSectionVidRules<ConcepFuncs extends PrendyConcepFuncs>(concepFuncs: ConcepFuncs, prendyArt: PrendyArt): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
