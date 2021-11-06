import { breakableForEach, forEach } from "shutils/dist/loops";
import { makeGlobalStoreUtils } from "../utils";
export function makeGlobalGeneralRules(concepFuncs) {
    const { getRefs, getState, makeRules, setState } = concepFuncs;
    const { setGlobalState } = makeGlobalStoreUtils(concepFuncs);
    return makeRules((addItemEffect, addEffect) => ({
        whenAnythingChangesForRendering: addEffect({
            onEffect() {
                var _a, _b, _c;
                const globalRefs = getRefs().global.main;
                // Renders the scene manually
                // (globalRefs.scenes.main as Scene)?.render();
                // if (globalRefs.depthRenderer) {
                //   (globalRefs.depthRenderer as DepthRendererWithSize).getDepthMap();
                // }
                // (globalRefs.sceneRenderTarget as RenderTargetTexture)?.activeCamera.outputRenderTarget;
                // (globalRefs.sceneRenderTarget as RenderTargetTexture)?.render();
                // (globalRefs.depthRenderTarget as RenderTargetTexture)?.render();
                forEach((_b = (_a = globalRefs.scenes.main) === null || _a === void 0 ? void 0 : _a.skeletons) !== null && _b !== void 0 ? _b : [], (skeleton) => {
                    skeleton.prepare();
                });
                (_c = globalRefs.scenes.main) === null || _c === void 0 ? void 0 : _c.render(false, false);
                // globalRefs.scenes.backdrop?.render();
                // runs in a callback to set before the new concepo frame
                setState({}, () => {
                    setState({ global: { main: { frameTick: Date.now() } } });
                });
            },
            check: { type: ["global"], name: ["main"], prop: ["frameTick"] },
            flow: "rendering",
            whenToRun: "subscribe",
        }),
        whenASpeechBubbleShowsOrHides: addEffect({
            onEffect(_diffInfo) {
                const speechBubblesState = getState().speechBubbles;
                let aBubbleIsShowing = false;
                // possibly ideally cached
                const speechBubbleNames = Object.keys(getState().speechBubbles);
                breakableForEach(speechBubbleNames, (bubbleName) => {
                    const speechBubbleState = speechBubblesState[bubbleName];
                    if (speechBubbleState.isVisible) {
                        aBubbleIsShowing = true;
                        return true; // break
                    }
                });
                const globalRefs = getRefs().global.main;
                setState({
                    global: { main: { aSpeechBubbleIsShowing: aBubbleIsShowing } },
                });
                if (aBubbleIsShowing) {
                    if (globalRefs.aConvoIsHappening_timeout !== null) {
                        clearTimeout(globalRefs.aConvoIsHappening_timeout);
                    }
                    setGlobalState({ aConvoIsHappening: true });
                }
                else {
                    if (globalRefs.aConvoIsHappening_timeout !== null) {
                        clearTimeout(globalRefs.aConvoIsHappening_timeout);
                    }
                    globalRefs.aConvoIsHappening_timeout = setTimeout(() => {
                        setGlobalState({ aConvoIsHappening: false });
                        globalRefs.aConvoIsHappening_timeout = null;
                    }, 1000);
                }
            },
            check: { type: "speechBubbles", prop: ["isVisible"] },
            whenToRun: "subscribe",
            flow: "positionUi",
        }),
    }));
}
