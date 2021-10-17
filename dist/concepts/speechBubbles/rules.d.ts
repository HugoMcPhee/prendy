import { BackdopConcepFuncs, PlaceholderBackdopConcepts } from "../typedConcepFuncs";
export declare function makeSpeechBubbleRules<ConcepFuncs extends BackdopConcepFuncs, BackdopConcepts extends PlaceholderBackdopConcepts>(concepFuncs: ConcepFuncs, backdopConcepts: BackdopConcepts): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
