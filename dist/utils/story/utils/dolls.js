import { subtractPoints } from "chootils/dist/points2d";
import { getSpeedAndAngleFromVector } from "chootils/dist/speedAngleDistance2d";
import { makeTyped_spotStoryUtils } from "./spots";
export function makeTyped_dollStoryUtils(storeHelpers) {
    const { getState } = storeHelpers;
    const { getSpotPosition } = makeTyped_spotStoryUtils(storeHelpers);
    function getModelNameFromDoll(dollName) {
        return getState().dolls[dollName].modelName;
    }
    function get2DAngleFromDollToSpot(dollA, place, spot) {
        const spotPosition = getSpotPosition(place, spot);
        if (!dollA || !spotPosition)
            return 0;
        const dollPos = getState().dolls[dollA].position;
        const dollPos2D = { x: dollPos.z, y: dollPos.x };
        const spotPos2D = { x: spotPosition.z, y: spotPosition.x };
        return getSpeedAndAngleFromVector(subtractPoints(dollPos2D, spotPos2D)).angle;
    }
    function get2DAngleBetweenDolls(dollA, dollB) {
        if (!dollA || !dollB)
            return 0;
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
