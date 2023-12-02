import { CSSProperties } from "react";
import { AllState } from "repond";
import { MyTypes } from "../../declarations";
type CharacterName = MyTypes["Types"]["CharacterName"];
type SpeechBubbleName = keyof AllState["speechBubbles"];
export declare function showSpeech(text: string, options?: {
    time?: number;
    showOnce?: boolean;
    character?: SpeechBubbleName & CharacterName;
    zoomAmount?: number;
    lookAtPlayer?: boolean;
    returnToZoomBeforeConversation?: boolean;
    stylesBySpecialText?: Record<string, CSSProperties>;
}): Promise<void>;
export declare function showMiniBubble(text: string, time?: number): void;
export declare function hideMiniBubble(): void;
export declare function showAlarmText(text: string, time: number): Promise<void>;
export {};
