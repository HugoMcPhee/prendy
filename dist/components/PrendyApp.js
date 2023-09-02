import { Camera, Color3, Color4, ScenePerformancePriority, Vector3 } from "@babylonjs/core";
import { toRadians } from "chootils/dist/speedAngleDistance";
import React, { useEffect } from "react";
import { Engine, Scene } from "react-babylonjs";
import { Globals } from "react-spring";
import loadStyles from "../helpers/loadStyles";
import { makeStartAndStopRules } from "../rules/rules";
import { get_LoadingModels } from "./LoadingModels";
import { get_ScreenGui } from "./gui/ScreenGui";
export function makePrendyApp(options) {
    const { storeHelpers, prendyAssets } = options;
    const { prendyOptions } = prendyAssets;
    loadStyles();
    const { getRefs, onNextTick, setState } = storeHelpers;
    Globals.assign({ frameLoop: "always", requestAnimationFrame: onNextTick });
    const ScreenGuiDom = get_ScreenGui(prendyAssets, storeHelpers);
    const LoadingModels = get_LoadingModels(prendyAssets, storeHelpers);
    const StartAndStopRules = makeStartAndStopRules(options);
    // const AllTestVideoStuff = get_AllTestVideoStuff(storeHelpers, ["city", "cityb", "beanshop"]);
    // const AllTestVideoStuff = get_AllTestVideoStuff(storeHelpers, ["stairy", "basement"]);
    return function PrendyApp({ children, extraScenes }) {
        const globalRefs = getRefs().global.main;
        useEffect(() => setState({ global: { main: { frameTick: 1 } } }), []);
        return (React.createElement("div", { id: "app", style: { width: "100vw", height: "100vh", overflow: "hidden" } },
            React.createElement(StartAndStopRules, null),
            React.createElement(Engine, { canvasId: "scene-canvas", adaptToDeviceRatio: false, engineOptions: {
                    disableWebGL2Support: false,
                    powerPreference: "high-performance",
                    // adaptToDeviceRatio: true, // NOTE this can mess with the calculating video stretch with engine.getRenderWidth(), but it does make the edges cleaner and higher res!
                    // adaptToDeviceRatio: false,
                } },
                React.createElement(Scene, { clearColor: Color4.FromColor3(Color3.FromHexString("#000000"), 0.0), onSceneMount: (info) => {
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
                    } },
                    React.createElement(LoadingModels, null, children),
                    React.createElement("targetCamera", { onCreated: (item) => item.detachControl(), name: "camera1", position: new Vector3(0, 0, -20), rotation: new Vector3(toRadians(0), toRadians(0), 0), mode: Camera.PERSPECTIVE_CAMERA })),
                extraScenes),
            React.createElement(ScreenGuiDom, null)));
    };
}
