import { MyTypes } from "../declarations";
import { Point2D } from "chootils/dist/points2d";
export default function miniBubbles<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"]): {
    state: <T_ItemName extends string>(_itemName: T_ItemName, options?: {
        character?: T_MyTypes["Main"]["CharacterName"] | undefined;
    } | undefined) => {
        isVisible: boolean;
        isFullyHidden: boolean;
        text: string;
        forCharacter: T_MyTypes["Main"]["CharacterName"] | null;
        position: Point2D;
    };
    refs: () => {
        bubbleRef: any;
        textRef: any;
        videoRef: HTMLVideoElement | null;
    };
    startStates: { [K_CharacterName in T_MyTypes["Main"]["CharacterName"]]: {
        isVisible: boolean;
        isFullyHidden: boolean;
        text: string;
        forCharacter: T_MyTypes["Main"]["CharacterName"] | null;
        position: Point2D;
    }; };
};
