import { breakableForEach } from "chootils/dist/loops";
import { get_globalUtils } from "../../helpers/prendyUtils/global";
import { clearTimeoutSafe } from "../../helpers/utils";
export function get_globalGeneralRules(storeHelpers) {
    const { getRefs, getState, makeRules, setState, onNextTick } = storeHelpers;
    const { setGlobalState } = get_globalUtils(storeHelpers);
    return makeRules(({ effect }) => ({
        whenAnythingChangesForRendering: effect({
            run() {
                const globalRefs = getRefs().global.main;
                const scene = globalRefs.scene;
                // Renders the scene manually
                if (scene === null || scene === void 0 ? void 0 : scene.activeCamera)
                    scene === null || scene === void 0 ? void 0 : scene.render(false, false);
                // runs in a callback to set before the new repond frame
                onNextTick(() => setState({ global: { main: { frameTick: getState().global.main.frameTick + 1 } } }));
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
                setState({ global: { main: { aSpeechBubbleIsShowing: aBubbleIsShowing } } });
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
