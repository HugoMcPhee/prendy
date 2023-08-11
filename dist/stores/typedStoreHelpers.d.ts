export type CharacterOptionsPlaceholder<CharacterName extends string, DollName extends string, FontName extends string> = Record<CharacterName, {
    doll: any;
    font: any;
}>;
export type DollOptionsPlaceholder<DollName extends string, ModelName extends string> = Record<DollName, {
    model: any;
}>;
export type PrendyStoresUntypedType = Record<any, {
    state: (itemName: any) => any;
    refs: (itemName: any, type: any) => any;
    startStates?: Record<any, any>;
}>;
export type PrendyStoreHelpersUntypedType = {
    getState: () => Record<any, Record<any, Record<any, any | any[]>>>;
    getPreviousState: () => Record<any, Record<any, Record<any, any | any[]>>>;
    getRefs: () => Record<any, Record<any, Record<any, any | any[]>>>;
    setState: (newState: Record<any, Record<any, Record<any, any | any[]>>> | ((state: Record<any, Record<any, Record<any, any | any[]>>>) => any), callback?: (nextFrameDuration: number) => any) => void;
    startItemEffect: AnyFunction;
    startEffect: AnyFunction;
    stopEffect: AnyFunction;
    makeRules: (...args: any) => {
        stopAll: AnyFunction;
        startAll: AnyFunction;
        start: AnyFunction;
        stop: AnyFunction;
        ruleNames: any[];
    };
    makeDynamicRules: (...args: any) => {
        stopAll: AnyFunction;
        startAll: AnyFunction;
        start: AnyFunction;
        stop: AnyFunction;
        ruleNames: any[];
    };
    makeRuleMaker: AnyFunction;
    makeNestedRuleMaker: AnyFunction;
    makeNestedLeaveRuleMaker: AnyFunction;
    onNextTick: AnyFunction;
    addItem: AnyFunction;
    removeItem: AnyFunction;
    getItem: AnyFunction;
    useStore: AnyFunction;
    useStoreItem: AnyFunction;
    useStoreEffect: AnyFunction;
    useStoreItemEffect: AnyFunction;
    useStoreItemPropsEffect: AnyFunction;
};
type AnyFunction = (...args: any) => any;
export interface PrendyStoresUntyped extends PrendyStoresUntypedType {
}
export interface PrendyStoreHelpersUntyped extends PrendyStoreHelpersUntypedType {
}
export type PlaceInfoByNamePlaceholder<PlaceName extends string> = Record<PlaceName, {
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
export type ModelInfoByNamePlaceholder<ModelName extends string> = Record<ModelName, {
    modelFile: string;
    animationNames: readonly string[];
    boneNames: readonly string[];
    meshNames: readonly string[];
    materialNames: readonly string[];
    skeletonName: string;
}>;
export type PickupsInfoPlaceholder<PickupName extends string> = Record<PickupName, {
    name: string;
    hint: string;
    image: string;
}>;
export type DeepWriteable<T> = {
    -readonly [P in keyof T]: DeepWriteable<T[P]>;
};
type ToNewOptionUntyped = {
    toPlace: string;
    toSpot: string;
    toCam?: string;
    toSegment?: string;
};
export type PrendyOptionsUntyped = {
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
    headHeightOffsets: Record<string, number>;
    doorsInfo?: Partial<Record<string, Partial<Record<string, ToNewOptionUntyped>>>>;
    modelNamesByPlace: Record<string, string[]>;
    hasInteracting?: boolean;
    hasJumping?: boolean;
};
type ToPlaceOption<AnyCameraName extends string, AnySegmentName extends string, PlaceName extends string, AnySpotName extends string> = {
    toPlace: PlaceName;
    toSpot: AnySpotName;
    toCam?: AnyCameraName;
    toSegment?: AnySegmentName;
};
export type PrendyOptionsGeneric<AnyCameraName extends string, AnySegmentName extends string, PlaceName extends string, CharacterName extends string, PickupName extends string, ModelName extends string, AnySpotName extends string> = {
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
    headHeightOffsets: Record<string, number>;
    doorsInfo?: Partial<Record<PlaceName, Partial<Record<string, ToPlaceOption<AnyCameraName, AnySegmentName, PlaceName, AnySpotName>>>>>;
    modelNamesByPlace: Record<PlaceName, ModelName[]>;
};
export {};
