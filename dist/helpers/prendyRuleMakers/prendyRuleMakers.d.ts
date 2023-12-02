import { AllState } from "repond";
import { MyTypes } from "../../declarations";
type StoryState = AllState["story"]["main"];
type CharacterName = MyTypes["Types"]["CharacterName"];
type DollName = MyTypes["Types"]["DollName"];
type PickupName = MyTypes["Types"]["PickupName"];
type PlaceInfoByName = MyTypes["Types"]["PlaceInfoByName"];
type PlaceName = MyTypes["Types"]["PlaceName"];
type TriggerNameByPlace = MyTypes["Types"]["TriggerNameByPlace"];
type StoryCallback = (usefulStuff: ReturnType<typeof getUsefulStoryStuff>) => void;
type SegmentNameFromCameraAndPlace<T_Place extends keyof PlaceInfoByName, T_Cam extends keyof PlaceInfoByName[T_Place]["segmentTimesByCamera"]> = keyof PlaceInfoByName[T_Place]["segmentTimesByCamera"][T_Cam];
type CameraNameFromPlace<T_Place extends keyof PlaceInfoByName> = keyof PlaceInfoByName[T_Place]["segmentTimesByCamera"];
export declare function getUsefulStoryStuff(): {
    storyState: any;
    storyRefs: any;
    globalState: any;
    nowSegmentName: any;
    nowPlaceName: any;
    nowCamName: any;
    placesRefs: Record<string, any>;
    placeRefs: any;
    camsRefs: any;
    camRefs: any;
};
export declare function setStoryState(newState: Partial<StoryState>): void;
type CamChangeRulesParam = Partial<{
    [P_PlaceName in PlaceName]: Partial<Record<CameraNameFromPlace<P_PlaceName>, (usefulStuff: ReturnType<typeof getUsefulStoryStuff>) => void>>;
}>;
type CamChangeRulesReturn = {
    start: (ruleName: "whenPropertyChanges") => void;
    stop: (ruleName: "whenPropertyChanges") => void;
    startAll: () => void;
    stopAll: () => void;
    ruleNames: "whenPropertyChanges"[];
    run: (ruleName: "whenPropertyChanges") => void;
    runAll: () => void;
};
export declare function makeCamChangeRules(callBacksObject: CamChangeRulesParam): CamChangeRulesReturn;
export declare function makeCamLeaveRules(callBacksObject: CamChangeRulesParam): CamChangeRulesReturn;
type CamSegmentRulesOptions = Partial<{
    [P_PlaceName in PlaceName]: Partial<{
        [P_CamName in CameraNameFromPlace<P_PlaceName>]: (usefulStuff: ReturnType<typeof getUsefulStoryStuff>) => SegmentNameFromCameraAndPlace<P_PlaceName, P_CamName>;
    }>;
}>;
export declare function makeCamSegmentRules(callBacksObject: CamSegmentRulesOptions): {
    startAll(): void;
    stopAll(): void;
};
export declare function makePickupsRules({ onUsePickupAtTrigger, onUsePickupToTalk, onUsePickupGenerally, }: {
    onUsePickupAtTrigger: ReturnType<typeof makeOnUsePickupAtTrigger>;
    onUsePickupToTalk: ReturnType<typeof makeOnUsePickupToTalk>;
    onUsePickupGenerally: ReturnType<typeof makeOnUsePickupGenerally>;
}): {
    startAll(): void;
    stopAll(): void;
};
export declare function makeInteractButtonRules({ onInteractAtTrigger, onInteractAtTalk, }: {
    onInteractAtTrigger: ReturnType<typeof makeOnInteractAtTrigger>;
    onInteractAtTalk: ReturnType<typeof makeOnInteractToTalk>;
}): {
    start: (ruleName: "whenInteractButtonClicked") => void;
    stop: (ruleName: "whenInteractButtonClicked") => void;
    startAll: () => void;
    stopAll: () => void;
    ruleNames: "whenInteractButtonClicked"[];
    run: (ruleName: "whenInteractButtonClicked") => void;
    runAll: () => void;
};
type OnInteractAtTriggerOptions = Partial<{
    [P_PlaceName in PlaceName]: Partial<{
        [P_TriggerName in TriggerNameByPlace[P_PlaceName]]: StoryCallback;
    }>;
}>;
export declare function makeOnInteractAtTrigger(callBacksObject: OnInteractAtTriggerOptions, characterNameParam?: CharacterName): () => void;
type OnInteractToTalkOptions = Partial<{
    [P_DollName in DollName]: StoryCallback;
}>;
export declare function makeOnInteractToTalk(callBacksObject: OnInteractToTalkOptions, distanceType?: "touch" | "talk", characterNameParam?: CharacterName): () => void;
type OnUsePickupAtTriggerOptions = Partial<{
    [P_PlaceName in PlaceName]: Partial<{
        [P_TriggerName in TriggerNameByPlace[P_PlaceName]]: Partial<{
            [P_PickupName in PickupName]: StoryCallback;
        }>;
    }>;
}>;
export declare function makeOnUsePickupAtTrigger(callBacksObject: OnUsePickupAtTriggerOptions, characterNameParam?: CharacterName): <T_PickupName extends string>(pickupName: T_PickupName) => false | undefined;
type OnUsePickupGenerallyOptions = Partial<{
    [P_PickupName in PickupName]: StoryCallback;
}>;
export declare function makeOnUsePickupGenerally(callBacksObject: OnUsePickupGenerallyOptions): <T_PickupName extends string>(pickupName: T_PickupName) => void;
type OnUsePickupToTalkOptions = Partial<{
    [P_DollName in DollName]: Partial<{
        [P_PickupName in PickupName]: StoryCallback;
    }>;
}>;
export declare function makeOnUsePickupToTalk(callBacksObject: OnUsePickupToTalkOptions, characterNameParam?: CharacterName): <T_PickupName extends string>(pickupName: T_PickupName) => false | undefined;
type PlaceLoadRulesOptions = Partial<{
    [P_PlaceName in PlaceName]: StoryCallback;
}>;
export declare function makePlaceLoadRules(atStartOfEachPlace: StoryCallback, callBacksObject: PlaceLoadRulesOptions): {
    start: (ruleName: "whenPlaceFinishedLoading") => void;
    stop: (ruleName: "whenPlaceFinishedLoading") => void;
    startAll: () => void;
    stopAll: () => void;
    ruleNames: "whenPlaceFinishedLoading"[];
    run: (ruleName: "whenPlaceFinishedLoading") => void;
    runAll: () => void;
};
export declare function makePlaceUnloadRules(callBacksObject: PlaceLoadRulesOptions): {
    start: (ruleName: "whenPlaceFinishedUnloading") => void;
    stop: (ruleName: "whenPlaceFinishedUnloading") => void;
    startAll: () => void;
    stopAll: () => void;
    ruleNames: "whenPlaceFinishedUnloading"[];
    run: (ruleName: "whenPlaceFinishedUnloading") => void;
    runAll: () => void;
};
type TouchRulesOptions = Partial<{
    [P_DollName in DollName]: (usefulStuff: ReturnType<typeof getUsefulStoryStuff>) => void;
}>;
export declare function makeTouchRules(callBacksObject: TouchRulesOptions, options?: {
    characterName?: CharacterName;
    distanceType?: "touch" | "talk" | "see";
    whenLeave?: boolean;
}): {
    start: (ruleName: "whenInRangeChangesToCheckTouch") => void;
    stop: (ruleName: "whenInRangeChangesToCheckTouch") => void;
    startAll: () => void;
    stopAll: () => void;
    ruleNames: "whenInRangeChangesToCheckTouch"[];
    run: (ruleName: "whenInRangeChangesToCheckTouch") => void;
    runAll: () => void;
};
type TriggerRulesOptions = Partial<{
    [P_CharacterName in CharacterName]: Partial<{
        [P_PlaceName in PlaceName]: Partial<{
            [P_TriggerName in TriggerNameByPlace[P_PlaceName]]: StoryCallback;
        }>;
    }>;
}>;
export declare function makeTriggerRules(callBacksObject: TriggerRulesOptions, options?: {
    whenLeave?: boolean;
}): {
    start: (ruleName: "whenAtTriggersChanges") => void;
    stop: (ruleName: "whenAtTriggersChanges") => void;
    startAll: () => void;
    stopAll: () => void;
    ruleNames: "whenAtTriggersChanges"[];
    run: (ruleName: "whenAtTriggersChanges") => void;
    runAll: () => void;
};
export {};
