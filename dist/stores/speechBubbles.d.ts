/// <reference types="node" />
import { CSSProperties } from "react";
import { MyTypes } from "../declarations";
export default function speechBubbles<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"]): {
    state: <T_ItemName extends string>(_itemName: T_ItemName, options?: {
        font?: T_MyTypes["Main"]["FontName"] | undefined;
        character?: T_MyTypes["Main"]["CharacterName"] | undefined;
    } | undefined) => {
        isVisible: boolean;
        isFullyHidden: boolean;
        goalText: string;
        visibleLetterAmount: number;
        typingSpeed: number;
        stylesBySpecialText: Record<string, CSSProperties>;
        _specialTextByLetterIndex: Record<number, string>;
        _goalTextWordLetterArrays: string[][];
        forCharacter: T_MyTypes["Main"]["CharacterName"] | null;
        position: import("chootils/dist/points2d").Point2D;
        typingFinished: boolean;
        nowVideoName: T_MyTypes["Main"]["SpeechVidName"] | null;
        font: T_MyTypes["Main"]["FontName"];
        zIndex: number;
    };
    refs: () => {
        bubbleRef: any;
        textRef: any;
        currentTimeout: NodeJS.Timeout | null;
        videoRef: HTMLVideoElement | null;
    };
    startStates: { [K_CharacterName in T_MyTypes["Main"]["CharacterName"]]: {
        isVisible: boolean;
        isFullyHidden: boolean;
        goalText: string;
        visibleLetterAmount: number;
        typingSpeed: number;
        stylesBySpecialText: Record<string, CSSProperties>;
        _specialTextByLetterIndex: Record<number, string>;
        _goalTextWordLetterArrays: string[][];
        forCharacter: T_MyTypes["Main"]["CharacterName"] | null;
        position: import("chootils/dist/points2d").Point2D;
        typingFinished: boolean;
        nowVideoName: T_MyTypes["Main"]["SpeechVidName"] | null;
        font: T_MyTypes["Main"]["FontName"];
        zIndex: number;
    }; };
};
