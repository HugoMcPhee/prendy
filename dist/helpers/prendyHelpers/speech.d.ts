import { CSSProperties } from "react";
import { CharacterName, PrendyOptions, PrendyStoreHelpers, PrendyStores } from "../../declarations";
export declare function get_speechStoryHelpers<A_CharacterName extends CharacterName = CharacterName, A_PrendyOptions extends PrendyOptions = PrendyOptions, A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers, A_PrendyStores extends PrendyStores = PrendyStores>(storeHelpers: A_PrendyStoreHelpers, prendyStores: A_PrendyStores, prendyStartOptions: A_PrendyOptions, _characterNames: readonly A_CharacterName[]): {
    showSpeech: (text: string, options?: {
        time?: number | undefined;
        showOnce?: boolean | undefined;
        character?: (keyof A_PrendyStores["speechBubbles"]["startStates"] & A_CharacterName) | undefined;
        zoomAmount?: number | undefined;
        lookAtPlayer?: boolean | undefined;
        returnToZoomBeforeConversation?: boolean | undefined;
        stylesBySpecialText?: Record<string, CSSProperties> | undefined;
    } | undefined) => Promise<void>;
    showMiniBubble: (text: string, time?: number) => void;
    hideMiniBubble: () => void;
    showAlarmText: (text: string, time: number) => Promise<void>;
};
