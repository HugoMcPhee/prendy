import { BackdopConcepFuncs, BackdopOptionsUntyped, PlaceholderBackdopConcepts } from "../../../concepts/typedConcepFuncs";
import { CSSProperties } from "react";
export declare function makeSpeechStoryHelpers<ConcepFuncs extends BackdopConcepFuncs, BackdopConcepts extends PlaceholderBackdopConcepts, BackdopOptions extends BackdopOptionsUntyped, CharacterName extends string>(concepFuncs: ConcepFuncs, backdopConcepts: BackdopConcepts, backdopStartOptions: BackdopOptions, characterNames: readonly CharacterName[]): {
    showSpeech: (text: string, options?: {
        time?: number;
        showOnce?: boolean;
        character?: any;
        zoomAmount?: number;
        lookAtPlayer?: boolean;
        returnToZoomBeforeConversation?: boolean;
        stylesBySpecialText?: Record<string, CSSProperties>;
    }) => Promise<void>;
    showMiniBubble: (text: string, time?: number) => void;
    hideMiniBubble: () => void;
    showAlarmText: (text: string, time: number) => Promise<void>;
};
