import {
  CharacterName,
  ModelInfoByName,
  MusicFiles,
  MusicName,
  PlaceInfoByName,
  PrendyAssets,
  PrendyOptions,
  PrendyStoreHelpers,
  PrendyStores,
  SoundFiles,
  SoundName,
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

export function makePrendyStoryHelpers(
  storeHelpers: PrendyStoreHelpers,
  prendyStores: PrendyStores,
  prendyStartOptions: PrendyOptions,
  prendyAssets: PrendyAssets
) {
  const modelInfoByName = prendyAssets.modelInfoByName as ModelInfoByName;
  const characterNames = prendyAssets.characterNames as CharacterName[];
  const placeInfoByName = prendyAssets.placeInfoByName as PlaceInfoByName;
  const musicNames = prendyAssets.musicNames as MusicName[];
  const musicFiles = prendyAssets.musicFiles as MusicFiles;
  const soundNames = prendyAssets.soundNames as SoundName[];
  const soundFiles = prendyAssets.soundFiles as SoundFiles;

  return {
    characters: get_characterStoryHelpers(
      storeHelpers,
      prendyStores,
      prendyStartOptions,
      modelInfoByName,
      characterNames
    ),
    dolls: get_dollStoryHelpers(storeHelpers, prendyStartOptions, modelInfoByName),
    players: get_playerStoryHelpers(storeHelpers, prendyStores, prendyStartOptions, modelInfoByName, characterNames),
    scene: get_sceneStoryHelpers(storeHelpers, placeInfoByName, characterNames),
    sound: get_soundStoryHelpers(storeHelpers, musicNames, musicFiles, soundNames, soundFiles),
    speech: get_speechStoryHelpers(storeHelpers, prendyStores, prendyStartOptions, characterNames),
    stickers: get_stickerStoryHelpers(storeHelpers),
  };
}
