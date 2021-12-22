import { CSSProperties } from "react";
import { PrendyStoreHelpers, PlaceholderPrendyConcepts } from "../../../concepts/typedStoreHelpers";
import { PrendyOptions, CharacterName } from "../../../declarations";
export declare function makeSpeechStoryHelpers<StoreHelpers extends PrendyStoreHelpers, PrendyConcepts extends PlaceholderPrendyConcepts, A_PrendyOptions extends PrendyOptions = PrendyOptions, A_CharacterName extends CharacterName = CharacterName>(storeHelpers: StoreHelpers, prendyConcepts: PrendyConcepts, prendyStartOptions: A_PrendyOptions, _characterNames: readonly A_CharacterName[]): {
    showSpeech: (text: string, options?: {
        time?: number | undefined;
        showOnce?: boolean | undefined;
        character?: (keyof PrendyConcepts["speechBubbles"]["startStates"] & A_CharacterName) | undefined;
        zoomAmount?: number | undefined;
        lookAtPlayer?: boolean | undefined;
        returnToZoomBeforeConversation?: boolean | undefined;
        stylesBySpecialText?: Record<string, CSSProperties> | undefined;
    } | undefined) => Promise<void>;
    showMiniBubble: (text: string, time?: number) => void;
    hideMiniBubble: () => void;
    showAlarmText: (text: string, time: number) => Promise<void>;
};
