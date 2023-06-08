import { Camera, Color3, Color4, ScenePerformancePriority, Vector3 } from "@babylonjs/core";
import { toRadians } from "chootils/dist/speedAngleDistance";
import React, { useEffect } from "react";
import { Engine, Scene } from "react-babylonjs";
import { Globals } from "react-spring";
import loadStyles from "../helpers/loadStyles";
import { get_LoadingModels } from "./LoadingModels";
import { get_ScreenGui } from "./gui/ScreenGui";
// import { get_AllTestVideoStuff } from "./AllTestVideoStuff";
loadStyles();
export function makePrendyApp(storeHelpers, prendyStores, prendyStartOptions, prendyAssets) {
    const { getRefs, onNextTick, setState } = storeHelpers;
    Globals.assign({ frameLoop: "always", requestAnimationFrame: onNextTick });
    const ScreenGuiDom = get_ScreenGui(storeHelpers, prendyStartOptions, prendyAssets);
    const LoadingModels = get_LoadingModels(storeHelpers, prendyStartOptions, prendyAssets);
    // const AllTestVideoStuff = get_AllTestVideoStuff(storeHelpers, ["city", "cityb", "beanshop"]);
    return function PrendyApp({ children, extraScenes }) {
        const globalRefs = getRefs().global.main;
        useEffect(() => setState({ global: { main: { frameTick: 1 } } }), []);
        return (React.createElement("div", { id: "app", style: { width: "100vw", height: "100vh", overflow: "hidden" } },
            React.createElement(Engine, { canvasId: "scene-canvas", adaptToDeviceRatio: false, engineOptions: {
                    disableWebGL2Support: false,
                    powerPreference: "high-performance",
                    // adaptToDeviceRatio: true, // NOTE this can mess with the calculating video stretch with engine.getRenderWidth(), but it does make the edges cleaner and higher res!
                    // adaptToDeviceRatio: false,
                } },
                React.createElement(Scene, { clearColor: Color4.FromColor3(Color3.FromHexString("#000000"), 0.0), onSceneMount: (info) => {
                        globalRefs.scene = info.scene;
                        const engine = info.scene.getEngine();
                        // Each frame is rendered manually inside the video looping check function atm
                        engine.stopRenderLoop();
                        engine.disableUniformBuffers = true;
                        engine.setHardwareScalingLevel(1); // NOTE set this based on the zoom level to prevent objects getting blurry when zooming in
                        engine.setSize(1280, 720);
                        globalRefs.scene.performancePriority = ScenePerformancePriority.BackwardCompatible;
                        // engine.
                        info.scene.autoClear = false;
                        info.scene.autoClearDepthAndStencil = false;
                        info.scene.skipFrustumClipping = true;
                        info.scene.skipPointerMovePicking = true;
                        info.scene.constantlyUpdateMeshUnderPointer = false;
                        info.scene.onPrePointerObservable.add((pointerInfo) => {
                            pointerInfo.skipOnPointerObservable = true;
                        });
                        info.scene.detachControl();
                        // info.scene._inputManager.detachControl();
                        // info.scene._inputManager.;
                        // add this to see scene behind the scene texture rectangle
                        // info.scene.autoClear = false;
                        engine.onResizeObservable.add(() => {
                            // console.log("bing bong");
                            setState({ global: { main: { timeScreenResized: Date.now() } } });
                        });
                    } },
                    React.createElement(LoadingModels, null, children),
                    React.createElement("targetCamera", { onCreated: (item) => {
                            item.detachControl();
                        }, name: "camera1", 
                        // position={new Vector3(0, 0, -2)}
                        position: new Vector3(0, 0, -20), rotation: new Vector3(toRadians(0), toRadians(0), 0), mode: Camera.PERSPECTIVE_CAMERA })),
                extraScenes),
            React.createElement(ScreenGuiDom, null)));
    };
}
