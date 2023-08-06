import { CharacterName, PrendyAssets } from "../declarations";
import { Point2D } from "chootils/dist/points2d";
export default function miniBubbles<A_CharacterName extends CharacterName = CharacterName, A_PrendyAssets extends PrendyAssets = PrendyAssets>(prendyAssets: A_PrendyAssets): {
    state: <T_ItemName extends string>(_itemName: T_ItemName, options?: {
        character?: A_CharacterName;
    }) => {
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
    startStates: { [K_CharacterName in A_CharacterName]: {
        isVisible: boolean;
        isFullyHidden: boolean;
        text: string;
        forCharacter: A_CharacterName | null;
        position: Point2D;
    }; };
};
