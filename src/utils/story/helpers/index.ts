import {
  AnimationNameByModel,
  AnyAnimationName,
  AnyCameraName,
  AnySegmentName,
  PrendyArt,
  PrendyOptions,
  CameraNameByPlace,
  CharacterName,
  CharacterOptions,
  DollName,
  DollOptions,
  MeshNameByModel,
  ModelInfoByName,
  ModelName,
  MusicFiles,
  MusicName,
  PickupName,
  PlaceInfoByName,
  PlaceName,
  SegmentNameByPlace,
  SpotNameByPlace,
  WallNameByPlace,
} from "../../../declarations";
import {
  PrendyConcepFuncs,
  PlaceholderPrendyConcepts,
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

export function makePrendyStoryHelpers<
  ConcepFuncs extends PrendyConcepFuncs,
  PrendyConcepts extends PlaceholderPrendyConcepts,
  A_AnimationNameByModel extends AnimationNameByModel = AnimationNameByModel,
  A_PrendyOptions extends PrendyOptions = PrendyOptions,
  A_CharacterName extends CharacterName = CharacterName,
  A_CharacterOptions extends CharacterOptions = CharacterOptions,
  A_DollName extends DollName = DollName,
  A_DollOptions extends DollOptions = DollOptions,
  A_MeshNameByModel extends MeshNameByModel = MeshNameByModel,
  A_ModelInfoByName extends ModelInfoByName = ModelInfoByName,
  A_ModelName extends ModelName = ModelName,
  A_PlaceName extends PlaceName = PlaceName,
  A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace,
  A_AnyAnimationName extends AnyAnimationName = AnyAnimationName,
  A_PickupName extends PickupName = PickupName,
  A_AnyCameraName extends AnyCameraName = AnyCameraName,
  A_AnySegmentName extends AnySegmentName = AnySegmentName,
  A_CameraNameByPlace extends CameraNameByPlace = CameraNameByPlace,
  A_PlaceInfoByName extends PlaceInfoByName = PlaceInfoByName,
  A_SegmentNameByPlace extends SegmentNameByPlace = SegmentNameByPlace,
  A_WallNameByPlace extends WallNameByPlace = WallNameByPlace,
  A_MusicFiles extends MusicFiles = MusicFiles,
  A_MusicName extends MusicName = MusicName
>(
  concepFuncs: ConcepFuncs,
  prendyConcepts: PrendyConcepts,
  prendyStartOptions: A_PrendyOptions,
  prendyArt: PrendyArt
) {
  const modelInfoByName = prendyArt.modelInfoByName as A_ModelInfoByName;
  const characterNames = prendyArt.characterNames as A_CharacterName[];
  const placeInfoByName = prendyArt.placeInfoByName as A_PlaceInfoByName;
  const musicNames = prendyArt.musicNames as A_MusicName[];
  const musicFiles = prendyArt.musicFiles as A_MusicFiles;

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
    PrendyConcepts,
    A_AnimationNameByModel,
    A_PrendyOptions,
    A_CharacterName,
    A_CharacterOptions,
    A_DollName,
    A_DollOptions,
    A_ModelInfoByName
  >(
    concepFuncs,
    prendyConcepts,
    prendyStartOptions,
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
    PrendyConcepts,
    A_AnimationNameByModel,
    A_PrendyOptions,
    A_CharacterName,
    A_CharacterOptions,
    A_DollName,
    A_DollOptions,
    A_MeshNameByModel,
    A_ModelInfoByName,
    A_ModelName,
    A_PlaceName,
    A_SpotNameByPlace
  >(concepFuncs, prendyStartOptions, modelInfoByName);

  const {
    enableMovement,
    isHolding,
    setPlayerAnimations,
    takePickup,
  } = makerPlayerStoryHelpers<
    ConcepFuncs,
    PrendyConcepts,
    A_AnyAnimationName,
    A_PrendyOptions,
    A_CharacterName,
    A_ModelInfoByName,
    A_PickupName
  >(
    concepFuncs,
    prendyConcepts,
    prendyStartOptions,
    modelInfoByName,
    characterNames
  );

  // NOTE maybe return in categores like players.enableMovement()
  const {
    goToNewPlace,
    hideWallIf,
    lookAtSpot,
    setCamera,
    setSegment,
    showStoryView,
  } = makeSceneStoryHelpers<
    ConcepFuncs,
    A_AnyCameraName,
    A_AnySegmentName,
    A_CameraNameByPlace,
    A_CharacterName,
    A_PlaceInfoByName,
    A_PlaceName,
    A_SegmentNameByPlace,
    A_SpotNameByPlace,
    A_WallNameByPlace
  >(concepFuncs, placeInfoByName, characterNames);

  const { playNewMusic, stopAllMusic } = makeSoundStoryHelpers<
    ConcepFuncs,
    A_MusicFiles,
    A_MusicName
  >(concepFuncs, musicNames, musicFiles);

  const {
    hideMiniBubble,
    showAlarmText,
    showMiniBubble,
    showSpeech,
  } = makeSpeechStoryHelpers<
    ConcepFuncs,
    PrendyConcepts,
    A_PrendyOptions,
    A_CharacterName
  >(concepFuncs, prendyConcepts, prendyStartOptions, characterNames);

  const { hideSticker, moveSticker, showSticker } = makeStickerStoryHelpers(
    concepFuncs
  );

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
    takePickup,
    // scene
    goToNewPlace,
    hideWallIf,
    lookAtSpot,
    showStoryView,
    setCamera,
    setSegment,
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
