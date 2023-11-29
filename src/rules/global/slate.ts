import delay from "delay";
import { getRefs, getState, makeRules } from "repond";
import { makeMoverUtils } from "repond-movers";
import { MyTypes } from "../../declarations";
import { getEngine } from "../../helpers/babylonjs/getSceneOrEngineUtils";
import {
  focusSlateOnFocusedDoll,
  getShaderTransformStuff,
  getSlatePositionNotOverEdges,
} from "../../helpers/babylonjs/slate";
import { setGlobalState } from "../../helpers/prendyUtils/global";
import { timeStatePath } from "../../stores/global/global";

export function get_globalSlateRules<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"]) {
  const { addMoverRules } = makeMoverUtils(timeStatePath);

  const { prendyOptions } = prendyAssets;

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

        const engine = getEngine();

        if (!engine) return;

        const { editedHardwareScaling, editedSlateSceneZoom } = getShaderTransformStuff();

        const screenHeight = window.innerHeight;
        const screenWidth = window.innerWidth;

        const newRenderWidth = screenHeight * (16 / 9) * (1 / editedHardwareScaling);
        const newRenderHeight = screenHeight * (1 / editedHardwareScaling);

        engine.setSize(newRenderWidth, newRenderHeight);
        globalRefs.depthRenderTarget?.resize({ width: newRenderWidth, height: newRenderHeight });

        // if the new screen ratio is equal to or thinner than a vertical 16:9, then set isOnVerticalPhone to true
        const isOnVerticalScreen = screenHeight / screenWidth >= 1;

        // check if the screen is super wide (for landscape phones)
        const isOnSuperWideScreen = screenWidth / screenHeight >= 16 / 7;

        console.log("isOnSuperWideScreen", isOnSuperWideScreen);

        let newZoomMultiplier = 1;

        if (isOnVerticalScreen) {
          // ifon a vertical screen, get a multiplier to make the zoom levels smaller
          // it should be so that (newZoomMultiplier * prendyOptions.zoomLevels.default) is 1
          newZoomMultiplier = 1 / prendyOptions.zoomLevels.default;
        } else if (isOnSuperWideScreen) {
          // it should be so that (newZoomMultiplier * prendyOptions.zoomLevels.default) is 1.025
          newZoomMultiplier = 1.025 / prendyOptions.zoomLevels.default;
        }

        setGlobalState({ isOnVerticalScreen: true, zoomMultiplier: newZoomMultiplier });

        focusSlateOnFocusedDoll("instant");
      },
      check: { prop: "timeScreenResized", type: "global" },
      atStepEnd: true,
      step: "slatePosition",
    }),
    ...addMoverRules("global", "slatePos", "2d"),
    ...addMoverRules("global", "slateZoom"),
  }));
}
