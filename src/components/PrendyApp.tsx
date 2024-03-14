import { Camera, Color3, Color4, ScenePerformancePriority, Vector3 } from "@babylonjs/core";
import { toRadians } from "chootils/dist/speedAngleDistance";
import React, { ReactNode, useEffect } from "react";
import { Engine, Scene } from "react-babylonjs";
import { getRefs, setState } from "repond";
import { StartAndStopPrendyRules } from "../effects/rules";
import { LoadingModels } from "./LoadingModels";
import { ScreenGui as ScreenGuiDom } from "./gui/ScreenGui";

type Props = {
  children?: ReactNode;
  extraScenes?: ReactNode;
};

export function PrendyApp({ children, extraScenes }: Props) {
  useEffect(() => {
    setState({ global: { main: { frameTick: 1 } } });
  }, []);

  return (
    <div id="app" style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      {/* <AllTestVideoStuff /> */}
      <StartAndStopPrendyRules />
      <Engine
        canvasId="scene-canvas"
        adaptToDeviceRatio={false}
        engineOptions={{
          disableWebGL2Support: false,
          powerPreference: "high-performance",
          // adaptToDeviceRatio: true, // NOTE this can mess with the calculating video stretch with engine.getRenderWidth(), but it does make the edges cleaner and higher res!
          // adaptToDeviceRatio: false,
        }}
      >
        <Scene
          clearColor={Color4.FromColor3(Color3.FromHexString("#000000"), 0.0)}
          onSceneMount={(info) => {
            const globalRefs = getRefs().global.main;
            globalRefs.scene = info.scene;
            const engine = info.scene.getEngine();
            engine.stopRenderLoop(); // Each frame is rendered manually inside the video looping check function
            engine.disableUniformBuffers = true;
            engine.setHardwareScalingLevel(1); // NOTE could set this based on the zoom level to prevent objects getting blurry when zooming in
            engine.setSize(1920, 1080);

            info.scene.performancePriority = ScenePerformancePriority.BackwardCompatible;
            info.scene.autoClear = false;
            info.scene.autoClearDepthAndStencil = false;
            info.scene.skipFrustumClipping = true;
            info.scene.skipPointerMovePicking = true;
            info.scene.constantlyUpdateMeshUnderPointer = false;

            info.scene.onPrePointerObservable.add((pointerInfo) => {
              pointerInfo.skipOnPointerObservable = true;
            });

            info.scene.detachControl();
            engine.onResizeObservable.add(() => setState({ global: { main: { timeScreenResized: Date.now() } } }));
          }}
        >
          <LoadingModels>{children}</LoadingModels>
          {/* This may be just to have an initital camera in babylonjs */}
          <targetCamera
            onCreated={(item) => item.detachControl()}
            name="camera1"
            position={new Vector3(0, 0, -20)}
            rotation={new Vector3(toRadians(0), toRadians(0), 0)}
            mode={Camera.PERSPECTIVE_CAMERA}
            // layerMask={23}
          />
        </Scene>
        {extraScenes}
      </Engine>
      <ScreenGuiDom />
    </div>
  );
}
