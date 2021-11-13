import { BackdopArt, BackdopOptions } from "../../../declarations";
import { BackdopConcepFuncs, PlaceholderBackdopConcepts } from "../../typedConcepFuncs";
export declare function makeGlobalVideoRules<ConcepFuncs extends BackdopConcepFuncs, BackdopConcepts extends PlaceholderBackdopConcepts>(concepFuncs: ConcepFuncs, _backdopConcepts: BackdopConcepts, _backdopStartOptions: BackdopOptions, backdopArt: BackdopArt): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
