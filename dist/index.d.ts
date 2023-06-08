/// <reference types="react" />
import "@babylonjs/loaders";
import { CharacterName, DollName, PlaceInfoByName, PrendyAssets, PrendyOptions, PrendyStoreHelpers, PrendyStores } from "./declarations";
export { makePrendyApp as makePrendyApp } from "./components/PrendyApp";
export * from "./declarations";
export { getPrendyOptions } from "./getPrendyOptions";
export { get_usePlaceUtils as makeUsePlaceUtils } from "./helpers/babylonjs/usePlace/utils";
export { point3dToVector3, vector3ToPoint3d, vector3ToSafePoint3d } from "./helpers/babylonjs/vectors";
export { makePrendyStoryHelpers } from "./helpers/prendyHelpers/helpers";
export { makeAllStoryRuleMakers } from "./helpers/prendyRuleMakers/prendyRuleMakers";
export { makePrendyStoryUtils } from "./helpers/prendyUtils/prendyUtils";
export { makeStartPrendyRules } from "./rules/rules";
export { makePrendyStores, prendyStepNames } from "./stores/stores";
export declare function makeOtherUsefulPrendyUtils(storeHelpers: PrendyStoreHelpers): {
    setStoryState: (newState: Partial<Record<any, any>>) => void;
    getGlobalState: () => Record<any, any>;
    setGlobalState: <GlobalItemState extends Record<any, any>, PartialGlobalState extends Partial<GlobalItemState>>(newState: PartialGlobalState | ((state: GlobalItemState) => PartialGlobalState), callback?: (() => void) | undefined) => void;
    getScene: () => import("@babylonjs/core").Scene | null;
    getEngine: () => import("@babylonjs/core").Engine | null;
};
export declare function makePrendyHelpers(storeHelpers: PrendyStoreHelpers, prendyStores: PrendyStores, prendyStartOptions: PrendyOptions, prendyAssets: PrendyAssets, placeInfoByName: PlaceInfoByName, characterNames: readonly CharacterName[], dollNames: readonly DollName[]): {
    story: {
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
                toSpot: string;
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
    storyUtils: {
        get2DAngleBetweenCharacters: (charA: string, charB: string) => number;
        get2DAngleFromCharacterToSpot: <T_Place_4 extends string>(character: string, place: T_Place_4, spot: string) => number;
        getModelNameFromDoll: <T_DollName_1 extends string>(dollName: T_DollName_1) => any;
        get2DAngleBetweenDolls: (dollA: string, dollB: string) => number;
        get2DAngleFromDollToSpot: <T_Place_5 extends string>(dollA: string, place: T_Place_5, spot: string) => number;
        doWhenNowCamChanges: (checkingCamName: string, callback: () => void) => string | null;
        doWhenNowSegmentChanges: (checkingSegmentName: string, callback: () => void) => string | null;
        getSegmentFromStoryRules: <T_Place_6 extends string, T_Cam_1 extends string>(place: T_Place_6, cam: T_Cam_1) => any;
        getSpotPosition: <T_Place_7 extends string>(place: T_Place_7, spot: string) => import("@babylonjs/core").Vector3;
        getSpotRotation: <T_Place_8 extends string>(place: T_Place_8, spot: string) => import("@babylonjs/core").Vector3;
    };
    storyRuleMakers: {
        makeCamChangeRules: (callBacksObject: Partial<{
            [x: string]: Partial<{
                [x: string]: (usefulStuff: {
                    storyState: Record<any, any>;
                    storyRefs: Record<any, any>;
                    globalState: Record<any, any>;
                    chapterName: any;
                    storyPart: any;
                    nowSegmentName: any;
                    nowPlaceName: any;
                    nowCamName: any;
                    placesRefs: Record<any, Record<any, any>>;
                    placeRefs: Record<any, any>;
                    camsRefs: any;
                    camRefs: any;
                }) => void;
            }>;
        }>) => {
            stopAll: (...args: any) => any;
            startAll: (...args: any) => any;
            start: (...args: any) => any;
            stop: (...args: any) => any;
            ruleNames: any[];
        };
        makeCamLeaveRules: (callBacksObject: Partial<{
            [x: string]: Partial<{
                [x: string]: (usefulStuff: {
                    storyState: Record<any, any>;
                    storyRefs: Record<any, any>;
                    globalState: Record<any, any>;
                    chapterName: any;
                    storyPart: any;
                    nowSegmentName: any;
                    nowPlaceName: any;
                    nowCamName: any;
                    placesRefs: Record<any, Record<any, any>>;
                    placeRefs: Record<any, any>;
                    camsRefs: any;
                    camRefs: any;
                }) => void;
            }>;
        }>) => {
            stopAll: (...args: any) => any;
            startAll: (...args: any) => any;
            start: (...args: any) => any;
            stop: (...args: any) => any;
            ruleNames: any[];
        };
        makeCamSegmentRules: (callBacksObject: Partial<{
            [x: string]: Partial<{
                [x: string]: (usefulStuff: {
                    storyState: Record<any, any>;
                    storyRefs: Record<any, any>;
                    globalState: Record<any, any>;
                    chapterName: any;
                    storyPart: any;
                    nowSegmentName: any;
                    nowPlaceName: any;
                    nowCamName: any;
                    placesRefs: Record<any, Record<any, any>>;
                    placeRefs: Record<any, any>;
                    camsRefs: any;
                    camRefs: any;
                }) => string;
            }>;
        }>) => boolean;
        makeOnInteractAtTrigger: (callBacksObject: Partial<{
            [x: string]: Partial<{
                [x: string]: (usefulStuff: {
                    storyState: Record<any, any>;
                    storyRefs: Record<any, any>;
                    globalState: Record<any, any>;
                    chapterName: any;
                    storyPart: any;
                    nowSegmentName: any;
                    nowPlaceName: any;
                    nowCamName: any;
                    placesRefs: Record<any, Record<any, any>>;
                    placeRefs: Record<any, any>;
                    camsRefs: any;
                    camRefs: any;
                }) => void;
            }>;
        }>, characterName?: string) => () => void;
        makeOnInteractToTalk: (callBacksObject: Partial<{
            [x: string]: (usefulStuff: {
                storyState: Record<any, any>;
                storyRefs: Record<any, any>;
                globalState: Record<any, any>;
                chapterName: any;
                storyPart: any;
                nowSegmentName: any;
                nowPlaceName: any;
                nowCamName: any;
                placesRefs: Record<any, Record<any, any>>;
                placeRefs: Record<any, any>;
                camsRefs: any;
                camRefs: any;
            }) => void;
        }>, distanceType?: "touch" | "talk", characterName?: string) => () => void;
        makeOnUsePickupAtTrigger: (callBacksObject: Partial<{
            [x: string]: Partial<{
                [x: string]: Partial<{
                    [x: string]: (usefulStuff: {
                        storyState: Record<any, any>;
                        storyRefs: Record<any, any>;
                        globalState: Record<any, any>;
                        chapterName: any;
                        storyPart: any;
                        nowSegmentName: any;
                        nowPlaceName: any;
                        nowCamName: any;
                        placesRefs: Record<any, Record<any, any>>;
                        placeRefs: Record<any, any>;
                        camsRefs: any;
                        camRefs: any;
                    }) => void;
                }>;
            }>;
        }>, characterName?: string) => <T_PickupName extends string>(pickupName: T_PickupName) => false | undefined;
        makeOnUsePickupGenerally: (callBacksObject: Partial<{
            [x: string]: (usefulStuff: {
                storyState: Record<any, any>;
                storyRefs: Record<any, any>;
                globalState: Record<any, any>;
                chapterName: any;
                storyPart: any;
                nowSegmentName: any;
                nowPlaceName: any;
                nowCamName: any;
                placesRefs: Record<any, Record<any, any>>;
                placeRefs: Record<any, any>;
                camsRefs: any;
                camRefs: any;
            }) => void;
        }>) => <T_PickupName_1 extends string>(pickupName: T_PickupName_1) => void;
        makeOnUsePickupToTalk: (callBacksObject: Partial<{
            [x: string]: Partial<{
                [x: string]: (usefulStuff: {
                    storyState: Record<any, any>;
                    storyRefs: Record<any, any>;
                    globalState: Record<any, any>;
                    chapterName: any;
                    storyPart: any;
                    nowSegmentName: any;
                    nowPlaceName: any;
                    nowCamName: any;
                    placesRefs: Record<any, Record<any, any>>;
                    placeRefs: Record<any, any>;
                    camsRefs: any;
                    camRefs: any;
                }) => void;
            }>;
        }>, characterName?: string) => <T_PickupName_2 extends string>(pickupName: T_PickupName_2) => false | undefined;
        makePlaceLoadRules: (atStartOfEachPlace: (usefulStuff: {
            storyState: Record<any, any>;
            storyRefs: Record<any, any>;
            globalState: Record<any, any>;
            chapterName: any;
            storyPart: any;
            nowSegmentName: any;
            nowPlaceName: any;
            nowCamName: any;
            placesRefs: Record<any, Record<any, any>>;
            placeRefs: Record<any, any>;
            camsRefs: any;
            camRefs: any;
        }) => void, callBacksObject: Partial<{
            [x: string]: (usefulStuff: {
                storyState: Record<any, any>;
                storyRefs: Record<any, any>;
                globalState: Record<any, any>;
                chapterName: any;
                storyPart: any;
                nowSegmentName: any;
                nowPlaceName: any;
                nowCamName: any;
                placesRefs: Record<any, Record<any, any>>;
                placeRefs: Record<any, any>;
                camsRefs: any;
                camRefs: any;
            }) => void;
        }>) => {
            stopAll: (...args: any) => any;
            startAll: (...args: any) => any;
            start: (...args: any) => any;
            stop: (...args: any) => any;
            ruleNames: any[];
        };
        makePlaceNotLoadedRules: (callBacksObject: Partial<{
            [x: string]: (usefulStuff: {
                storyState: Record<any, any>;
                storyRefs: Record<any, any>;
                globalState: Record<any, any>;
                chapterName: any;
                storyPart: any;
                nowSegmentName: any;
                nowPlaceName: any;
                nowCamName: any;
                placesRefs: Record<any, Record<any, any>>;
                placeRefs: Record<any, any>;
                camsRefs: any;
                camRefs: any;
            }) => void;
        }>) => {
            stopAll: (...args: any) => any;
            startAll: (...args: any) => any;
            start: (...args: any) => any;
            stop: (...args: any) => any;
            ruleNames: any[];
        };
        makeStoryPartRules: (callBacksObject: Partial<Record<string, (usefulStuff: {
            storyState: Record<any, any>;
            storyRefs: Record<any, any>;
            globalState: Record<any, any>;
            chapterName: any;
            storyPart: any;
            nowSegmentName: any;
            nowPlaceName: any;
            nowCamName: any;
            placesRefs: Record<any, Record<any, any>>;
            placeRefs: Record<any, any>;
            camsRefs: any;
            camRefs: any;
        }) => void>>) => {
            stopAll: (...args: any) => any;
            startAll: (...args: any) => any;
            start: (...args: any) => any;
            stop: (...args: any) => any;
            ruleNames: any[];
        };
        makeTouchRules: (callBacksObject: Partial<{
            [x: string]: (usefulStuff: {
                storyState: Record<any, any>;
                storyRefs: Record<any, any>;
                globalState: Record<any, any>;
                chapterName: any;
                storyPart: any;
                nowSegmentName: any;
                nowPlaceName: any;
                nowCamName: any;
                placesRefs: Record<any, Record<any, any>>;
                placeRefs: Record<any, any>;
                camsRefs: any;
                camRefs: any;
            }) => void;
        }>, options?: {
            characterName?: string | undefined;
            distanceType?: "touch" | "talk" | "see" | undefined;
            whenLeave?: boolean | undefined;
        } | undefined) => {
            stopAll: (...args: any) => any;
            startAll: (...args: any) => any;
            start: (...args: any) => any;
            stop: (...args: any) => any;
            ruleNames: any[];
        };
        makeTriggerRules: (callBacksObject: Partial<{
            [x: string]: Partial<{
                [x: string]: Partial<{
                    [x: string]: (usefulStuff: {
                        storyState: Record<any, any>;
                        storyRefs: Record<any, any>;
                        globalState: Record<any, any>;
                        chapterName: any;
                        storyPart: any;
                        nowSegmentName: any;
                        nowPlaceName: any;
                        nowCamName: any;
                        placesRefs: Record<any, Record<any, any>>;
                        placeRefs: Record<any, any>;
                        camsRefs: any;
                        camRefs: any;
                    }) => void;
                }>;
            }>;
        }>, options?: {
            whenLeave?: boolean | undefined;
        } | undefined) => {
            stopAll: (...args: any) => any;
            startAll: (...args: any) => any;
            start: (...args: any) => any;
            stop: (...args: any) => any;
            ruleNames: any[];
        };
    };
    otherUtils: {
        setStoryState: (newState: Partial<Record<any, any>>) => void;
        getGlobalState: () => Record<any, any>;
        setGlobalState: <GlobalItemState extends Record<any, any>, PartialGlobalState extends Partial<GlobalItemState>>(newState: PartialGlobalState | ((state: GlobalItemState) => PartialGlobalState), callback?: (() => void) | undefined) => void;
        getScene: () => import("@babylonjs/core").Scene | null;
        getEngine: () => import("@babylonjs/core").Engine | null;
    };
};
