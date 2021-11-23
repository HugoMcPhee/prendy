import { PrendyConcepFuncs } from "../../../concepts/typedConcepFuncs";

export function makeStickerStoryHelpers<
  ConcepFuncs extends PrendyConcepFuncs
>(concepFuncs: ConcepFuncs) {
  const { setState } = concepFuncs;

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
