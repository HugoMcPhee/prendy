import { CSSProperties } from "react";
import { BackdopConcepFuncs, PlaceholderBackdopConcepts } from "../../../concepts/typedConcepFuncs";
import { BackdopOptions, CharacterName } from "../../../declarations";
export declare function makeSpeechStoryHelpers<ConcepFuncs extends BackdopConcepFuncs, BackdopConcepts extends PlaceholderBackdopConcepts, A_BackdopOptions extends BackdopOptions = BackdopOptions, A_CharacterName extends CharacterName = CharacterName>(concepFuncs: ConcepFuncs, backdopConcepts: BackdopConcepts, backdopStartOptions: A_BackdopOptions, _characterNames: readonly A_CharacterName[]): {
    showSpeech: (text: string, options?: {
        time?: number | undefined;
        showOnce?: boolean | undefined;
        character?: (keyof BackdopConcepts["speechBubbles"]["startStates"] & A_CharacterName) | undefined;
        zoomAmount?: number | undefined;
        lookAtPlayer?: boolean | undefined;
        returnToZoomBeforeConversation?: boolean | undefined;
        stylesBySpecialText?: Record<string, CSSProperties> | undefined;
    } | undefined) => Promise<void>;
    showMiniBubble: (text: string, time?: number) => void;
    hideMiniBubble: () => void;
    showAlarmText: (text: string, time: number) => Promise<void>;
};
