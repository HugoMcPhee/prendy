import { GameyConceptoFuncs, PlaceholderGameyConcepts } from "../typedConceptoFuncs";
export declare function makeSpeechBubblesStoreUtils<ConceptoFuncs extends GameyConceptoFuncs, GameyConcepts extends PlaceholderGameyConcepts>(conceptoFuncs: ConceptoFuncs, gameyConcepts: GameyConcepts): {
    getTypingDelayForLetter: (letter: string, speechBubbleName: any) => any;
    getTypingDelayForText: (text: string, speechBubbleName: any) => number;
    isSpecialLetter: (text: string) => RegExpMatchArray;
    isWhitespace: (text: string) => boolean;
};
