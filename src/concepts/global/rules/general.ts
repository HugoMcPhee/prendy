import { breakableForEach } from "shutils/dist/loops";
import { BackdopConcepFuncs } from "../../typedConcepFuncs";
import { makeGlobalStoreUtils } from "../utils";

export function makeGlobalGeneralRules<
  ConcepFuncs extends BackdopConcepFuncs
>(concepFuncs: ConcepFuncs) {
  const { getRefs, getState, makeRules, setState } = concepFuncs;
  const { setGlobalState } = makeGlobalStoreUtils(concepFuncs);

  return makeRules((addItemEffect, addEffect) => ({
    whenAnythingChangesForRendering: addEffect({
      onEffect() {
        const globalRefs = getRefs().global.main;
        // Renders the scene manually
        globalRefs.scenes.main?.render();
        globalRefs.scenes.backdrop?.render();

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
        const speechBubbleNames = Object.keys(
          getState().speechBubbles
        ) as (keyof typeof speechBubblesState)[];

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
        } else {
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
