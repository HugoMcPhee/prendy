import { Point3D } from "chootils/dist/points3d";
import { MyTypes } from "../../declarations";
import { InRangeForDoll } from "../../helpers/prendyUtils/dolls";
export type PrendySaveState = {
    global: {
        nowCamName: string;
        nowPlaceName: string;
        nowSegmentName: string;
        heldPickups: string[];
        storyOverlayToggled: boolean;
        alarmTextIsVisible: boolean;
        alarmText: string;
        aSpeechBubbleIsShowing: boolean;
        aConvoIsHappening: boolean;
    };
    dolls: Record<string, {
        position: Point3D;
        rotationY: number;
        isVisible: boolean;
        toggledMeshes: Record<string, boolean>;
        inRange: Record<string, InRangeForDoll>;
        nowAnimation: string;
    }>;
    places: Record<string, {
        toggledWalls: Record<string, boolean>;
    }>;
    characters: Record<string, {
        hasLeftFirstTrigger: boolean;
    }>;
    player: {
        animationNames: {
            walking: string;
            idle: string;
        };
    };
    miniBubbles: Record<string, {
        isVisible: boolean;
        text: string;
    }>;
    speechBubbles: Record<string, {
        isVisible: boolean;
        goalText: string;
        nowVideoName: string;
        font: string;
        stylesBySpecialText: {
            [key: string]: {
                color: string;
                fontSize: string;
                fontWeight: string;
                fontStyle: string;
                textDecoration: string;
            };
        };
        forCharacter: string;
        typingFinished: boolean;
    }>;
    storyState: Record<any, any>;
};
export declare const timeStatePath: readonly ["global", "main", "elapsedGameTime"];
export default function global<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"]): {
    startStates: {
        main: any;
    };
    state: () => any;
    refs: () => any;
};
