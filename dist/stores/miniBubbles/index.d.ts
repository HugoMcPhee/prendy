import { CharacterName, PrendyArt } from "../../declarations";
import { Point2D } from "chootils/dist/points2d";
export default function miniBubbles<A_PrendyArt extends PrendyArt = PrendyArt, A_CharacterName extends CharacterName = CharacterName>(prendyArt: A_PrendyArt): {
    state: <T_ItemName extends string>(_itemName: T_ItemName, options?: {
        character?: string | undefined;
    } | undefined) => {
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
    startStates: { [K_CharacterName in A_CharacterName]: {
        isVisible: boolean;
        isFullyHidden: boolean;
        text: string;
        forCharacter: string | null;
        position: Point2D;
    }; };
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
