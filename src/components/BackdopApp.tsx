import {
  Camera,
  Color3,
  Color4,
  FxaaPostProcess,
  TargetCamera,
  Vector3,
} from "@babylonjs/core";
import loadStyles from "../utils/loadStyles";
// import { AllTestVideoStuff } from "./AllTestVideoStuff";
// ScreenGuiDom
import React, { ReactNode, useCallback, useEffect } from "react";
import { Engine, Scene } from "react-babylonjs";
import { Globals } from "react-spring";
import { toRadians } from "shutils/dist/speedAngleDistance";
import {
  BackdopConcepFuncs,
  BackdopOptionsUntyped,
  PickupsInfoPlaceholder,
  PlaceholderBackdopConcepts,
  PlaceInfoByNamePlaceholder,
} from "../concepts/typedConcepFuncs";
// import { makeAllTestVideoStuff } from "./AllTestVideoStuff";
// import "./BackdopApp.css";
import { makeScreenGui } from "./gui/ScreenGui";
import { makeLoadingModels } from "./LoadingModels";
import { makeScenePlane } from "./ScenePlane";

loadStyles();

type Props = { children?: ReactNode };

export function makeBackdopApp<
  ConcepFuncs extends BackdopConcepFuncs,
  BackdopConcepts extends PlaceholderBackdopConcepts,
  BackdopOptions extends BackdopOptionsUntyped,
  AnyCameraName extends string,
  AnySegmentName extends string,
  PlaceName extends string,
  CharacterName extends string,
  DollName extends string,
  SoundName extends string,
  PickupName extends string,
  PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>,
  SpotNameByPlace extends Record<PlaceName, string>,
  WallNameByPlace extends Record<PlaceName, string>,
  SegmentNameByPlace extends Record<PlaceName, string>,
  CameraNameByPlace extends Record<PlaceName, string>,
  SoundFiles extends Record<SoundName, string>,
  PickupsInfo extends PickupsInfoPlaceholder<PickupName>,
  SpeechVidFiles extends Record<string, string>
>(
  concepFuncs: ConcepFuncs,
  backdopConcepts: BackdopConcepts,
  backdopStartOptions: BackdopOptions,
  placeInfoByName: PlaceInfoByName,
  characterNames: readonly CharacterName[],
  dollNames: readonly DollName[],
  soundFiles: SoundFiles,
  pickupsInfo: PickupsInfo,
  speechVidFiles: SpeechVidFiles
) {
  const { getRefs, onNextTick, setState } = concepFuncs;

  Globals.assign({ frameLoop: "always", requestAnimationFrame: onNextTick });

  const ScreenGuiDom = makeScreenGui<
    ConcepFuncs,
    BackdopOptions,
    CharacterName,
    PickupName,
    PickupsInfo,
    SpeechVidFiles
  >(
    concepFuncs,
    backdopStartOptions,
    characterNames,
    pickupsInfo,
    speechVidFiles
  );

  const LoadingModels = makeLoadingModels<
    ConcepFuncs,
    BackdopConcepts,
    BackdopOptions,
    AnyCameraName,
    AnySegmentName,
    PlaceName,
    CharacterName,
    DollName,
    SoundName,
    PlaceInfoByName,
    SpotNameByPlace,
    WallNameByPlace,
    SegmentNameByPlace,
    CameraNameByPlace,
    SoundFiles
  >(
    concepFuncs,
    backdopConcepts,
    backdopStartOptions,
    placeInfoByName,
    characterNames,
    dollNames,
    soundFiles
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
          canvasId="sce ne-canvas"
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
