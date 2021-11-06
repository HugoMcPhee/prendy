import { Camera, Color3, Color4, FxaaPostProcess, Vector3, } from "@babylonjs/core";
// import { AllTestVideoStuff } from "./AllTestVideoStuff";
// ScreenGuiDom
import React, { useCallback, useEffect } from "react";
import { Engine, Scene } from "react-babylonjs";
import { Globals } from "react-spring";
import { toRadians } from "shutils/dist/speedAngleDistance";
// import "./BackdopApp.css";
import { makeScreenGui } from "./gui/ScreenGui";
import { makeLoadingModels } from "./LoadingModels";
import { makeScenePlane } from "./ScenePlane";
export function makeBackdopApp(concepFuncs, backdopConcepts, backdopStartOptions, placeInfoByName, characterNames, dollNames, soundFiles, pickupsInfo, speechVidFiles) {
    const { getRefs, onNextTick, setState } = concepFuncs;
    Globals.assign({ frameLoop: "always", requestAnimationFrame: onNextTick });
    const ScreenGuiDom = makeScreenGui(concepFuncs, backdopStartOptions, characterNames, pickupsInfo, speechVidFiles);
    const LoadingModels = makeLoadingModels(concepFuncs, backdopConcepts, backdopStartOptions, placeInfoByName, characterNames, dollNames, soundFiles);
    const ScenePlane = makeScenePlane(concepFuncs, backdopStartOptions);
    return function BackdopApp({ children }) {
        const globalRefs = getRefs().global.main;
        const scenePlaneCameraRef = useCallback((node) => {
            globalRefs.scenePlaneCamera = node;
        }, [globalRefs]);
        useEffect(() => {
            setState({ global: { main: { frameTick: Date.now() } } });
            // tryingSafeStackVid();
            // tryingSafeSectionStackVid();
        }, []);
        return (React.createElement("div", { id: "app", style: { width: "100vw", height: "100vh", overflow: "hidden" } },
            React.createElement(Engine, { canvasId: "scene-canvas", adaptToDeviceRatio: false, engineOptions: {
                    disableWebGL2Support: false,
                    powerPreference: "high-performance",
                } },
                React.createElement(Scene, { clearColor: Color4.FromColor3(Color3.FromHexString("#aca898"), 0.0), 
                    // onSceneMount={(info) => (globalRefs.scenes.main = info.scene)}
                    onSceneMount: (info) => {
                        info.scene.autoClear = false;
                        info.scene.autoClearDepthAndStencil = false;
                        // info.scene.blockMaterialDirtyMechanism = true;
                        // setTimeout(() => {
                        // info.scene.freezeActiveMeshes();
                        // }, 5000);
                        globalRefs.scenes.main = info.scene;
                        globalRefs.scenes.backdrop = info.scene;
                        const engine = info.scene.getEngine();
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
                        onNextTick(() => {
                            if (globalRefs.scenes.backdrop) {
                                // const postProcess =
                                new FxaaPostProcess("fxaa", 1.0, globalRefs.scenes.backdrop.activeCamera);
                            }
                        });
                        // engine.setHardwareScalingLevel(1);
                        // Each frame is rendered manually inside the video looping check function atm
                        engine.stopRenderLoop();
                    } },
                    React.createElement(LoadingModels, null, children),
                    React.createElement("targetCamera", { name: "camera1", position: new Vector3(0, 0, -2), rotation: new Vector3(toRadians(0), toRadians(0), 0), mode: Camera.ORTHOGRAPHIC_CAMERA, ref: scenePlaneCameraRef }),
                    React.createElement(ScenePlane, null))),
            React.createElement(ScreenGuiDom, null)));
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
