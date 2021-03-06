import {
  AbstractMesh,
  AnimationGroup,
  Bone,
  Material,
  Mesh,
  PBRMaterial,
  Vector3,
} from "@babylonjs/core";
import { keyBy } from "chootils/dist/arrays";
import { breakableForEach, forEach } from "chootils/dist/loops";
import { getPointDistanceQuick } from "chootils/dist/speedAngleDistance3d";
import {
  AnimationNameByModel,
  PrendyAssets,
  PrendyOptions,
  DollName,
  ModelInfoByName,
  ModelName,
} from "../../declarations";
import { makeScenePlaneUtils } from "../../utils/babylonjs/scenePlane";
import {
  PrendyStoreHelpers,
  PlaceholderPrendyStores,
} from "../typedStoreHelpers";
import { getDefaultInRangeFunction, InRangeForDoll } from "./indexUtils";

// TODO add to art options?
const rangeOptions = {
  touch: 1, // prev 2
  talk: 2, // prev 3
  see: 6, // prev 20
} as const;

export const rangeOptionsQuick = {
  touch: rangeOptions.touch * rangeOptions.touch,
  talk: rangeOptions.talk * rangeOptions.talk,
  see: rangeOptions.see * rangeOptions.see,
} as const;

function inRangeForDollMatches(
  inRangeForDollA: InRangeForDoll,
  inRangeForDollB: InRangeForDoll
) {
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

export function makeDollStoreUtils<
  StoreHelpers extends PrendyStoreHelpers,
  PrendyStores extends PlaceholderPrendyStores
>(
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
  } = makeScenePlaneUtils(storeHelpers, prendyStartOptions);

  // type PietemState = ReturnType<StoreHelpers["getState"]>;
  // type DollName = keyof PietemState["dolls"];
  // type DollName = keyof typeof prendyStores.dolls.startStates;
  // type StartState_Dolls = typeof prendyStores.dolls.startStates;
  // type StartState_Dolls = typeof prendyStores.dolls.startStates;

  type StartState_Dolls = PrendyStores["dolls"]["startStates"] &
    ReturnType<StoreHelpers["getState"]>["dolls"];

  type ModelNameFromDoll<T_DollName extends DollName> =
    StartState_Dolls[T_DollName]["modelName"];

  function setDollAnimWeight<
    T_DollName extends DollName,
    T_NewWeights extends Record<
      AnimationNameByModel[ModelNameFromDoll<T_DollName>],
      number
    >
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

  function inRangesAreTheSame(
    inRangePropA: InRangeProperty,
    inRangePropB: InRangeProperty
  ) {
    let bothMatch = true;

    breakableForEach(dollNames, (dollName) => {
      const bothMatchInLoop = inRangeForDollMatches(
        inRangePropA[dollName],
        inRangePropB[dollName]
      );

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
      theMaterial.reflectionTexture =
        placeRefs.camsRefs[nowCamName].probeTexture;
      // theMaterial.enableSpecularAntiAliasing = false;
      // theMaterial.cameraToneMappingEnabled = true;
      // theMaterial.metallic = 0.25;
    }
  }

  function saveModelStuffToDoll<
    T_ModelName extends ModelName,
    T_DollName extends DollName
  >({ modelName, dollName }: { modelName: T_ModelName; dollName: T_DollName }) {
    const dollRefs = getRefs().dolls[dollName];
    const modelRefs = getRefs().models[modelName];
    const dollState = getState().dolls[dollName];

    if (!modelRefs.container) return;

    const namePrefix = `clone_${dollName}_${modelName}_`;

    let entries = modelRefs.container.instantiateModelsToScene(
      (sourceName) => `${namePrefix}${sourceName}`,
      false,
      { doNotInstantiate: true }
    );
    dollRefs.entriesRef = entries;

    const { meshNames, boneNames, animationNames, materialNames } =
      modelInfoByName[modelName];

    type T_Mesh = typeof meshNames[number];
    type T_BoneName = typeof boneNames[number];
    type T_AnimationName = typeof animationNames[number];
    type T_MaterialName = typeof materialNames[number];

    const rootNode = entries.rootNodes[0];

    const removePrefix = (name: string) => name.replace(namePrefix, "");

    const meshArray = rootNode.getChildMeshes();

    const meshes = keyBy(meshArray, "name", removePrefix) as Record<
      T_Mesh | "__root__",
      AbstractMesh
    >;

    const skeleton = entries.skeletons[0];
    const bones = (
      skeleton?.bones ? keyBy(skeleton.bones, "name", removePrefix) : {}
    ) as Record<T_BoneName, Bone>;

    const aniGroups = keyBy(entries.animationGroups, "name", (name) =>
      name.replace(namePrefix, "")
    ) as Record<T_AnimationName, AnimationGroup>;

    // NOTE This references the original material, and not duplicated for each doll
    const materials = keyBy(modelRefs.container.materials) as Record<
      T_MaterialName,
      Material
    >;

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

  function updateDollScreenPosition({
    dollName,
    instant,
  }: {
    dollName: DollName;
    instant?: boolean;
  }) {
    // Update screen positions :)

    const { meshRef } = getRefs().dolls[dollName];
    if (!meshRef) return;
    const { planePos, planePosGoal, focusedDoll, focusedDollIsInView } =
      getState().global.main;
    const characterPointOnPlane = getPositionOnPlane(meshRef); // todo update to use a modelName too so it can know the headHeightOffset for each model?

    // need to get the doll screen position based on the current or safe plane position

    const characterPointOnScreen = convertPointOnPlaneToPointOnScreen({
      pointOnPlane: characterPointOnPlane,
      planePosition: instant ? planePosGoal : planePos,
    });
    const positionOnPlaneScene = convertScreenPointToPlaneScenePoint(
      characterPointOnScreen
    );

    const newFocusedDollIsInView =
      dollName === focusedDoll
        ? checkPointIsInsidePlane(characterPointOnPlane)
        : focusedDollIsInView;

    setState({
      dolls: { [dollName]: { positionOnPlaneScene } },
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
