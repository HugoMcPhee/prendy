import { setState } from "repond";
export function moveSticker(x, y) {
    setState({ story: { main: { screenStickerPosition: { x, y } } } });
}
export function showSticker() {
    setState({ story: { main: { screenStickerIsVisible: true } } });
}
export function hideSticker() {
    setState({ story: { main: { screenStickerIsVisible: false } } });
}
