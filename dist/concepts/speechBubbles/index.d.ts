import { CSSProperties } from "react";
import { BackdopArt, CharacterName } from "../../declarations";
export default function speechBubbles<A_BackdopArt extends BackdopArt = BackdopArt, A_CharacterName extends CharacterName = CharacterName>(backdopArt: A_BackdopArt): {
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
        position: import("chootils/dist/points2d").Point2D;
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
    startStates: { [K_CharacterName in A_CharacterName]: {
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
    }; };
};
