import { MyTypes, PrendyStoreHelpers } from "../../declarations";

export function get_stickerStoryHelpers<T_MyTypes extends MyTypes = MyTypes>(storeHelpers: T_MyTypes["StoreHelpers"]) {
  const { setState } = storeHelpers;

  function moveSticker(x: number, y: number) {
    setState({ story: { main: { screenStickerPosition: { x, y } } } });
  }

  function showSticker() {
    setState({ story: { main: { screenStickerIsVisible: true } } });
  }

  function hideSticker() {
    setState({ story: { main: { screenStickerIsVisible: false } } });
  }

  return { moveSticker, showSticker, hideSticker };
}
