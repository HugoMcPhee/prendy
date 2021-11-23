import { PrendyArt } from "../../declarations";
import { PrendyConcepFuncs, PrendyOptionsUntyped } from "../typedConcepFuncs";
export declare function makePlayerRules<ConcepFuncs extends PrendyConcepFuncs, PrendyOptions extends PrendyOptionsUntyped>(concepFuncs: ConcepFuncs, PRENDY_OPTIONS: PrendyOptions, prendyArt: PrendyArt): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
