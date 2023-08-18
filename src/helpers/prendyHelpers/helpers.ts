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
  prendyAssets: T_MyTypes["Assets"],
  prendyStores: T_MyTypes["Stores"],
  storeHelpers: T_MyTypes["StoreHelpers"]
) {
  return {
    characters: get_characterStoryHelpers<T_MyTypes>(prendyAssets, storeHelpers),
    dolls: get_dollStoryHelpers<T_MyTypes>(prendyAssets, storeHelpers),
    players: get_playerStoryHelpers<T_MyTypes>(storeHelpers),
    scene: get_sceneStoryHelpers<T_MyTypes>(prendyAssets, storeHelpers),
    sound: get_soundStoryHelpers<T_MyTypes>(prendyAssets, storeHelpers),
    speech: get_speechStoryHelpers<T_MyTypes>(prendyAssets, prendyStores, storeHelpers),
    stickers: get_stickerStoryHelpers<T_MyTypes>(storeHelpers),
  };
}
