import { clearTimeoutSafe } from "../../../utils";
import { breakableForEach, forEach } from "chootils/dist/loops";
import { makeGlobalStoreUtils } from "../utils";
export function makeGlobalGeneralRules(storeHelpers) {
    const { getRefs, getState, makeRules, setState } = storeHelpers;
    const { setGlobalState } = makeGlobalStoreUtils(storeHelpers);
    return makeRules(({ effect }) => ({
        whenAnythingChangesForRendering: effect({
            run() {
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
            step: "rendering",
            atStepEnd: true,
        }),
        whenASpeechBubbleShowsOrHides: effect({
            run(_diffInfo) {
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
                    clearTimeoutSafe(globalRefs.aConvoIsHappening_timeout);
                    setGlobalState({ aConvoIsHappening: true });
                }
                else {
                    clearTimeoutSafe(globalRefs.aConvoIsHappening_timeout);
                    globalRefs.aConvoIsHappening_timeout = setTimeout(() => {
                        setGlobalState({ aConvoIsHappening: false });
                        globalRefs.aConvoIsHappening_timeout = null;
                    }, 1000);
                }
            },
            check: { type: "speechBubbles", prop: ["isVisible"] },
            atStepEnd: true,
            step: "positionUi",
        }),
    }));
}
