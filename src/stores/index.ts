import {
  AnimationNameByModel,
  AnyAnimationName,
  AnyCameraName,
  AnySegmentName,
  AnySpotName,
  AnyTriggerName,
  PrendyAssets,
  PrendyOptions,
  BoneNameByModel,
  CameraNameByPlace,
  CharacterName,
  CharacterOptions,
  DollName,
  DollOptions,
  MaterialNameByModel,
  MeshNameByModel,
  ModelName,
  PickupName,
  PlaceInfoByName,
  PlaceName,
  SoundspotNameByPlace,
  SpotNameByPlace,
  TriggerNameByPlace,
  WallNameByPlace,
} from "../declarations";
import characters from "./characters";
import dolls from "./dolls";
import global from "./global";
import keyboards from "./keyboards";
import miniBubbles from "./miniBubbles";
import models from "./models";
import places from "./places";
import players from "./players";
import pointers from "./pointers";
import safeVids from "./safeVids";
import sectionVids from "./sectionVids";
import speechBubbles from "./speechBubbles";

export const prendyStepNames = [
  // updating internal video states
  "safeVidStateUpdates",
  "sectionVidStateUpdates",
  // game stuff
  "respondToNewPlace", // TODO Maybe use this for when a place loads, and the other "loadNewPlace" for starting to load a place?
  "cameraChange", // meant for checking stuff like nowCamName and nowSegmentName changed by listening to sectionVidStateUpdates
  "input", // input updates position
  "editPosition", // editMovement" ,?
  "positionReaction", // ?
  "checkCollisions", // editMovement" ,?
  "collisionReaction",
  "story", // might need to set things for the next frame, so it can respond, OR have story stuff run in different flows ")"
  "storyReaction", // if playerMovingPaused was set in or before story, this is where it can be reacted to before dollAnimation
  "planePosition",
  "planePositionStartMovers",
  "dollAnimation",
  "dollAnimation2",
  "dollAnimationStartMovers",
  "positionUi", // positioned ui like speech bubbles
  "loadNewPlaceModels", //
  "loadNewPlace", // might ned a load new place, and respondToNewPlace seperate parts
  // deciding and changing for next videos
  // "checkVideoLoop", // handling video loop? // note this wasn't working when done before "chooseVideoSection" , so mvoed to the last flow as a quick probably temporary fix
  "chooseVideoSection", // when game logic changes to choose a new video section ( like when wantedCamera or segment changes)
  "sectionVidWantsToPlay",
  "sectionVidWantsToPlay2", // just a easier way to react to a second subscriber in sectionVids , instead of inlining what to do when vidLetter_play and vidLetter_wait changes
  "safeVidWantsToPlay",
  // drawing to the screen
  "default", // draw components
  "rendering", // = painting, hopefully it can fix the 1 frame delay from resolving videos on default "subscribe"
  "overlay", // = painting extra scenes to show ontop of everything
] as const;

export type StepName = typeof prendyStepNames[number];

// NOTE the generic types are used to prevent the typescript compiler widneing
// [K_CharacterName in CharacterName] to [x: string]
// or
// Record<PlaceName, Something> to Record<string, Something>
// it keeps the types generic , which is good since the types are updated from each project (declaration merging)

export function makePrendyStores<
  A_CharacterName extends CharacterName = CharacterName,
  A_PlaceName extends PlaceName = PlaceName,
  A_AnyCameraName extends AnyCameraName = AnyCameraName,
  A_PrendyAssets extends PrendyAssets = PrendyAssets,
  A_CameraNameByPlace extends CameraNameByPlace = CameraNameByPlace,
  A_SoundspotNameByPlace extends SoundspotNameByPlace = SoundspotNameByPlace,
  A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace,
  A_TriggerNameByPlace extends TriggerNameByPlace = TriggerNameByPlace,
  A_WallNameByPlace extends WallNameByPlace = WallNameByPlace,
  A_AnyAnimationName extends AnyAnimationName = AnyAnimationName,
  A_PrendyOptions extends PrendyOptions = PrendyOptions,
  A_AnySegmentName extends AnySegmentName = AnySegmentName,
  A_DollName extends DollName = DollName,
  A_ModelName extends ModelName = ModelName,
  A_PickupName extends PickupName = PickupName,
  A_PlaceInfoByName extends PlaceInfoByName = PlaceInfoByName,
  A_AnimationNameByModel extends AnimationNameByModel = AnimationNameByModel,
  A_AnySpotName extends AnySpotName = AnySpotName,
  A_BoneNameByModel extends BoneNameByModel = BoneNameByModel,
  A_DollOptions extends DollOptions = DollOptions,
  A_MaterialNameByModel extends MaterialNameByModel = MaterialNameByModel,
  A_MeshNameByModel extends MeshNameByModel = MeshNameByModel,
  A_AnyTriggerName extends AnyTriggerName = AnyTriggerName,
  A_CharacterOptions extends CharacterOptions = CharacterOptions
>(prendyStartOptions: A_PrendyOptions, prendyAssets: A_PrendyAssets) {
  return {
    keyboards: keyboards(),
    miniBubbles: miniBubbles<A_PrendyAssets, A_CharacterName>(prendyAssets),
    pointers: pointers(),
    global: global<
      A_AnySegmentName,
      A_PrendyAssets,
      A_PrendyOptions,
      A_CharacterName,
      A_DollName,
      A_ModelName,
      A_PickupName,
      A_PlaceInfoByName,
      A_PlaceName
    >(prendyStartOptions, prendyAssets),
    models: models<A_PrendyAssets, A_ModelName>(prendyAssets),
    dolls: dolls<
      A_AnimationNameByModel,
      A_AnyAnimationName,
      A_AnySpotName,
      A_PrendyAssets,
      A_BoneNameByModel,
      A_DollName,
      A_DollOptions,
      A_MaterialNameByModel,
      A_MeshNameByModel,
      A_ModelName
    >(prendyAssets),
    characters: characters<
      A_CharacterName,
      A_DollName,
      A_AnyTriggerName,
      A_AnyCameraName,
      A_CharacterOptions,
      A_PrendyAssets
    >(prendyAssets),
    players: players<A_AnyAnimationName, A_PrendyOptions>(prendyStartOptions),
    speechBubbles: speechBubbles<A_PrendyAssets, A_CharacterName>(prendyAssets),
    places: places<
      A_PlaceName,
      A_AnyCameraName,
      A_PrendyAssets,
      A_CameraNameByPlace,
      A_SoundspotNameByPlace,
      A_SpotNameByPlace,
      A_TriggerNameByPlace,
      A_WallNameByPlace
    >(prendyAssets),
    safeVids: safeVids<A_PrendyAssets, A_PlaceName>(prendyAssets),
    sectionVids: sectionVids<A_PrendyAssets, A_PlaceName>(prendyAssets),
  };
}
