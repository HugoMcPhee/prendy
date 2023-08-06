import {
  AnimationNameByModel,
  AnyAnimationName,
  AnyCameraName,
  AnySegmentName,
  BoneNameByModel,
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
  PrendyAssets,
  PrendyOptions,
  PrendyStoreHelpers,
  PrendyStores,
  SegmentNameByPlace,
  SoundFiles,
  SoundName,
  SpotNameByPlace,
  WallNameByPlace,
} from "../../declarations";
import { get_characterStoryHelpers } from "./characters";
import { get_dollStoryHelpers } from "./dolls";
import { get_playerStoryHelpers } from "./players";
import { get_sceneStoryHelpers } from "./scene";
import { get_soundStoryHelpers } from "./sound";
import { get_speechStoryHelpers } from "./speech";
import { get_stickerStoryHelpers } from "./stickers";

// importing each of the helpers

// function doThis

export function makePrendyStoryHelpers<
  A_AnimationNameByModel extends AnimationNameByModel = AnimationNameByModel,
  A_AnyAnimationName extends AnyAnimationName = AnyAnimationName,
  A_AnyCameraName extends AnyCameraName = AnyCameraName,
  A_AnySegmentName extends AnySegmentName = AnySegmentName,
  A_BoneNameByModel extends BoneNameByModel = BoneNameByModel,
  A_CameraNameByPlace extends CameraNameByPlace = CameraNameByPlace,
  A_CharacterName extends CharacterName = CharacterName,
  A_CharacterOptions extends CharacterOptions = CharacterOptions,
  A_DollName extends DollName = DollName,
  A_DollOptions extends DollOptions = DollOptions,
  A_MeshNameByModel extends MeshNameByModel = MeshNameByModel,
  A_ModelInfoByName extends ModelInfoByName = ModelInfoByName,
  A_ModelName extends ModelName = ModelName,
  A_MusicFiles extends MusicFiles = MusicFiles,
  A_MusicName extends MusicName = MusicName,
  A_PickupName extends PickupName = PickupName,
  A_PlaceInfoByName extends PlaceInfoByName = PlaceInfoByName,
  A_PlaceName extends PlaceName = PlaceName,
  A_PrendyAssets extends PrendyAssets = PrendyAssets,
  A_PrendyOptions extends PrendyOptions = PrendyOptions,
  A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers,
  A_PrendyStores extends PrendyStores = PrendyStores,
  A_SegmentNameByPlace extends SegmentNameByPlace = SegmentNameByPlace,
  A_SoundFiles extends SoundFiles = SoundFiles,
  A_SoundName extends SoundName = SoundName,
  A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace,
  A_WallNameByPlace extends WallNameByPlace = WallNameByPlace
>(
  storeHelpers: A_PrendyStoreHelpers,
  prendyStores: A_PrendyStores,
  prendyStartOptions: A_PrendyOptions,
  prendyAssets: A_PrendyAssets
) {
  const modelInfoByName = prendyAssets.modelInfoByName as A_ModelInfoByName;
  const characterNames = prendyAssets.characterNames as A_CharacterName[];
  const placeInfoByName = prendyAssets.placeInfoByName as A_PlaceInfoByName;
  const musicNames = prendyAssets.musicNames as A_MusicName[];
  const musicFiles = prendyAssets.musicFiles as A_MusicFiles;
  const soundNames = prendyAssets.soundNames as A_SoundName[];
  const soundFiles = prendyAssets.soundFiles as A_SoundFiles;

  return {
    characters: get_characterStoryHelpers<
      A_AnimationNameByModel,
      A_CharacterName,
      A_CharacterOptions,
      A_DollName,
      A_DollOptions,
      A_ModelInfoByName,
      A_PlaceName,
      A_PrendyOptions,
      A_PrendyStoreHelpers,
      A_PrendyStores,
      A_SpotNameByPlace
    >(storeHelpers, prendyStores, prendyStartOptions, modelInfoByName, characterNames),
    dolls: get_dollStoryHelpers<
      A_AnimationNameByModel,
      A_BoneNameByModel,
      A_CharacterName,
      A_CharacterOptions,
      A_DollName,
      A_DollOptions,
      A_MeshNameByModel,
      A_ModelInfoByName,
      A_ModelName,
      A_PlaceName,
      A_PrendyOptions,
      A_PrendyStoreHelpers,
      A_PrendyStores,
      A_SpotNameByPlace
    >(storeHelpers, prendyStartOptions, modelInfoByName),
    players: get_playerStoryHelpers<
      A_AnyAnimationName,
      A_CharacterName,
      A_ModelInfoByName,
      A_PickupName,
      A_PrendyOptions,
      A_PrendyStoreHelpers,
      A_PrendyStores
    >(storeHelpers, prendyStores, prendyStartOptions, modelInfoByName, characterNames),
    scene: get_sceneStoryHelpers<
      A_AnyCameraName,
      A_AnySegmentName,
      A_CameraNameByPlace,
      A_CharacterName,
      A_DollName,
      A_PlaceInfoByName,
      A_PlaceName,
      A_PrendyStoreHelpers,
      A_PrendyStores,
      A_SegmentNameByPlace,
      A_SpotNameByPlace,
      A_WallNameByPlace
    >(storeHelpers, placeInfoByName, characterNames),
    sound: get_soundStoryHelpers<A_MusicFiles, A_MusicName, A_PrendyStoreHelpers, A_SoundFiles, A_SoundName>(
      storeHelpers,
      musicNames,
      musicFiles,
      soundNames,
      soundFiles
    ),
    speech: get_speechStoryHelpers<A_CharacterName, A_PrendyOptions, A_PrendyStoreHelpers, A_PrendyStores>(
      storeHelpers,
      prendyStores,
      prendyStartOptions,
      characterNames
    ),
    stickers: get_stickerStoryHelpers<A_PrendyStoreHelpers>(storeHelpers),
  };
}
