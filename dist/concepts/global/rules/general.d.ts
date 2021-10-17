import { BackdopConcepFuncs } from "../../typedConcepFuncs";
export declare function makeGlobalGeneralRules<ConcepFuncs extends BackdopConcepFuncs>(concepFuncs: ConcepFuncs): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
