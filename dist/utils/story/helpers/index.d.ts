/// <reference types="react" />
import { BackdopArt, BackdopOptions } from "../../../declarations";
import { BackdopConcepFuncs, PlaceholderBackdopConcepts } from "../../../concepts/typedConcepFuncs";
export declare function makeBackdopStoryHelpers<ConcepFuncs extends BackdopConcepFuncs, BackdopConcepts extends PlaceholderBackdopConcepts>(concepFuncs: ConcepFuncs, backdopConcepts: BackdopConcepts, backdopStartOptions: BackdopOptions, backdopArt: BackdopArt): {
    lookAtEachother: (characterA: string, characterB?: string) => void;
    lookAtOtherCharacter: (charA: string, charB?: string | undefined) => void;
    moveCharacterAt2DAngle: (charName: string, angle: number) => void;
    setCharAnimation: <T_Character extends string>(character: T_Character, animation: string) => void;
    setCharPosition: (charName: string, newPosition: import("@babylonjs/core").Vector3) => void;
    setCharRotationY: (charName: string, newRotationY: number) => void;
    springAddToCharRotationY: (charName: string, addedRotation: number) => void;
    springCharRotation: (charName: string, newRotationY: number) => void;
    focusOnDoll: <T_Doll extends string>(dollName: T_Doll, zoom?: number | undefined) => void;
    hideDoll: (dollName: string, shouldHide?: boolean) => void;
    moveDollAt2DAngle: (dollName: string, angle: number) => void;
    setDollAnimation: <T_Doll_1 extends string>(doll: T_Doll_1, animation: string) => void;
    setDollPosition: (dollName: string, newPositon: import("@babylonjs/core").Vector3) => void;
    setDollRotation: (dollName: string, newRotation: import("@babylonjs/core").Vector3) => void;
    setDollRotationY: (dollName: string, newRotationY: number) => void;
    setDollToSpot: <T_PlaceName extends string>({ place, spot, doll: dollName, dontSetRotationState, }: {
        place: T_PlaceName;
        spot: string;
        doll: string;
        dontSetRotationState?: boolean | undefined;
    }) => void;
    springAddToDollRotationY: (dollName: string, addedRotation: number) => void;
    springDollRotationY: (dollName: string, newRotation: number) => void;
    springDollToSpot: <T_PlaceName_1 extends string>({ place, spot, doll: dollName, }: {
        place: T_PlaceName_1;
        spot: string;
        doll: string;
    }) => void;
    toggleDollMeshes: <T_DollName extends string>(dollName: T_DollName, toggledMeshes: Partial<Record<string, boolean>>) => void;
    enableMovement: (canMove?: boolean, revertDelay?: number | undefined) => Promise<void>;
    isHolding: (pickupName: string) => any;
    setPlayerAnimations: (newAnimationNames: {
        walking: string;
        idle: string;
    }) => void;
    setPlayerToStartSpot: () => void;
    takePickup: (pickup: string, toHolding?: boolean) => void;
    goToNewPlace: <T_PlaceName_2 extends string>(toOption: {
        toPlace: T_PlaceName_2;
        toSpot: string;
        toCam?: string | undefined;
        toSegment?: string | undefined;
    }, charName?: string) => void;
    hideWallIf: <T_Place extends string, T_Wall extends string>(placeName: T_Place, wallName: T_Wall, isDisabled: boolean) => void;
    lookAtSpot: <T_Place_1 extends string>(place: T_Place_1, spot: string, character?: string | undefined) => void;
    showStoryView: (isVisible?: boolean) => Promise<void>;
    setCamera: <T_Place_2 extends string, T_Cam extends string>(_placeName: T_Place_2, cameraName: T_Cam, whenToRun?: "now" | "at loop") => Promise<void>;
    setSegment: <T_Place_3 extends string, T_Segment extends string>(_placeName: T_Place_3, segmentName: T_Segment, whenToRun?: "now" | "at loop") => Promise<void>;
    playNewMusic: (newMusicName: string) => void;
    stopAllMusic: () => void;
    hideMiniBubble: () => void;
    showAlarmText: (text: string, time: number) => Promise<void>;
    showMiniBubble: (text: string, time?: number) => void;
    showSpeech: (text: string, options?: {
        time?: number | undefined;
        showOnce?: boolean | undefined;
        character?: (keyof BackdopConcepts["speechBubbles"]["startStates"] & string) | undefined;
        zoomAmount?: number | undefined;
        lookAtPlayer?: boolean | undefined;
        returnToZoomBeforeConversation?: boolean | undefined;
        stylesBySpecialText?: Record<string, import("react").CSSProperties> | undefined;
    } | undefined) => Promise<void>;
    hideSticker: () => void;
    moveSticker: (x: number, y: number) => void;
    showSticker: () => void;
};
