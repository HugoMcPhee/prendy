import { BackdopArt, BackdopOptions, DollName } from "../../declarations";
import { BackdopConcepFuncs, PlaceholderBackdopConcepts } from "../typedConcepFuncs";
export declare function makeDollDynamicRules<ConcepFuncs extends BackdopConcepFuncs, BackdopConcepts extends PlaceholderBackdopConcepts>(concepFuncs: ConcepFuncs, backdopStartOptions: BackdopOptions, backdopConcepts: BackdopConcepts, backdopArt: BackdopArt): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
export declare function startDynamicDollRulesForInitialState<ConcepFuncs extends BackdopConcepFuncs, DollDynamicRules extends ReturnType<typeof makeDollDynamicRules>>(concepFuncs: ConcepFuncs, dollDynamicRules: DollDynamicRules, dollNames: readonly DollName[]): () => void;
export declare function makeDollRules<DollDynamicRules extends ReturnType<typeof makeDollDynamicRules>, ConcepFuncs extends BackdopConcepFuncs, BackdopConcepts extends PlaceholderBackdopConcepts>(backdopStartOptions: BackdopOptions, dollDynamicRules: DollDynamicRules, concepFuncs: ConcepFuncs, backdopConcepts: BackdopConcepts, backdopArt: BackdopArt): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
