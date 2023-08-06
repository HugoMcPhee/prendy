import { Camera, Color3, Color4, ScenePerformancePriority, Vector3 } from "@babylonjs/core";
import { toRadians } from "chootils/dist/speedAngleDistance";
import React, { ReactNode, useEffect } from "react";
import { Engine, Scene } from "react-babylonjs";
import { Globals } from "react-spring";
import loadStyles from "../helpers/loadStyles";
import { MakeStartRulesOptions, makeStartAndStopRules } from "../rules/rules";
import { get_LoadingModels } from "./LoadingModels";
import { get_ScreenGui } from "./gui/ScreenGui";
import {
  AnyCameraName,
  AnySegmentName,
  AnyTriggerName,
  CameraNameByPlace,
  CharacterName,
  DollName,
  PlaceInfoByName,
  PlaceName,
  PrendyAssets,
  PrendyOptions,
  PrendyStoreHelpers,
  PrendyStores,
  SegmentNameByPlace,
  SpotNameByPlace,
  WallNameByPlace,
} from "../declarations";
// import { get_AllTestVideoStuff } from "./AllTestVideoStuff";

type Props = { children?: ReactNode; extraScenes?: ReactNode };

export function makePrendyApp<
  A_AnyCameraName extends AnyCameraName = AnyCameraName,
  A_AnySegmentName extends AnySegmentName = AnySegmentName,
  A_AnyTriggerName extends AnyTriggerName = AnyTriggerName,
  A_CameraNameByPlace extends CameraNameByPlace = CameraNameByPlace,
  A_CharacterName extends CharacterName = CharacterName,
  A_DollName extends DollName = DollName,
  A_PlaceInfoByName extends PlaceInfoByName = PlaceInfoByName,
  A_PlaceName extends PlaceName = PlaceName,
  A_PrendyAssets extends PrendyAssets = PrendyAssets,
  A_PrendyOptions extends PrendyOptions = PrendyOptions,
  A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers,
  A_PrendyStores extends PrendyStores = PrendyStores,
  A_SegmentNameByPlace extends SegmentNameByPlace = SegmentNameByPlace,
  A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace,
  A_WallNameByPlace extends WallNameByPlace = WallNameByPlace
>(options: MakeStartRulesOptions<A_PrendyStoreHelpers, A_PrendyStores, A_PrendyOptions, A_PrendyAssets>) {
  const { storeHelpers, prendyOptions, prendyAssets } = options;

  loadStyles();

  const { getRefs, onNextTick, setState } = storeHelpers;

  Globals.assign({ frameLoop: "always", requestAnimationFrame: onNextTick });

  const ScreenGuiDom = get_ScreenGui(storeHelpers, prendyOptions, prendyAssets);
  const LoadingModels = get_LoadingModels<
    A_AnyCameraName,
    A_AnySegmentName,
    A_AnyTriggerName,
    A_CameraNameByPlace,
    A_CharacterName,
    A_DollName,
    A_PlaceInfoByName,
    A_PlaceName,
    A_PrendyAssets,
    A_PrendyOptions,
    A_PrendyStoreHelpers,
    A_PrendyStores,
    A_SegmentNameByPlace,
    A_SpotNameByPlace,
    A_WallNameByPlace
  >(storeHelpers, prendyOptions, prendyAssets);
  const StartAndStopRules = makeStartAndStopRules<
    A_DollName,
    A_PlaceName,
    A_PrendyAssets,
    A_PrendyOptions,
    A_PrendyStoreHelpers,
    A_PrendyStores,
    A_SpotNameByPlace
  >(options);
  // const AllTestVideoStuff = get_AllTestVideoStuff(storeHelpers, ["city", "cityb", "beanshop"]);
  // const AllTestVideoStuff = get_AllTestVideoStuff(storeHelpers, ["stairy", "basement"]);

  return function PrendyApp({ children, extraScenes }: Props) {
    const globalRefs = getRefs().global.main;

    useEffect(() => setState({ global: { main: { frameTick: 1 } } }), []);

    return (
      <div id="app" style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
        {/* <AllTestVideoStuff /> */}
        <StartAndStopRules />
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
              globalRefs.scene = info.scene;
              const engine = info.scene.getEngine();
              engine.stopRenderLoop(); // Each frame is rendered manually inside the video looping check function
              engine.disableUniformBuffers = true;
              engine.setHardwareScalingLevel(1); // NOTE could set this based on the zoom level to prevent objects getting blurry when zooming in
              engine.setSize(1280, 720);

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
  };
}
