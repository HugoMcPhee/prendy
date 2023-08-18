import { MyTypes } from "../../declarations";
export declare function get_getUsefulStoryStuff<T_MyTypes extends MyTypes = MyTypes>(storeHelpers: T_MyTypes["StoreHelpers"]): () => {
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
export declare function get_setStoryState<T_MyTypes extends MyTypes = MyTypes>(storeHelpers: T_MyTypes["StoreHelpers"]): (newState: Partial<ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["story"]["main"]>) => void;
export declare function makeAllStoryRuleMakers<T_MyTypes extends MyTypes = MyTypes>(storeHelpers: T_MyTypes["StoreHelpers"], placeInfoByName: T_MyTypes["Main"]["PlaceInfoByName"], characterNames: readonly T_MyTypes["Main"]["CharacterName"][], dollNames: readonly T_MyTypes["Main"]["DollName"][]): {
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
        whenLeave?: boolean;
    }) => {
        stopAll: (...args: any) => any;
        startAll: (...args: any) => any;
        start: (...args: any) => any;
        stop: (...args: any) => any;
        ruleNames: any[];
    };
};
