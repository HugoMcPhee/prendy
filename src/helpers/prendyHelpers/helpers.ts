import { MyTypes } from "../../declarations";
import { get_characterStoryHelpers } from "./characters";
import { get_dollStoryHelpers } from "./dolls";
import { get_playerStoryHelpers } from "./players";
import { get_sceneStoryHelpers } from "./scene";
import { get_soundStoryHelpers } from "./sound";
import { get_speechStoryHelpers } from "./speech";
import { get_stickerStoryHelpers } from "./stickers";

// importing each of the helpers

// function doThis

export function makePrendyStoryHelpers<T_MyTypes extends MyTypes = MyTypes>(
  storeHelpers: T_MyTypes["StoreHelpers"],
  prendyStores: T_MyTypes["Stores"],
  prendyOptions: T_MyTypes["Main"]["PrendyOptions"],
  prendyAssets: T_MyTypes["Assets"]
) {
  type CharacterName = T_MyTypes["Main"]["CharacterName"];
  type ModelInfoByName = T_MyTypes["Main"]["ModelInfoByName"];
  type MusicFiles = T_MyTypes["Main"]["MusicFiles"];
  type MusicName = T_MyTypes["Main"]["MusicName"];
  type PlaceInfoByName = T_MyTypes["Main"]["PlaceInfoByName"];
  type SoundFiles = T_MyTypes["Main"]["SoundFiles"];
  type SoundName = T_MyTypes["Main"]["SoundName"];

  const modelInfoByName = prendyAssets.modelInfoByName as ModelInfoByName;
  const characterNames = prendyAssets.characterNames as CharacterName[];
  const placeInfoByName = prendyAssets.placeInfoByName as PlaceInfoByName;
  const musicNames = prendyAssets.musicNames as MusicName[];
  const musicFiles = prendyAssets.musicFiles as MusicFiles;
  const soundNames = prendyAssets.soundNames as SoundName[];
  const soundFiles = prendyAssets.soundFiles as SoundFiles;

  return {
    characters: get_characterStoryHelpers<T_MyTypes>(
      storeHelpers,
      prendyStores,
      prendyOptions,
      modelInfoByName,
      characterNames
    ),
    dolls: get_dollStoryHelpers<T_MyTypes>(storeHelpers, prendyOptions, modelInfoByName),
    players: get_playerStoryHelpers<T_MyTypes>(storeHelpers),
    scene: get_sceneStoryHelpers<T_MyTypes>(storeHelpers, placeInfoByName, characterNames),
    sound: get_soundStoryHelpers<T_MyTypes>(storeHelpers, musicNames, musicFiles, soundNames, soundFiles),
    speech: get_speechStoryHelpers<T_MyTypes>(storeHelpers, prendyStores, prendyOptions),
    stickers: get_stickerStoryHelpers<T_MyTypes>(storeHelpers),
  };
}
