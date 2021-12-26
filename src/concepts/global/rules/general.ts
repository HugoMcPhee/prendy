import { Scene } from "@babylonjs/core";
import { clearTimeoutSafe } from "../../../utils";
import { breakableForEach, forEach } from "chootils/dist/loops";
import { PrendyStoreHelpers } from "../../typedStoreHelpers";
import { makeGlobalStoreUtils } from "../utils";

export function makeGlobalGeneralRules<StoreHelpers extends PrendyStoreHelpers>(
  storeHelpers: StoreHelpers
) {
  const { getRefs, getState, makeRules, setState } = storeHelpers;
  const { setGlobalState } = makeGlobalStoreUtils(storeHelpers);

  return makeRules(({ effect }) => ({
    whenAnythingChangesForRendering: effect({
      run() {
        const globalRefs = getRefs().global.main;
        // Renders the scene manually
        // (globalRefs.scenes.main as Scene)?.render();

        // if (globalRefs.depthRenderer) {
        //   (globalRefs.depthRenderer as DepthRendererWithSize).getDepthMap();
        // }
        // (globalRefs.sceneRenderTarget as RenderTargetTexture)?.activeCamera.outputRenderTarget;
        // (globalRefs.sceneRenderTarget as RenderTargetTexture)?.render();
        // (globalRefs.depthRenderTarget as RenderTargetTexture)?.render();

        forEach(
          (globalRefs.scenes.main as Scene)?.skeletons ?? [],
          (skeleton) => {
            skeleton.prepare();
          }
        );
        (globalRefs.scenes.main as Scene)?.render(false, false);

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
