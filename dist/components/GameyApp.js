import { Camera, Color3, Color4, FxaaPostProcess, Vector3, } from "@babylonjs/core";
// import { AllTestVideoStuff } from "./AllTestVideoStuff";
// ScreenGuiDom
import React, { useCallback, useEffect } from "react";
import { Engine, Scene } from "react-babylonjs";
import { toRadians } from "shutils/dist/speedAngleDistance";
// import "./GameyApp.css";
import { makeScreenGui } from "./gui/ScreenGui";
import { makeLoadingModels } from "./LoadingModels";
import { makeScenePlane } from "./ScenePlane";
export function makeGameyApp(conceptoFuncs, gameyConcepts, gameyStartOptions, placeInfoByName, characterNames, dollNames, soundFiles, pickupsInfo) {
    const { getRefs, onNextTick, setState } = conceptoFuncs;
    const ScreenGuiDom = makeScreenGui(conceptoFuncs, characterNames, pickupsInfo);
    const LoadingModels = makeLoadingModels(conceptoFuncs, gameyConcepts, gameyStartOptions, placeInfoByName, characterNames, dollNames, soundFiles);
    const ScenePlane = makeScenePlane(conceptoFuncs, gameyStartOptions);
    return function GameyApp({ children }) {
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
            React.createElement("div", { id: "attachVidsForAutoPlay", style: { display: "none", position: "absolute" } }),
            React.createElement(Engine, { canvasId: "scene-canvas", adaptToDeviceRatio: false },
                React.createElement(Scene, { clearColor: Color4.FromColor3(Color3.FromHexString("#aca898"), 0.0), 
                    // onSceneMount={(info) => (globalRefs.scenes.main = info.scene)}
                    onSceneMount: (info) => {
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
                    } },
                    React.createElement("targetCamera", { name: "camera1", position: new Vector3(0, 7, -15), rotation: new Vector3(toRadians(15), toRadians(0), 0), fov: toRadians(50) }),
                    React.createElement(LoadingModels, null, children)),
                React.createElement(Scene, { clearColor: Color4.FromColor3(Color3.FromHexString("#000000")), onSceneMount: (info) => {
                        globalRefs.scenes.backdrop = info.scene;
                        onNextTick(() => {
                            if (globalRefs.scenes.backdrop) {
                                // const postProcess =
                                new FxaaPostProcess("fxaa", 1.0, globalRefs.scenes.backdrop.activeCamera);
                            }
                        });
                    } },
                    React.createElement("targetCamera", { name: "camera1", position: new Vector3(0, 0, -2), rotation: new Vector3(toRadians(0), toRadians(0), 0), mode: Camera.ORTHOGRAPHIC_CAMERA, ref: scenePlaneCameraRef }),
                    React.createElement(ScenePlane, null))),
            React.createElement(ScreenGuiDom, null)));
    };
}
// add this to see scene behind the scene texture rectangle
// info.scene.autoClear = false;
