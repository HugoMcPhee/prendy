import { subtractPoints } from "chootils/dist/points2d";
import { getSpeedAndAngleFromVector } from "chootils/dist/speedAngleDistance2d";
import { DollName, PlaceName, SpotNameByPlace } from "../../../declarations";
import { PrendyStoreHelpers, PlaceholderPrendyStores } from "../../../stores/typedStoreHelpers";
import { makeTyped_spotStoryUtils } from "./spots";

export function makeTyped_dollStoryUtils<
  StoreHelpers extends PrendyStoreHelpers,
  PrendyStores extends PlaceholderPrendyStores,
  A_DollName extends DollName = DollName,
  A_PlaceName extends PlaceName = PlaceName,
  A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace
>(storeHelpers: StoreHelpers) {
  const { getState } = storeHelpers;

  const { getSpotPosition } = makeTyped_spotStoryUtils(storeHelpers);

  // const { getState, startItemEffect } = storeHelpers;
  // const { getGlobalState } = makeGlobalStoreUtils(storeHelpers);

  type StartState_Dolls = NonNullable<PrendyStores["dolls"]["startStates"]>;

  type ModelNameFromDoll<T_DollName extends A_DollName> = NonNullable<StartState_Dolls[T_DollName]>["modelName"];

  function getModelNameFromDoll<T_DollName extends A_DollName>(dollName: T_DollName): ModelNameFromDoll<T_DollName> {
    return getState().dolls[dollName].modelName as ModelNameFromDoll<T_DollName>;
  }

  function get2DAngleFromDollToSpot<T_Place extends A_PlaceName>(
    dollA: A_DollName,
    place: T_Place,
    spot: A_SpotNameByPlace[T_Place]
  ) {
    const spotPosition = getSpotPosition(place, spot);

    if (!dollA || !spotPosition) return 0;

    const dollPos = getState().dolls[dollA].position;
    const dollPos2D = { x: dollPos.z, y: dollPos.x };
    const spotPos2D = { x: spotPosition.z, y: spotPosition.x };
    return getSpeedAndAngleFromVector(subtractPoints(dollPos2D, spotPos2D)).angle;
  }

  function get2DAngleBetweenDolls(dollA: A_DollName, dollB: A_DollName) {
    if (!dollA || !dollB) return 0;

    const dollAPos = getState().dolls[dollA].position;
    const dollBPos = getState().dolls[dollB].position;
    const dollAPos2D = { x: dollAPos.z, y: dollAPos.x };
    const dollBPos2D = { x: dollBPos.z, y: dollBPos.x };
    return getSpeedAndAngleFromVector(subtractPoints(dollAPos2D, dollBPos2D)).angle;
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
  //     run: ({ newValue: newNowSegmentName }) => {
  //       if (newNowSegmentName !== checkingSegmentName) return;
  //       stopEffect(ruleName);
  //       callback();
  //     },
  //     check: { type: "global", prop: "nowSegmentName", name: "main" },
  //     step: "",
  //     atStepEnd: true,
  //   });
  //   return ruleName;
  // }

  return {
    getModelNameFromDoll,
    get2DAngleFromDollToSpot,
    get2DAngleBetweenDolls,
  };
}
