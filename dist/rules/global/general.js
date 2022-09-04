import { clearTimeoutSafe } from "../../helpers/utils";
import { breakableForEach, forEach } from "chootils/dist/loops";
import { makeTyped_globalUtils } from "../../helpers/prendyUtils/global";
export function makeTyped_globalGeneralRules(storeHelpers) {
    const { getRefs, getState, makeRules, setState } = storeHelpers;
    const { setGlobalState } = makeTyped_globalUtils(storeHelpers);
    return makeRules(({ effect }) => ({
        whenAnythingChangesForRendering: effect({
            run() {
                var _a, _b, _c, _d;
                const globalRefs = getRefs().global.main;
                // Renders the scene manually
                if ((_a = globalRefs.scene) === null || _a === void 0 ? void 0 : _a.activeCamera) {
                    forEach((_c = (_b = globalRefs.scene) === null || _b === void 0 ? void 0 : _b.skeletons) !== null && _c !== void 0 ? _c : [], (skeleton) => {
                        skeleton.prepare();
                    });
                    (_d = globalRefs.scene) === null || _d === void 0 ? void 0 : _d.render(false, false);
                }
                // runs in a callback to set before the new pietem frame
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
