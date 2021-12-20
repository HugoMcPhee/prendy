import { ConceptsHelperTypes } from "pietem";
export declare type CharacterOptionsPlaceholder<CharacterName extends string, DollName extends string, FontName extends string> = Record<CharacterName, {
    doll: any;
    font: any;
}>;
export declare type DollOptionsPlaceholder<DollName extends string, ModelName extends string> = Record<DollName, {
    model: any;
}>;
export declare type PlaceholderPrendyConcepts = Record<any, {
    state: (itemName: any) => any;
    refs: (itemName: any, type: any) => any;
    startStates?: Record<any, any>;
}>;
export declare type PrendyConcepFuncs = {
    getState: () => Record<any, Record<any, Record<any, any | any[]>>>;
    getPreviousState: () => Record<any, Record<any, Record<any, any | any[]>>>;
    getRefs: () => Record<any, Record<any, Record<any, any | any[]>>>;
    setState: (newState: Record<any, Record<any, Record<any, any | any[]>>> | ((state: Record<any, Record<any, Record<any, any | any[]>>>) => any), callback?: (nextFrameDuration: number) => any) => void;
    startItemEffect: (...args: any) => any;
    startEffect: (...args: any) => any;
    stopEffect: (...args: any) => any;
    makeRules: (...args: any) => {
        stopAll: (...args: any) => any;
        startAll: (...args: any) => any;
        start: (...args: any) => any;
        stop: (...args: any) => any;
        ruleNames: any[];
    };
    makeDynamicRules: (...args: any) => {
        stopAll: (...args: any) => any;
        startAll: (...args: any) => any;
        start: (...args: any) => any;
        stop: (...args: any) => any;
        ruleNames: any[];
    };
    onNextTick: (...args: any) => any;
    addItem: (...args: any) => any;
    removeItem: (...args: any) => any;
    getItem: (...args: any) => any;
    useStore: (...args: any) => any;
    useStoreItem: (...args: any) => any;
    useStoreEffect: (...args: any) => any;
    useStoreItemEffect: (...args: any) => any;
    useStoreItemPropsEffect: (...args: any) => any;
};
declare type ItemType = keyof ReturnType<PrendyConcepFuncs["getState"]>;
declare type HelperType<T extends ItemType> = ConceptsHelperTypes<PrendyConcepFuncs["getState"], PrendyConcepFuncs["getRefs"], T>;
export declare type AllItemsState<T extends ItemType> = HelperType<T>["AllItemsState"];
export declare type ItemState<T extends ItemType> = HelperType<T>["ItemState"];
export declare type ItemRefs<T extends ItemType> = HelperType<T>["ItemRefs"];
export declare type PlaceInfoByNamePlaceholder<PlaceName extends string> = Record<PlaceName, {
    modelFile: string;
    videoFiles: {
        backdrop: string;
    };
    cameraNames: readonly string[];
    segmentDurations: Record<string, number>;
    segmentNames: readonly string[];
    wallNames: readonly string[];
    floorNames: readonly string[];
    triggerNames: readonly string[];
    spotNames: readonly string[];
    soundspotNames: readonly string[];
    probesByCamera: Record<string, string>;
    segmentTimesByCamera: Record<string, Record<string, number>>;
}>;
export declare type ModelInfoByNamePlaceholder<ModelName extends string> = Record<ModelName, {
    modelFile: string;
    animationNames: readonly string[];
    boneNames: readonly string[];
    meshNames: readonly string[];
    materialNames: readonly string[];
    skeletonName: string;
}>;
export declare type PickupsInfoPlaceholder<PickupName extends string> = Record<PickupName, {
    name: string;
    hint: string;
    image: string;
}>;
export declare type DeepWriteable<T> = {
    -readonly [P in keyof T]: DeepWriteable<T[P]>;
};
declare type ToNewOptionUntyped = {
    toPlace: string;
    toSpot: string;
    toCam?: string;
    toSegment?: string;
};
export declare type PrendyOptionsUntyped = {
    place: string;
    segment: string;
    camera: string;
    heldPickups: string[];
    playerCharacter: string;
    playerAnimations: {
        walking: string;
        idle: string;
    };
    zoomLevels: {
        default: number;
        max: number;
    };
    walkSpeed: number;
    animationSpeed: number;
    headHeightOffset: number;
    doorsInfo?: Partial<Record<string, Partial<Record<string, ToNewOptionUntyped>>>>;
    modelNamesByPlace: Record<string, string[]>;
    hasInteracting?: boolean;
    hasJumping?: boolean;
};
declare type ToPlaceOption<AnyCameraName extends string, AnySegmentName extends string, PlaceName extends string, AnySpotName extends string> = {
    toPlace: PlaceName;
    toSpot: AnySpotName;
    toCam?: AnyCameraName;
    toSegment?: AnySegmentName;
};
export declare type PrendyOptionsGeneric<AnyCameraName extends string, AnySegmentName extends string, PlaceName extends string, CharacterName extends string, PickupName extends string, ModelName extends string, AnySpotName extends string> = {
    place: PlaceName;
    segment: AnySegmentName;
    camera: AnyCameraName;
    heldPickups: PickupName[];
    playerCharacter: CharacterName;
    zoomLevels: {
        default: number;
        max: number;
    };
    walkSpeed: number;
    animationSpeed: number;
    headHeightOffset: number;
    doorsInfo?: Partial<Record<PlaceName, Partial<Record<string, ToPlaceOption<AnyCameraName, AnySegmentName, PlaceName, AnySpotName>>>>>;
    modelNamesByPlace: Record<PlaceName, ModelName[]>;
};
export {};
