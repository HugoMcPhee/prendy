import { PrendyStores } from "../../declarations";
type SpeechBubbleName = keyof PrendyStores["speechBubbles"]["startStates"] extends never ? string : keyof PrendyStores["speechBubbles"]["startStates"];
export declare function getTypingDelayForLetter(letter: string, speechBubbleName: SpeechBubbleName): any;
export declare function getTypingDelayForText(text: string, speechBubbleName: SpeechBubbleName): number;
export declare function isSpecialLetter(text: string): RegExpMatchArray | null;
export declare function isWhitespace(text: string): boolean;
export {};
