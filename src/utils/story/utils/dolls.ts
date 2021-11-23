import { DollName } from "../../../declarations";
import {
  PrendyConcepFuncs,
  PlaceholderPrendyConcepts,
} from "../../../concepts/typedConcepFuncs";

export function makeDollStoryUtils<
  ConcepFuncs extends PrendyConcepFuncs,
  PrendyConcepts extends PlaceholderPrendyConcepts,
  A_DollName extends DollName = DollName
>(concepFuncs: ConcepFuncs) {
  const { getState } = concepFuncs;
  // const { getState, startItemEffect } = concepFuncs;
  // const { getGlobalState } = makeGlobalStoreUtils(concepFuncs);

  type StartState_Dolls = NonNullable<PrendyConcepts["dolls"]["startStates"]>;

  type ModelNameFromDoll<
    T_DollName extends A_DollName
  > = StartState_Dolls[T_DollName]["modelName"];

  function getModelNameFromDoll<T_DollName extends A_DollName>(
    dollName: T_DollName
  ): ModelNameFromDoll<T_DollName> {
    return getState().dolls[dollName].modelName as ModelNameFromDoll<
      T_DollName
    >;
  }

  // function stickDollToFloor() {
  //   // Sticking on ground
  //   if (raycaster.current && charRefs.groundRef) {
  //     raycaster.current.set(
  //       new THREE.Vector3(
  //         charRefs.meshRef.position.x,
  //         charRefs.meshRef.position.y + 200,
  //         charRefs.meshRef.position.z
  //       ),
  //       new THREE.Vector3(0, -1)
  //     );
  //     const intersects = raycaster.current.intersectObject(charRefs.groundRef);
  //     const foundIntersect = intersects[0];
  //     if (foundIntersect) {
  //       charRefs.meshRef.position.y = foundIntersect.point.y + 1.1;
  //     }
  //   }
  // }

  // export function doWhenPlaceAndModelsLoaded(callback: () => void) {
  //   const initialIsLoadingBetweenPlaces = getGlobalState().isLoadingBetweenPlaces;
  //   if (initialIsLoadingBetweenPlaces === false) {
  //     callback();
  //     return null;
  //   }
  //   const ruleName = "doWhenModelsLoaded" + Math.random();
  //   startItemEffect({
  //     name: ruleName,
  //     onItemEffect: ({ newValue: newNowSegmentName }) => {
  //       if (newNowSegmentName !== checkingSegmentName) return;
  //       stopEffect(ruleName);
  //       callback();
  //     },
  //     check: { type: "global", prop: "nowSegmentName", name: "main" },
  //     flow: "",
  //     whenToRun: "subscribe",
  //   });
  //   return ruleName;
  // }

  return { getModelNameFromDoll };
}
