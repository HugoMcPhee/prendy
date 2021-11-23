import { PrendyConcepFuncs } from "../typedConcepFuncs";
export declare function makeSafeVidRules<ConcepFuncs extends PrendyConcepFuncs>(concepFuncs: ConcepFuncs): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
