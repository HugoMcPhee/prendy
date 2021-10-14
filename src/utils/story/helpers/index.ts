import {
  GameyConceptoFuncs,
  GameyStartOptionsUntyped,
  ModelInfoByNamePlaceholder,
  PlaceholderGameyConcepts,
  PlaceInfoByNamePlaceholder,
} from "../../../concepts/typedConceptoFuncs";
import { makeCharacterStoryHelpers } from "./characters";
import { makeDollStoryHelpers } from "./dolls";
import { makerPlayerStoryHelpers } from "./players";
import { makeSceneStoryHelpers } from "./scene";
import { makeSoundStoryHelpers } from "./sound";
import { makeSpeechStoryHelpers } from "./speech";
import { makeStickerStoryHelpers } from "./stickers";

// importing each of the helpers

// function doThis

export function makeGameyStoryHelpers<
  ConceptoFuncs extends GameyConceptoFuncs,
  GameyConcepts extends PlaceholderGameyConcepts,
  GameyStartOptions extends GameyStartOptionsUntyped,
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
  conceptoFuncs: ConceptoFuncs,
  gameyConcepts: GameyConcepts,
  gameyStartOptions: GameyStartOptions,
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
    ConceptoFuncs,
    GameyConcepts,
    GameyStartOptions,
    ModelName,
    PlaceName,
    DollName,
    CharacterName,
    AnimationNameByModel,
    MeshNameByModel,
    SpotNameByPlace,
    ModelInfoByName
  >(
    conceptoFuncs,
    gameyConcepts,
    gameyStartOptions,
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
    ConceptoFuncs,
    GameyConcepts,
    GameyStartOptions,
    ModelName,
    PlaceName,
    DollName,
    CharacterName,
    AnimationNameByModel,
    MeshNameByModel,
    SpotNameByPlace,
    ModelInfoByName
  >(conceptoFuncs, gameyConcepts, gameyStartOptions, modelInfoByName);

  const {
    enableMovement,
    isHolding,
    setPlayerAnimations,
    setPlayerToStartSpot,
    takePickup,
  } = makerPlayerStoryHelpers<
    ConceptoFuncs,
    GameyConcepts,
    GameyStartOptions,
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
    conceptoFuncs,
    gameyConcepts,
    gameyStartOptions,
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
    ConceptoFuncs,
    AnyCameraName,
    AnySegmentName,
    PlaceName,
    CharacterName,
    PlaceInfoByName,
    SpotNameByPlace,
    WallNameByPlace,
    SegmentNameByPlace,
    CameraNameByPlace
  >(conceptoFuncs, placeInfoByName, characterNames);

  const { playNewMusic, stopAllMusic } = makeSoundStoryHelpers<
    ConceptoFuncs,
    MusicName,
    MusicFiles
  >(conceptoFuncs, musicNames, musicFiles);

  const {
    hideMiniBubble,
    showAlarmText,
    showMiniBubble,
    showSpeech,
  } = makeSpeechStoryHelpers<
    ConceptoFuncs,
    GameyConcepts,
    GameyStartOptions,
    CharacterName
  >(conceptoFuncs, gameyConcepts, gameyStartOptions, characterNames);

  const { hideSticker, moveSticker, showSticker } = makeStickerStoryHelpers<
    ConceptoFuncs
  >(conceptoFuncs);

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
