import { breakableForEach } from "shutils/dist/loops";
import { makeGlobalStoreUtils } from "../utils";
export function makeGlobalGeneralRules(conceptoFuncs) {
    const { getRefs, getState, makeRules, setState } = conceptoFuncs;
    const { setGlobalState } = makeGlobalStoreUtils(conceptoFuncs);
    return makeRules((addItemEffect, addEffect) => ({
        whenAnythingChangesForRendering: addEffect({
            onEffect() {
                var _a, _b;
                const globalRefs = getRefs().global.main;
                // Renders the scene manually
                (_a = globalRefs.scenes.main) === null || _a === void 0 ? void 0 : _a.render();
                (_b = globalRefs.scenes.backdrop) === null || _b === void 0 ? void 0 : _b.render();
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
