export declare function makeGetBackdopOptions<PickupName extends string, PlaceName extends string, ModelName extends string, CharacterName extends string, AnyAnimationName extends string, TriggerNameByPlace extends Record<PlaceName, string>, CameraNameByPlace extends Record<PlaceName, string>, SpotNameByPlace extends Record<PlaceName, string>, ModelNamesByPlaceLoose extends Record<PlaceName, ModelName[]>, SegmentNameByPlace extends Record<PlaceName, string>>(): <T_Place extends PlaceName, T_Cam extends CameraNameByPlace[T_Place]>(options: {
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
    doorsInfo?: Partial<{ [P_PlaceName in PlaceName]: Partial<{ [P_TriggerName in TriggerNameByPlace[P_PlaceName]]: { [P_PlaceName_1 in Exclude<PlaceName, P_PlaceName>]: {
        toPlace: P_PlaceName_1;
        toSpot: SpotNameByPlace[P_PlaceName_1];
        toCam?: CameraNameByPlace[P_PlaceName_1];
        toSegment?: SegmentNameByPlace[P_PlaceName_1];
    }; }[Exclude<PlaceName, P_PlaceName>]; }>; }>;
    modelNamesByPlace: ModelNamesByPlaceLoose;
}) => {
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
    doorsInfo?: Partial<{ [P_PlaceName in PlaceName]: Partial<{ [P_TriggerName in TriggerNameByPlace[P_PlaceName]]: { [P_PlaceName_1 in Exclude<PlaceName, P_PlaceName>]: {
        toPlace: P_PlaceName_1;
        toSpot: SpotNameByPlace[P_PlaceName_1];
        toCam?: CameraNameByPlace[P_PlaceName_1];
        toSegment?: SegmentNameByPlace[P_PlaceName_1];
    }; }[Exclude<PlaceName, P_PlaceName>]; }>; }>;
    modelNamesByPlace: ModelNamesByPlaceLoose;
};
