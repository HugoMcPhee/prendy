export function makeGetGameyStartOptions<
  PickupName extends string,
  PlaceName extends string,
  ModelName extends string,
  CharacterName extends string,
  TriggerNameByPlace extends Record<PlaceName, string>,
  CameraNameByPlace extends Record<PlaceName, string>,
  SpotNameByPlace extends Record<PlaceName, string>,
  ModelNamesByPlaceLoose extends Record<PlaceName, ModelName[]>,
  SegmentNameByPlace extends Record<PlaceName, string>
>() {
  type ToNewOption<T_PlaceName extends PlaceName> = {
    [P_PlaceName in Exclude<PlaceName, T_PlaceName>]: {
      toPlace: P_PlaceName;
      toSpot: SpotNameByPlace[P_PlaceName];
      toCam?: CameraNameByPlace[P_PlaceName];
      toSegment?: SegmentNameByPlace[P_PlaceName];
    };
  }[Exclude<PlaceName, T_PlaceName>];

  type DoorsInfo = Partial<
    {
      [P_PlaceName in PlaceName]: Partial<
        {
          [P_TriggerName in TriggerNameByPlace[P_PlaceName]]: ToNewOption<P_PlaceName>;
        }
      >;
    }
  >;

  return function getGameyStartOptions<
    T_Place extends PlaceName,
    T_Cam extends CameraNameByPlace[T_Place] // NOTE could limit to the chosen segment,
  >(options: {
    place: T_Place;
    segment: SegmentNameByPlace[T_Place];
    camera: T_Cam;
    heldPickups: PickupName[];
    playerCharacter: CharacterName;
    zoomLevels: {
      default: number;
      max: number;
    };
    walkSpeed: number;
    animationSpeed: number; // 1.75 for rodont
    headHeightOffset: number; // 1.75 for rodont TODO update this to headHeightOffetsByModel, and maybe eventually move to being automatic by finding a bone with"neck" in its name
    doorsInfo?: DoorsInfo;
    modelNamesByPlace: ModelNamesByPlaceLoose; // NOTE Could include chapter too so it can load models later (like fly in eggventure)
    // NOTE could add charactersWithSpeechBubbles (or dollsWithSpeechBubbles , or another way to define speechBubbles outside of characters)
  }) {
    return options;
  };
}