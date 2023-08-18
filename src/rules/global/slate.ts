import delay from "delay";
import { makeRunMovers } from "repond-movers";
import { MyTypes } from "../../declarations";
import { get_getSceneOrEngineUtils } from "../../helpers/babylonjs/getSceneOrEngineUtils";
import { get_slateUtils } from "../../helpers/babylonjs/slate";
import { get_globalUtils } from "../../helpers/prendyUtils/global";

export function get_globalSlateRules<T_MyTypes extends MyTypes = MyTypes>(
  prendyAssets: T_MyTypes["Assets"],
  storeHelpers: T_MyTypes["StoreHelpers"]
) {
  const { focusSlateOnFocusedDoll, getSlatePositionNotOverEdges, getShaderTransformStuff } = get_slateUtils(
    prendyAssets,
    storeHelpers
  );
  const { setGlobalState } = get_globalUtils(storeHelpers);
  const { makeRules, getRefs, getState } = storeHelpers;
  const { runMover, runMover2d } = makeRunMovers(storeHelpers);

  const globalRefs = getRefs().global.main;

  return makeRules(({ itemEffect, effect }) => ({
    whenSlatePositionChanges: effect({
      run(diffInfo) {
        const positionChanged = diffInfo.propsChangedBool.global.main.slatePos;
        const zoomChanged = diffInfo.propsChangedBool.global.main.slateZoom;

        if (positionChanged || zoomChanged) getShaderTransformStuff();
      },
      check: { prop: ["slatePos", "slateZoom"], type: "global" },
      atStepEnd: true,
      step: "slatePosition",
    }),
    whenSlatePositionGoalChanges: itemEffect({
      run: () => setGlobalState({ slatePosIsMoving: true }),
      check: { prop: "slatePosGoal", type: "global" },
      atStepEnd: true,
      step: "slatePosition",
    }),
    whenSlatePosIsMoving: itemEffect({
      run: ({ itemName }) => runMover2d({ name: itemName, type: "global", mover: "slatePos" }),
      check: { prop: "slatePosIsMoving", type: "global", becomes: true },
      atStepEnd: true,
      step: "slatePositionStartMovers",
    }),
    whenSlateZoomGoalChanges: itemEffect({
      run: () => setGlobalState({ slateZoomIsMoving: true }),
      check: { prop: "slateZoomGoal", type: "global" },
      atStepEnd: true,
      step: "slatePosition",
    }),
    whenSlateZoomIsMoving: itemEffect({
      run: ({ itemName }) => runMover({ name: itemName, type: "global", mover: "slateZoom" }),
      check: { prop: "slateZoomIsMoving", type: "global", becomes: true },
      atStepEnd: true,
      step: "slatePositionStartMovers",
    }),
    whenShouldFocusOnDoll: itemEffect({
      run: () => focusSlateOnFocusedDoll(),
      check: {
        prop: [
          "focusedDoll",
          "slateZoomGoal",
          // recalculating position when slateZoom changes is what allows it to stick to corners when zooming
          // it also requires focusSlateOnFocusedDoll to run in the next tick
          "slateZoom",
        ],
        type: "global",
      },
      atStepEnd: true,
      step: "slatePosition",
    }),
    whenSlateZoomChangesToSlatePanOverEdges: itemEffect({
      run: () => {
        const slatePos = getState().global.main.slatePos;
        const newSlatePos = getSlatePositionNotOverEdges(slatePos);
        setGlobalState({ slatePos: newSlatePos });
      },
      check: { prop: ["slateZoom"], type: "global" },
      atStepEnd: true,
      step: "slatePositionDontGoOverEdges",
    }),
    whenNowCamChanges: itemEffect({
      run: () => focusSlateOnFocusedDoll("instant"),
      check: { prop: "nowCamName", type: "global" },
      // atStepEnd: true, // if it runs at step end, then the speech bubble changes position one frame after the camera changes
      step: "slatePosition",
    }),
    whenScreenResizes: itemEffect({
      run: async () => {
        await delay(10); // this helps it work on ipad

        const engine = get_getSceneOrEngineUtils(storeHelpers).getEngine();

        if (!engine) return;

        const { editedHardwareScaling, editedSlateSceneZoom } = getShaderTransformStuff();

        const screenHeight = window.innerHeight;

        const newRenderWidth = screenHeight * (16 / 9) * (1 / editedHardwareScaling);
        const newRenderHeight = screenHeight * (1 / editedHardwareScaling);

        engine.setSize(newRenderWidth, newRenderHeight);
        globalRefs.depthRenderTarget?.resize({ width: newRenderWidth, height: newRenderHeight });

        focusSlateOnFocusedDoll("instant");
      },
      check: { prop: "timeScreenResized", type: "global" },
      atStepEnd: true,
      step: "slatePosition",
    }),
  }));
}
