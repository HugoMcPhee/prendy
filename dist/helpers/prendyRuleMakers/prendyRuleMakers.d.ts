import { MyTypes } from "../../declarations";
type PrendyStoreHelpers = MyTypes["Repond"];
type AllState = ReturnType<PrendyStoreHelpers["getState"]>;
type StoryState = AllState["story"]["main"];
export declare function getUsefulStoryStuff(): {
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
export declare function setStoryState(newState: Partial<StoryState>): void;
export declare function makeAllStoryRuleMakers(storeHelpers: MyTypes["Repond"], placeInfoByName: MyTypes["Types"]["PlaceInfoByName"], characterNames: readonly MyTypes["Types"]["CharacterName"][], dollNames: readonly MyTypes["Types"]["DollName"][]): {
    makeCamChangeRules: (callBacksObject: Partial<{
        [x: string]: Partial<Record<string, (usefulStuff: ReturnType<typeof getUsefulStoryStuff>) => void>>;
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
        [x: string]: Partial<Record<string, (usefulStuff: ReturnType<typeof getUsefulStoryStuff>) => void>>;
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
            [x: string]: (usefulStuff: ReturnType<typeof getUsefulStoryStuff>) => string;
        }>;
    }>) => {
        startAll(): void;
        stopAll(): void;
    };
    makeOnInteractAtTrigger: (callBacksObject: Partial<{
        [x: string]: Partial<{
            [x: string]: (usefulStuff: ReturnType<typeof getUsefulStoryStuff>) => void;
        }>;
    }>, characterName?: string) => () => void;
    makeOnInteractToTalk: (callBacksObject: Partial<{
        [x: string]: (usefulStuff: ReturnType<typeof getUsefulStoryStuff>) => void;
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
                [x: string]: (usefulStuff: ReturnType<typeof getUsefulStoryStuff>) => void;
            }>;
        }>;
    }>, characterName?: string) => <T_PickupName extends string>(pickupName: T_PickupName) => false | undefined;
    makeOnUsePickupGenerally: (callBacksObject: Partial<{
        [x: string]: (usefulStuff: ReturnType<typeof getUsefulStoryStuff>) => void;
    }>) => <T_PickupName_1 extends string>(pickupName: T_PickupName_1) => void;
    makeOnUsePickupToTalk: (callBacksObject: Partial<{
        [x: string]: Partial<{
            [x: string]: (usefulStuff: ReturnType<typeof getUsefulStoryStuff>) => void;
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
    makePlaceLoadRules: (atStartOfEachPlace: (usefulStuff: ReturnType<typeof getUsefulStoryStuff>) => void, callBacksObject: Partial<{
        [x: string]: (usefulStuff: ReturnType<typeof getUsefulStoryStuff>) => void;
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
        [x: string]: (usefulStuff: ReturnType<typeof getUsefulStoryStuff>) => void;
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
        [x: string]: (usefulStuff: ReturnType<typeof getUsefulStoryStuff>) => void;
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
                [x: string]: (usefulStuff: ReturnType<typeof getUsefulStoryStuff>) => void;
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
        run: (...args: any) => any;
        runAll: (...args: any) => any;
    };
};
export {};
