export function makeDollStoryUtils(storeHelpers) {
    const { getState } = storeHelpers;
    function getModelNameFromDoll(dollName) {
        return getState().dolls[dollName].modelName;
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
    return { getModelNameFromDoll };
}
