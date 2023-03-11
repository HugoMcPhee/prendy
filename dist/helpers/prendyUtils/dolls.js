import { Vector3 } from "@babylonjs/core";
import { keyBy } from "chootils/dist/arrays";
import { breakableForEach, forEach } from "chootils/dist/loops";
import { subtractPoints } from "chootils/dist/points2d";
import { getSpeedAndAngleFromVector } from "chootils/dist/speedAngleDistance2d";
import { getPointDistanceQuick } from "chootils/dist/speedAngleDistance3d";
import { get_scenePlaneUtils } from "../../helpers/babylonjs/scenePlane";
import { get_spotStoryUtils } from "./spots";
export function get_dollStoryUtils(storeHelpers) {
    const { getState } = storeHelpers;
    const { getSpotPosition } = get_spotStoryUtils(storeHelpers);
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
// --------------------------------------------
// internal doll utils
function inRangeForDollMatches(inRangeForDollA, inRangeForDollB) {
    return (inRangeForDollA.see === inRangeForDollB.see &&
        inRangeForDollA.talk === inRangeForDollB.talk &&
        inRangeForDollA.touch === inRangeForDollB.touch);
}
export function enableCollisions(theMesh) {
    // Enable collision detection on player
    theMesh.ellipsoid = new Vector3(0.6, 1.2, 0.6);
    theMesh.ellipsoidOffset = new Vector3(0, 1.2, 0);
    theMesh.showBoundingBox = true;
    theMesh.checkCollisions = true;
    theMesh.collisionGroup = 11;
    theMesh.useOctreeForCollisions = true;
    theMesh.rotationQuaternion = null; // allow euler rotation again
}
export function get_dollUtils(storeHelpers, _prendyStores, prendyStartOptions, prendyAssets) {
    const { getRefs, getState, setState } = storeHelpers;
    const { dollNames, modelInfoByName } = prendyAssets;
    const { convertPointOnPlaneToPointOnScreen, getPositionOnPlane, checkPointIsInsidePlane } = get_scenePlaneUtils(storeHelpers, prendyStartOptions);
    function setDollAnimWeight(dollName, newWeights) {
        setState({
            dolls: {
                [dollName]: {
                    animWeightsGoal: {
                        ...getState().dolls[dollName].animWeightsGoal,
                        ...newWeights,
                    },
                },
            },
        });
    }
    function getQuickDistanceBetweenDolls(dollA, dollB) {
        const dollPositonA = getState().dolls[dollA].position;
        const dollPositonB = getState().dolls[dollB].position;
        return getPointDistanceQuick(dollPositonA, dollPositonB);
    }
    // export type PartialDollsStateWithInRange = Partial<
    //   Record<DollName, Partial<{ inRange: InRangeProperty }>>
    // >;
    const defaultInRange = getDefaultInRangeFunction(dollNames);
    function inRangesAreTheSame(inRangePropA, inRangePropB) {
        let bothMatch = true;
        breakableForEach(dollNames, (dollName) => {
            const bothMatchInLoop = inRangeForDollMatches(inRangePropA[dollName], inRangePropB[dollName]);
            if (!bothMatchInLoop) {
                bothMatch = false;
                return true; // to break out of inner loop (not returning from whole function)
            }
        });
        return bothMatch;
    }
    // export function inRangeStatesAreTheSame(inRangeStateA :PartialDollsStateWithInRange , inRangeStateB :PartialDollsStateWithInRange);
    function setupLightMaterial(theMaterial) {
        const placesRefs = getRefs().places;
        const globalState = getState().global.main;
        const { nowPlaceName } = globalState;
        const { nowCamName } = getState().places[nowPlaceName];
        const placeRefs = placesRefs[nowPlaceName];
        if (theMaterial) {
            theMaterial.enableSpecularAntiAliasing = true;
            theMaterial.roughness = 0.95;
            theMaterial.environmentIntensity = 2;
            theMaterial.reflectionTexture = placeRefs.camsRefs[nowCamName].probeTexture;
            // theMaterial.enableSpecularAntiAliasing = false;
            // theMaterial.cameraToneMappingEnabled = true;
            // theMaterial.metallic = 0.25;
        }
    }
    function saveModelStuffToDoll({ modelName, dollName, }) {
        var _a, _b;
        const dollRefs = getRefs().dolls[dollName];
        const modelRefs = getRefs().models[modelName];
        const dollState = getState().dolls[dollName];
        if (!modelRefs.container)
            return;
        const namePrefix = `clone_${dollName}_${modelName}_`;
        let entries = modelRefs.container.instantiateModelsToScene((sourceName) => `${namePrefix}${sourceName}`, false, {
            doNotInstantiate: true,
        });
        dollRefs.entriesRef = entries;
        const { meshNames, boneNames, animationNames, materialNames } = modelInfoByName[modelName];
        const rootNode = entries.rootNodes[0];
        const removePrefix = (name) => name.replace(namePrefix, "");
        const meshArray = rootNode.getChildMeshes();
        const meshes = keyBy(meshArray, "name", removePrefix);
        const skeleton = entries.skeletons[0];
        const bones = ((skeleton === null || skeleton === void 0 ? void 0 : skeleton.bones) ? keyBy(skeleton.bones, "name", removePrefix) : {});
        const aniGroups = keyBy(entries.animationGroups, "name", (name) => name.replace(namePrefix, ""));
        // NOTE This references the original material, and not duplicated for each doll
        const materials = keyBy(modelRefs.container.materials);
        const assetRefs = {
            meshes,
            skeleton,
            bones,
            aniGroups,
            materials,
        };
        // clone_walker_walker___root__
        const rootMesh = rootNode;
        dollRefs.meshRef = rootMesh;
        const loadedMeshNames = Object.keys(meshes);
        loadedMeshNames.forEach((loopedMeshName) => {
            // TODO
            // this keeps meshes rendering outside of the main camera view (ideally the 'frustrum'
            // could change so it works for the scene rendered to texture, but for now it's okay cause there's not many meshes
            // meshes[loopedMeshName].alwaysSelectAsActiveMesh = true;
        });
        // NOTE Maybe temporary fix to make sure all child meshes are rendered ( but otherMeshes might still be typed to only first level sub meshes)
        // could also possibly loop through children when adding meshes to renderTargetTexture, but this seems faster
        // forEach(meshNames, (meshName) => { // used to use the typed meshNames
        forEach(loadedMeshNames, (meshName) => {
            dollRefs.otherMeshes[meshName] = meshes[meshName];
        });
        dollRefs.assetRefs = assetRefs;
        dollRefs.aniGroupsRef = aniGroups;
        (_b = (_a = dollRefs.aniGroupsRef) === null || _a === void 0 ? void 0 : _a[dollState.nowAnimation]) === null || _b === void 0 ? void 0 : _b.start(true); // start looping the current animation
        enableCollisions(dollRefs.meshRef);
    }
    function updateDollScreenPosition({ dollName, instant }) {
        // Update screen positions :)
        const { meshRef } = getRefs().dolls[dollName];
        if (!meshRef)
            return;
        const { planePos, planePosGoal, focusedDoll, focusedDollIsInView, planeZoom } = getState().global.main;
        const characterPointOnPlane = getPositionOnPlane(meshRef); // todo update to use a modelName too so it can know the headHeightOffset for each model?
        const characterPointOnScreen = convertPointOnPlaneToPointOnScreen({
            pointOnPlane: characterPointOnPlane,
            planePos: instant ? planePosGoal : planePos,
            planeZoom,
        });
        const newFocusedDollIsInView = dollName === focusedDoll ? checkPointIsInsidePlane(characterPointOnPlane) : focusedDollIsInView;
        setState({
            dolls: { [dollName]: { positionOnScreen: characterPointOnScreen } },
            global: { main: { focusedDollIsInView: newFocusedDollIsInView } },
        });
    }
    return {
        setDollAnimWeight,
        getQuickDistanceBetweenDolls,
        inRangesAreTheSame,
        setupLightMaterial,
        saveModelStuffToDoll,
        updateDollScreenPosition,
    };
}
export function defaultInRangeForDoll() {
    return {
        touch: false,
        talk: false,
        see: false,
    };
}
export function getDefaultInRangeFunction(dollNames) {
    function defaultInRange() {
        const untypedInRangeObject = {};
        forEach(dollNames, (dollName) => {
            untypedInRangeObject[dollName] = defaultInRangeForDoll();
        });
        return untypedInRangeObject;
    }
    return defaultInRange;
}
