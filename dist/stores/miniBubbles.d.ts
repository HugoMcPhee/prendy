import { CharacterName, PrendyAssets } from "../declarations";
import { Point2D } from "chootils/dist/points2d";
export default function miniBubbles(prendyAssets: PrendyAssets): {
    state: <T_ItemName extends string>(_itemName: T_ItemName, options?: {
        character?: CharacterName;
    }) => {
        isVisible: boolean;
        isFullyHidden: boolean;
        text: string;
        forCharacter: string | null;
        position: Point2D;
    };
    refs: () => {
        bubbleRef: any;
        textRef: any;
        videoRef: HTMLVideoElement | null;
    };
    startStates: {
        [x: string]: {
            isVisible: boolean;
            isFullyHidden: boolean;
            text: string;
            forCharacter: string | null;
            position: Point2D;
        };
    };
};
export declare type Store_MiniBubbles<T_ItemName extends string, CharacterName> = {
    state: () => {
        isVisible: boolean;
        isFullyHidden: boolean;
        text: string;
        forCharacter: CharacterName;
        position: Point2D;
    };
    refs: () => {
        bubbleRef: null | any;
        textRef: null | any;
        videoRef: null | HTMLVideoElement;
    };
    startStates: Record<T_ItemName, {
        isVisible: boolean;
        isFullyHidden: boolean;
        text: string;
        forCharacter: CharacterName;
        position: Point2D;
    }>;
};
