/// <reference types="react" />
import { AnimationNameByModel, AnyAnimationName, AnyCameraName, AnySegmentName, BoneNameByModel, CameraNameByPlace, CharacterName, CharacterOptions, DollName, DollOptions, MeshNameByModel, ModelInfoByName, ModelName, MusicFiles, MusicName, PickupName, PlaceInfoByName, PlaceName, PrendyAssets, PrendyOptions, PrendyStoreHelpers, PrendyStores, SegmentNameByPlace, SoundFiles, SoundName, SpotNameByPlace, WallNameByPlace } from "../../declarations";
export declare function makePrendyStoryHelpers<A_AnimationNameByModel extends AnimationNameByModel = AnimationNameByModel, A_AnyAnimationName extends AnyAnimationName = AnyAnimationName, A_AnyCameraName extends AnyCameraName = AnyCameraName, A_AnySegmentName extends AnySegmentName = AnySegmentName, A_BoneNameByModel extends BoneNameByModel = BoneNameByModel, A_CameraNameByPlace extends CameraNameByPlace = CameraNameByPlace, A_CharacterName extends CharacterName = CharacterName, A_CharacterOptions extends CharacterOptions = CharacterOptions, A_DollName extends DollName = DollName, A_DollOptions extends DollOptions = DollOptions, A_MeshNameByModel extends MeshNameByModel = MeshNameByModel, A_ModelInfoByName extends ModelInfoByName = ModelInfoByName, A_ModelName extends ModelName = ModelName, A_MusicFiles extends MusicFiles = MusicFiles, A_MusicName extends MusicName = MusicName, A_PickupName extends PickupName = PickupName, A_PlaceInfoByName extends PlaceInfoByName = PlaceInfoByName, A_PlaceName extends PlaceName = PlaceName, A_PrendyAssets extends PrendyAssets = PrendyAssets, A_PrendyOptions extends PrendyOptions = PrendyOptions, A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers, A_PrendyStores extends PrendyStores = PrendyStores, A_SegmentNameByPlace extends SegmentNameByPlace = SegmentNameByPlace, A_SoundFiles extends SoundFiles = SoundFiles, A_SoundName extends SoundName = SoundName, A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace, A_WallNameByPlace extends WallNameByPlace = WallNameByPlace>(storeHelpers: A_PrendyStoreHelpers, prendyStores: A_PrendyStores, prendyStartOptions: A_PrendyOptions, prendyAssets: A_PrendyAssets): {
    characters: {
        setCharAnimation: <T_Character extends A_CharacterName>(character: T_Character, animation: A_AnimationNameByModel[A_DollOptions[A_CharacterOptions[T_Character]["doll"]]["model"]]) => void;
        setCharPosition: (charName: A_CharacterName, newPosition: import("@babylonjs/core").Vector3) => void;
        setCharRotationY: (charName: A_CharacterName, newRotationY: number) => void;
        springCharRotation: (charName: A_CharacterName, newRotationY: number) => void;
        springAddToCharRotationY: (charName: A_CharacterName, addedRotation: number) => void;
        lookAtOtherCharacter: (charA: A_CharacterName, charB?: A_CharacterName | undefined) => void;
        lookAtEachother: (characterA: A_CharacterName, characterB?: A_CharacterName) => void;
        moveCharacterAt2DAngle: (charName: A_CharacterName, angle: number) => void;
    };
    dolls: {
        setDollPosition: (dollName: A_DollName, newPositon: import("@babylonjs/core").Vector3) => void;
        setDollRotation: (dollName: A_DollName, newRotation: import("@babylonjs/core").Vector3) => void;
        setDollRotationY: (dollName: A_DollName, newRotationY: number) => void;
        springDollRotationY: (dollName: A_DollName, newRotation: number) => void;
        springAddToDollRotationY: (dollName: A_DollName, addedRotation: number, useShortestAngle?: boolean) => void;
        pushDollRotationY: (dollName: A_DollName, direction: "right" | "left", speed?: number) => void;
        lookAtOtherDoll: (dollA: A_DollName, dollB: A_DollName) => void;
        setDollAnimation: <T_Doll extends A_DollName>(doll: T_Doll, animation: A_AnimationNameByModel[A_DollOptions[T_Doll]["model"]]) => void;
        focusOnDoll: <T_Doll_1 extends A_DollName>(dollName: T_Doll_1, zoom?: number | undefined) => void;
        setDollToSpot: <T_PlaceName extends A_PlaceName>({ place, spot, doll, dontSetRotationState, }: {
            place: T_PlaceName;
            spot: A_SpotNameByPlace[T_PlaceName];
            doll: A_DollName;
            dontSetRotationState?: boolean | undefined;
        }) => void;
        springDollToSpot: <T_PlaceName_1 extends A_PlaceName>({ place, spot, doll, }: {
            place: T_PlaceName_1;
            spot: A_SpotNameByPlace[T_PlaceName_1];
            doll: A_DollName;
        }) => void;
        dollLooksAtSpot: <T_PlaceName_2 extends A_PlaceName>({ place, spot, doll, }: {
            place: T_PlaceName_2;
            spot: A_SpotNameByPlace[T_PlaceName_2];
            doll: A_DollName;
        }) => void;
        moveDollAt2DAngle: (dollName: A_DollName, angle: number, speed?: number) => void;
        hideDoll: (dollName: A_DollName, shouldHide?: boolean) => void;
        toggleDollMeshes: <T_DollName extends A_DollName>(dollName: T_DollName, toggledMeshes: Partial<Record<A_MeshNameByModel[A_DollOptions[T_DollName]["model"]], boolean>>) => void;
        getDollBonePosition: <T_ModelName extends A_ModelName>({ doll, model, bone, }: {
            doll: A_DollName;
            model: T_ModelName;
            bone: A_BoneNameByModel[T_ModelName];
        }) => any;
    };
    players: {
        enableMovement: (canMove?: boolean, revertDelay?: number | undefined) => Promise<void>;
        isHolding: (pickupName: A_PickupName) => any;
        takePickup: (pickup: A_PickupName, toHolding?: boolean) => void;
        setPlayerAnimations: (newAnimationNames: {
            walking: A_AnyAnimationName;
            idle: A_AnyAnimationName;
        }) => void;
    };
    scene: {
        lookAtSpot: <T_Place extends A_PlaceName>(place: T_Place, spot: A_SpotNameByPlace[T_Place], character?: A_CharacterName | undefined) => void;
        hideWallIf: <T_Place_1 extends A_PlaceName, T_Wall extends A_WallNameByPlace[T_Place_1]>(placeName: T_Place_1, wallName: T_Wall, isDisabled: boolean) => void;
        showStoryView: (isVisible?: boolean) => Promise<void>;
        setSegment: <T_Place_2 extends A_PlaceName, T_Segment extends A_SegmentNameByPlace[T_Place_2]>(_placeName: T_Place_2, segmentName: T_Segment) => Promise<void>;
        setCamera: <T_Place_3 extends A_PlaceName, T_Cam extends keyof A_PlaceInfoByName[T_Place_3]["segmentTimesByCamera"] & A_AnyCameraName>(_placeName: T_Place_3, cameraName: T_Cam, whenToRun?: "now" | "at loop") => Promise<void>;
        goToNewPlace: <T_PlaceName_3 extends A_PlaceName>(toOption: {
            toPlace: T_PlaceName_3;
            toSpot?: A_SpotNameByPlace[T_PlaceName_3] | undefined;
            toPositon?: import("chootils/dist/points3d").Point3D | undefined;
            toCam?: A_CameraNameByPlace[T_PlaceName_3] | undefined;
            toSegment?: A_SegmentNameByPlace[T_PlaceName_3] | undefined;
        }, charName?: A_CharacterName) => void;
    };
    sound: {
        playNewMusic: (newMusicName: A_MusicName) => void;
        stopAllMusic: () => void;
        playSound: (soundName: A_SoundName, options?: {
            loop?: boolean | undefined;
        } | undefined) => void;
        stopSound: (soundName: A_SoundName) => void;
        stopAllSounds: () => void;
    };
    speech: {
        showSpeech: (text: string, options?: {
            time?: number | undefined;
            showOnce?: boolean | undefined;
            character?: (keyof A_PrendyStores["speechBubbles"]["startStates"] & A_CharacterName) | undefined;
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
