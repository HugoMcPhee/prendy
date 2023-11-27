import { meta } from "../../meta";
export function moveSticker(x, y) {
    const { setState } = meta.repond;
    setState({ story: { main: { screenStickerPosition: { x, y } } } });
}
export function showSticker() {
    const { setState } = meta.repond;
    setState({ story: { main: { screenStickerIsVisible: true } } });
}
export function hideSticker() {
    const { setState } = meta.repond;
    setState({ story: { main: { screenStickerIsVisible: false } } });
}
