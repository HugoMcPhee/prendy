import { Camera, Color3, Color4, TargetCamera, Vector3 } from "@babylonjs/core";
// import { AllTestVideoStuff } from "./AllTestVideoStuff";
// ScreenGuiDom
import React, { ReactNode, useCallback, useEffect } from "react";
import { Engine, Scene } from "react-babylonjs";
import { Globals } from "react-spring";
import { toRadians } from "shutils/dist/speedAngleDistance";
import {
  BackdopConcepFuncs,
  PlaceholderBackdopConcepts,
} from "../concepts/typedConcepFuncs";
import { BackdopArt, BackdopOptions } from "../declarations";
import loadStyles from "../utils/loadStyles";
// import { makeAllTestVideoStuff } from "./AllTestVideoStuff";
// import "./BackdopApp.css";
import { makeScreenGui } from "./gui/ScreenGui";
import { makeLoadingModels } from "./LoadingModels";
import { makeScenePlane } from "./ScenePlane";

loadStyles();

type Props = { children?: ReactNode };

export function makeBackdopApp<
  ConcepFuncs extends BackdopConcepFuncs,
  BackdopConcepts extends PlaceholderBackdopConcepts
>(
  concepFuncs: ConcepFuncs,
  backdopConcepts: BackdopConcepts,
  backdopStartOptions: BackdopOptions,
  backdopArt: BackdopArt
  //
  // placeInfoByName: PlaceInfoByName,
  // characterNames: readonly CharacterName[],
  // dollNames: readonly DollName[],
  // soundFiles: SoundFiles,
  // pickupsInfo: PickupsInfo,
  // speechVidFiles: SpeechVidFiles
) {
  const { getRefs, onNextTick, setState } = concepFuncs;

  Globals.assign({ frameLoop: "always", requestAnimationFrame: onNextTick });

  const ScreenGuiDom = makeScreenGui(
    concepFuncs,
    backdopStartOptions,
    backdopArt
  );

  const LoadingModels = makeLoadingModels(
    concepFuncs,
    backdopStartOptions,
    backdopArt
  );

  const ScenePlane = makeScenePlane(concepFuncs, backdopStartOptions);

  // const AllTestVideoStuff = makeAllTestVideoStuff(concepFuncs, [
  //   "city",
  //   "cityb",
  //   "beanshop",
  // ]);

  return function BackdopApp({ children }: Props) {
    const globalRefs = getRefs().global.main;

    const scenePlaneCameraRef = useCallback(
      (node: TargetCamera) => {
        globalRefs.scenePlaneCamera = node;

        // setTimeout(() => {
        // const activeMeshes = node._activeMeshes;
        // const activeMeshes = node.getActiveMeshes();
        // console.log("______________________");
        // console.log("activeMeshes");
        // console.log(activeMeshes);
        // }, 5000);
      },
      [globalRefs]
    );

    useEffect(() => {
      setState({ global: { main: { frameTick: Date.now() } } });

      // tryingSafeStackVid();
      // tryingSafeSectionStackVid();
    }, []);

    return (
      <div
        id="app"
        style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
      >
        {/*
        <div
          id="attachVidsForAutoPlay"
          style={{ display: "none", position: "absolute" }}
        ></div>
        */}
        {/*
        <AllTestVideoStuff />
        */}

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
            // onSceneMount={(info) => (globalRefs.scenes.main = info.scene)}
            onSceneMount={(info) => {
              const engine = info.scene.getEngine();
              // Each frame is rendered manually inside the video looping check function atm
              engine.stopRenderLoop();
              engine.disableUniformBuffers = true;
              info.scene.autoClear = false;
              info.scene.autoClearDepthAndStencil = false;

              info.scene.skipFrustumClipping = true;

              // info.scene.blockMaterialDirtyMechanism = true;
              // setTimeout(() => {
              // info.scene.freezeActiveMeshes();
              // }, 5000);
              globalRefs.scenes.main = info.scene;
              globalRefs.scenes.backdrop = info.scene;

              // engine.setHardwareScalingLevel(8);
              // if (engine._workingCanvas) {
              // engine._workingCanvas.width = 1280;
              // engine._workingCanvas.height = 720;
              // }

              engine.onResizeObservable.add(() => {
                setState({
                  global: { main: { timeScreenResized: Date.now() } },
                });
              });

              // onNextTick(() => {
              //   if (globalRefs.scenes.backdrop) {
              //     // const postProcess =
              //     new FxaaPostProcess(
              //       "fxaa",
              //       1.0,
              //       globalRefs.scenes.backdrop.activeCamera
              //     );
              //   }
              // });
            }}
          >
            <LoadingModels>{children}</LoadingModels>

            {/*  scene plane stuff */}
            <targetCamera
              name="camera1"
              position={new Vector3(0, 0, -2)}
              rotation={new Vector3(toRadians(0), toRadians(0), 0)}
              mode={Camera.ORTHOGRAPHIC_CAMERA}
              ref={scenePlaneCameraRef}
              layerMask={23}
            />
            <ScenePlane />
          </Scene>
        </Engine>
        <ScreenGuiDom />
      </div>
    );
  };
}

// <Scene
//   clearColor={Color4.FromColor3(Color3.FromHexString("#000000"))}
//   onSceneMount={(info) => {
//     globalRefs.scenes.backdrop = info.scene;
//     info.scene.autoClear = false;
//     info.scene.autoClearDepthAndStencil = false;
//     // info.scene.blockMaterialDirtyMechanism = true;
//     info.scene.freezeActiveMeshes();
//
//     // onNextTick(() => {
//     //   if (globalRefs.scenes.backdrop) {
//     //     // const postProcess =
//     //     new FxaaPostProcess(
//     //       "fxaa",
//     //       1.0,
//     //       globalRefs.scenes.backdrop.activeCamera
//     //     );
//     //   }
//     // });
//   }}
// >
//   <targetCamera
//     name="camera1"
//     position={new Vector3(0, 0, -2)}
//     rotation={new Vector3(toRadians(0), toRadians(0), 0)}
//     mode={Camera.ORTHOGRAPHIC_CAMERA}
//     ref={scenePlaneCameraRef}
//   />
//   <ScenePlane />
// </Scene>

// add this to see scene behind the scene texture rectangle
// info.scene.autoClear = false;
