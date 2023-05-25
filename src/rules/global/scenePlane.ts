import { Effect, RenderTargetTexture, Scene } from "@babylonjs/core";
import delay from "delay";
import { makeRunMovers } from "repond-movers";
import { get_getSceneOrEngineUtils } from "../../helpers/babylonjs/getSceneOrEngineUtils";
import { get_scenePlaneUtils } from "../../helpers/babylonjs/scenePlane";
import { get_globalUtils } from "../../helpers/prendyUtils/global";
import { PrendyOptionsUntyped, PrendyStoreHelpers } from "../../stores/typedStoreHelpers";

export function get_globalScenePlaneRules<
  StoreHelpers extends PrendyStoreHelpers,
  PrendyOptions extends PrendyOptionsUntyped
>(storeHelpers: StoreHelpers, prendyOptions: PrendyOptions) {
  const { focusScenePlaneOnFocusedDoll, getPlanePositionNotOverEdges, getShaderTransformStuff } = get_scenePlaneUtils(
    storeHelpers,
    prendyOptions
  );
  const { setGlobalState, getGlobalState } = get_globalUtils(storeHelpers);
  const { makeRules, getRefs, getState, setState } = storeHelpers;
  const { runMover, runMover2d } = makeRunMovers(storeHelpers);

  const globalRefs = getRefs().global.main;

  return makeRules(({ itemEffect, effect }) => ({
    whenPlanePositionChanges: effect({
      run(diffInfo) {
        const { planePos } = getState().global.main;
        const positionChanged = diffInfo.propsChangedBool.global.main.planePos;
        const zoomChanged = diffInfo.propsChangedBool.global.main.planeZoom;

        if (positionChanged || zoomChanged) getShaderTransformStuff();
      },
      check: { prop: ["planePos", "planeZoom"], type: "global" },
      atStepEnd: true,
      step: "planePosition",
    }),
    whenPlanePositionGoalChanges: itemEffect({
      run: () => setGlobalState({ planePosIsMoving: true }),
      check: { prop: "planePosGoal", type: "global" },
      atStepEnd: true,
      step: "planePosition",
    }),
    whenPlanePosIsMoving: itemEffect({
      run({ itemName }) {
        runMover2d({ name: itemName, type: "global", mover: "planePos" });
      },
      check: { prop: "planePosIsMoving", type: "global", becomes: true },
      atStepEnd: true,
      step: "planePositionStartMovers",
    }),
    whenPlaneZoomGoalChanges: itemEffect({
      run: () => setGlobalState({ planeZoomIsMoving: true }),
      check: { prop: "planeZoomGoal", type: "global" },
      atStepEnd: true,
      step: "planePosition",
    }),
    whenPlaneZoomIsMoving: itemEffect({
      run({ itemName }) {
        runMover({ name: itemName, type: "global", mover: "planeZoom" });
      },
      check: { prop: "planeZoomIsMoving", type: "global", becomes: true },
      atStepEnd: true,
      step: "planePositionStartMovers",
    }),
    whenShouldFocusOnDoll: itemEffect({
      run: () => focusScenePlaneOnFocusedDoll(),
      check: {
        prop: [
          "focusedDoll",
          "planeZoomGoal",
          // recalculating position when planeZoom changes is what allows it to stick to corners when zooming
          // it also requires focusScenePlaneOnFocusedDoll to run in the next tick
          "planeZoom",
        ],
        type: "global",
      },
      atStepEnd: true,
      step: "planePosition",
    }),
    whenPlaneZoomChangesToUpdatePlanePanOverEdges: itemEffect({
      // run: () => focusScenePlaneOnFocusedDoll(),
      run: () => {
        const planePos = getState().global.main.planePos;
        const newPlanePos = getPlanePositionNotOverEdges(planePos);
        setGlobalState({ planePos: newPlanePos });
      },
      check: { prop: ["planeZoom"], type: "global" },
      atStepEnd: true,
      step: "planePositionDontGoOverEdges",
    }),
    whenNowCamChanges: itemEffect({
      run: () => focusScenePlaneOnFocusedDoll("instant"),
      check: { prop: "nowCamName", type: "places" },
      atStepEnd: true,
      step: "planePosition",
    }),
    whenScreenResizes: itemEffect({
      run: async () => {
        await delay(10); // this helps it work on ipad

        const engine = get_getSceneOrEngineUtils(storeHelpers).getEngine();

        if (!engine) return;
        console.log("resized");

        const { editedHardwareScaling, editedPlaneSceneZoom } = getShaderTransformStuff();

        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const newRenderWidth = screenHeight * (16 / 9) * (1 / editedHardwareScaling);
        const newRenderHeight = screenHeight * (1 / editedHardwareScaling);
        // const newRenderWidth = screenHeight * (16 / 9) * 1;
        // const newRenderHeight = screenHeight * 1;

        engine.setSize(newRenderWidth, newRenderHeight);
        const depthRenderWidth = (globalRefs.depthRenderTarget as RenderTargetTexture).getRenderSize();
        globalRefs.depthRenderTarget?.resize({ width: newRenderWidth, height: newRenderHeight });

        focusScenePlaneOnFocusedDoll("instant");
      },
      check: { prop: "timeScreenResized", type: "global" },
      atStepEnd: true,
      step: "planePosition",
    }),
  }));
}
