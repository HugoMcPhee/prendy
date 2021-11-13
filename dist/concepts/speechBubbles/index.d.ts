import { BackdopArt } from "../../declarations";
import { CSSProperties } from "react";
export default function speechBubbles(backdopArt: BackdopArt): {
    state: <T_ItemName extends string>(_itemName: T_ItemName, options?: {
        font?: string | undefined;
        character?: string | undefined;
    } | undefined) => {
        isVisible: boolean;
        isFullyHidden: boolean;
        goalText: string;
        visibleLetterAmount: number;
        typingSpeed: number;
        stylesBySpecialText: Record<string, CSSProperties>;
        _specialTextByLetterIndex: Record<number, string>;
        _goalTextWordLetterArrays: string[][];
        forCharacter: string | null;
        position: import("shutils/dist/points2d").Point2D;
        typingFinished: boolean;
        nowVideoName: string | null;
        font: string;
        zIndex: number;
    };
    refs: () => {
        bubbleRef: any;
        textRef: any;
        currentTimeout: number | null;
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
            position: import("shutils/dist/points2d").Point2D;
            typingFinished: boolean;
            nowVideoName: string | null;
            font: string;
            zIndex: number;
        };
    };
};
