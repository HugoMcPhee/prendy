import { PrendyStoreHelpers } from "../../declarations";

export function get_stickerStoryHelpers<A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers>(
  storeHelpers: A_PrendyStoreHelpers
) {
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
