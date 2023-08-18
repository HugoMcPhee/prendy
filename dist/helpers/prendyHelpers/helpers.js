import { get_characterStoryHelpers } from "./characters";
import { get_dollStoryHelpers } from "./dolls";
import { get_playerStoryHelpers } from "./players";
import { get_sceneStoryHelpers } from "./scene";
import { get_soundStoryHelpers } from "./sound";
import { get_speechStoryHelpers } from "./speech";
import { get_stickerStoryHelpers } from "./stickers";
// importing each of the helpers
// function doThis
export function makePrendyStoryHelpers(prendyAssets, prendyStores, storeHelpers) {
    return {
        characters: get_characterStoryHelpers(prendyAssets, storeHelpers),
        dolls: get_dollStoryHelpers(prendyAssets, storeHelpers),
        players: get_playerStoryHelpers(storeHelpers),
        scene: get_sceneStoryHelpers(prendyAssets, storeHelpers),
        sound: get_soundStoryHelpers(prendyAssets, storeHelpers),
        speech: get_speechStoryHelpers(prendyAssets, prendyStores, storeHelpers),
        stickers: get_stickerStoryHelpers(storeHelpers),
    };
}
