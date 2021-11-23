import { PrendyArt, PrendyOptions, DollName } from "../../declarations";
import { PrendyConcepFuncs, PlaceholderPrendyConcepts } from "../typedConcepFuncs";
export declare function makeDollDynamicRules<ConcepFuncs extends PrendyConcepFuncs, PrendyConcepts extends PlaceholderPrendyConcepts>(concepFuncs: ConcepFuncs, prendyStartOptions: PrendyOptions, prendyConcepts: PrendyConcepts, prendyArt: PrendyArt): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
export declare function startDynamicDollRulesForInitialState<ConcepFuncs extends PrendyConcepFuncs, DollDynamicRules extends ReturnType<typeof makeDollDynamicRules>>(concepFuncs: ConcepFuncs, dollDynamicRules: DollDynamicRules, dollNames: readonly DollName[]): () => void;
export declare function makeDollRules<DollDynamicRules extends ReturnType<typeof makeDollDynamicRules>, ConcepFuncs extends PrendyConcepFuncs, PrendyConcepts extends PlaceholderPrendyConcepts>(prendyStartOptions: PrendyOptions, dollDynamicRules: DollDynamicRules, concepFuncs: ConcepFuncs, prendyConcepts: PrendyConcepts, prendyArt: PrendyArt): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
