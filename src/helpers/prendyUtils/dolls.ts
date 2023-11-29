import { AbstractMesh, AnimationGroup, Bone, Material, Mesh, PBRMaterial, Vector3 } from "@babylonjs/core";
import { keyBy } from "chootils/dist/arrays";
import { breakableForEach, forEach } from "chootils/dist/loops";
import { subtractPoints } from "chootils/dist/points2d";
import { getSpeedAndAngleFromVector } from "chootils/dist/speedAngleDistance2d";
import { getPointDistanceQuick } from "chootils/dist/speedAngleDistance3d";
import { getRefs, getState, setState } from "repond";
import { MyTypes } from "../../declarations";
import { meta } from "../../meta";
import { checkPointIsInsideSlate, convertPointOnSlateToPointOnScreen, getPositionOnSlate } from "../babylonjs/slate";
import { getSpotPosition } from "./spots";

// export function get_dollStoryUtils<MyTypes extends MyTypes = MyTypes>(storeHelpers: MyTypes["Repond"]) {
type DollName = MyTypes["Types"]["DollName"];
type PlaceName = MyTypes["Types"]["PlaceName"];
type PrendyStores = MyTypes["Stores"];
type SpotNameByPlace = MyTypes["Types"]["SpotNameByPlace"];

type StartState_Dolls = NonNullable<PrendyStores["dolls"]["startStates"]>;
type ModelNameFromDoll<T_DollName extends DollName> = NonNullable<StartState_Dolls[T_DollName]>["modelName"];

export function getModelNameFromDoll<T_DollName extends DollName>(dollName: T_DollName): ModelNameFromDoll<T_DollName> {
  return getState().dolls[dollName].modelName as ModelNameFromDoll<T_DollName>;
}

export function get2DAngleFromDollToSpot<T_Place extends PlaceName>(
  dollA: DollName,
  place: T_Place,
  spot: SpotNameByPlace[T_Place]
) {
  const spotPosition = getSpotPosition(place, spot);

  if (!dollA || !spotPosition) return 0;

  const dollPos = getState().dolls[dollA].position;
  const dollPos2D = { x: dollPos.z, y: dollPos.x };
  const spotPos2D = { x: spotPosition.z, y: spotPosition.x };
  return getSpeedAndAngleFromVector(subtractPoints(dollPos2D, spotPos2D)).angle;
}

export function get2DAngleBetweenDolls(dollA: DollName, dollB: DollName) {
  if (!dollA || !dollB) return 0;

  const dollAPos = getState().dolls[dollA].position;
  const dollBPos = getState().dolls[dollB].position;
  const dollAPos2D = { x: dollAPos.z, y: dollAPos.x };
  const dollBPos2D = { x: dollBPos.z, y: dollBPos.x };
  return getSpeedAndAngleFromVector(subtractPoints(dollAPos2D, dollBPos2D)).angle;
}

// export function stickDollToFloor() {
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

// {
//   getModelNameFromDoll,
//   get2DAngleFromDollToSpot,
//   get2DAngleBetweenDolls,
// };
// }

// --------------------------------------------
// internal doll utils

function inRangeForDollMatches(inRangeForDollA: InRangeForDoll, inRangeForDollB: InRangeForDoll) {
  return (
    inRangeForDollA.see === inRangeForDollB.see &&
    inRangeForDollA.talk === inRangeForDollB.talk &&
    inRangeForDollA.touch === inRangeForDollB.touch
  );
}

export function enableCollisions(theMesh: AbstractMesh) {
  // Enable collision detection on player
  theMesh.ellipsoid = new Vector3(0.6, 1.2, 0.6);
  theMesh.ellipsoidOffset = new Vector3(0, 1.2, 0);
  // theMesh.showBoundingBox = true;
  theMesh.checkCollisions = true;
  theMesh.collisionGroup = 11;
  theMesh.useOctreeForCollisions = true;
  theMesh.rotationQuaternion = null; // allow euler rotation again
}

// export function get_dollUtils<MyTypes extends MyTypes = MyTypes>(
//   prendyAssets: MyTypes["Assets"],
//   storeHelpers: MyTypes["Repond"]
// ) {
type AnimationNameByModel = MyTypes["Types"]["AnimationNameByModel"];
type ModelName = MyTypes["Types"]["ModelName"];
type PrendyStoreHelpers = MyTypes["Repond"];

// type RepondState = ReturnType<StoreHelpers["getState"]>;
// type DollName = keyof RepondState["dolls"];
// type DollName = keyof typeof prendyStores.dolls.startStates;

export function setDollAnimWeight<
  T_DollName extends DollName,
  T_NewWeights extends Record<AnimationNameByModel[ModelNameFromDoll<T_DollName>], number>
