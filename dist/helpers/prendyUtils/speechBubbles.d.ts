import { PrendyStoreHelpers, PrendyStores } from "../../declarations";
export declare function get_speechBubblesUtils(storeHelpers: PrendyStoreHelpers, prendyStores: PrendyStores): {
    getTypingDelayForLetter: (letter: string, speechBubbleName: string) => any;
    getTypingDelayForText: (text: string, speechBubbleName: string) => number;
    isSpecialLetter: (text: string) => RegExpMatchArray | null;
    isWhitespace: (text: string) => boolean;
};
