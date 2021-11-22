import { CharacterName } from "../../declarations";
import { Point2D } from "chootils/dist/points2d";
export default function miniBubbles<A_CharacterName extends CharacterName = CharacterName>(): {
    state: <T_ItemName extends string>(_itemName: T_ItemName) => {
        isVisible: boolean;
        isFullyHidden: boolean;
        text: string;
        forCharacter: A_CharacterName | null;
        position: Point2D;
    };
    refs: () => {
        bubbleRef: any;
        textRef: any;
        videoRef: HTMLVideoElement | null;
    };
    startStates: {
        walkerMiniBubble: {
            isVisible: boolean;
            isFullyHidden: boolean;
            text: string;
            forCharacter: A_CharacterName | null;
            position: Point2D;
        };
    };
};
export declare type Store_MiniBubbles<T_ItemName extends string, A_CharacterName> = {
    state: () => {
        isVisible: boolean;
        isFullyHidden: boolean;
        text: string;
        forCharacter: A_CharacterName;
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
        forCharacter: A_CharacterName;
        position: Point2D;
    }>;
};
