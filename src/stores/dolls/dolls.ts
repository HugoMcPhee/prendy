import { AbstractMesh, AnimationGroup, Bone, InstantiatedEntries, Material, Skeleton } from "@babylonjs/core";
import { forEach } from "chootils/dist/loops";
import { defaultPosition as defaultPosition2d } from "chootils/dist/points2d";
import { Point3D } from "chootils/dist/points3d";
import { mover3dRefs, mover3dState, moverRefs, moverState } from "repond-movers";
import {
  AnimationNameByModel,
  AnySpotName,
  BoneNameByModel,
  DollName,
  DollOptions,
  MaterialNameByModel,
  MeshNameByModel,
  ModelName,
  PrendyAssets,
} from "../../declarations";
import get_dollStoreUtils from "./dollStoreUtils";

const HIDDEN_POSITION = { x: 0, y: 0, z: -1000 };

export default function dolls(prendyAssets: PrendyAssets) {
  const { modelNames, dollNames, modelInfoByName, dollOptions } = prendyAssets;

  const {
    defaultInRange,
    makeModelAnimWeightsMoverState,
    makeToggledMeshesState,
    modelMoverRefs,
    modelOtherMeshesRefs,
  } = get_dollStoreUtils(prendyAssets);

  const defaultModelName = modelNames[0];

  const state = <T_DollName extends string, T_ModelName extends ModelName>(
    _dollName: T_DollName,
    modelName?: T_ModelName
  ) => {
    const safeModelName = modelName ?? defaultModelName;

    const { animationNames } = modelInfoByName[safeModelName];

    return {
      modelName: safeModelName as NonNullable<T_ModelName>, // to reference in refs aswell
      //  New room
      goalSpotNameAtNewPlace: null as null | AnySpotName, // when going to new place, start at this spot
      goalPositionAtNewPlace: null as null | Point3D, // when going to new place, start at this spot
      //  Movers
      ...mover3dState("position", {
        value: HIDDEN_POSITION,
        valueGoal: HIDDEN_POSITION,
      }), // could have semnticolor icons split by numbers too
      ...moverState("rotationY"),
      //
      positionOnScreen: defaultPosition2d(),
      // nowAnimation: animationNames[0] as AnimationNameByModel[T_ModelName],
      // animation Weights mover
      ...makeModelAnimWeightsMoverState<T_ModelName>(safeModelName as T_ModelName)("animWeights"),
      toggledMeshes: makeToggledMeshesState<T_ModelName>(safeModelName as T_ModelName),
      nowAnimation: animationNames[0] as AnimationNameByModel[T_ModelName], // NOTE AnimationNameFromDoll might work here?
      animationLoops: true, // currently unused
      //
      inRange: defaultInRange(),
      //
      isVisible: true,
    };
  };

  type DollAssetRefs<T_ModelName extends ModelName> = {
    meshes: Record<MeshNameByModel[T_ModelName] | "__root__", AbstractMesh>;
    skeleton: Skeleton;
    bones: Record<BoneNameByModel[T_ModelName], Bone>;
    aniGroups: Record<AnimationNameByModel[T_ModelName], AnimationGroup>;
    materials: Record<MaterialNameByModel[T_ModelName], Material>;
  };

  const refs = <T_DollName extends DollName, T_ModelName extends ModelName>(
    dollName: T_DollName,
    itemState: ReturnType<typeof state<T_DollName, DollOptions[T_DollName]["model"]>>
  ) => {
    const modelName = itemState.modelName;

    return {
      // local refs ( maybe replace with just the container hm)
      meshRef: null as null | AbstractMesh,
      otherMeshes: modelOtherMeshesRefs(modelName),
      entriesRef: null as null | InstantiatedEntries,
      aniGroupsRef: null as null | Record<AnimationNameByModel[T_ModelName], AnimationGroup>,
      assetRefs: null as null | DollAssetRefs<T_ModelName>,
      groundRef: null as null | AbstractMesh,
      canGoThroughWalls: false,
      ...mover3dRefs("position", {
        mass: 20,
        damping: 0.5,
        friction: 0.5,
        stiffness: 0.65,
      }), // maybe also start movers using the main name
      ...moverRefs("rotationY", { mass: 100, damping: 2, stiffness: 20, friction: 20 }),
      ...modelMoverRefs(modelName, "animWeights"),
    };
  };

  // automatically make atleast a doll for each model
  // type DollModelStartStates = {
  //   [K_Doll in ModelName]: StateReturnType<K_ModelName, K_ModelName>;
  // };
  // before moving the file into a function it used "ModelName & DollName"
  // type DollModelStartStates = {
  //   [K_ModelName in ModelName & DollName]: StateReturnType<
  //     K_ModelName,
  //     K_ModelName
  //   >;
  // };

  type DollStartStates = {
    [K_DollName in DollName]: ReturnType<typeof state<K_DollName, DollOptions[K_DollName]["model"]>>;
  };

  function makeAutmaticModelDollStartStates() {
    const partialDollStates = {} as Partial<DollStartStates>;
    forEach(dollNames, (dollName) => {
      partialDollStates[dollName] = state(dollName, dollOptions[dollName].model);
    });
    return partialDollStates as DollStartStates;
  }

  const startStates = {
    // Automatically make dolls
    ...makeAutmaticModelDollStartStates(),
  };

  return { startStates, state, refs };
}
