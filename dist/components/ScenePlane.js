import { AbstractMesh } from "@babylonjs/core";
import React, { useCallback } from "react";
import { makeTyped_scenePlaneUtils } from "../utils/babylonjs/scenePlane";
export function makeTyped_ScenePlane(storeHelpers, prendyStartOptions) {
    const { getRefs, getState, useStoreEffect, useStoreItemPropsEffect } = storeHelpers;
    const globalRefs = getRefs().global.main;
    const { fitScenePlaneToScreen, applyPlanePosition } = makeTyped_scenePlaneUtils(storeHelpers, prendyStartOptions);
    return function ScenePlane(_) {
        const planeRef = useCallback((node) => {
            globalRefs.scenePlane = node;
            if (!globalRefs.scenePlane)
                return;
            globalRefs.scenePlane.alwaysSelectAsActiveMesh = true;
            if (globalRefs.scenePlaneCamera) {
                const scene = globalRefs.scenes.main;
                const sceneCam = globalRefs.scenePlaneCamera;
                const scenePlane = globalRefs.scenePlane;
                // (globalRefs.scenePlaneCamera as TargetCamera)._activeMeshes.reset();
                // (globalRefs.scenePlaneCamera as TargetCamera)._activeMeshes.push(
                //   globalRefs.scenePlane
                // );
                // (globalRefs.scenes.main as any)._evaluateActiveMeshes = () => {
                //   globalRefs.scenes.main._activeMeshes.reset();
                //   globalRefs.scenePlaneCamera._activeMeshes.reset();
                //   globalRefs.scenes.main._activeMeshes.push(globalRefs.scenePlane);
                //   globalRefs.scenePlaneCamera._activeMeshes.push(globalRefs.scenePlane);
                // };
                // globalRefs.scenes.main.freeActiveMeshes(); // hm? different to freezeActiveMeshes , maybe unintentional
                //
                // globalRefs.scenes.main._activeMeshes.push(globalRefs.scenePlane);
                // globalRefs.scenePlaneCamera._activeMeshes.push(globalRefs.scenePlane);
                // scene.unfreezeActiveMeshes();
                // scene.freeActiveMeshes();
                // sceneCam._activeMeshes.reset();
                // sceneCam._activeMeshes.push(scenePlane);
                // scene._activeMeshes.
                // scene.freezeActiveMeshes(true);
                // sceneCam._activeMeshes.reset();
                // (scene as any)._skipEvaluateActiveMeshesCompletely = true;
                // sceneCam._activeMeshes.push(scenePlane);
                // console.log(JSON.stringify(sceneCam._activeMeshes.data, null, 2));
                // console.log(sceneCam._activeMeshes.data[0]);
                // (scene as any)._evaluateActiveMeshes = () => {
                //   console.log("evaluation", (scene as any)._frameId);
                // };
                // scene.onBeforeRenderObservable.add(() => {
                // scene.unfreezeActiveMeshes();
                // // scene.freeActiveMeshes();
                // sceneCam._activeMeshes.reset();
                // sceneCam._activeMeshes.push(scenePlane);
                // // scene._activeMeshes.
                // scene.freezeActiveMeshes(true);
                // console.log(sceneCam._activeMeshes.data.length);
                // });
                // const dollRefs = getRefs().dolls
                // scene.onBeforeRenderTargetsRenderObservable.add(() => {
                // forEach(dollNames, (dollName)=> {
                // })
                // scene.meshes.forEach((mesh) => {
                //   mesh.setEnabled(true);
                // });
                // scenePlane.setEnabled(false);
                // scene.unfreezeActiveMeshes();
                // // scene.freeActiveMeshes();
                // sceneCam._activeMeshes.reset();
                // sceneCam._activeMeshes.push(scenePlane);
                // // scene._activeMeshes.
                // scene.freezeActiveMeshes(true);
                // console.log(sceneCam._activeMeshes.data.length);
                // });
                // scene.onAfterRenderTargetsRenderObservable.add(() => {
                // forEach(dollNames, (dollName)=> {
                // })
                // scene.meshes.forEach((mesh) => {
                //   mesh.setEnabled(false);
                // });
                // scenePlane.setEnabled(true);
                // scene.unfreezeActiveMeshes();
                // // scene.freeActiveMeshes();
                // sceneCam._activeMeshes.reset();
                // sceneCam._activeMeshes.push(scenePlane);
                // // scene._activeMeshes.
                // scene.freezeActiveMeshes(true);
                // console.log(sceneCam._activeMeshes.data.length);
                // });
                // scene.onAfterEvalua.add(() => {
                //   scene.unfreezeActiveMeshes();
                //   scene.freeActiveMeshes();
                //   sceneCam._activeMeshes.reset();
                //   sceneCam._activeMeshes.push(scenePlane);
                //   // scene._activeMeshes.
                //   scene.freezeActiveMeshes(true);
                //   // console.log(sceneCam._activeMeshes.data.length);
                // });
                // console.log(JSON.stringify((scene as any)._activeMeshes.data, null, 2));
                // console.log(
                //   "  (globalRefs.scenes.main as Scene)._evaluateActiveMeshes"
                // );
                // console.log((globalRefs.scenes.main as Scene)._evaluateActiveMeshes);
                // console.log("globalRefs.scenePlaneCamera._activeMeshes");
                // console.log(globalRefs.scenePlaneCamera._activeMeshes);
                // console.log("globalRefs.scenes.main._activeMeshes");
                // console.log(globalRefs.scenes.main._activeMeshes);
                // (globalRefs.scenes.main as Scene).freeActiveMeshes();
                // (globalRefs.scenes.main as Scene)._activeMes
                // (globalRefs.scenePlaneCamera as TargetCamera).
                // (globalRefs.scenePlaneCamera as TargetCamera).free
            }
            fitScenePlaneToScreen(globalRefs.scenePlane);
        }, []);
        useStoreEffect(() => applyPlanePosition(getState().global.main.planePos), {
            type: "global",
            prop: ["planePos", "planeZoom"],
        });
        useStoreItemPropsEffect({ type: "global", name: "main" }, {
            timeScreenResized({ itemRefs }) {
                if (!itemRefs.scenePlane)
                    return;
                fitScenePlaneToScreen(itemRefs.scenePlane);
            },
        });
        return (React.createElement("plane", { ref: planeRef, name: "backdropPlane", size: 1, billboardMode: AbstractMesh.BILLBOARDMODE_ALL, layerMask: 23 }));
    };
}
