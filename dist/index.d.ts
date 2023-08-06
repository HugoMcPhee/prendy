/// <reference types="react" />
import "@babylonjs/loaders";
import { AnimationNameByModel, AnyAnimationName, AnyCameraName, AnySegmentName, AnyTriggerName, BoneNameByModel, CameraNameByPlace, CharacterName, CharacterOptions, DollName, DollOptions, MeshNameByModel, ModelInfoByName, ModelName, MusicFiles, MusicName, PickupName, PlaceInfoByName, PlaceName, PrendyAssets, PrendyOptions, PrendyStoreHelpers, PrendyStores, SegmentNameByPlace, SoundFiles, SoundName, SpotNameByPlace, StoryPartName, TriggerNameByPlace, WallNameByPlace } from "./declarations";
import { Vector3 } from "@babylonjs/core";
export { get_DebugFrameRate as makeDebugFrameRate } from "./components/DebugFrameRate";
export { makePrendyApp } from "./components/PrendyApp";
export * from "./declarations";
export { makePrendyOptions } from "./getPrendyOptions";
export { get_usePlaceUtils as makeUsePlaceUtils } from "./helpers/babylonjs/usePlace/utils";
export { point3dToVector3, vector3ToPoint3d, vector3ToSafePoint3d } from "./helpers/babylonjs/vectors";
export { makePrendyStoryHelpers } from "./helpers/prendyHelpers/helpers";
export { makeAllStoryRuleMakers } from "./helpers/prendyRuleMakers/prendyRuleMakers";
export { makePrendyStoryUtils } from "./helpers/prendyUtils/prendyUtils";
export { makeStartPrendyRules, makeStartPrendyMainRules, makeStartAndStopRules } from "./rules/rules";
export { makePrendyStores, prendyStepNames } from "./stores/stores";
export declare const definiedPrendyRules: {
    dolls: {
        stopAll: (...args: any) => any;
        startAll: (...args: any) => any;
        start: (...args: any) => any;
        stop: (...args: any) => any;
        ruleNames: any[];
    } | null;
};
export declare function makeOtherUsefulPrendyUtils<A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers>(storeHelpers: A_PrendyStoreHelpers): {
    setStoryState: (newState: Partial<ReturnType<A_PrendyStoreHelpers["getState"]>["story"]["main"]>) => void;
    getGlobalState: () => ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"];
    setGlobalState: <GlobalItemState extends ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"] & Record<any, any>, PartialGlobalState extends Partial<GlobalItemState>>(newState: PartialGlobalState | ((state: GlobalItemState) => PartialGlobalState), callback?: (() => void) | undefined) => void;
    getScene: () => import("@babylonjs/core").Scene | null;
    getEngine: () => import("@babylonjs/core").Engine | null;
};
export declare function makePrendyHelpers<A_AnimationNameByModel extends AnimationNameByModel = AnimationNameByModel, A_AnyAnimationName extends AnyAnimationName = AnyAnimationName, A_AnyCameraName extends AnyCameraName = AnyCameraName, A_AnySegmentName extends AnySegmentName = AnySegmentName, A_AnyTriggerName extends AnyTriggerName = AnyTriggerName, A_BoneNameByModel extends BoneNameByModel = BoneNameByModel, A_CameraNameByPlace extends CameraNameByPlace = CameraNameByPlace, A_CharacterName extends CharacterName = CharacterName, A_CharacterOptions extends CharacterOptions = CharacterOptions, A_DollName extends DollName = DollName, A_DollOptions extends DollOptions = DollOptions, A_MeshNameByModel extends MeshNameByModel = MeshNameByModel, A_ModelInfoByName extends ModelInfoByName = ModelInfoByName, A_ModelName extends ModelName = ModelName, A_MusicFiles extends MusicFiles = MusicFiles, A_MusicName extends MusicName = MusicName, A_PickupName extends PickupName = PickupName, A_PlaceInfoByName extends PlaceInfoByName = PlaceInfoByName, A_PlaceName extends PlaceName = PlaceName, A_PrendyAssets extends PrendyAssets = PrendyAssets, A_PrendyOptions extends PrendyOptions = PrendyOptions, A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers, A_PrendyStores extends PrendyStores = PrendyStores, A_SegmentNameByPlace extends SegmentNameByPlace = SegmentNameByPlace, A_SoundFiles extends SoundFiles = SoundFiles, A_SoundName extends SoundName = SoundName, A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace, A_StoryPartName extends StoryPartName = StoryPartName, A_TriggerNameByPlace extends TriggerNameByPlace = TriggerNameByPlace, A_WallNameByPlace extends WallNameByPlace = WallNameByPlace>(storeHelpers: A_PrendyStoreHelpers, prendyStores: A_PrendyStores, prendyStartOptions: A_PrendyOptions, prendyAssets: A_PrendyAssets): {
    story: {
        characters: {
            setCharAnimation: <T_Character extends A_CharacterName>(character: T_Character, animation: A_AnimationNameByModel[A_DollOptions[A_CharacterOptions[T_Character]["doll"]]["model"]]) => void;
            setCharPosition: (charName: A_CharacterName, newPosition: Vector3) => void;
            setCharRotationY: (charName: A_CharacterName, newRotationY: number) => void;
            springCharRotation: (charName: A_CharacterName, newRotationY: number) => void;
            springAddToCharRotationY: (charName: A_CharacterName, addedRotation: number) => void;
            lookAtOtherCharacter: (charA: A_CharacterName, charB?: A_CharacterName | undefined) => void;
            lookAtEachother: (characterA: A_CharacterName, characterB?: A_CharacterName) => void;
            moveCharacterAt2DAngle: (charName: A_CharacterName, angle: number) => void;
        };
        dolls: {
            setDollPosition: (dollName: A_DollName, newPositon: Vector3) => void;
            setDollRotation: (dollName: A_DollName, newRotation: Vector3) => void;
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
    rules: {
        makeCamChangeRules: any;
        makeCamLeaveRules: any;
        makeCamSegmentRules: (callBacksObject: Partial<{ [P_PlaceName in A_PlaceName]: Partial<{ [P_CamName in keyof A_PlaceInfoByName[P_PlaceName]["segmentTimesByCamera"]]: (usefulStuff: {
            storyState: ReturnType<A_PrendyStoreHelpers["getState"]>["story"]["main"];
            storyRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["story"]["main"];
            globalState: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"];
            nowSegmentName: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"]["nowSegmentName"];
            nowPlaceName: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"]["nowPlaceName"];
            nowCamName: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"]["nowCamName"];
            placesRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"];
            placeRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]];
            camsRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]]["camsRefs"];
            camRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]]["camsRefs"]];
        }) => keyof A_PlaceInfoByName[P_PlaceName]["segmentTimesByCamera"][P_CamName]; }>; }>) => {
            startAll(): void;
            stopAll(): void;
        };
        makeOnInteractAtTrigger: (callBacksObject: Partial<{ [P_PlaceName_1 in A_PlaceName]: Partial<{ [P_TriggerName in A_TriggerNameByPlace[P_PlaceName_1]]: (usefulStuff: {
            storyState: ReturnType<A_PrendyStoreHelpers["getState"]>["story"]["main"];
            storyRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["story"]["main"];
            globalState: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"];
            nowSegmentName: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"]["nowSegmentName"];
            nowPlaceName: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"]["nowPlaceName"];
            nowCamName: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"]["nowCamName"];
            placesRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"];
            placeRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]];
            camsRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]]["camsRefs"];
            camRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]]["camsRefs"]];
        }) => void; }>; }>, characterName?: A_CharacterName) => () => void;
        makeOnInteractToTalk: (callBacksObject: Partial<{ [P_DollName in A_DollName]: (usefulStuff: {
            storyState: ReturnType<A_PrendyStoreHelpers["getState"]>["story"]["main"];
            storyRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["story"]["main"];
            globalState: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"];
            nowSegmentName: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"]["nowSegmentName"];
            nowPlaceName: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"]["nowPlaceName"];
            nowCamName: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"]["nowCamName"];
            placesRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"];
            placeRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]];
            camsRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]]["camsRefs"];
            camRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]]["camsRefs"]];
        }) => void; }>, distanceType?: "touch" | "talk", characterName?: A_CharacterName) => () => void;
        makeInteractButtonRules: ({ onInteractAtTrigger, onInteractAtTalk, }: {
            onInteractAtTrigger: () => void;
            onInteractAtTalk: () => void;
        }) => {
            stopAll: (...args: any) => any;
            startAll: (...args: any) => any;
            start: (...args: any) => any;
            stop: (...args: any) => any;
            ruleNames: any[];
        };
        makeOnUsePickupAtTrigger: (callBacksObject: Partial<{ [P_PlaceName_2 in A_PlaceName]: Partial<{ [P_TriggerName_1 in A_TriggerNameByPlace[P_PlaceName_2]]: Partial<{ [P_PickupName in A_PickupName]: (usefulStuff: {
            storyState: ReturnType<A_PrendyStoreHelpers["getState"]>["story"]["main"];
            storyRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["story"]["main"];
            globalState: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"];
            nowSegmentName: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"]["nowSegmentName"];
            nowPlaceName: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"]["nowPlaceName"];
            nowCamName: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"]["nowCamName"];
            placesRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"];
            placeRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]];
            camsRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]]["camsRefs"];
            camRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]]["camsRefs"]];
        }) => void; }>; }>; }>, characterName?: A_CharacterName) => <T_PickupName extends A_PickupName>(pickupName: T_PickupName) => false | undefined;
        makeOnUsePickupGenerally: (callBacksObject: Partial<{ [P_PickupName_1 in A_PickupName]: (usefulStuff: {
            storyState: ReturnType<A_PrendyStoreHelpers["getState"]>["story"]["main"];
            storyRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["story"]["main"];
            globalState: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"];
            nowSegmentName: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"]["nowSegmentName"];
            nowPlaceName: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"]["nowPlaceName"];
            nowCamName: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"]["nowCamName"];
            placesRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"];
            placeRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]];
            camsRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]]["camsRefs"];
            camRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]]["camsRefs"]];
        }) => void; }>) => <T_PickupName_1 extends A_PickupName>(pickupName: T_PickupName_1) => void;
        makeOnUsePickupToTalk: (callBacksObject: Partial<{ [P_DollName_1 in A_DollName]: Partial<{ [P_PickupName_2 in A_PickupName]: (usefulStuff: {
            storyState: ReturnType<A_PrendyStoreHelpers["getState"]>["story"]["main"];
            storyRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["story"]["main"];
            globalState: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"];
            nowSegmentName: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"]["nowSegmentName"];
            nowPlaceName: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"]["nowPlaceName"];
            nowCamName: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"]["nowCamName"];
            placesRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"];
            placeRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]];
            camsRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]]["camsRefs"];
            camRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]]["camsRefs"]];
        }) => void; }>; }>, characterName?: A_CharacterName) => <T_PickupName_2 extends A_PickupName>(pickupName: T_PickupName_2) => false | undefined;
        makePickupsRules: ({ onUsePickupAtTrigger, onUsePickupToTalk, onUsePickupGenerally, }: {
            onUsePickupAtTrigger: <T_PickupName extends A_PickupName>(pickupName: T_PickupName) => false | undefined;
            onUsePickupToTalk: <T_PickupName_2 extends A_PickupName>(pickupName: T_PickupName_2) => false | undefined;
            onUsePickupGenerally: <T_PickupName_1 extends A_PickupName>(pickupName: T_PickupName_1) => void;
        }) => {
            startAll(): void;
            stopAll(): void;
        };
        makePlaceLoadRules: (atStartOfEachPlace: (usefulStuff: {
            storyState: ReturnType<A_PrendyStoreHelpers["getState"]>["story"]["main"];
            storyRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["story"]["main"];
            globalState: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"];
            nowSegmentName: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"]["nowSegmentName"];
            nowPlaceName: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"]["nowPlaceName"];
            nowCamName: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"]["nowCamName"];
            placesRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"];
            placeRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]];
            camsRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]]["camsRefs"];
            camRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]]["camsRefs"]];
        }) => void, callBacksObject: Partial<{ [P_PlaceName_3 in A_PlaceName]: (usefulStuff: {
            storyState: ReturnType<A_PrendyStoreHelpers["getState"]>["story"]["main"];
            storyRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["story"]["main"];
            globalState: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"];
            nowSegmentName: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"]["nowSegmentName"];
            nowPlaceName: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"]["nowPlaceName"];
            nowCamName: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"]["nowCamName"];
            placesRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"];
            placeRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]];
            camsRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]]["camsRefs"];
            camRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]]["camsRefs"]];
        }) => void; }>) => {
            stopAll: (...args: any) => any;
            startAll: (...args: any) => any;
            start: (...args: any) => any;
            stop: (...args: any) => any;
            ruleNames: any[];
        };
        makePlaceUnloadRules: (callBacksObject: Partial<{ [P_PlaceName_3 in A_PlaceName]: (usefulStuff: {
            storyState: ReturnType<A_PrendyStoreHelpers["getState"]>["story"]["main"];
            storyRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["story"]["main"];
            globalState: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"];
            nowSegmentName: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"]["nowSegmentName"];
            nowPlaceName: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"]["nowPlaceName"];
            nowCamName: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"]["nowCamName"];
            placesRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"];
            placeRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]];
            camsRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]]["camsRefs"];
            camRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]]["camsRefs"]];
        }) => void; }>) => {
            stopAll: (...args: any) => any;
            startAll: (...args: any) => any;
            start: (...args: any) => any;
            stop: (...args: any) => any;
            ruleNames: any[];
        };
        makeTouchRules: (callBacksObject: Partial<{ [P_DollName_2 in A_DollName]: (usefulStuff: {
            storyState: ReturnType<A_PrendyStoreHelpers["getState"]>["story"]["main"];
            storyRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["story"]["main"];
            globalState: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"];
            nowSegmentName: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"]["nowSegmentName"];
            nowPlaceName: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"]["nowPlaceName"];
            nowCamName: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"]["nowCamName"];
            placesRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"];
            placeRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]];
            camsRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]]["camsRefs"];
            camRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]]["camsRefs"]];
        }) => void; }>, options?: {
            characterName?: A_CharacterName | undefined;
            distanceType?: "touch" | "talk" | "see" | undefined;
            whenLeave?: boolean | undefined;
        } | undefined) => {
            stopAll: (...args: any) => any;
            startAll: (...args: any) => any;
            start: (...args: any) => any;
            stop: (...args: any) => any;
            ruleNames: any[];
        };
        makeTriggerRules: (callBacksObject: Partial<{ [P_CharacterName in A_CharacterName]: Partial<{ [P_PlaceName_4 in A_PlaceName]: Partial<{ [P_TriggerName_2 in A_TriggerNameByPlace[P_PlaceName_4]]: (usefulStuff: {
            storyState: ReturnType<A_PrendyStoreHelpers["getState"]>["story"]["main"];
            storyRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["story"]["main"];
            globalState: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"];
            nowSegmentName: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"]["nowSegmentName"];
            nowPlaceName: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"]["nowPlaceName"];
            nowCamName: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"]["nowCamName"];
            placesRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"];
            placeRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]];
            camsRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]]["camsRefs"];
            camRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]]["camsRefs"]];
        }) => void; }>; }>; }>, options?: {
            whenLeave?: boolean | undefined;
        } | undefined) => {
            stopAll: (...args: any) => any;
            startAll: (...args: any) => any;
            start: (...args: any) => any;
            stop: (...args: any) => any;
            ruleNames: any[];
        };
    };
    utils: {
        savePrendyState: () => void;
        loadPrendyState: () => Promise<void>;
        setStoryState: (newState: Partial<ReturnType<A_PrendyStoreHelpers["getState"]>["story"]["main"]>) => void;
        getGlobalState: () => ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"];
        setGlobalState: <GlobalItemState extends ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"] & Record<any, any>, PartialGlobalState extends Partial<GlobalItemState>>(newState: PartialGlobalState | ((state: GlobalItemState) => PartialGlobalState), callback?: (() => void) | undefined) => void;
        getScene: () => import("@babylonjs/core").Scene | null;
        getEngine: () => import("@babylonjs/core").Engine | null;
        get2DAngleBetweenCharacters: (charA: A_CharacterName, charB: A_CharacterName) => number;
        get2DAngleFromCharacterToSpot: <T_Place_4 extends A_PlaceName>(character: A_CharacterName, place: T_Place_4, spot: A_SpotNameByPlace[T_Place_4]) => number;
        getModelNameFromDoll: <T_DollName_1 extends A_DollName>(dollName: T_DollName_1) => NonNullable<NonNullable<A_PrendyStores["dolls"]["startStates"]>[T_DollName_1]>["modelName"];
        get2DAngleBetweenDolls: (dollA: A_DollName, dollB: A_DollName) => number;
        get2DAngleFromDollToSpot: <T_Place_5 extends A_PlaceName>(dollA: A_DollName, place: T_Place_5, spot: A_SpotNameByPlace[T_Place_5]) => number;
        doWhenNowCamChanges: (checkingCamName: A_AnyCameraName, callback: () => void) => string | null;
        doWhenNowSegmentChanges: (checkingSegmentName: A_AnySegmentName, callback: () => void) => string | null;
        getSegmentFromStoryRules: <T_Place_6 extends A_PlaceName, T_Cam_1 extends A_CameraNameByPlace[T_Place_6]>(place: T_Place_6, cam: T_Cam_1) => any;
        waitForNowPlaceToChange: (checkingPlaceName: A_PlaceName) => Promise<void>;
        waitForPlaceFullyLoaded: (checkingPlaceName: A_PlaceName) => Promise<void>;
        waitForNowCamToChange: (checkingCamName: A_AnyCameraName) => Promise<void>;
        waitForNextTick: () => Promise<unknown>;
        getUsefulStoryStuff: () => {
            storyState: ReturnType<A_PrendyStoreHelpers["getState"]>["story"]["main"];
            storyRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["story"]["main"];
            globalState: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"];
            nowSegmentName: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"]["nowSegmentName"];
            nowPlaceName: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"]["nowPlaceName"];
            nowCamName: ReturnType<A_PrendyStoreHelpers["getState"]>["global"]["main"]["nowCamName"];
            placesRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"];
            placeRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]];
            camsRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]]["camsRefs"];
            camRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["places"]]["camsRefs"]];
        };
        getSpotPosition: <T_Place_7 extends A_PlaceName>(place: T_Place_7, spot: A_SpotNameByPlace[T_Place_7]) => Vector3;
        getSpotRotation: <T_Place_8 extends A_PlaceName>(place: T_Place_8, spot: A_SpotNameByPlace[T_Place_8]) => Vector3;
    };
};
