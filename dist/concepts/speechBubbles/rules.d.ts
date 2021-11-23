import { PrendyConcepFuncs, PlaceholderPrendyConcepts } from "../typedConcepFuncs";
export declare function makeSpeechBubbleRules<ConcepFuncs extends PrendyConcepFuncs, PrendyConcepts extends PlaceholderPrendyConcepts>(concepFuncs: ConcepFuncs, prendyConcepts: PrendyConcepts): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
