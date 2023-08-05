import { CharacterName, DollName, PlaceInfoByName, PrendyStoreHelpers } from "../../declarations";
export declare function get_getUsefulStoryStuff(storeHelpers: PrendyStoreHelpers): () => {
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
};
export declare function get_setStoryState(storeHelpers: PrendyStoreHelpers): (newState: Partial<Record<any, any>>) => void;
export declare function makeAllStoryRuleMakers(storeHelpers: PrendyStoreHelpers, placeInfoByName: PlaceInfoByName, characterNames: readonly CharacterName[], dollNames: readonly DollName[]): {
    makeCamChangeRules: any;
    makeCamLeaveRules: any;
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
    }>, characterName?: CharacterName) => () => void;
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
    }>, distanceType?: "touch" | "talk", characterName?: CharacterName) => () => void;
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
    }>, characterName?: CharacterName) => <T_PickupName extends string>(pickupName: T_PickupName) => false | undefined;
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
    }>, characterName?: CharacterName) => <T_PickupName_2 extends string>(pickupName: T_PickupName_2) => false | undefined;
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
        characterName?: CharacterName;
        distanceType?: "touch" | "talk" | "see";
        whenLeave?: boolean;
    }) => {
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
        whenLeave?: boolean;
    }) => {
        stopAll: (...args: any) => any;
        startAll: (...args: any) => any;
        start: (...args: any) => any;
        stop: (...args: any) => any;
        ruleNames: any[];
    };
};
