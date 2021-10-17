import { BackdopConcepFuncs, PlaceholderBackdopConcepts } from "../typedConcepFuncs";
export declare function makeSpeechBubblesStoreUtils<ConcepFuncs extends BackdopConcepFuncs, BackdopConcepts extends PlaceholderBackdopConcepts>(concepFuncs: ConcepFuncs, backdopConcepts: BackdopConcepts): {
    getTypingDelayForLetter: (letter: string, speechBubbleName: any) => any;
    getTypingDelayForText: (text: string, speechBubbleName: any) => number;
    isSpecialLetter: (text: string) => RegExpMatchArray;
    isWhitespace: (text: string) => boolean;
};
