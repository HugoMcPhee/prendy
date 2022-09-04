/// <reference types="react" />
import { AnimationNameByModel, AnyAnimationName, AnyCameraName, AnySegmentName, PrendyAssets, PrendyOptions, CameraNameByPlace, CharacterName, CharacterOptions, DollName, DollOptions, MeshNameByModel, ModelInfoByName, ModelName, MusicFiles, MusicName, PickupName, PlaceInfoByName, PlaceName, SegmentNameByPlace, SpotNameByPlace, WallNameByPlace, SoundFiles, SoundName, BoneNameByModel } from "../../declarations";
import { PrendyStoreHelpers, PlaceholderPrendyStores } from "../../stores/typedStoreHelpers";
export declare function makePrendyStoryHelpers<StoreHelpers extends PrendyStoreHelpers, PrendyStores extends PlaceholderPrendyStores, A_AnimationNameByModel extends AnimationNameByModel = AnimationNameByModel, A_PrendyOptions extends PrendyOptions = PrendyOptions, A_CharacterName extends CharacterName = CharacterName, A_CharacterOptions extends CharacterOptions = CharacterOptions, A_DollName extends DollName = DollName, A_DollOptions extends DollOptions = DollOptions, A_MeshNameByModel extends MeshNameByModel = MeshNameByModel, A_ModelInfoByName extends ModelInfoByName = ModelInfoByName, A_ModelName extends ModelName = ModelName, A_PlaceName extends PlaceName = PlaceName, A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace, A_AnyAnimationName extends AnyAnimationName = AnyAnimationName, A_PickupName extends PickupName = PickupName, A_AnyCameraName extends AnyCameraName = AnyCameraName, A_AnySegmentName extends AnySegmentName = AnySegmentName, A_CameraNameByPlace extends CameraNameByPlace = CameraNameByPlace, A_PlaceInfoByName extends PlaceInfoByName = PlaceInfoByName, A_SegmentNameByPlace extends SegmentNameByPlace = SegmentNameByPlace, A_WallNameByPlace extends WallNameByPlace = WallNameByPlace, A_MusicFiles extends MusicFiles = MusicFiles, A_MusicName extends MusicName = MusicName, A_SoundFiles extends SoundFiles = SoundFiles, A_SoundName extends SoundName = SoundName, A_BoneNameByModel extends BoneNameByModel = BoneNameByModel>(storeHelpers: StoreHelpers, prendyStores: PrendyStores, prendyStartOptions: A_PrendyOptions, prendyAssets: PrendyAssets): {
    lookAtEachother: (characterA: A_CharacterName, characterB?: A_CharacterName) => void;
    lookAtOtherCharacter: (charA: A_CharacterName, charB?: A_CharacterName | undefined) => void;
    moveCharacterAt2DAngle: (charName: A_CharacterName, angle: number) => void;
    setCharAnimation: <T_Character extends A_CharacterName>(character: T_Character, animation: A_AnimationNameByModel[A_DollOptions[A_CharacterOptions[T_Character]["doll"]]["model"]]) => void;
    setCharPosition: (charName: A_CharacterName, newPosition: import("@babylonjs/core").Vector3) => void;
    setCharRotationY: (charName: A_CharacterName, newRotationY: number) => void;
    springAddToCharRotationY: (charName: A_CharacterName, addedRotation: number) => void;
    springCharRotation: (charName: A_CharacterName, newRotationY: number) => void;
    focusOnDoll: <T_Doll extends A_DollName>(dollName: T_Doll, zoom?: number | undefined) => void;
    hideDoll: (dollName: A_DollName, shouldHide?: boolean) => void;
    moveDollAt2DAngle: (dollName: A_DollName, angle: number, speed?: number) => void;
    lookAtOtherDoll: (dollA: A_DollName, dollB: A_DollName) => void;
    setDollAnimation: <T_Doll_1 extends A_DollName>(doll: T_Doll_1, animation: A_AnimationNameByModel[A_DollOptions[T_Doll_1]["model"]]) => void;
    setDollPosition: (dollName: A_DollName, newPositon: import("@babylonjs/core").Vector3) => void;
    setDollRotation: (dollName: A_DollName, newRotation: import("@babylonjs/core").Vector3) => void;
    setDollRotationY: (dollName: A_DollName, newRotationY: number) => void;
    setDollToSpot: <T_PlaceName extends A_PlaceName>({ place, spot, doll, dontSetRotationState, }: {
        place: T_PlaceName;
        spot: A_SpotNameByPlace[T_PlaceName];
        doll: A_DollName;
        dontSetRotationState?: boolean | undefined;
    }) => void;
    springAddToDollRotationY: (dollName: A_DollName, addedRotation: number, useShortestAngle?: boolean) => void;
    springDollRotationY: (dollName: A_DollName, newRotation: number) => void;
    pushDollRotationY: (dollName: A_DollName, direction: "right" | "left", speed?: number) => void;
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
    toggleDollMeshes: <T_DollName extends A_DollName>(dollName: T_DollName, toggledMeshes: Partial<Record<A_MeshNameByModel[A_DollOptions[T_DollName]["model"]], boolean>>) => void;
    getDollBonePosition: <T_ModelName extends string>({ doll, model, bone, }: {
        doll: string;
        model: T_ModelName;
        bone: string;
    }) => any;
    enableMovement: (canMove?: boolean, revertDelay?: number | undefined) => Promise<void>;
    isHolding: (pickupName: A_PickupName) => any;
    setPlayerAnimations: (newAnimationNames: {
        walking: A_AnyAnimationName;
        idle: A_AnyAnimationName;
    }) => void;
    takePickup: (pickup: A_PickupName, toHolding?: boolean) => void;
    goToNewPlace: <T_PlaceName_3 extends A_PlaceName>(toOption: {
        toPlace: T_PlaceName_3;
        toSpot: A_SpotNameByPlace[T_PlaceName_3];
        toCam?: A_CameraNameByPlace[T_PlaceName_3] | undefined;
        toSegment?: A_SegmentNameByPlace[T_PlaceName_3] | undefined;
    }, charName?: A_CharacterName) => void;
    hideWallIf: <T_Place extends A_PlaceName, T_Wall extends A_WallNameByPlace[T_Place]>(placeName: T_Place, wallName: T_Wall, isDisabled: boolean) => void;
    lookAtSpot: <T_Place_1 extends A_PlaceName>(place: T_Place_1, spot: A_SpotNameByPlace[T_Place_1], character?: A_CharacterName | undefined) => void;
    showStoryView: (isVisible?: boolean) => Promise<void>;
    setCamera: <T_Place_2 extends A_PlaceName, T_Cam extends keyof A_PlaceInfoByName[T_Place_2]["segmentTimesByCamera"] & A_AnyCameraName>(_placeName: T_Place_2, cameraName: T_Cam, whenToRun?: "now" | "at loop") => Promise<void>;
    setSegment: <T_Place_3 extends A_PlaceName, T_Segment extends A_SegmentNameByPlace[T_Place_3]>(_placeName: T_Place_3, segmentName: T_Segment) => Promise<void>;
    playNewMusic: (newMusicName: A_MusicName) => void;
    stopAllMusic: () => void;
    playSound: (soundName: A_SoundName, options?: {
        loop?: boolean | undefined;
    } | undefined) => void;
    stopSound: (soundName: A_SoundName) => void;
    stopAllSounds: () => void;
    hideMiniBubble: () => void;
    showAlarmText: (text: string, time: number) => Promise<void>;
    showMiniBubble: (text: string, time?: number) => void;
    showSpeech: (text: string, options?: {
        time?: number | undefined;
        showOnce?: boolean | undefined;
        character?: (keyof PrendyStores["speechBubbles"]["startStates"] & A_CharacterName) | undefined;
        zoomAmount?: number | undefined;
        lookAtPlayer?: boolean | undefined;
        returnToZoomBeforeConversation?: boolean | undefined;
        stylesBySpecialText?: Record<string, import("react").CSSProperties> | undefined;
    } | undefined) => Promise<void>;
    hideSticker: () => void;
    moveSticker: (x: number, y: number) => void;
    showSticker: () => void;
};
