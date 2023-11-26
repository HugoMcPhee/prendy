/// <reference types="react" />
import "@babylonjs/loaders";
import { MyTypes } from "./declarations";
export { get_DebugFrameRate as makeDebugFrameRate } from "./components/DebugFrameRate";
export { makePrendyApp } from "./components/PrendyApp";
export * from "./declarations";
export { makePrendyOptions } from "./getPrendyOptions";
export { get_usePlaceUtils as makeUsePlaceUtils } from "./helpers/babylonjs/usePlace/utils";
export { point3dToVector3, vector3ToPoint3d, vector3ToSafePoint3d } from "./helpers/babylonjs/vectors";
export { makePrendyStoryHelpers } from "./helpers/prendyHelpers/helpers";
export { makeAllStoryRuleMakers } from "./helpers/prendyRuleMakers/prendyRuleMakers";
export { makePrendyStoryUtils } from "./helpers/prendyUtils/prendyUtils";
export { makeStartAndStopRules, makeStartPrendyMainRules, makeStartPrendyRules } from "./rules/rules";
export { makePrendyStores, prendyStepNames } from "./stores/stores";
export declare const definiedPrendyRules: {
    dolls: {
        stopAll: (...args: any) => any;
        startAll: (...args: any) => any;
        start: (...args: any) => any;
        stop: (...args: any) => any;
        ruleNames: any[];
        run: (...args: any) => any;
        runAll: (...args: any) => any;
    } | null;
};
export declare function makeOtherUsefulPrendyUtils<T_MyTypes extends MyTypes = MyTypes>(storeHelpers: T_MyTypes["StoreHelpers"]): {
    setStoryState: (newState: Partial<ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["story"]["main"]>) => void;
    getGlobalState: () => ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"];
    setGlobalState: <GlobalItemState extends ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"] & Record<any, any>, PartialGlobalState extends Partial<GlobalItemState>>(newState: PartialGlobalState | ((state: GlobalItemState) => PartialGlobalState), callback?: (() => void) | undefined) => void;
    getScene: () => import("@babylonjs/core").Scene | null;
    getEngine: () => import("@babylonjs/core").Engine | null;
};
export declare function makePrendyHelpers<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"], prendyStores: T_MyTypes["Stores"], storeHelpers: T_MyTypes["StoreHelpers"]): {
    story: {
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
    rules: {
        makeCamChangeRules: (callBacksObject: Partial<{ [P_PlaceName in T_MyTypes["Main"]["PlaceName"]]: Partial<Record<keyof T_MyTypes["Main"]["PlaceInfoByName"][P_PlaceName]["segmentTimesByCamera"], (usefulStuff: {
            storyState: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["story"]["main"];
            storyRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["story"]["main"];
            globalState: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"];
            nowSegmentName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowSegmentName"];
            nowPlaceName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowPlaceName"];
            nowCamName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowCamName"];
            placesRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"];
            placeRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]];
            camsRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"];
            camRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"]];
        }) => void>>; }>) => {
            start: (ruleName: "whenPropertyChanges") => void;
            stop: (ruleName: "whenPropertyChanges") => void;
            startAll: () => void;
            stopAll: () => void;
            ruleNames: "whenPropertyChanges"[];
            run: (ruleName: "whenPropertyChanges") => void;
            runAll: () => void;
        };
        makeCamLeaveRules: (callBacksObject: Partial<{ [P_PlaceName in T_MyTypes["Main"]["PlaceName"]]: Partial<Record<keyof T_MyTypes["Main"]["PlaceInfoByName"][P_PlaceName]["segmentTimesByCamera"], (usefulStuff: {
            storyState: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["story"]["main"];
            storyRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["story"]["main"];
            globalState: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"];
            nowSegmentName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowSegmentName"];
            nowPlaceName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowPlaceName"];
            nowCamName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowCamName"];
            placesRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"];
            placeRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]];
            camsRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"];
            camRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"]];
        }) => void>>; }>) => {
            start: (ruleName: "whenPropertyChanges") => void;
            stop: (ruleName: "whenPropertyChanges") => void;
            startAll: () => void;
            stopAll: () => void;
            ruleNames: "whenPropertyChanges"[];
            run: (ruleName: "whenPropertyChanges") => void;
            runAll: () => void;
        };
        makeCamSegmentRules: (callBacksObject: Partial<{ [P_PlaceName_1 in T_MyTypes["Main"]["PlaceName"]]: Partial<{ [P_CamName in keyof T_MyTypes["Main"]["PlaceInfoByName"][P_PlaceName_1]["segmentTimesByCamera"]]: (usefulStuff: {
            storyState: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["story"]["main"];
            storyRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["story"]["main"];
            globalState: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"];
            nowSegmentName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowSegmentName"];
            nowPlaceName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowPlaceName"];
            nowCamName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowCamName"];
            placesRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"];
            placeRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]];
            camsRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"];
            camRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"]];
        }) => keyof T_MyTypes["Main"]["PlaceInfoByName"][P_PlaceName_1]["segmentTimesByCamera"][P_CamName]; }>; }>) => {
            startAll(): void;
            stopAll(): void;
        };
        makeOnInteractAtTrigger: (callBacksObject: Partial<{ [P_PlaceName_2 in T_MyTypes["Main"]["PlaceName"]]: Partial<{ [P_TriggerName in T_MyTypes["Main"]["TriggerNameByPlace"][P_PlaceName_2]]: (usefulStuff: {
            storyState: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["story"]["main"];
            storyRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["story"]["main"];
            globalState: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"];
            nowSegmentName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowSegmentName"];
            nowPlaceName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowPlaceName"];
            nowCamName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowCamName"];
            placesRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"];
            placeRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]];
            camsRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"];
            camRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"]];
        }) => void; }>; }>, characterName?: T_MyTypes["Main"]["CharacterName"]) => () => void;
        makeOnInteractToTalk: (callBacksObject: Partial<{ [P_DollName in T_MyTypes["Main"]["DollName"]]: (usefulStuff: {
            storyState: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["story"]["main"];
            storyRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["story"]["main"];
            globalState: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"];
            nowSegmentName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowSegmentName"];
            nowPlaceName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowPlaceName"];
            nowCamName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowCamName"];
            placesRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"];
            placeRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]];
            camsRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"];
            camRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"]];
        }) => void; }>, distanceType?: "touch" | "talk", characterName?: T_MyTypes["Main"]["CharacterName"]) => () => void;
        makeInteractButtonRules: ({ onInteractAtTrigger, onInteractAtTalk, }: {
            onInteractAtTrigger: () => void;
            onInteractAtTalk: () => void;
        }) => {
            stopAll: (...args: any) => any;
            startAll: (...args: any) => any;
            start: (...args: any) => any;
            stop: (...args: any) => any;
            ruleNames: any[];
            run: (...args: any) => any;
            runAll: (...args: any) => any;
        };
        makeOnUsePickupAtTrigger: (callBacksObject: Partial<{ [P_PlaceName_3 in T_MyTypes["Main"]["PlaceName"]]: Partial<{ [P_TriggerName_1 in T_MyTypes["Main"]["TriggerNameByPlace"][P_PlaceName_3]]: Partial<{ [P_PickupName in T_MyTypes["Main"]["PickupName"]]: (usefulStuff: {
            storyState: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["story"]["main"];
            storyRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["story"]["main"];
            globalState: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"];
            nowSegmentName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowSegmentName"];
            nowPlaceName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowPlaceName"];
            nowCamName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowCamName"];
            placesRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"];
            placeRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]];
            camsRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"];
            camRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"]];
        }) => void; }>; }>; }>, characterName?: T_MyTypes["Main"]["CharacterName"]) => <T_PickupName extends T_MyTypes["Main"]["PickupName"]>(pickupName: T_PickupName) => false | undefined;
        makeOnUsePickupGenerally: (callBacksObject: Partial<{ [P_PickupName_1 in T_MyTypes["Main"]["PickupName"]]: (usefulStuff: {
            storyState: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["story"]["main"];
            storyRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["story"]["main"];
            globalState: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"];
            nowSegmentName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowSegmentName"];
            nowPlaceName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowPlaceName"];
            nowCamName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowCamName"];
            placesRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"];
            placeRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]];
            camsRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"];
            camRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"]];
        }) => void; }>) => <T_PickupName_1 extends T_MyTypes["Main"]["PickupName"]>(pickupName: T_PickupName_1) => void;
        makeOnUsePickupToTalk: (callBacksObject: Partial<{ [P_DollName_1 in T_MyTypes["Main"]["DollName"]]: Partial<{ [P_PickupName_2 in T_MyTypes["Main"]["PickupName"]]: (usefulStuff: {
            storyState: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["story"]["main"];
            storyRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["story"]["main"];
            globalState: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"];
            nowSegmentName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowSegmentName"];
            nowPlaceName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowPlaceName"];
            nowCamName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowCamName"];
            placesRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"];
            placeRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]];
            camsRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"];
            camRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"]];
        }) => void; }>; }>, characterName?: T_MyTypes["Main"]["CharacterName"]) => <T_PickupName_2 extends T_MyTypes["Main"]["PickupName"]>(pickupName: T_PickupName_2) => false | undefined;
        makePickupsRules: ({ onUsePickupAtTrigger, onUsePickupToTalk, onUsePickupGenerally, }: {
            onUsePickupAtTrigger: <T_PickupName extends T_MyTypes["Main"]["PickupName"]>(pickupName: T_PickupName) => false | undefined;
            onUsePickupToTalk: <T_PickupName_2 extends T_MyTypes["Main"]["PickupName"]>(pickupName: T_PickupName_2) => false | undefined;
            onUsePickupGenerally: <T_PickupName_1 extends T_MyTypes["Main"]["PickupName"]>(pickupName: T_PickupName_1) => void;
        }) => {
            startAll(): void;
            stopAll(): void;
        };
        makePlaceLoadRules: (atStartOfEachPlace: (usefulStuff: {
            storyState: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["story"]["main"];
            storyRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["story"]["main"];
            globalState: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"];
            nowSegmentName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowSegmentName"];
            nowPlaceName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowPlaceName"];
            nowCamName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowCamName"];
            placesRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"];
            placeRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]];
            camsRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"];
            camRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"]];
        }) => void, callBacksObject: Partial<{ [P_PlaceName_4 in T_MyTypes["Main"]["PlaceName"]]: (usefulStuff: {
            storyState: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["story"]["main"];
            storyRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["story"]["main"];
            globalState: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"];
            nowSegmentName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowSegmentName"];
            nowPlaceName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowPlaceName"];
            nowCamName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowCamName"];
            placesRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"];
            placeRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]];
            camsRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"];
            camRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"]];
        }) => void; }>) => {
            stopAll: (...args: any) => any;
            startAll: (...args: any) => any;
            start: (...args: any) => any;
            stop: (...args: any) => any;
            ruleNames: any[];
            run: (...args: any) => any;
            runAll: (...args: any) => any;
        };
        makePlaceUnloadRules: (callBacksObject: Partial<{ [P_PlaceName_4 in T_MyTypes["Main"]["PlaceName"]]: (usefulStuff: {
            storyState: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["story"]["main"];
            storyRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["story"]["main"];
            globalState: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"];
            nowSegmentName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowSegmentName"];
            nowPlaceName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowPlaceName"];
            nowCamName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowCamName"];
            placesRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"];
            placeRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]];
            camsRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"];
            camRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"]];
        }) => void; }>) => {
            stopAll: (...args: any) => any;
            startAll: (...args: any) => any;
            start: (...args: any) => any;
            stop: (...args: any) => any;
            ruleNames: any[];
            run: (...args: any) => any;
            runAll: (...args: any) => any;
        };
        makeTouchRules: (callBacksObject: Partial<{ [P_DollName_2 in T_MyTypes["Main"]["DollName"]]: (usefulStuff: {
            storyState: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["story"]["main"];
            storyRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["story"]["main"];
            globalState: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"];
            nowSegmentName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowSegmentName"];
            nowPlaceName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowPlaceName"];
            nowCamName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowCamName"];
            placesRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"];
            placeRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]];
            camsRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"];
            camRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"]];
        }) => void; }>, options?: {
            characterName?: T_MyTypes["Main"]["CharacterName"] | undefined;
            distanceType?: "touch" | "talk" | "see" | undefined;
            whenLeave?: boolean | undefined;
        } | undefined) => {
            stopAll: (...args: any) => any;
            startAll: (...args: any) => any;
            start: (...args: any) => any;
            stop: (...args: any) => any;
            ruleNames: any[];
            run: (...args: any) => any;
            runAll: (...args: any) => any;
        };
        makeTriggerRules: (callBacksObject: Partial<{ [P_CharacterName in T_MyTypes["Main"]["CharacterName"]]: Partial<{ [P_PlaceName_5 in T_MyTypes["Main"]["PlaceName"]]: Partial<{ [P_TriggerName_2 in T_MyTypes["Main"]["TriggerNameByPlace"][P_PlaceName_5]]: (usefulStuff: {
            storyState: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["story"]["main"];
            storyRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["story"]["main"];
            globalState: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"];
            nowSegmentName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowSegmentName"];
            nowPlaceName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowPlaceName"];
            nowCamName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowCamName"];
            placesRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"];
            placeRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]];
            camsRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"];
            camRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"]];
        }) => void; }>; }>; }>, options?: {
            whenLeave?: boolean | undefined;
        } | undefined) => {
            stopAll: (...args: any) => any;
            startAll: (...args: any) => any;
            start: (...args: any) => any;
            stop: (...args: any) => any;
            ruleNames: any[];
            run: (...args: any) => any;
            runAll: (...args: any) => any;
        };
    };
    utils: {
        savePrendyState: () => void;
        loadPrendyState: () => Promise<void>;
        setStoryState: (newState: Partial<ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["story"]["main"]>) => void;
        getGlobalState: () => ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"];
        setGlobalState: <GlobalItemState extends ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"] & Record<any, any>, PartialGlobalState extends Partial<GlobalItemState>>(newState: PartialGlobalState | ((state: GlobalItemState) => PartialGlobalState), callback?: (() => void) | undefined) => void;
        getScene: () => import("@babylonjs/core").Scene | null;
        getEngine: () => import("@babylonjs/core").Engine | null;
        getUsefulStoryStuff: () => {
            storyState: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["story"]["main"];
            storyRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["story"]["main"];
            globalState: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"];
            nowSegmentName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowSegmentName"];
            nowPlaceName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowPlaceName"];
            nowCamName: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["global"]["main"]["nowCamName"];
            placesRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"];
            placeRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]];
            camsRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"];
            camRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["places"]]["camsRefs"]];
        };
        getSpotPosition: <T_Place_4 extends T_MyTypes["Main"]["PlaceName"]>(place: T_Place_4, spot: T_MyTypes["Main"]["SpotNameByPlace"][T_Place_4]) => import("@babylonjs/core").Vector3;
        getSpotRotation: <T_Place_5 extends T_MyTypes["Main"]["PlaceName"]>(place: T_Place_5, spot: T_MyTypes["Main"]["SpotNameByPlace"][T_Place_5]) => import("@babylonjs/core").Vector3;
        getSegmentFromStoryRules: <T_Place_6 extends T_MyTypes["Main"]["PlaceName"], T_Cam_1 extends T_MyTypes["Main"]["CameraNameByPlace"][T_Place_6]>(place: T_Place_6, cam: T_Cam_1) => any;
        doWhenNowSegmentChanges: (checkingSegmentName: T_MyTypes["Main"]["AnySegmentName"], callback: () => void) => string | null;
        doWhenNowCamChanges: (checkingCamName: T_MyTypes["Main"]["AnyCameraName"], callback: () => void) => string | null;
        waitForNowPlaceToChange: (checkingPlaceName: T_MyTypes["Main"]["PlaceName"]) => Promise<void>;
        waitForPlaceFullyLoaded: (checkingPlaceName: T_MyTypes["Main"]["PlaceName"]) => Promise<void>;
        waitForNowCamToChange: (checkingCamName: T_MyTypes["Main"]["AnyCameraName"]) => Promise<void>;
        waitForNextTick: () => Promise<unknown>;
        getModelNameFromDoll: <T_DollName_1 extends T_MyTypes["Main"]["DollName"]>(dollName: T_DollName_1) => NonNullable<NonNullable<T_MyTypes["Stores"]["dolls"]["startStates"]>[T_DollName_1]>["modelName"];
        get2DAngleFromDollToSpot: <T_Place_7 extends T_MyTypes["Main"]["PlaceName"]>(dollA: T_MyTypes["Main"]["DollName"], place: T_Place_7, spot: T_MyTypes["Main"]["SpotNameByPlace"][T_Place_7]) => number;
        get2DAngleBetweenDolls: (dollA: T_MyTypes["Main"]["DollName"], dollB: T_MyTypes["Main"]["DollName"]) => number;
        get2DAngleFromCharacterToSpot: <T_Place_8 extends T_MyTypes["Main"]["PlaceName"]>(character: T_MyTypes["Main"]["CharacterName"], place: T_Place_8, spot: T_MyTypes["Main"]["SpotNameByPlace"][T_Place_8]) => number;
        get2DAngleBetweenCharacters: (charA: T_MyTypes["Main"]["CharacterName"], charB: T_MyTypes["Main"]["CharacterName"]) => number;
    };
};
export declare function getDefaultDollOptions<T_ModelName extends string>(modelNames: readonly T_ModelName[]): { [K_ModelName in T_ModelName]: {
    model: K_ModelName;
}; };
export type DollOptionLoose<T_ModelName extends string> = {
    model: T_ModelName;
};
export type DollOptionsLoose<T_ModelName extends string> = Record<string, DollOptionLoose<T_ModelName>>;
export type CharacterOptionLoose<T_DollName extends string, T_FontName extends string> = Record<string, {
    doll: T_DollName;
    font: T_FontName;
}>;
