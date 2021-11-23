import { PrendyConcepFuncs, PrendyOptionsUntyped } from "../../typedConcepFuncs";
export declare function makeGlobalScenePlaneRules<ConcepFuncs extends PrendyConcepFuncs, PrendyOptions extends PrendyOptionsUntyped>(concepFuncs: ConcepFuncs, prendyStartOptions: PrendyOptions): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
