/// <reference types="node" />
import { CSSProperties } from "react";
import { PrendyAssets, CharacterName, FontName, SpeechVidName } from "../declarations";
export default function speechBubbles<A_PrendyAssets extends PrendyAssets = PrendyAssets, A_CharacterName extends CharacterName = CharacterName, A_FontName extends FontName = FontName, A_SpeechVidName extends SpeechVidName = SpeechVidName>(prendyAssets: A_PrendyAssets): {
    state: <T_ItemName extends string>(_itemName: T_ItemName, options?: {
        font?: A_FontName;
        character?: A_CharacterName;
    }) => {
        isVisible: boolean;
        isFullyHidden: boolean;
        goalText: string;
        visibleLetterAmount: number;
        typingSpeed: number;
        stylesBySpecialText: Record<string, CSSProperties>;
        _specialTextByLetterIndex: Record<number, string>;
        _goalTextWordLetterArrays: string[][];
        forCharacter: A_CharacterName | null;
        position: import("chootils/dist/points2d").Point2D;
        typingFinished: boolean;
        nowVideoName: A_SpeechVidName | null;
        font: A_FontName;
        zIndex: number;
    };
    refs: () => {
        bubbleRef: any;
        textRef: any;
        currentTimeout: NodeJS.Timeout | null;
        videoRef: HTMLVideoElement | null;
    };
    startStates: { [K_CharacterName in A_CharacterName]: {
        isVisible: boolean;
        isFullyHidden: boolean;
        goalText: string;
        visibleLetterAmount: number;
        typingSpeed: number;
        stylesBySpecialText: Record<string, CSSProperties>;
        _specialTextByLetterIndex: Record<number, string>;
        _goalTextWordLetterArrays: string[][];
        forCharacter: A_CharacterName | null;
        position: import("chootils/dist/points2d").Point2D;
        typingFinished: boolean;
        nowVideoName: A_SpeechVidName | null;
        font: A_FontName;
        zIndex: number;
    }; };
};
