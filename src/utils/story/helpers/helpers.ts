import {
  AnimationNameByModel,
  AnyAnimationName,
  AnyCameraName,
  AnySegmentName,
  PrendyAssets,
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
  SoundFiles,
  SoundName,
  BoneNameByModel,
} from "../../../declarations";
import { PrendyStoreHelpers, PlaceholderPrendyStores } from "../../../stores/typedStoreHelpers";
import { makeTyped_characterStoryHelpers } from "./characters";
import { makeTyped_dollStoryHelpers } from "./dolls";
import { makeTyped_playerStoryHelpers } from "./players";
import { makeTyped_sceneStoryHelpers } from "./scene";
import { makeTyped_soundStoryHelpers } from "./sound";
import { makeTyped_speechStoryHelpers } from "./speech";
import { makeTyped_stickerStoryHelpers } from "./stickers";

// importing each of the helpers

// function doThis

export function makePrendyStoryHelpers<
  StoreHelpers extends PrendyStoreHelpers,
  PrendyStores extends PlaceholderPrendyStores,
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
  A_MusicName extends MusicName = MusicName,
  A_SoundFiles extends SoundFiles = SoundFiles,
  A_SoundName extends SoundName = SoundName,
  A_BoneNameByModel extends BoneNameByModel = BoneNameByModel
>(
  storeHelpers: StoreHelpers,
  prendyStores: PrendyStores,
  prendyStartOptions: A_PrendyOptions,
  prendyAssets: PrendyAssets
) {
  const modelInfoByName = prendyAssets.modelInfoByName as A_ModelInfoByName;
  const characterNames = prendyAssets.characterNames as A_CharacterName[];
  const placeInfoByName = prendyAssets.placeInfoByName as A_PlaceInfoByName;
  const musicNames = prendyAssets.musicNames as A_MusicName[];
  const musicFiles = prendyAssets.musicFiles as A_MusicFiles;
  const soundNames = prendyAssets.soundNames as A_SoundName[];
  const soundFiles = prendyAssets.soundFiles as A_SoundFiles;

  const {
    lookAtEachother,
    lookAtOtherCharacter,
    moveCharacterAt2DAngle,
    setCharAnimation,
    setCharPosition,
    setCharRotationY,
    springAddToCharRotationY,
    springCharRotation,
  } = makeTyped_characterStoryHelpers<
    StoreHelpers,
    PrendyStores,
    A_AnimationNameByModel,
    A_PrendyOptions,
    A_CharacterName,
    A_CharacterOptions,
    A_DollName,
    A_DollOptions,
    A_ModelInfoByName
  >(storeHelpers, prendyStores, prendyStartOptions, modelInfoByName, characterNames);

  const {
    focusOnDoll,
    hideDoll,
    moveDollAt2DAngle,
    lookAtOtherDoll,
    setDollAnimation,
    setDollPosition,
    setDollRotation,
    setDollRotationY,
    setDollToSpot,
    springAddToDollRotationY,
    springDollRotationY,
    pushDollRotationY,
    springDollToSpot,
    dollLooksAtSpot,
    toggleDollMeshes,
    getDollBonePosition,
  } = makeTyped_dollStoryHelpers<
    StoreHelpers,
    PrendyStores,
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
    A_SpotNameByPlace,
    A_BoneNameByModel
  >(storeHelpers, prendyStartOptions, modelInfoByName);

  const { enableMovement, isHolding, setPlayerAnimations, takePickup } = makeTyped_playerStoryHelpers<
    StoreHelpers,
    PrendyStores,
    A_AnyAnimationName,
    A_PrendyOptions,
    A_CharacterName,
    A_ModelInfoByName,
    A_PickupName
  >(storeHelpers, prendyStores, prendyStartOptions, modelInfoByName, characterNames);

  // NOTE maybe return in categores like players.enableMovement()
  const { goToNewPlace, hideWallIf, lookAtSpot, setCamera, setSegment, showStoryView } = makeTyped_sceneStoryHelpers<
    StoreHelpers,
    A_AnyCameraName,
    A_AnySegmentName,
    A_CameraNameByPlace,
    A_CharacterName,
    A_PlaceInfoByName,
    A_PlaceName,
    A_SegmentNameByPlace,
    A_SpotNameByPlace,
    A_WallNameByPlace
  >(storeHelpers, placeInfoByName, characterNames);

  const { playNewMusic, stopAllMusic, playSound, stopSound, stopAllSounds } = makeTyped_soundStoryHelpers<
    StoreHelpers,
    A_MusicFiles,
    A_MusicName,
    A_SoundFiles,
    A_SoundName
  >(storeHelpers, musicNames, musicFiles, soundNames, soundFiles);

  const { hideMiniBubble, showAlarmText, showMiniBubble, showSpeech } = makeTyped_speechStoryHelpers<
    StoreHelpers,
    PrendyStores,
    A_PrendyOptions,
    A_CharacterName
  >(storeHelpers, prendyStores, prendyStartOptions, characterNames);

  const { hideSticker, moveSticker, showSticker } = makeTyped_stickerStoryHelpers(storeHelpers);

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
    lookAtOtherDoll,
    setDollAnimation,
    setDollPosition,
    setDollRotation,
    setDollRotationY,
    setDollToSpot,
    springAddToDollRotationY,
    springDollRotationY,
    pushDollRotationY,
    springDollToSpot,
    dollLooksAtSpot,
    toggleDollMeshes,
    getDollBonePosition,
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
    playSound,
    stopSound,
    stopAllSounds,
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
