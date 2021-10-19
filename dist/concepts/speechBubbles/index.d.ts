import { CSSProperties } from "react";
import { CharacterOptionsPlaceholder } from "../typedConcepFuncs";
export default function speechBubbles<CharacterName extends string, DollName extends string, FontName extends string, SpeechvidName extends string, CharacterOptions extends CharacterOptionsPlaceholder<CharacterName, DollName, FontName>>(characterNames: readonly CharacterName[], characterOptions: CharacterOptions, fontNames: readonly FontName[]): {
    state: <T_ItemName extends string>(_itemName: T_ItemName, options?: {
        font?: FontName | undefined;
        character?: CharacterName | undefined;
    } | undefined) => {
        isVisible: boolean;
        isFullyHidden: boolean;
        goalText: string;
        visibleLetterAmount: number;
        typingSpeed: number;
        stylesBySpecialText: Record<string, CSSProperties>;
        _specialTextByLetterIndex: Record<number, string>;
        _goalTextWordLetterArrays: string[][];
        forCharacter: CharacterName | null;
        position: import("shutils/dist/points2d").Point2D;
        typingFinished: boolean;
        nowVideoName: SpeechvidName;
        font: FontName;
        zIndex: number;
    };
    refs: () => {
        bubbleRef: any;
        textRef: any;
        currentTimeout: number | null;
        videoRef: HTMLVideoElement | null;
    };
    startStates: { [K_CharacterName in CharacterName]: {
        isVisible: boolean;
        isFullyHidden: boolean;
        goalText: string;
        visibleLetterAmount: number;
        typingSpeed: number;
        stylesBySpecialText: Record<string, CSSProperties>;
        _specialTextByLetterIndex: Record<number, string>;
        _goalTextWordLetterArrays: string[][];
        forCharacter: CharacterName | null;
        position: import("shutils/dist/points2d").Point2D;
        typingFinished: boolean;
        nowVideoName: SpeechvidName;
        font: FontName;
        zIndex: number;
    }; };
};
