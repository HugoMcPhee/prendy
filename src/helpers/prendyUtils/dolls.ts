import { AbstractMesh, AnimationGroup, Bone, Effect, Material, Mesh, PBRMaterial, Vector3 } from "@babylonjs/core";
import { keyBy } from "chootils/dist/arrays";
import { breakableForEach, forEach } from "chootils/dist/loops";
import { Point2D, subtractPoints } from "chootils/dist/points2d";
import { getSpeedAndAngleFromVector } from "chootils/dist/speedAngleDistance2d";
import { getPointDistanceQuick } from "chootils/dist/speedAngleDistance3d";
import {
  AnimationNameByModel,
  DollName,
  ModelName,
  PlaceName,
  PrendyAssets,
  PrendyOptions,
  SpotNameByPlace,
} from "../../declarations";
import { get_scenePlaneUtils } from "../../helpers/babylonjs/scenePlane";
import { PlaceholderPrendyStores, PrendyStoreHelpers } from "../../stores/typedStoreHelpers";
import { get_spotStoryUtils } from "./spots";
import { makeMoverStateMaker, moverMultiRefs } from "pietem-movers";
import { MeshNameByModel } from "../../declarations";

export function get_dollStoryUtils<
  StoreHelpers extends PrendyStoreHelpers,
  PrendyStores extends PlaceholderPrendyStores,
  A_DollName extends DollName = DollName,
  A_PlaceName extends PlaceName = PlaceName,
  A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace
>(storeHelpers: StoreHelpers) {
  const { getState } = storeHelpers;
  const { getSpotPosition } = get_spotStoryUtils(storeHelpers);

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
  theMesh.showBoundingBox = true;
  theMesh.checkCollisions = true;
  theMesh.collisionGroup = 11;
  theMesh.useOctreeForCollisions = true;
  theMesh.rotationQuaternion = null; // allow euler rotation again
}

export function get_dollUtils<StoreHelpers extends PrendyStoreHelpers, PrendyStores extends PlaceholderPrendyStores>(
  storeHelpers: StoreHelpers,
  _prendyStores: PrendyStores,
  prendyStartOptions: PrendyOptions,
  prendyAssets: PrendyAssets
) {
  const { getRefs, getState, setState } = storeHelpers;
  const { dollNames, modelInfoByName } = prendyAssets;

  const {
    convertScreenPointToPlaneScenePoint,
    convertPointOnPlaneToPointOnScreen,
    getPositionOnPlane,
    checkPointIsInsidePlane,
  } = get_scenePlaneUtils(storeHelpers, prendyStartOptions);

  // type PietemState = ReturnType<StoreHelpers["getState"]>;
  // type DollName = keyof PietemState["dolls"];
  // type DollName = keyof typeof prendyStores.dolls.startStates;
  // type StartState_Dolls = typeof prendyStores.dolls.startStates;
  // type StartState_Dolls = typeof prendyStores.dolls.startStates;

  type StartState_Dolls = PrendyStores["dolls"]["startStates"] & ReturnType<StoreHelpers["getState"]>["dolls"];

  type ModelNameFromDoll<T_DollName extends DollName> = StartState_Dolls[T_DollName]["modelName"];

  function setDollAnimWeight<
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

  function getQuickDistanceBetweenDolls(dollA: DollName, dollB: DollName) {
    const dollPositonA = getState().dolls[dollA].position;
    const dollPositonB = getState().dolls[dollB].position;

    return getPointDistanceQuick(dollPositonA, dollPositonB);
  }

  // export type PartialDollsStateWithInRange = Partial<
  //   Record<DollName, Partial<{ inRange: InRangeProperty }>>
  // >;

  const defaultInRange = getDefaultInRangeFunction(dollNames);
  type InRangeProperty = ReturnType<typeof defaultInRange>;

  function inRangesAreTheSame(inRangePropA: InRangeProperty, inRangePropB: InRangeProperty) {
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

  function setupLightMaterial(theMaterial: PBRMaterial | null) {
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

  function saveModelStuffToDoll<T_ModelName extends ModelName, T_DollName extends DollName>({
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

    let entries = modelRefs.container.instantiateModelsToScene((sourceName) => `${namePrefix}${sourceName}`, false, {
      doNotInstantiate: true,
    });
    dollRefs.entriesRef = entries;

    const { meshNames, boneNames, animationNames, materialNames } = modelInfoByName[modelName];

    type T_Mesh = typeof meshNames[number];
    type T_BoneName = typeof boneNames[number];
    type T_AnimationName = typeof animationNames[number];
    type T_MaterialName = typeof materialNames[number];

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
  }

  function updateDollScreenPosition({ dollName, instant }: { dollName: DollName; instant?: boolean }) {
    // Update screen positions :)

    const { meshRef } = getRefs().dolls[dollName];
    if (!meshRef) return;
    const { planePos, planePosGoal, focusedDoll, focusedDollIsInView, planeZoom } = getState().global.main;
    const characterPointOnPlane = getPositionOnPlane(meshRef); // todo update to use a modelName too so it can know the headHeightOffset for each model?
    // console.log("characterPointOnPlane", characterPointOnPlane.x / 1280, characterPointOnPlane.y / 720);

    const planeSize = { x: 1280, y: 720 };

    const globalRefs = getRefs().global.main;

    let testShiftX = (characterPointOnPlane.x / planeSize.x - 0.5) * planeZoom;
    let testShiftY = (1 - characterPointOnPlane.y / planeSize.y - 0.5) * planeZoom;
    const maxShift = (planeZoom - 1) / 2;

    if (testShiftX > maxShift) testShiftX = maxShift;
    if (testShiftX < -maxShift) testShiftX = -maxShift;
    if (testShiftY > maxShift) testShiftY = maxShift;
    if (testShiftY < -maxShift) testShiftY = -maxShift;

    // (globalRefs?.backdropPostProcessEffect as Effect | null)?.setFloat2("planePos", testShiftX, testShiftY);
    // (globalRefs?.backdropPostProcessEffect as Effect | null)?.setFloat("planeZoom", planeZoom);

    // need to get the doll screen position based on the current or safe plane position

    const characterPointOnScreen = convertPointOnPlaneToPointOnScreen({
      pointOnPlane: characterPointOnPlane,
      planePos: instant ? planePosGoal : planePos,
      planeZoom,
    });

    const newFocusedDollIsInView =
      dollName === focusedDoll ? checkPointIsInsidePlane(characterPointOnPlane) : focusedDollIsInView;

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

type InRangeForAllDolls = Record<DollName, InRangeForDoll>;

export function getDefaultInRangeFunction(dollNames: readonly DollName[]) {
  function defaultInRange() {
    const untypedInRangeObject = {} as Record<string, InRangeForDoll>;

    forEach(dollNames, (dollName) => {
      untypedInRangeObject[dollName] = defaultInRangeForDoll();
    });
    return untypedInRangeObject as InRangeForAllDolls;
  }

  return defaultInRange;
}
