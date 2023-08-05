import { AnyAnimationName, CameraNameByPlace, CharacterName, ModelName, ModelNamesByPlaceLoose, PickupName, PlaceName, SegmentNameByPlace, SpotNameByPlace, TriggerNameByPlace } from "./declarations";
declare type ToNewOption<T_PlaceName extends PlaceName> = {
    [P_PlaceName in Exclude<PlaceName, T_PlaceName>]: {
        toPlace: P_PlaceName;
        toSpot: SpotNameByPlace[P_PlaceName];
        toCam?: CameraNameByPlace[P_PlaceName];
        toSegment?: SegmentNameByPlace[P_PlaceName];
    };
}[Exclude<PlaceName, T_PlaceName>];
declare type DoorsInfo = Partial<{
    [P_PlaceName in PlaceName]: Partial<{
        [P_TriggerName in TriggerNameByPlace[P_PlaceName]]: ToNewOption<P_PlaceName>;
    }>;
}>;
export declare function makePrendyOptions<T_Place extends PlaceName, T_Cam extends CameraNameByPlace[T_Place]>(options: {
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
    headHeightOffsets: Partial<Record<ModelName, number>>;
    doorsInfo?: DoorsInfo;
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
    headHeightOffsets: Partial<Record<ModelName, number>>;
    doorsInfo?: Partial<{
        [x: string]: Partial<{
            [x: string]: never;
        }>;
    }> | undefined;
    modelNamesByPlace: ModelNamesByPlaceLoose;
    hasInteracting?: boolean | undefined;
    hasJumping?: boolean | undefined;
};
export {};
