/// <reference types="react" />
import { MyTypes } from "../../declarations";
export declare function makePrendyStoryHelpers<T_MyTypes extends MyTypes = MyTypes>(storeHelpers: T_MyTypes["StoreHelpers"], prendyStores: T_MyTypes["Stores"], prendyOptions: T_MyTypes["Main"]["PrendyOptions"], prendyAssets: T_MyTypes["Assets"]): {
    characters: {
        setCharAnimation: <T_Character extends T_MyTypes["Main"]["CharacterName"]>(character: T_Character, animation: T_MyTypes["Main"]["AnimationNameByModel"][T_MyTypes["Main"]["DollOptions"][T_MyTypes["Main"]["CharacterOptions"][T_Character]["doll"]]["model"]]) => void;
        setCharPosition: (charName: T_MyTypes["Main"]["CharacterName"], newPosition: import("@babylonjs/core").Vector3) => void;
        setCharRotationY: (charName: T_MyTypes["Main"]["CharacterName"], newRotationY: number) => void;
        springCharRotation: (charName: T_MyTypes["Main"]["CharacterName"], newRotationY: number) => void;
        springAddToCharRotationY: (charName: T_MyTypes["Main"]["CharacterName"], addedRotation: number) => void;
        lookAtOtherCharacter: (charA: T_MyTypes["Main"]["CharacterName"], charB?: T_MyTypes["Main"]["CharacterName"] | undefined) => void;
        lookAtEachother: (characterA: T_MyTypes["Main"]["CharacterName"], characterB?: T_MyTypes["Main"]["CharacterName"]) => void;
        moveCharacterAt2DAngle: (charName: T_MyTypes["Main"]["CharacterName"], angle: number) => void;
    };
    dolls: {
        setDollPosition: (dollName: T_MyTypes["Main"]["DollName"], newPositon: import("@babylonjs/core").Vector3) => void;
        setDollRotation: (dollName: T_MyTypes["Main"]["DollName"], newRotation: import("@babylonjs/core").Vector3) => void;
        setDollRotationY: (dollName: T_MyTypes["Main"]["DollName"], newRotationY: number) => void;
        springDollRotationY: (dollName: T_MyTypes["Main"]["DollName"], newRotation: number) => void;
        springAddToDollRotationY: (dollName: T_MyTypes["Main"]["DollName"], addedRotation: number, useShortestAngle?: boolean) => void;
        pushDollRotationY: (dollName: T_MyTypes["Main"]["DollName"], direction: "right" | "left", speed?: number) => void;
        lookAtOtherDoll: (dollA: T_MyTypes["Main"]["DollName"], dollB: T_MyTypes["Main"]["DollName"]) => void;
        setDollAnimation: <T_Doll extends T_MyTypes["Main"]["DollName"]>(doll: T_Doll, animation: T_MyTypes["Main"]["AnimationNameByModel"][T_MyTypes["Main"]["DollOptions"][T_Doll]["model"]]) => void;
        focusOnDoll: <T_Doll_1 extends T_MyTypes["Main"]["DollName"]>(dollName: T_Doll_1, zoom?: number | undefined) => void;
        setDollToSpot: <T_PlaceName extends T_MyTypes["Main"]["PlaceName"]>({ place, spot, doll: dollName, dontSetRotationState, }: {
            place: T_PlaceName;
            spot: T_MyTypes["Main"]["SpotNameByPlace"][T_PlaceName];
            doll: T_MyTypes["Main"]["DollName"];
            dontSetRotationState?: boolean | undefined;
        }) => void;
        springDollToSpot: <T_PlaceName_1 extends T_MyTypes["Main"]["PlaceName"]>({ place, spot, doll: dollName, }: {
            place: T_PlaceName_1;
            spot: T_MyTypes["Main"]["SpotNameByPlace"][T_PlaceName_1];
            doll: T_MyTypes["Main"]["DollName"];
        }) => void;
        dollLooksAtSpot: <T_PlaceName_2 extends T_MyTypes["Main"]["PlaceName"]>({ place, spot, doll, }: {
            place: T_PlaceName_2;
            spot: T_MyTypes["Main"]["SpotNameByPlace"][T_PlaceName_2];
            doll: T_MyTypes["Main"]["DollName"];
        }) => void;
        moveDollAt2DAngle: (dollName: T_MyTypes["Main"]["DollName"], angle: number, speed?: number) => void;
        hideDoll: (dollName: T_MyTypes["Main"]["DollName"], shouldHide?: boolean) => void;
        toggleDollMeshes: <T_DollName extends T_MyTypes["Main"]["DollName"]>(dollName: T_DollName, toggledMeshes: Partial<Record<T_MyTypes["Main"]["MeshNameByModel"][T_MyTypes["Main"]["DollOptions"][T_DollName]["model"]], boolean>>) => void;
        getDollBonePosition: <T_ModelName extends T_MyTypes["Main"]["ModelName"]>({ doll, model, bone, }: {
            doll: T_MyTypes["Main"]["DollName"];
            model: T_ModelName;
            bone: T_MyTypes["Main"]["BoneNameByModel"][T_ModelName];
        }) => any;
    };
    players: {
        enableMovement: (canMove?: boolean, revertDelay?: number | undefined) => Promise<void>;
        isHolding: (pickupName: T_MyTypes["Main"]["PickupName"]) => any;
        takePickup: (pickup: T_MyTypes["Main"]["PickupName"], toHolding?: boolean) => void;
        setPlayerAnimations: (newAnimationNames: {
            walking: T_MyTypes["Main"]["AnyAnimationName"];
            idle: T_MyTypes["Main"]["AnyAnimationName"];
        }) => void;
    };
    scene: {
        lookAtSpot: <T_Place extends T_MyTypes["Main"]["PlaceName"]>(place: T_Place, spot: T_MyTypes["Main"]["SpotNameByPlace"][T_Place], character?: T_MyTypes["Main"]["CharacterName"] | undefined) => void;
        hideWallIf: <T_Place_1 extends T_MyTypes["Main"]["PlaceName"], T_Wall extends T_MyTypes["Main"]["WallNameByPlace"][T_Place_1]>(placeName: T_Place_1, wallName: T_Wall, isDisabled: boolean) => void;
        showStoryView: (isVisible?: boolean) => Promise<void>;
        setSegment: <T_Place_2 extends T_MyTypes["Main"]["PlaceName"], T_Segment extends T_MyTypes["Main"]["SegmentNameByPlace"][T_Place_2]>(_placeName: T_Place_2, segmentName: T_Segment) => Promise<void>;
        setCamera: <T_Place_3 extends T_MyTypes["Main"]["PlaceName"], T_Cam extends keyof T_MyTypes["Main"]["PlaceInfoByName"][T_Place_3]["segmentTimesByCamera"] & T_MyTypes["Main"]["AnyCameraName"]>(_placeName: T_Place_3, cameraName: T_Cam, whenToRun?: "now" | "at loop") => Promise<void>;
        goToNewPlace: <T_PlaceName_3 extends T_MyTypes["Main"]["PlaceName"]>(toOption: {
            toPlace: T_PlaceName_3;
            toSpot?: T_MyTypes["Main"]["SpotNameByPlace"][T_PlaceName_3] | undefined;
            toPositon?: import("chootils/dist/points3d").Point3D | undefined;
            toCam?: T_MyTypes["Main"]["CameraNameByPlace"][T_PlaceName_3] | undefined;
            toSegment?: T_MyTypes["Main"]["SegmentNameByPlace"][T_PlaceName_3] | undefined;
        }, charName?: T_MyTypes["Main"]["CharacterName"]) => void;
    };
    sound: {
        playNewMusic: (newMusicName: T_MyTypes["Main"]["MusicName"]) => void;
        stopAllMusic: () => void;
        playSound: (soundName: T_MyTypes["Main"]["SoundName"], options?: {
            loop?: boolean | undefined;
        } | undefined) => void;
        stopSound: (soundName: T_MyTypes["Main"]["SoundName"]) => void;
        stopAllSounds: () => void;
    };
    speech: {
        showSpeech: (text: string, options?: {
            time?: number | undefined;
            showOnce?: boolean | undefined;
            character?: (keyof T_MyTypes["Stores"]["speechBubbles"]["startStates"] & T_MyTypes["Main"]["CharacterName"]) | undefined;
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
