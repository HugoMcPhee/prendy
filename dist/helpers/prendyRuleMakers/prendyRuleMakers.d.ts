import { AnyTriggerName, CameraNameByPlace, CharacterName, DollName, PickupName, PlaceInfoByName, PlaceName, PrendyStoreHelpers, StoryPartName, TriggerNameByPlace } from "../../declarations";
export declare function get_getUsefulStoryStuff<A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers>(storeHelpers: A_PrendyStoreHelpers): () => {
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
export declare function get_setStoryState<A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers>(storeHelpers: A_PrendyStoreHelpers): (newState: Partial<ReturnType<A_PrendyStoreHelpers["getState"]>["story"]["main"]>) => void;
export declare function makeAllStoryRuleMakers<A_AnyTriggerName extends AnyTriggerName = AnyTriggerName, A_CameraNameByPlace extends CameraNameByPlace = CameraNameByPlace, A_CharacterName extends CharacterName = CharacterName, A_DollName extends DollName = DollName, A_PickupName extends PickupName = PickupName, A_PlaceInfoByName extends PlaceInfoByName = PlaceInfoByName, A_PlaceName extends PlaceName = PlaceName, A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers, A_StoryPartName extends StoryPartName = StoryPartName, A_TriggerNameByPlace extends TriggerNameByPlace = TriggerNameByPlace>(storeHelpers: A_PrendyStoreHelpers, placeInfoByName: A_PlaceInfoByName, characterNames: readonly A_CharacterName[], dollNames: readonly A_DollName[]): {
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
        characterName?: A_CharacterName;
        distanceType?: "touch" | "talk" | "see";
        whenLeave?: boolean;
    }) => {
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
        whenLeave?: boolean;
    }) => {
        stopAll: (...args: any) => any;
        startAll: (...args: any) => any;
        start: (...args: any) => any;
        stop: (...args: any) => any;
        ruleNames: any[];
    };
};
