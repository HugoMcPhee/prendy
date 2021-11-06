import { AbstractMesh } from "@babylonjs/core";
import React, { useCallback } from "react";
import { makeScenePlaneUtils } from "../utils/babylonjs/scenePlane";
export function makeScenePlane(concepFuncs, backdopStartOptions) {
    const { getRefs, getState, useStoreEffect, useStoreItemPropsEffect } = concepFuncs;
    const globalRefs = getRefs().global.main;
    const { fitScenePlaneToScreen, applyPlanePosition } = makeScenePlaneUtils(concepFuncs, backdopStartOptions);
    return function ScenePlane(_) {
        const planeRef = useCallback((node) => {
            globalRefs.scenePlane = node;
            if (!globalRefs.scenePlane)
                return;
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
        return (React.createElement("plane", { ref: planeRef, name: "backdropPlane", size: 1, billboardMode: AbstractMesh.BILLBOARDMODE_ALL }));
    };
}
