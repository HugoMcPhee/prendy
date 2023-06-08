import { CSSProperties } from "react";
import { CharacterName, PrendyOptions, PrendyStoreHelpers, PrendyStores } from "../../declarations";
export declare function get_speechStoryHelpers(storeHelpers: PrendyStoreHelpers, prendyStores: PrendyStores, prendyStartOptions: PrendyOptions, _characterNames: readonly CharacterName[]): {
    showSpeech: (text: string, options?: {
        time?: number | undefined;
        showOnce?: boolean | undefined;
        character?: undefined;
        zoomAmount?: number | undefined;
        lookAtPlayer?: boolean | undefined;
        returnToZoomBeforeConversation?: boolean | undefined;
        stylesBySpecialText?: Record<string, CSSProperties> | undefined;
    } | undefined) => Promise<void>;
    showMiniBubble: (text: string, time?: number) => void;
    hideMiniBubble: () => void;
    showAlarmText: (text: string, time: number) => Promise<void>;
};
