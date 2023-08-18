import { CSSProperties } from "react";
import { MyTypes } from "../../declarations";
export declare function get_speechStoryHelpers<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"], prendyStores: T_MyTypes["Stores"], storeHelpers: T_MyTypes["StoreHelpers"]): {
    showSpeech: (text: string, options?: {
        time?: number | undefined;
        showOnce?: boolean | undefined;
        character?: (keyof T_MyTypes["Stores"]["speechBubbles"]["startStates"] & T_MyTypes["Main"]["CharacterName"]) | undefined;
        zoomAmount?: number | undefined;
        lookAtPlayer?: boolean | undefined;
        returnToZoomBeforeConversation?: boolean | undefined;
        stylesBySpecialText?: Record<string, CSSProperties> | undefined;
    } | undefined) => Promise<void>;
    showMiniBubble: (text: string, time?: number) => void;
    hideMiniBubble: () => void;
    showAlarmText: (text: string, time: number) => Promise<void>;
};
