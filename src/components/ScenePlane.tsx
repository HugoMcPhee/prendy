import { AbstractMesh } from "@babylonjs/core";
import React, { useCallback } from "react";
import {
  GameyConceptoFuncs,
  GameyStartOptionsUntyped,
} from "../concepts/typedConceptoFuncs";
import { makeScenePlaneUtils } from "../utils/babylonjs/scenePlane";

export function makeScenePlane<
  ConceptoFuncs extends GameyConceptoFuncs,
  GameyStartOptions extends GameyStartOptionsUntyped
>(conceptoFuncs: ConceptoFuncs, gameyStartOptions: GameyStartOptions) {
  const {
    getRefs,
    getState,
    useStoreEffect,
    useStoreItemPropsEffect,
  } = conceptoFuncs;

  const globalRefs = getRefs().global.main;

  const { fitScenePlaneToScreen, applyPlanePosition } = makeScenePlaneUtils(
    conceptoFuncs,
    gameyStartOptions
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
