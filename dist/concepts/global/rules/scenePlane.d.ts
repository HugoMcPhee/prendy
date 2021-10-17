import { BackdopConcepFuncs, BackdopOptionsUntyped } from "../../typedConcepFuncs";
export declare function makeGlobalScenePlaneRules<ConcepFuncs extends BackdopConcepFuncs, BackdopOptions extends BackdopOptionsUntyped>(concepFuncs: ConcepFuncs, backdopStartOptions: BackdopOptions): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
