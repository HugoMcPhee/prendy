import { MyTypes } from "./declarations";

type AnyAnimationName = MyTypes["Main"]["AnyAnimationName"];
type CameraNameByPlace = MyTypes["Main"]["CameraNameByPlace"];
type CharacterName = MyTypes["Main"]["CharacterName"];
type ModelName = MyTypes["Main"]["ModelName"];
type ModelNamesByPlaceLoose = MyTypes["Main"]["ModelNamesByPlaceLoose"];
type PickupName = MyTypes["Main"]["PickupName"];
type PlaceName = MyTypes["Main"]["PlaceName"];
type SegmentNameByPlace = MyTypes["Main"]["SegmentNameByPlace"];
type SpotNameByPlace = MyTypes["Main"]["SpotNameByPlace"];
type TriggerNameByPlace = MyTypes["Main"]["TriggerNameByPlace"];

type ToNewOption<T_PlaceName extends PlaceName> = {
  [P_PlaceName in Exclude<PlaceName, T_PlaceName>]: {
    toPlace: P_PlaceName;
    toSpot: SpotNameByPlace[P_PlaceName];
    toCam?: CameraNameByPlace[P_PlaceName];
    toSegment?: SegmentNameByPlace[P_PlaceName];
  };
}[Exclude<PlaceName, T_PlaceName>];

type DoorsInfo = Partial<{
  [P_PlaceName in PlaceName]: Partial<{
    [P_TriggerName in TriggerNameByPlace[P_PlaceName]]: ToNewOption<P_PlaceName>;
  }>;
}>;

export function makePrendyOptions<
  T_Place extends PlaceName,
  T_Cam extends CameraNameByPlace[T_Place] // NOTE could limit to the chosen segment,
>(options: {
  place: T_Place;
  segment: SegmentNameByPlace[T_Place];
  camera: T_Cam;
  heldPickups: PickupName[];
  playerCharacter: CharacterName;
  playerAnimations: { walking: AnyAnimationName; idle: AnyAnimationName };
  zoomLevels: {
    default: number;
    max: number;
  };
  walkSpeed: number;
  animationSpeed: number;
  headHeightOffsets: Partial<Record<ModelName, number>>; // maybe eventually move to being automatic by finding a bone with"neck" in its name
  doorsInfo?: DoorsInfo;
  modelNamesByPlace: ModelNamesByPlaceLoose; // NOTE Could include chapter too so it can load models later (like fly in eggventure)
  // NOTE could add charactersWithSpeechBubbles (or dollsWithSpeechBubbles , or another way to define speechBubbles outside of characters)
  hasInteracting?: boolean; // hides the interact button
  hasJumping?: boolean; // hides the jump button
}) {
  return options;
}
