/// <reference types="react" />
import { PrendyAssets, PrendyOptions, PrendyStoreHelpers, PrendyStores } from "../../declarations";
export declare function makePrendyStoryHelpers(storeHelpers: PrendyStoreHelpers, prendyStores: PrendyStores, prendyStartOptions: PrendyOptions, prendyAssets: PrendyAssets): {
    characters: {
        setCharAnimation: <T_Character extends string>(character: T_Character, animation: string) => void;
        setCharPosition: (charName: string, newPosition: import("@babylonjs/core").Vector3) => void;
        setCharRotationY: (charName: string, newRotationY: number) => void;
        springCharRotation: (charName: string, newRotationY: number) => void;
        springAddToCharRotationY: (charName: string, addedRotation: number) => void;
        lookAtOtherCharacter: (charA: string, charB?: string | undefined) => void;
        lookAtEachother: (characterA: string, characterB?: string) => void;
        moveCharacterAt2DAngle: (charName: string, angle: number) => void;
    };
    dolls: {
        setDollPosition: (dollName: string, newPositon: import("@babylonjs/core").Vector3) => void;
        setDollRotation: (dollName: string, newRotation: import("@babylonjs/core").Vector3) => void;
        setDollRotationY: (dollName: string, newRotationY: number) => void;
        springDollRotationY: (dollName: string, newRotation: number) => void;
        springAddToDollRotationY: (dollName: string, addedRotation: number, useShortestAngle?: boolean) => void;
        pushDollRotationY: (dollName: string, direction: "right" | "left", speed?: number) => void;
        lookAtOtherDoll: (dollA: string, dollB: string) => void;
        setDollAnimation: <T_Doll extends string>(doll: T_Doll, animation: string) => void;
        focusOnDoll: <T_Doll_1 extends string>(dollName: T_Doll_1, zoom?: number | undefined) => void;
        setDollToSpot: <T_PlaceName extends string>({ place, spot, doll, dontSetRotationState, }: {
            place: T_PlaceName;
            spot: string;
            doll: string;
            dontSetRotationState?: boolean | undefined;
        }) => void;
        springDollToSpot: <T_PlaceName_1 extends string>({ place, spot, doll, }: {
            place: T_PlaceName_1;
            spot: string;
            doll: string;
        }) => void;
        dollLooksAtSpot: <T_PlaceName_2 extends string>({ place, spot, doll, }: {
            place: T_PlaceName_2;
            spot: string;
            doll: string;
        }) => void;
        moveDollAt2DAngle: (dollName: string, angle: number, speed?: number) => void;
        hideDoll: (dollName: string, shouldHide?: boolean) => void;
        toggleDollMeshes: <T_DollName extends string>(dollName: T_DollName, toggledMeshes: Partial<Record<string, boolean>>) => void;
        getDollBonePosition: <T_ModelName extends string>({ doll, model, bone, }: {
            doll: string;
            model: T_ModelName;
            bone: string;
        }) => any;
    };
    players: {
        enableMovement: (canMove?: boolean, revertDelay?: number | undefined) => Promise<void>;
        isHolding: (pickupName: string) => any;
        takePickup: (pickup: string, toHolding?: boolean) => void;
        setPlayerAnimations: (newAnimationNames: {
            walking: string;
            idle: string;
        }) => void;
    };
    scene: {
        lookAtSpot: <T_Place extends string>(place: T_Place, spot: string, character?: string | undefined) => void;
        hideWallIf: <T_Place_1 extends string, T_Wall extends string>(placeName: T_Place_1, wallName: T_Wall, isDisabled: boolean) => void;
        showStoryView: (isVisible?: boolean) => Promise<void>;
        setSegment: <T_Place_2 extends string, T_Segment extends string>(_placeName: T_Place_2, segmentName: T_Segment) => Promise<void>;
        setCamera: <T_Place_3 extends string, T_Cam extends string>(_placeName: T_Place_3, cameraName: T_Cam, whenToRun?: "now" | "at loop") => Promise<void>;
        goToNewPlace: <T_PlaceName_3 extends string>(toOption: {
            toPlace: T_PlaceName_3;
            toSpot?: string | undefined;
            toPositon?: import("chootils/dist/points3d").Point3D | undefined;
            toCam?: string | undefined;
            toSegment?: string | undefined;
        }, charName?: string) => void;
    };
    sound: {
        playNewMusic: (newMusicName: string) => void;
        stopAllMusic: () => void;
        playSound: (soundName: string, options?: {
            loop?: boolean | undefined;
        } | undefined) => void;
        stopSound: (soundName: string) => void;
        stopAllSounds: () => void;
    };
    speech: {
        showSpeech: (text: string, options?: {
            time?: number | undefined;
            showOnce?: boolean | undefined;
            character?: undefined;
            zoomAmount?: number | undefined;
            lookAtPlayer?: boolean | undefined;
            returnToZoomBeforeConversation?: boolean | undefined;
            stylesBySpecialText?: Record<string, import("react").CSSProperties> | undefined;
        } | undefined) => Promise<void>;
        showMiniBubble: (text: string, time?: number) => void;
        hideMiniBubble: () => void;
        showAlarmText: (text: string, time: number) => Promise<void>;
    };
    stickers: {
        moveSticker: (x: number, y: number) => void;
        showSticker: () => void;
        hideSticker: () => void;
    };
};
