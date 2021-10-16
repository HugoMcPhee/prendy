import { GameyConceptoFuncs, PlaceholderGameyConcepts } from "../typedConceptoFuncs";
export declare function makeSpeechBubbleRules<ConceptoFuncs extends GameyConceptoFuncs, GameyConcepts extends PlaceholderGameyConcepts>(conceptoFuncs: ConceptoFuncs, gameyConcepts: GameyConcepts): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
