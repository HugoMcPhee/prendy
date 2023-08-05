export function get_stickerStoryHelpers(storeHelpers) {
    const { setState } = storeHelpers;
    function moveSticker(x, y) {
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
