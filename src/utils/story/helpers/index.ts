import {
  BackdopConcepFuncs,
  BackdopOptionsUntyped,
  ModelInfoByNamePlaceholder,
  PlaceholderBackdopConcepts,
  PlaceInfoByNamePlaceholder,
} from "../../../concepts/typedConcepFuncs";
import { makeCharacterStoryHelpers } from "./characters";
import { makeDollStoryHelpers } from "./dolls";
import { makerPlayerStoryHelpers } from "./players";
import { makeSceneStoryHelpers } from "./scene";
import { makeSoundStoryHelpers } from "./sound";
import { makeSpeechStoryHelpers } from "./speech";
import { makeStickerStoryHelpers } from "./stickers";

// importing each of the helpers

// function doThis

export function makeBackdopStoryHelpers<
  ConcepFuncs extends BackdopConcepFuncs,
  BackdopConcepts extends PlaceholderBackdopConcepts,
  BackdopOptions extends BackdopOptionsUntyped,
  ModelName extends string,
  PlaceName extends string,
  DollName extends string,
  CharacterName extends string,
  AnyCameraName extends string,
  AnySegmentName extends string,
  AnyAnimationName extends string,
  PickupName extends string,
  MusicName extends string,
  MusicFiles extends Record<MusicName, string>,
  AnimationNameByModel extends Record<ModelName, string>,
  MeshNameByModel extends Record<ModelName, string>,
  SpotNameByPlace extends Record<PlaceName, string>,
  ModelInfoByName extends ModelInfoByNamePlaceholder<ModelName>,
  PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>,
  WallNameByPlace extends Record<PlaceName, string>,
  SegmentNameByPlace extends Record<PlaceName, string>,
  CameraNameByPlace extends Record<PlaceName, string>
>(
  concepFuncs: ConcepFuncs,
  backdopConcepts: BackdopConcepts,
  backdopStartOptions: BackdopOptions,
  modelInfoByName: ModelInfoByName,
  characterNames: readonly CharacterName[],
  placeInfoByName: PlaceInfoByName,
  musicNames: readonly MusicName[],
  musicFiles: MusicFiles
) {
  const {
    lookAtEachother,
    lookAtOtherCharacter,
    moveCharacterAt2DAngle,
    setCharAnimation,
    setCharPosition,
    setCharRotationY,
    springAddToCharRotationY,
    springCharRotation,
  } = makeCharacterStoryHelpers<
    ConcepFuncs,
    BackdopConcepts,
    BackdopOptions,
    ModelName,
    PlaceName,
    DollName,
    CharacterName,
    AnimationNameByModel,
    MeshNameByModel,
    SpotNameByPlace,
    ModelInfoByName
  >(
    concepFuncs,
    backdopConcepts,
    backdopStartOptions,
    modelInfoByName,
    characterNames
  );

  const {
    focusOnDoll,
    hideDoll,
    moveDollAt2DAngle,
    setDollAnimation,
    setDollPosition,
    setDollRotation,
    setDollRotationY,
    setDollToSpot,
    springAddToDollRotationY,
    springDollRotationY,
    springDollToSpot,
    toggleDollMeshes,
  } = makeDollStoryHelpers<
    ConcepFuncs,
    BackdopConcepts,
    BackdopOptions,
    ModelName,
    PlaceName,
    DollName,
    CharacterName,
    AnimationNameByModel,
    MeshNameByModel,
    SpotNameByPlace,
    ModelInfoByName
  >(concepFuncs, backdopConcepts, backdopStartOptions, modelInfoByName);

  const {
    enableMovement,
    isHolding,
    setPlayerAnimations,
    setPlayerToStartSpot,
    takePickup,
  } = makerPlayerStoryHelpers<
    ConcepFuncs,
    BackdopConcepts,
    BackdopOptions,
    ModelName,
    PlaceName,
    DollName,
    CharacterName,
    AnyAnimationName,
    PickupName,
    AnimationNameByModel,
    MeshNameByModel,
    SpotNameByPlace,
    ModelInfoByName
  >(
    concepFuncs,
    backdopConcepts,
    backdopStartOptions,
    modelInfoByName,
    characterNames
  );

  // NOTE maybe return in categores like players.enableMovement()
  const {
    changeCameraAtLoop,
    changeSegmentAtLoop,
    goToNewPlace,
    hideWallIf,
    lookAtSpot,
    setCamera,
    setNextSegment,
    showStoryView,
  } = makeSceneStoryHelpers<
    ConcepFuncs,
    AnyCameraName,
    AnySegmentName,
    PlaceName,
    CharacterName,
    PlaceInfoByName,
    SpotNameByPlace,
    WallNameByPlace,
    SegmentNameByPlace,
    CameraNameByPlace
  >(concepFuncs, placeInfoByName, characterNames);

  const { playNewMusic, stopAllMusic } = makeSoundStoryHelpers<
    ConcepFuncs,
    MusicName,
    MusicFiles
  >(concepFuncs, musicNames, musicFiles);

  const {
    hideMiniBubble,
    showAlarmText,
    showMiniBubble,
    showSpeech,
  } = makeSpeechStoryHelpers<
    ConcepFuncs,
    BackdopConcepts,
    BackdopOptions,
    CharacterName
  >(concepFuncs, backdopConcepts, backdopStartOptions, characterNames);

  const { hideSticker, moveSticker, showSticker } = makeStickerStoryHelpers<
    ConcepFuncs
  >(concepFuncs);

  return {
    // characters
    lookAtEachother,
    lookAtOtherCharacter,
    moveCharacterAt2DAngle,
    setCharAnimation,
    setCharPosition,
    setCharRotationY,
    springAddToCharRotationY,
    springCharRotation,
    // dolls
    focusOnDoll,
    hideDoll,
    moveDollAt2DAngle,
    setDollAnimation,
    setDollPosition,
    setDollRotation,
    setDollRotationY,
    setDollToSpot,
    springAddToDollRotationY,
    springDollRotationY,
    springDollToSpot,
    toggleDollMeshes,
    //players
    enableMovement,
    isHolding,
    setPlayerAnimations,
    setPlayerToStartSpot,
    takePickup,
    // scene
    changeCameraAtLoop,
    changeSegmentAtLoop,
    goToNewPlace,
    hideWallIf,
    lookAtSpot,
    setCamera,
    setNextSegment,
    showStoryView,
    // sound
    playNewMusic,
    stopAllMusic,
    // speech
    hideMiniBubble,
    showAlarmText,
    showMiniBubble,
    showSpeech,
    // stickers
    hideSticker,
    moveSticker,
    showSticker,
  };
}
