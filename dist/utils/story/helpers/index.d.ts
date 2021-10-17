/// <reference types="react" />
import { BackdopConcepFuncs, BackdopOptionsUntyped, ModelInfoByNamePlaceholder, PlaceholderBackdopConcepts, PlaceInfoByNamePlaceholder } from "../../../concepts/typedConcepFuncs";
export declare function makeBackdopStoryHelpers<ConcepFuncs extends BackdopConcepFuncs, BackdopConcepts extends PlaceholderBackdopConcepts, BackdopOptions extends BackdopOptionsUntyped, ModelName extends string, PlaceName extends string, DollName extends string, CharacterName extends string, AnyCameraName extends string, AnySegmentName extends string, AnyAnimationName extends string, PickupName extends string, MusicName extends string, MusicFiles extends Record<MusicName, string>, AnimationNameByModel extends Record<ModelName, string>, MeshNameByModel extends Record<ModelName, string>, SpotNameByPlace extends Record<PlaceName, string>, ModelInfoByName extends ModelInfoByNamePlaceholder<ModelName>, PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>, WallNameByPlace extends Record<PlaceName, string>, SegmentNameByPlace extends Record<PlaceName, string>, CameraNameByPlace extends Record<PlaceName, string>>(concepFuncs: ConcepFuncs, backdopConcepts: BackdopConcepts, backdopStartOptions: BackdopOptions, modelInfoByName: ModelInfoByName, characterNames: readonly CharacterName[], placeInfoByName: PlaceInfoByName, musicNames: readonly MusicName[], musicFiles: MusicFiles): {
    lookAtEachother: (characterA: CharacterName, characterB?: CharacterName) => void;
    lookAtOtherCharacter: (charA: CharacterName, charB?: CharacterName) => void;
    moveCharacterAt2DAngle: (charName: CharacterName, angle: number) => void;
    setCharAnimation: <T_Character extends CharacterName>(character: T_Character, animation: AnimationNameByModel[any]) => void;
    setCharPosition: (charName: CharacterName, newPosition: import("@babylonjs/core").Vector3) => void;
    setCharRotationY: (charName: CharacterName, newRotationY: number) => void;
    springAddToCharRotationY: (charName: CharacterName, addedRotation: number) => void;
    springCharRotation: (charName: CharacterName, newRotationY: number) => void;
    focusOnDoll: <T_Doll extends DollName>(dollName: T_Doll, zoom?: number) => void;
    hideDoll: (dollName: DollName, shouldHide?: boolean) => void;
    moveDollAt2DAngle: (dollName: DollName, angle: number) => void;
    setDollAnimation: <T_Doll_1 extends DollName>(doll: T_Doll_1, animation: AnimationNameByModel[any]) => void;
    setDollPosition: (dollName: DollName, newPositon: import("@babylonjs/core").Vector3) => void;
    setDollRotation: (dollName: DollName, newRotation: import("@babylonjs/core").Vector3) => void;
    setDollRotationY: (dollName: DollName, newRotationY: number) => void;
    setDollToSpot: <T_PlaceName extends PlaceName>({ place, spot, doll: dollName, dontSetRotationState, }: {
        place: T_PlaceName;
        spot: SpotNameByPlace[T_PlaceName];
        doll: DollName;
        dontSetRotationState?: boolean;
    }) => void;
    springAddToDollRotationY: (dollName: DollName, addedRotation: number) => void;
    springDollRotationY: (dollName: DollName, newRotation: number) => void;
    springDollToSpot: <T_PlaceName_1 extends PlaceName>({ place, spot, doll: dollName, }: {
        place: T_PlaceName_1;
        spot: SpotNameByPlace[T_PlaceName_1];
        doll: DollName;
    }) => void;
    toggleDollMeshes: <T_DollName extends DollName>(dollName: T_DollName, toggledMeshes: Partial<Record<MeshNameByModel[any], boolean>>) => void;
    enableMovement: (canMove?: boolean, revertDelay?: number) => Promise<void>;
    isHolding: (pickupName: PickupName) => any;
    setPlayerAnimations: (newAnimationNames: {
        walking: AnyAnimationName;
        idle: AnyAnimationName;
    }) => void;
    setPlayerToStartSpot: () => void;
    takePickup: (pickup: PickupName, toHolding?: boolean) => void;
    changeCameraAtLoop: <T_Place extends PlaceName, T_Cam extends keyof PlaceInfoByName[T_Place]["segmentTimesByCamera"] & AnyCameraName>(_place: T_Place, newCamName: T_Cam) => Promise<void>;
    changeSegmentAtLoop: <T_Place_1 extends PlaceName, T_Segment extends SegmentNameByPlace[T_Place_1] & AnySegmentName>(_place: T_Place_1, newSegmentName: T_Segment) => Promise<void>;
    goToNewPlace: <T_PlaceName_2 extends PlaceName>(toOption: {
        toPlace: T_PlaceName_2;
        toSpot: SpotNameByPlace[T_PlaceName_2];
        toCam?: CameraNameByPlace[T_PlaceName_2];
        toSegment?: SegmentNameByPlace[T_PlaceName_2];
    }, charName?: CharacterName) => void;
    hideWallIf: <T_Place_2 extends PlaceName, T_Wall extends WallNameByPlace[T_Place_2]>(placeName: T_Place_2, wallName: T_Wall, isDisabled: boolean) => void;
    lookAtSpot: <T_Place_3 extends PlaceName>(place: T_Place_3, spot: SpotNameByPlace[T_Place_3], character?: CharacterName) => void;
    setCamera: <T_Place_4 extends PlaceName, T_Cam_1 extends keyof PlaceInfoByName[T_Place_4]["segmentTimesByCamera"] & AnyCameraName>(_place: T_Place_4, newCam: T_Cam_1) => void;
    setNextSegment: <T_Place_5 extends PlaceName, T_Segment_1 extends SegmentNameByPlace[T_Place_5]>(_placeName: T_Place_5, segmentName: T_Segment_1) => void;
    showStoryView: (isVisible?: boolean) => Promise<void>;
    playNewMusic: (newMusicName: MusicName) => void;
    stopAllMusic: () => void;
    hideMiniBubble: () => void;
    showAlarmText: (text: string, time: number) => Promise<void>;
    showMiniBubble: (text: string, time?: number) => void;
    showSpeech: (text: string, options?: {
        time?: number;
        showOnce?: boolean;
        character?: any;
        zoomAmount?: number;
        lookAtPlayer?: boolean;
        returnToZoomBeforeConversation?: boolean;
        stylesBySpecialText?: Record<string, import("react").CSSProperties>;
    }) => Promise<void>;
    hideSticker: () => void;
    moveSticker: (x: number, y: number) => void;
    showSticker: () => void;
};
