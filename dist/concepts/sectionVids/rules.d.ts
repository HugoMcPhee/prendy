import { BackdopArt } from "../../declarations";
import { BackdopConcepFuncs } from "../typedConcepFuncs";
export declare function makeSectionVidRules<ConcepFuncs extends BackdopConcepFuncs>(concepFuncs: ConcepFuncs, backdopArt: BackdopArt): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
