import { Camera, Color3, Color4, FxaaPostProcess, TargetCamera, Vector3 } from "@babylonjs/core";
import React, { ReactNode, useCallback, useEffect } from "react";
import { Engine, Scene } from "react-babylonjs";
import { Globals } from "react-spring";
import { toRadians } from "chootils/dist/speedAngleDistance";
import { PrendyStoreHelpers, PlaceholderPrendyStores } from "../stores/typedStoreHelpers";
import { PrendyAssets, PrendyOptions } from "../declarations";
import loadStyles from "../helpers/loadStyles";
import { makeTyped_ScreenGui } from "./gui/ScreenGui";
import { makeTyped_LoadingModels } from "./LoadingModels";
import { makeTyped_ScenePlane } from "./ScenePlane";
// import { makeTyped_AllTestVideoStuff } from "./AllTestVideoStuff";

loadStyles();

type Props = { children?: ReactNode; extraScenes?: ReactNode };

export function makePrendyApp<StoreHelpers extends PrendyStoreHelpers, PrendyStores extends PlaceholderPrendyStores>(
  storeHelpers: StoreHelpers,
  prendyStores: PrendyStores,
  prendyStartOptions: PrendyOptions,
  prendyAssets: PrendyAssets
) {
  const { getRefs, onNextTick, setState } = storeHelpers;

  Globals.assign({ frameLoop: "always", requestAnimationFrame: onNextTick });

  const ScreenGuiDom = makeTyped_ScreenGui(storeHelpers, prendyStartOptions, prendyAssets);
  const LoadingModels = makeTyped_LoadingModels(storeHelpers, prendyStartOptions, prendyAssets);
  const ScenePlane = makeTyped_ScenePlane(storeHelpers, prendyStartOptions);

  // const AllTestVideoStuff = makeTyped_AllTestVideoStuff(storeHelpers, ["city", "cityb", "beanshop"]);

  return function PrendyApp({ children, extraScenes }: Props) {
    const globalRefs = getRefs().global.main;

    const scenePlaneCameraRef = useCallback(
      (node: TargetCamera) => {
        globalRefs.scenePlaneCamera = node;
      },
      [globalRefs]
    );

    useEffect(() => setState({ global: { main: { frameTick: Date.now() } } }), []);

    return (
      <div id="app" style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
        {/* <AllTestVideoStuff /> */}
        <Engine
          canvasId="scene-canvas"
          adaptToDeviceRatio={false}
          engineOptions={{
            disableWebGL2Support: false,
            powerPreference: "high-performance",
          }}
        >
          <Scene
            clearColor={Color4.FromColor3(Color3.FromHexString("#000000"), 0.0)}
            onSceneMount={(info) => {
              globalRefs.scene = info.scene;
              const engine = info.scene.getEngine();
              // Each frame is rendered manually inside the video looping check function atm
              engine.stopRenderLoop();
              engine.disableUniformBuffers = true;
              info.scene.autoClear = false;
              info.scene.autoClearDepthAndStencil = false;
              info.scene.skipFrustumClipping = true;
              // add this to see scene behind the scene texture rectangle
              // info.scene.autoClear = false;

              engine.onResizeObservable.add(() => {
                setState({ global: { main: { timeScreenResized: Date.now() } } });
              });
            }}
          >
            <LoadingModels>{children}</LoadingModels>
            {/*  scene plane stuff */}
            <targetCamera
              onCreated={() => {
                onNextTick(() => {
                  if (globalRefs.scene) {
                    /* const postProcess = */ new FxaaPostProcess("fxaa", 1.0, globalRefs.scene.activeCamera);
                  }
                });
              }}
              name="camera1"
              position={new Vector3(0, 0, -2)}
              rotation={new Vector3(toRadians(0), toRadians(0), 0)}
              mode={Camera.ORTHOGRAPHIC_CAMERA}
              ref={scenePlaneCameraRef}
              layerMask={23}
            />
            <ScenePlane />
          </Scene>
          {extraScenes}
        </Engine>
        <ScreenGuiDom />
      </div>
    );
  };
}
