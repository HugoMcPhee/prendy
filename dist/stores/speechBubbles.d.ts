/// <reference types="node" />
import { CSSProperties } from "react";
import { PrendyAssets, CharacterName, FontName } from "../declarations";
export default function speechBubbles(prendyAssets: PrendyAssets): {
    state: <T_ItemName extends string>(_itemName: T_ItemName, options?: {
        font?: FontName;
        character?: CharacterName;
    }) => {
        isVisible: boolean;
        isFullyHidden: boolean;
        goalText: string;
        visibleLetterAmount: number;
        typingSpeed: number;
        stylesBySpecialText: Record<string, CSSProperties>;
        _specialTextByLetterIndex: Record<number, string>;
        _goalTextWordLetterArrays: string[][];
        forCharacter: string | null;
        position: import("chootils/dist/points2d").Point2D;
        typingFinished: boolean;
        nowVideoName: string | null;
        font: string;
        zIndex: number;
    };
    refs: () => {
        bubbleRef: any;
        textRef: any;
        currentTimeout: NodeJS.Timeout | null;
        videoRef: HTMLVideoElement | null;
    };
    startStates: {
        [x: string]: {
            isVisible: boolean;
            isFullyHidden: boolean;
            goalText: string;
            visibleLetterAmount: number;
            typingSpeed: number;
            stylesBySpecialText: Record<string, CSSProperties>;
            _specialTextByLetterIndex: Record<number, string>;
            _goalTextWordLetterArrays: string[][];
            forCharacter: string | null;
            position: import("chootils/dist/points2d").Point2D;
            typingFinished: boolean;
            nowVideoName: string | null;
            font: string;
            zIndex: number;
        };
    };
};
