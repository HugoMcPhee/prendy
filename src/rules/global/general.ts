import { RenderTargetTexture, Scene } from "@babylonjs/core";
import { clearTimeoutSafe } from "../../helpers/utils";
import { breakableForEach, forEach } from "chootils/dist/loops";
import { PrendyStoreHelpers } from "../../stores/typedStoreHelpers";
import { get_globalUtils } from "../../helpers/prendyUtils/global";

// let canRender = true;
// setTimeout(() => {
//   canRender = false;
// }, 20000);

export function get_globalGeneralRules<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers) {
  const { getRefs, getState, makeRules, setState, onNextTick } = storeHelpers;
  const { setGlobalState } = get_globalUtils(storeHelpers);

  return makeRules(({ effect }) => ({
    whenAnythingChangesForRendering: effect({
      run() {
        const globalRefs = getRefs().global.main;
        // const frameTick = getState().global.main.frameTick;
        // Renders the scene manually
        // console.log("frameTick", frameTick);

        if ((globalRefs.scene as Scene)?.activeCamera) {
          // forEach((globalRefs.scene as Scene)?.skeletons ?? [], (skeleton) => {
          //   skeleton.prepare();
          // });
          (globalRefs.scene as Scene)?.render(false, false);
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
        const speechBubbleNames = Object.keys(getState().speechBubbles) as (keyof typeof speechBubblesState)[];

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
        } else {
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
