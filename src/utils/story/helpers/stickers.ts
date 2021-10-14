import { GameyConceptoFuncs } from "../../../concepts/typedConceptoFuncs";

export function makeStickerStoryHelpers<
  ConceptoFuncs extends GameyConceptoFuncs
>(conceptoFuncs: ConceptoFuncs) {
  const { setState } = conceptoFuncs;

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
