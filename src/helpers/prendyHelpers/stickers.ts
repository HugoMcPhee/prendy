import { PrendyStoreHelpers } from "../../stores/typedStoreHelpers";

export function get_stickerStoryHelpers<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers) {
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
