import { get_characterStoryHelpers } from "./characters";
import { get_dollStoryHelpers } from "./dolls";
import { get_playerStoryHelpers } from "./players";
import { get_sceneStoryHelpers } from "./scene";
import { get_soundStoryHelpers } from "./sound";
import { get_speechStoryHelpers } from "./speech";
import { get_stickerStoryHelpers } from "./stickers";
// importing each of the helpers
// function doThis
export function makePrendyStoryHelpers(storeHelpers, prendyStores, prendyStartOptions, prendyAssets) {
    const modelInfoByName = prendyAssets.modelInfoByName;
    const characterNames = prendyAssets.characterNames;
    const placeInfoByName = prendyAssets.placeInfoByName;
    const musicNames = prendyAssets.musicNames;
    const musicFiles = prendyAssets.musicFiles;
    const soundNames = prendyAssets.soundNames;
    const soundFiles = prendyAssets.soundFiles;
    return {
        characters: get_characterStoryHelpers(storeHelpers, prendyStores, prendyStartOptions, modelInfoByName, characterNames),
        dolls: get_dollStoryHelpers(storeHelpers, prendyStartOptions, modelInfoByName),
        players: get_playerStoryHelpers(storeHelpers, prendyStores, prendyStartOptions, modelInfoByName, characterNames),
        scene: get_sceneStoryHelpers(storeHelpers, placeInfoByName, characterNames),
        sound: get_soundStoryHelpers(storeHelpers, musicNames, musicFiles, soundNames, soundFiles),
        speech: get_speechStoryHelpers(storeHelpers, prendyStores, prendyStartOptions, characterNames),
        stickers: get_stickerStoryHelpers(storeHelpers),
    };
}
