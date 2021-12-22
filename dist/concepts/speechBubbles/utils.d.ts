import { PrendyStoreHelpers, PlaceholderPrendyConcepts } from "../typedStoreHelpers";
export declare function makeSpeechBubblesStoreUtils<StoreHelpers extends PrendyStoreHelpers, PrendyConcepts extends PlaceholderPrendyConcepts>(storeHelpers: StoreHelpers, prendyConcepts: PrendyConcepts): {
    getTypingDelayForLetter: (letter: string, speechBubbleName: keyof PrendyConcepts["speechBubbles"]["startStates"]) => any;
    getTypingDelayForText: (text: string, speechBubbleName: keyof PrendyConcepts["speechBubbles"]["startStates"]) => number;
    isSpecialLetter: (text: string) => RegExpMatchArray | null;
    isWhitespace: (text: string) => boolean;
};
