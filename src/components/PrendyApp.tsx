import {
  Camera,
  Color3,
  Color4,
  Effect,
  FxaaPostProcess,
  PassPostProcess,
  PostProcess,
  ShaderStore,
  TargetCamera,
  Texture,
  Vector3,
} from "@babylonjs/core";
import React, { ReactNode, useCallback, useEffect } from "react";
import { Engine, Scene } from "react-babylonjs";
import { Globals } from "react-spring";
import { toRadians } from "chootils/dist/speedAngleDistance";
import { PrendyStoreHelpers, PlaceholderPrendyStores } from "../stores/typedStoreHelpers";
import { PrendyAssets, PrendyOptions } from "../declarations";
import loadStyles from "../helpers/loadStyles";
import { get_ScreenGui } from "./gui/ScreenGui";
import { get_LoadingModels } from "./LoadingModels";
import { get_ScenePlane } from "./ScenePlane";
import shaders from "../helpers/shaders";
// import { get_AllTestVideoStuff } from "./AllTestVideoStuff";

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

  const ScreenGuiDom = get_ScreenGui(storeHelpers, prendyStartOptions, prendyAssets);
  const LoadingModels = get_LoadingModels(storeHelpers, prendyStartOptions, prendyAssets);
  const ScenePlane = get_ScenePlane(storeHelpers, prendyStartOptions);

  // const AllTestVideoStuff = get_AllTestVideoStuff(storeHelpers, ["city", "cityb", "beanshop"]);

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
              engine.setSize(1280, 760);
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
                    // const postProcess =
                    // new FxaaPostProcess("fxaa", 1.0, globalRefs.scene.activeCamera);
                    // const postProcess1 = new FxaaPostProcess("fxaa", 1.0, globalRefs.scene.activeCamera);
                    // var postProcess2 = new PassPostProcess("Scene copy", 1.0, globalRefs.scene.activeCamera);
                    // if (globalRefs.scene.activeCamera) {
                    //   ShaderStore.ShadersStore["depthyPixelShader"] = shaders.backdropAndDepth.postProcess;
                    //   const postProcess = new PostProcess(
                    //     "backdropAndDepthShader",
                    //     "depthy",
                    //     null,
                    //     ["sceneSampler"], // textures
                    //     1,
                    //     globalRefs.scene.activeCamera
                    //     // globalRefs.activeCamera
                    //     // Texture.BILINEAR_SAMPLINGMODE, // sampling
                    //     // globalRefs.scene.engine // engine
                    //   );
                    //   // // const appliedProcess = postProcess.apply();
                    //   postProcess.onApply = (effect) => {
                    //     // effect.setTexture("textureSampler", globalRefs.sceneRenderTarget);
                    //     // effect.setTexture("SceneDepthTexture", globalRefs.depthRenderTarget);
                    //     effect.setFloat2("screenSize", postProcess.width, postProcess.height);
                    //     effect.setFloat("highlightThreshold", 0.9);
                    //     effect.setTexture("sceneSampler", globalRefs.depthRenderTarget);
                    //     // effect.setTextureFromPostProcess("sceneSampler", globalRefs.sceneRenderTarget);
                    //     // effect.setTextureFromPostProcess("sceneSampler", postProcess2);
                    //   };
                    // }
                    // const name = "passCustomPixelShader";
                    // const shader = `varying vec2 vUV;
                    // uniform sampler2D textureSampler;
                    // #define CUSTOM_FRAGMENT_DEFINITIONS
                    // void main(void)
                    // {
                    // gl_FragColor=texture2D(textureSampler,vUV);
                    // }`;
                    // // Sideeffect
                    // ShaderStore.ShadersStore[name] = shader;
                    // const customFragmentShader = `varying vec2 vUV;
                    // uniform sampler2D textureSampler;
                    // #define CUSTOM_FRAGMENT_DEFINITIONS
                    // void main(void)
                    // {
                    // gl_FragColor=texture2D(textureSampler,vUV);
                    // }`;
                    // var postProcess = new PostProcess(
                    //   "My custom post process",
                    //   "passCustom",
                    //   null,
                    //   null,
                    //   1,
                    //   globalRefs.scene.activeCamera
                    // );
                    // postProcess.onApply = function (effect) {
                    //   effect.setFloat2("screenSize", postProcess.width, postProcess.height);
                    //   effect.setFloat("threshold", 0.3);
                    // };
                  }
                });
              }}
              name="camera1"
              // position={new Vector3(0, 0, -2)}
              position={new Vector3(0, 0, -20)}
              rotation={new Vector3(toRadians(0), toRadians(0), 0)}
              mode={Camera.PERSPECTIVE_CAMERA}
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
