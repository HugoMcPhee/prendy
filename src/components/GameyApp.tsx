import {
  Camera,
  Color3,
  Color4,
  FxaaPostProcess,
  Vector3,
} from "@babylonjs/core";
// import { AllTestVideoStuff } from "./AllTestVideoStuff";
// ScreenGuiDom
import React, { ReactNode, useCallback, useEffect } from "react";
import { Engine, Scene } from "react-babylonjs";
import { toRadians } from "shutils/dist/speedAngleDistance";
import {
  GameyConceptoFuncs,
  GameyStartOptionsUntyped,
  PickupsInfoPlaceholder,
  PlaceholderGameyConcepts,
  PlaceInfoByNamePlaceholder,
} from "../concepts/typedConceptoFuncs";
// import "./GameyApp.css";
import { makeScreenGui } from "./gui/ScreenGui";
import { makeLoadingModels } from "./LoadingModels";
import { makeScenePlane } from "./ScenePlane";

type Props = { children?: ReactNode };

export function makeGameyApp<
  ConceptoFuncs extends GameyConceptoFuncs,
  GameyConcepts extends PlaceholderGameyConcepts,
  GameyStartOptions extends GameyStartOptionsUntyped,
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
  PickupsInfo extends PickupsInfoPlaceholder<PickupName>
>(
  conceptoFuncs: ConceptoFuncs,
  gameyConcepts: GameyConcepts,
  gameyStartOptions: GameyStartOptions,
  placeInfoByName: PlaceInfoByName,
  characterNames: readonly CharacterName[],
  dollNames: readonly DollName[],
  soundFiles: SoundFiles,
  pickupsInfo: PickupsInfo
) {
  const { getRefs, onNextTick, setState } = conceptoFuncs;

  const ScreenGuiDom = makeScreenGui<
    ConceptoFuncs,
    CharacterName,
    PickupName,
    PickupsInfo
  >(conceptoFuncs, characterNames, pickupsInfo);

  const LoadingModels = makeLoadingModels<
    ConceptoFuncs,
    GameyConcepts,
    GameyStartOptions,
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
    conceptoFuncs,
    gameyConcepts,
    gameyStartOptions,
    placeInfoByName,
    characterNames,
    dollNames,
    soundFiles
  );

  const ScenePlane = makeScenePlane(conceptoFuncs, gameyStartOptions);

  return function GameyApp({ children }: Props) {
    const globalRefs = getRefs().global.main;

    const scenePlaneCameraRef = useCallback(
      (node) => {
        globalRefs.scenePlaneCamera = node;
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
        <div
          id="attachVidsForAutoPlay"
          style={{ display: "none", position: "absolute" }}
        ></div>
        {/* <AllTestVideoStuff /> */}

        <Engine canvasId="scene-canvas" adaptToDeviceRatio={false}>
          <Scene
            clearColor={Color4.FromColor3(Color3.FromHexString("#aca898"), 0.0)}
            // onSceneMount={(info) => (globalRefs.scenes.main = info.scene)}
            onSceneMount={(info) => {
              globalRefs.scenes.main = info.scene;

              const engine = info.scene.getEngine();

              if (engine._workingCanvas) {
                // engine._workingCanvas.width = 1280;
                // engine._workingCanvas.height = 720;
              }

              engine.onResizeObservable.add(() => {
                setState({
                  global: { main: { timeScreenResized: Date.now() } },
                });
              });

              // Each frame is rendered manually inside the video looping check function atm
              engine.stopRenderLoop();
            }}
          >
            <targetCamera
              name="camera1"
              position={new Vector3(0, 7, -15)}
              rotation={new Vector3(toRadians(15), toRadians(0), 0)}
              fov={toRadians(50)}
            />
            <LoadingModels>{children}</LoadingModels>
          </Scene>
          <Scene
            clearColor={Color4.FromColor3(Color3.FromHexString("#000000"))}
            onSceneMount={(info) => {
              globalRefs.scenes.backdrop = info.scene;

              onNextTick(() => {
                if (globalRefs.scenes.backdrop) {
                  // const postProcess =
                  new FxaaPostProcess(
                    "fxaa",
                    1.0,
                    globalRefs.scenes.backdrop.activeCamera
                  );
                }
              });
            }}
          >
            <targetCamera
              name="camera1"
              position={new Vector3(0, 0, -2)}
              rotation={new Vector3(toRadians(0), toRadians(0), 0)}
              mode={Camera.ORTHOGRAPHIC_CAMERA}
              ref={scenePlaneCameraRef}
            />
            <ScenePlane />
          </Scene>
        </Engine>
        <ScreenGuiDom />
      </div>
    );
  };
}

// add this to see scene behind the scene texture rectangle
// info.scene.autoClear = false;
