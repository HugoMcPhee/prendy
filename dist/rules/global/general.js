import { clearTimeoutSafe } from "../../helpers/utils";
import { breakableForEach } from "chootils/dist/loops";
import { get_globalUtils } from "../../helpers/prendyUtils/global";
// let canRender = true;
// setTimeout(() => {
//   canRender = false;
// }, 20000);
export function get_globalGeneralRules(storeHelpers) {
    const { getRefs, getState, makeRules, setState, onNextTick } = storeHelpers;
    const { setGlobalState } = get_globalUtils(storeHelpers);
    return makeRules(({ effect }) => ({
        whenAnythingChangesForRendering: effect({
            run() {
                var _a, _b;
                const globalRefs = getRefs().global.main;
                // const frameTick = getState().global.main.frameTick;
                // Renders the scene manually
                // console.log("frameTick", frameTick);
                if ((_a = globalRefs.scene) === null || _a === void 0 ? void 0 : _a.activeCamera) {
                    // forEach((globalRefs.scene as Scene)?.skeletons ?? [], (skeleton) => {
                    //   skeleton.prepare();
                    // });
                    (_b = globalRefs.scene) === null || _b === void 0 ? void 0 : _b.render(false, false);
                }
                // runs in a callback to set before the new pietem frame
                // setState({}, () => setState({ global: { main: { frameTick: Date.now() } } }));
                // onNextTick(() => setState({ global: { main: { frameTick: Date.now() } } }));
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
