import { CSSProperties } from "react";
import { PrendyStoreHelpers, PlaceholderPrendyStores } from "../../../stores/typedStoreHelpers";
import { PrendyOptions, CharacterName } from "../../../declarations";
export declare function makeSpeechStoryHelpers<StoreHelpers extends PrendyStoreHelpers, PrendyStores extends PlaceholderPrendyStores, A_PrendyOptions extends PrendyOptions = PrendyOptions, A_CharacterName extends CharacterName = CharacterName>(storeHelpers: StoreHelpers, prendyStores: PrendyStores, prendyStartOptions: A_PrendyOptions, _characterNames: readonly A_CharacterName[]): {
    showSpeech: (text: string, options?: {
        time?: number | undefined;
        showOnce?: boolean | undefined;
        character?: (keyof PrendyStores["speechBubbles"]["startStates"] & A_CharacterName) | undefined;
        zoomAmount?: number | undefined;
        lookAtPlayer?: boolean | undefined;
        returnToZoomBeforeConversation?: boolean | undefined;
        stylesBySpecialText?: Record<string, CSSProperties> | undefined;
    } | undefined) => Promise<void>;
    showMiniBubble: (text: string, time?: number) => void;
    hideMiniBubble: () => void;
    showAlarmText: (text: string, time: number) => Promise<void>;
};
