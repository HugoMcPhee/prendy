import "@babylonjs/loaders";
import { MyTypes } from "./declarations";
export { get_DebugFrameRate as makeDebugFrameRate } from "./components/DebugFrameRate";
export { makePrendyApp } from "./components/PrendyApp";
export * from "./declarations";
export { makePrendyOptions } from "./getPrendyOptions";
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
export declare function makePrendyHelpers<T_MyTypes extends MyTypes = MyTypes>(assets: T_MyTypes["Assets"], stores: T_MyTypes["Stores"], repond: T_MyTypes["Repond"]): {
    story: {
        characters: {
            setCharAnimation: typeof import("./helpers/prendyHelpers/characters").setCharAnimation;
            setCharPosition: typeof import("./helpers/prendyHelpers/characters").setCharPosition;
            setCharRotationY: typeof import("./helpers/prendyHelpers/characters").setCharRotationY;
            springCharRotation: typeof import("./helpers/prendyHelpers/characters").springCharRotation;
            springAddToCharRotationY: typeof import("./helpers/prendyHelpers/characters").springAddToCharRotationY;
            lookAtOtherCharacter: typeof import("./helpers/prendyHelpers/characters").lookAtOtherCharacter;
            lookAtEachother: typeof import("./helpers/prendyHelpers/characters").lookAtEachother;
            moveCharacterAt2DAngle: typeof import("./helpers/prendyHelpers/characters").moveCharacterAt2DAngle;
        };
        dolls: {
            setDollPosition: typeof import("./helpers/prendyHelpers/dolls").setDollPosition;
            setDollRotation: typeof import("./helpers/prendyHelpers/dolls").setDollRotation;
            setDollRotationY: typeof import("./helpers/prendyHelpers/dolls").setDollRotationY;
            springDollRotationY: typeof import("./helpers/prendyHelpers/dolls").springDollRotationY;
            springAddToDollRotationY: typeof import("./helpers/prendyHelpers/dolls").springAddToDollRotationY;
            pushDollRotationY: typeof import("./helpers/prendyHelpers/dolls").pushDollRotationY;
            lookAtOtherDoll: typeof import("./helpers/prendyHelpers/dolls").lookAtOtherDoll;
            setDollAnimation: typeof import("./helpers/prendyHelpers/dolls").setDollAnimation;
            focusOnDoll: typeof import("./helpers/prendyHelpers/dolls").focusOnDoll;
            setDollToSpot: typeof import("./helpers/prendyHelpers/dolls").setDollToSpot;
            springDollToSpot: typeof import("./helpers/prendyHelpers/dolls").springDollToSpot;
            dollLooksAtSpot: typeof import("./helpers/prendyHelpers/dolls").dollLooksAtSpot;
            moveDollAt2DAngle: typeof import("./helpers/prendyHelpers/dolls").moveDollAt2DAngle;
            hideDoll: typeof import("./helpers/prendyHelpers/dolls").hideDoll;
            toggleDollMeshes: typeof import("./helpers/prendyHelpers/dolls").toggleDollMeshes;
            getDollBonePosition: typeof import("./helpers/prendyHelpers/dolls").getDollBonePosition;
        };
        players: {
            enableMovement: typeof import("./helpers/prendyHelpers/players").enableMovement;
            isHolding: typeof import("./helpers/prendyHelpers/players").isHolding;
            takePickup: typeof import("./helpers/prendyHelpers/players").takePickup;
            setPlayerAnimations: typeof import("./helpers/prendyHelpers/players").setPlayerAnimations;
        };
        scene: {
            lookAtSpot: typeof import("./helpers/prendyHelpers/scene").lookAtSpot;
            hideWallIf: typeof import("./helpers/prendyHelpers/scene").hideWallIf;
            showStoryView: typeof import("./helpers/prendyHelpers/scene").showStoryView;
            setSegment: typeof import("./helpers/prendyHelpers/scene").setSegment;
            setCamera: typeof import("./helpers/prendyHelpers/scene").setCamera;
            goToNewPlace: typeof import("./helpers/prendyHelpers/scene").goToNewPlace;
        };
        sound: {
            playNewMusic: typeof import("./helpers/prendyHelpers/sound").playNewMusic;
            stopAllMusic: typeof import("./helpers/prendyHelpers/sound").stopAllMusic;
            playSound: typeof import("./helpers/prendyHelpers/sound").playSound;
            stopSound: typeof import("./helpers/prendyHelpers/sound").stopSound;
            stopAllSounds: typeof import("./helpers/prendyHelpers/sound").stopAllSounds;
        };
        speech: {
            showSpeech: typeof import("./helpers/prendyHelpers/speech").showSpeech;
            showMiniBubble: typeof import("./helpers/prendyHelpers/speech").showMiniBubble;
            hideMiniBubble: typeof import("./helpers/prendyHelpers/speech").hideMiniBubble;
            showAlarmText: typeof import("./helpers/prendyHelpers/speech").showAlarmText;
        };
        stickers: {
            moveSticker: typeof import("./helpers/prendyHelpers/stickers").moveSticker;
            showSticker: typeof import("./helpers/prendyHelpers/stickers").showSticker;
            hideSticker: typeof import("./helpers/prendyHelpers/stickers").hideSticker;
        };
    };
    rules: {
        makeCamChangeRules: (callBacksObject: Partial<{
            [x: string]: Partial<Record<string, (usefulStuff: {
                storyState: Record<any, any>;
                storyRefs: Record<any, any>;
                globalState: Record<any, any>;
                nowSegmentName: any;
                nowPlaceName: any;
                nowCamName: any;
                placesRefs: Record<any, Record<any, any>>;
                placeRefs: Record<any, any>;
                camsRefs: any;
                camRefs: any;
            }) => void>>;
        }>) => {
            start: (ruleName: "whenPropertyChanges") => void;
            stop: (ruleName: "whenPropertyChanges") => void;
            startAll: () => void;
            stopAll: () => void;
            ruleNames: "whenPropertyChanges"[];
            run: (ruleName: "whenPropertyChanges") => void;
            runAll: () => void;
        };
        makeCamLeaveRules: (callBacksObject: Partial<{
            [x: string]: Partial<Record<string, (usefulStuff: {
                storyState: Record<any, any>;
                storyRefs: Record<any, any>;
                globalState: Record<any, any>;
                nowSegmentName: any;
                nowPlaceName: any;
                nowCamName: any;
                placesRefs: Record<any, Record<any, any>>;
                placeRefs: Record<any, any>;
                camsRefs: any;
                camRefs: any;
            }) => void>>;
        }>) => {
            start: (ruleName: "whenPropertyChanges") => void;
            stop: (ruleName: "whenPropertyChanges") => void;
            startAll: () => void;
            stopAll: () => void;
            ruleNames: "whenPropertyChanges"[];
            run: (ruleName: "whenPropertyChanges") => void;
            runAll: () => void;
        };
        makeCamSegmentRules: (callBacksObject: Partial<{
            [x: string]: Partial<{
                [x: string]: (usefulStuff: {
                    storyState: Record<any, any>;
                    storyRefs: Record<any, any>;
                    globalState: Record<any, any>;
                    nowSegmentName: any;
                    nowPlaceName: any;
                    nowCamName: any;
                    placesRefs: Record<any, Record<any, any>>;
                    placeRefs: Record<any, any>;
                    camsRefs: any;
                    camRefs: any;
                }) => string;
            }>;
        }>) => {
            startAll(): void;
            stopAll(): void;
        };
        makeOnInteractAtTrigger: (callBacksObject: Partial<{
            [x: string]: Partial<{
                [x: string]: (usefulStuff: {
                    storyState: Record<any, any>;
                    storyRefs: Record<any, any>;
                    globalState: Record<any, any>;
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
                nowSegmentName: any;
                nowPlaceName: any;
                nowCamName: any;
                placesRefs: Record<any, Record<any, any>>;
                placeRefs: Record<any, any>;
                camsRefs: any;
                camRefs: any;
            }) => void;
        }>, distanceType?: "touch" | "talk", characterName?: string) => () => void;
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
        makeOnUsePickupAtTrigger: (callBacksObject: Partial<{
            [x: string]: Partial<{
                [x: string]: Partial<{
                    [x: string]: (usefulStuff: {
                        storyState: Record<any, any>;
                        storyRefs: Record<any, any>;
                        globalState: Record<any, any>;
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
        makePickupsRules: ({ onUsePickupAtTrigger, onUsePickupToTalk, onUsePickupGenerally, }: {
            onUsePickupAtTrigger: <T_PickupName extends string>(pickupName: T_PickupName) => false | undefined;
            onUsePickupToTalk: <T_PickupName_2 extends string>(pickupName: T_PickupName_2) => false | undefined;
            onUsePickupGenerally: <T_PickupName_1 extends string>(pickupName: T_PickupName_1) => void;
        }) => {
            startAll(): void;
            stopAll(): void;
        };
        makePlaceLoadRules: (atStartOfEachPlace: (usefulStuff: {
            storyState: Record<any, any>;
            storyRefs: Record<any, any>;
            globalState: Record<any, any>;
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
            run: (...args: any) => any;
            runAll: (...args: any) => any;
        };
        makePlaceUnloadRules: (callBacksObject: Partial<{
            [x: string]: (usefulStuff: {
                storyState: Record<any, any>;
                storyRefs: Record<any, any>;
                globalState: Record<any, any>;
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
            run: (...args: any) => any;
            runAll: (...args: any) => any;
        };
        makeTouchRules: (callBacksObject: Partial<{
            [x: string]: (usefulStuff: {
                storyState: Record<any, any>;
                storyRefs: Record<any, any>;
                globalState: Record<any, any>;
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
            run: (...args: any) => any;
            runAll: (...args: any) => any;
        };
        makeTriggerRules: (callBacksObject: Partial<{
            [x: string]: Partial<{
                [x: string]: Partial<{
                    [x: string]: (usefulStuff: {
                        storyState: Record<any, any>;
                        storyRefs: Record<any, any>;
                        globalState: Record<any, any>;
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
            run: (...args: any) => any;
            runAll: (...args: any) => any;
        };
    };
    utils: {
        savePrendyState: () => void;
        loadPrendyState: () => Promise<void>;
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
