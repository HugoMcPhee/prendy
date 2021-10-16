import { GameyConceptoFuncs, GameyStartOptionsUntyped, PlaceholderGameyConcepts } from "../../../concepts/typedConceptoFuncs";
import { CSSProperties } from "react";
export declare function makeSpeechStoryHelpers<ConceptoFuncs extends GameyConceptoFuncs, GameyConcepts extends PlaceholderGameyConcepts, GameyStartOptions extends GameyStartOptionsUntyped, CharacterName extends string>(conceptoFuncs: ConceptoFuncs, gameyConcepts: GameyConcepts, gameyStartOptions: GameyStartOptions, characterNames: readonly CharacterName[]): {
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