>(dollName: T_DollName, newWeights: Partial<T_NewWeights>) {
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

export function getQuickDistanceBetweenDolls(dollA: DollName, dollB: DollName) {
  const dollPositonA = getState().dolls[dollA].position;
  const dollPositonB = getState().dolls[dollB].position;

  return getPointDistanceQuick(dollPositonA, dollPositonB);
}

// export type PartialDollsStateWithInRange = Partial<
//   Record<DollName, Partial<{ inRange: InRangeProperty }>>
// >;

type InRangeForAllDolls = Record<DollName, InRangeForDoll>;
type InRangeProperty = InRangeForAllDolls;

export function inRangesAreTheSame(inRangePropA: InRangeProperty, inRangePropB: InRangeProperty) {
  let bothMatch = true;

  breakableForEach(meta.assets!.dollNames, (dollName) => {
    const bothMatchInLoop = inRangeForDollMatches(inRangePropA[dollName], inRangePropB[dollName]);

    if (!bothMatchInLoop) {
      bothMatch = false;
      return true; // to break out of inner loop (not returning from whole function)
    }
  });
  return bothMatch;
}

// export function inRangeStatesAreTheSame(inRangeStateA :PartialDollsStateWithInRange , inRangeStateB :PartialDollsStateWithInRange);

export function setupLightMaterial(theMaterial: PBRMaterial | null) {
  const placesRefs = getRefs().places;
  const globalState = getState().global.main;
  const { nowPlaceName } = globalState;
  const { nowCamName } = getState().global.main;

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

export function saveModelStuffToDoll<T_ModelName extends ModelName, T_DollName extends DollName>({
  modelName,
  dollName,
}: {
  modelName: T_ModelName;
  dollName: T_DollName;
}) {
  const dollRefs = getRefs().dolls[dollName];
  const modelRefs = getRefs().models[modelName];
  const dollState = getState().dolls[dollName];

  if (!modelRefs.container) return;

  const namePrefix = `clone_${dollName}_${modelName}_`;
  // console.log("namePrefix", namePrefix);

  let entries = modelRefs.container.instantiateModelsToScene(
    (sourceName) => {
      const naeName = `${namePrefix}${sourceName}`;

      return `${namePrefix}${sourceName}`;
    },
    false,
    {
      doNotInstantiate: true,
    }
  );
  dollRefs.entriesRef = entries;

  const { modelInfoByName } = meta.assets!;

  const { meshNames, boneNames, animationNames, materialNames } = modelInfoByName[modelName];

  type T_Mesh = (typeof meshNames)[number];
  type T_BoneName = (typeof boneNames)[number];
  type T_AnimationName = (typeof animationNames)[number];
  type T_MaterialName = (typeof materialNames)[number];

  const rootNode = entries.rootNodes[0];

  const removePrefix = (name: string) => name.replace(namePrefix, "");

  const meshArray = rootNode.getChildMeshes();

  const meshes = keyBy(meshArray, "name", removePrefix) as Record<T_Mesh | "__root__", AbstractMesh>;

  const skeleton = entries.skeletons[0];
  const bones = (skeleton?.bones ? keyBy(skeleton.bones, "name", removePrefix) : {}) as Record<T_BoneName, Bone>;

  const aniGroups = keyBy(entries.animationGroups, "name", (name) => name.replace(namePrefix, "")) as Record<
    T_AnimationName,
    AnimationGroup
  >;

  // NOTE This references the original material, and not duplicated for each doll
  const materials = keyBy(modelRefs.container.materials) as Record<T_MaterialName, Material>;

  const assetRefs = {
    meshes,
    skeleton,
    bones,
    aniGroups,
    materials,
  };
  // clone_walker_walker___root__
  const rootMesh = rootNode as Mesh;
  dollRefs.meshRef = rootMesh;

  const loadedMeshNames = Object.keys(meshes) as (keyof typeof meshes)[];
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
  dollRefs.aniGroupsRef?.[dollState.nowAnimation]?.start(true); // start looping the current animation

  enableCollisions(dollRefs.meshRef);
  dollRefs.meshRef.setEnabled(dollState.isVisible);

  // Once the models loaded, update the animation based on the dolls state
  // console.log("Running animations for doll after it loaded!", dollName, dollState.nowAnimation);
  // definiedPrendyRules.dolls?.run("whenNowAnimationChanged");
}

export function updateDollScreenPosition({ dollName, instant }: { dollName: DollName; instant?: boolean }) {
  // Update screen positions :)

  const { meshRef } = getRefs().dolls[dollName];
  const modelName = getState().dolls[dollName].modelName;
  if (!meshRef || !modelName) return;
  const { slatePos, slatePosGoal, focusedDoll, focusedDollIsInView, slateZoom } = getState().global.main;
  const characterPointOnSlate = getPositionOnSlate(meshRef, modelName);

  const characterPointOnScreen = convertPointOnSlateToPointOnScreen({
    pointOnSlate: characterPointOnSlate,
    slatePos: instant ? slatePosGoal : slatePos,
    slateZoom,
  });

  const newFocusedDollIsInView =
    dollName === focusedDoll ? checkPointIsInsideSlate(characterPointOnSlate) : focusedDollIsInView;

  setState({
    dolls: { [dollName]: { positionOnScreen: characterPointOnScreen } },
    global: { main: { focusedDollIsInView: newFocusedDollIsInView } },
  });
}

// {
//   setDollAnimWeight,
//   getQuickDistanceBetweenDolls,
//   inRangesAreTheSame,
//   setupLightMaterial,
//   saveModelStuffToDoll,
//   updateDollScreenPosition,
// };
// }

// -------------------------------------------------------------
// doll store utils

export type InRangeForDoll = {
  touch: boolean;
  talk: boolean;
  see: boolean;
};

export function defaultInRangeForDoll() {
  return {
    touch: false,
    talk: false,
    see: false,
  };
}

export function getDefaultInRangeFunction(dollNames: readonly MyTypes["Types"]["DollName"][]) {
  type DollName = MyTypes["Types"]["DollName"];

  type InRangeForAllDolls = Record<DollName, InRangeForDoll>;
  function defaultInRange() {
    const untypedInRangeObject = {} as Record<string, InRangeForDoll>;

    forEach(dollNames, (dollName) => {
      untypedInRangeObject[dollName] = defaultInRangeForDoll();
    });
    return untypedInRangeObject as InRangeForAllDolls;
  }

  return defaultInRange;
}
