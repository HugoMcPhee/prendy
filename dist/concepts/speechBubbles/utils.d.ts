import { BackdopConcepFuncs, PlaceholderBackdopConcepts } from "../typedConcepFuncs";
export declare function makeSpeechBubblesStoreUtils<ConcepFuncs extends BackdopConcepFuncs, BackdopConcepts extends PlaceholderBackdopConcepts>(concepFuncs: ConcepFuncs, backdopConcepts: BackdopConcepts): {
    getTypingDelayForLetter: (letter: string, speechBubbleName: keyof BackdopConcepts["speechBubbles"]["startStates"]) => any;
    getTypingDelayForText: (text: string, speechBubbleName: keyof BackdopConcepts["speechBubbles"]["startStates"]) => number;
    isSpecialLetter: (text: string) => RegExpMatchArray | null;
    isWhitespace: (text: string) => boolean;
};
