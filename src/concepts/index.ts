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
import stackVids from "./stackVids";
import {
  CharacterOptionsPlaceholder,
  GameyStartOptionsUntyped,
  ModelInfoByNamePlaceholder,
  PlaceInfoByNamePlaceholder,
} from "./typedConceptoFuncs";

export const gameyFlowNames = [
  // updating internal video states
  "safeVidStateUpdates",
  "stackVidStateUpdates",
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
  "checkVideoLoop", // handling video loop? // note this wasn't working when done before "chooseVideoSection" , so mvoed to the last flow as a quick probably temporary fix
  "chooseVideoSection", // when game logic changes to choose a new video section ( like when wantedCamera or segment changes)
  "sectionVidWantsToPlay",
  "sectionVidWantsToPlay2", // just a easier way to react to a second subscriber in sectionVids , instead of inlining what to do when vidLetter_play and vidLetter_wait changes
  "stackVidWantsToPlay",
  "safeVidWantsToPlay",
  // drawing to the screen
  "default", // draw components
  "rendering", // = painting, hopefully it can fix the 1 frame delay from resolving videos on default "subscribe"
] as const;

export type FlowName = typeof gameyFlowNames[number];

export function makeGameyConcepts<
  GameyStartOptions extends GameyStartOptionsUntyped,
  PlaceInfoByName extends PlaceInfoByNamePlaceholder<PlaceName>,
  ModelInfoByName extends ModelInfoByNamePlaceholder<ModelName>,
  CharacterOptions extends CharacterOptionsPlaceholder<
    CharacterName,
    ModelName,
    FontName
  >,
  ModelName extends string,
  DollName extends string,
  CharacterName extends string,
  AnyCameraName extends string,
  AnySegmentName extends string,
  AnySpotName extends string,
  AnyTriggerName extends string,
  PlaceName extends string,
  PickupName extends string,
  AnyAnimationName extends string,
  SoundName extends string,
  MusicName extends string,
  FontName extends string,
  SpeechVidName extends string,
  CameraNameByPlace extends Record<PlaceName, AnyCameraName>,
  SoundspotNameByPlace extends Record<PlaceName, string>,
  SpotNameByPlace extends Record<PlaceName, AnySpotName>,
  TriggerNameByPlace extends Record<PlaceName, AnyTriggerName>,
  WallNameByPlace extends Record<PlaceName, string>,
  AnimationNameByModel extends Record<ModelName, AnyAnimationName>,
  BoneNameByModel extends Record<ModelName, string>,
  MaterialNameByModel extends Record<ModelName, string>,
  MeshNameByModel extends Record<ModelName, string>
>(
  gameyStartOptions: GameyStartOptions,
  placeInfoByName: PlaceInfoByName,
  modelInfoByName: ModelInfoByName,
  characterOptions: CharacterOptions,
  placeNames: readonly PlaceName[],
  modelNames: readonly ModelName[],
  dollNames: readonly DollName[],
  characterNames: readonly CharacterName[],
  musicNames: readonly MusicName[],
  soundNames: readonly SoundName[],
  fontNames: readonly FontName[]
) {
  return {
    keyboards: keyboards(),
    miniBubbles: miniBubbles<CharacterName>(),
    pointers: pointers(),
    global: global<
      GameyStartOptions,
      AnySegmentName,
      PlaceName,
      ModelName,
      DollName,
      PickupName,
      CharacterName,
      MusicName,
      SoundName,
      PlaceInfoByName
    >(gameyStartOptions, musicNames, soundNames),
    models: models<ModelName>(modelNames),
    dolls: dolls<
      ModelName,
      DollName,
      AnySpotName,
      AnyAnimationName,
      AnimationNameByModel,
      BoneNameByModel,
      MaterialNameByModel,
      MeshNameByModel,
      ModelInfoByName
    >(modelNames, dollNames, modelInfoByName),
    characters: characters<DollName, AnyTriggerName, AnyCameraName>(dollNames),
    players: players<GameyStartOptions, AnyAnimationName>(gameyStartOptions),
    speechBubbles: speechBubbles<
      CharacterName,
      FontName,
      SpeechVidName,
      CharacterOptionsPlaceholder<CharacterName, ModelName, FontName>
    >(characterNames, characterOptions, fontNames),
    places: places<
      PlaceName,
      AnyCameraName,
      TriggerNameByPlace,
      CameraNameByPlace,
      SoundspotNameByPlace,
      WallNameByPlace,
      SpotNameByPlace,
      PlaceInfoByName
    >(placeNames, placeInfoByName),
    safeVids: safeVids<PlaceName, PlaceInfoByName>(placeNames, placeInfoByName),
    stackVids: stackVids(placeNames),
    sectionVids: sectionVids(placeNames),
  };
}
