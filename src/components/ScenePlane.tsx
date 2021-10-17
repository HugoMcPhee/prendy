import { AbstractMesh } from "@babylonjs/core";
import React, { useCallback } from "react";
import {
  BackdopConcepFuncs,
  BackdopOptionsUntyped,
} from "../concepts/typedConcepFuncs";
import { makeScenePlaneUtils } from "../utils/babylonjs/scenePlane";

export function makeScenePlane<
  ConcepFuncs extends BackdopConcepFuncs,
  BackdopOptions extends BackdopOptionsUntyped
>(concepFuncs: ConcepFuncs, backdopStartOptions: BackdopOptions) {
  const {
    getRefs,
    getState,
    useStoreEffect,
    useStoreItemPropsEffect,
  } = concepFuncs;

  const globalRefs = getRefs().global.main;

  const { fitScenePlaneToScreen, applyPlanePosition } = makeScenePlaneUtils(
    concepFuncs,
    backdopStartOptions
  );

  type Props = {};

  return function ScenePlane(_: Props) {
    const planeRef = useCallback((node) => {
      globalRefs.scenePlane = node;
      if (!globalRefs.scenePlane) return;
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
      />
    );
  };
}
