import { AnyAnimationName, CameraNameByPlace, CharacterName, ModelNamesByPlaceLoose, PickupName, PlaceName, SegmentNameByPlace, SpotNameByPlace, TriggerNameByPlace } from "./declarations";
declare type ToNewOption<T_PlaceName extends PlaceName> = {
    [P_PlaceName in Exclude<PlaceName, T_PlaceName>]: {
        toPlace: P_PlaceName;
        toSpot: SpotNameByPlace[P_PlaceName];
        toCam?: CameraNameByPlace[P_PlaceName];
        toSegment?: SegmentNameByPlace[P_PlaceName];
    };
}[Exclude<PlaceName, T_PlaceName>];
declare type DoorsInfo<A_PlaceName extends PlaceName = PlaceName> = Partial<{
    [P_PlaceName in A_PlaceName]: Partial<{
        [P_TriggerName in TriggerNameByPlace[P_PlaceName]]: ToNewOption<P_PlaceName>;
    }>;
}>;
export declare function getPrendyOptions<T_Place extends PlaceName, T_Cam extends CameraNameByPlace[T_Place], // NOTE could limit to the chosen segment,
A_Place extends PlaceName = PlaceName>(options: {
    place: T_Place;
    segment: SegmentNameByPlace[T_Place];
    camera: T_Cam;
    heldPickups: PickupName[];
    playerCharacter: CharacterName;
    playerAnimations: {
        walking: AnyAnimationName;
        idle: AnyAnimationName;
    };
    zoomLevels: {
        default: number;
        max: number;
    };
    walkSpeed: number;
    animationSpeed: number;
    headHeightOffset: number;
    doorsInfo?: DoorsInfo<A_Place>;
    modelNamesByPlace: ModelNamesByPlaceLoose;
    hasInteracting?: boolean;
    hasJumping?: boolean;
}): {
    place: T_Place;
    segment: SegmentNameByPlace[T_Place];
    camera: T_Cam;
    heldPickups: PickupName[];
    playerCharacter: CharacterName;
    playerAnimations: {
        walking: AnyAnimationName;
        idle: AnyAnimationName;
    };
    zoomLevels: {
        default: number;
        max: number;
    };
    walkSpeed: number;
    animationSpeed: number;
    headHeightOffset: number;
    doorsInfo?: Partial<{ [P_PlaceName in A_Place]: Partial<{
        [x: string]: ToNewOption<P_PlaceName>;
    }>; }> | undefined;
    modelNamesByPlace: ModelNamesByPlaceLoose;
    hasInteracting?: boolean | undefined;
    hasJumping?: boolean | undefined;
};
export {};
