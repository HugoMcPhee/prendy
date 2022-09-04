import { AbstractMesh, Scene, TargetCamera } from "@babylonjs/core";
import React, { useCallback } from "react";
import { forEach } from "chootils/dist/loops";
import { PrendyStoreHelpers, PrendyOptionsUntyped } from "../stores/typedStoreHelpers";
import { makeTyped_scenePlaneUtils } from "../helpers/babylonjs/scenePlane";

export function makeTyped_ScenePlane<
  StoreHelpers extends PrendyStoreHelpers,
  PrendyOptions extends PrendyOptionsUntyped
>(storeHelpers: StoreHelpers, prendyStartOptions: PrendyOptions) {
  const { getRefs, getState, useStoreEffect, useStoreItemPropsEffect } = storeHelpers;
  const globalRefs = getRefs().global.main;
  const { fitScenePlaneToScreen, applyPlanePosition } = makeTyped_scenePlaneUtils(storeHelpers, prendyStartOptions);

  type Props = {};

  return function ScenePlane(_: Props) {
    const planeRef = useCallback((node) => {
      globalRefs.scenePlane = node;
      if (!globalRefs.scenePlane) return;
      globalRefs.scenePlane.alwaysSelectAsActiveMesh = true;
      fitScenePlaneToScreen(globalRefs.scenePlane);
    }, []);

    useStoreEffect(() => applyPlanePosition(getState().global.main.planePos), {
      type: "global",
      prop: ["planePos", "planeZoom"],
    });
    useStoreItemPropsEffect(
      { type: "global", name: "main" },
      {
        timeScreenResized({ itemRefs }) {
          if (!itemRefs.scenePlane) return;
          fitScenePlaneToScreen(itemRefs.scenePlane);
        },
      }
    );
    return (
      <plane
        ref={planeRef}
        name="backdropPlane"
        size={1}
        billboardMode={AbstractMesh.BILLBOARDMODE_ALL}
        layerMask={23}
      />
    );
  };
}
