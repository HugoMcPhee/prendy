import { BackdopArt } from "../../declarations";
import { BackdopConcepFuncs, BackdopOptionsUntyped } from "../typedConcepFuncs";
export declare function makePlayerRules<ConcepFuncs extends BackdopConcepFuncs, BackdopOptions extends BackdopOptionsUntyped>(concepFuncs: ConcepFuncs, BACKDOP_OPTIONS: BackdopOptions, backdopArt: BackdopArt): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
