import { PrendyStoreHelpers, PlaceholderPrendyStores } from "../../stores/typedStoreHelpers";
export declare function get_speechBubblesUtils<StoreHelpers extends PrendyStoreHelpers, PrendyStores extends PlaceholderPrendyStores>(storeHelpers: StoreHelpers, prendyStores: PrendyStores): {
    getTypingDelayForLetter: (letter: string, speechBubbleName: keyof PrendyStores["speechBubbles"]["startStates"]) => any;
    getTypingDelayForText: (text: string, speechBubbleName: keyof PrendyStores["speechBubbles"]["startStates"]) => number;
    isSpecialLetter: (text: string) => RegExpMatchArray | null;
    isWhitespace: (text: string) => boolean;
};
