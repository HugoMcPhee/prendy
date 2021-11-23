import { PrendyConcepFuncs, PlaceholderPrendyConcepts } from "../typedConcepFuncs";
export declare function makeSpeechBubblesStoreUtils<ConcepFuncs extends PrendyConcepFuncs, PrendyConcepts extends PlaceholderPrendyConcepts>(concepFuncs: ConcepFuncs, prendyConcepts: PrendyConcepts): {
    getTypingDelayForLetter: (letter: string, speechBubbleName: keyof PrendyConcepts["speechBubbles"]["startStates"]) => any;
    getTypingDelayForText: (text: string, speechBubbleName: keyof PrendyConcepts["speechBubbles"]["startStates"]) => number;
    isSpecialLetter: (text: string) => RegExpMatchArray | null;
    isWhitespace: (text: string) => boolean;
};
