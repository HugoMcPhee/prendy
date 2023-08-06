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

export default function dolls<
  A_AnimationNameByModel extends AnimationNameByModel = AnimationNameByModel,
  A_AnySpotName extends AnySpotName = AnySpotName,
  A_BoneNameByModel extends BoneNameByModel = BoneNameByModel,
  A_DollName extends DollName = DollName,
  A_DollOptions extends DollOptions = DollOptions,
  A_MaterialNameByModel extends MaterialNameByModel = MaterialNameByModel,
  A_MeshNameByModel extends MeshNameByModel = MeshNameByModel,
  A_ModelName extends ModelName = ModelName,
  A_PrendyAssets extends PrendyAssets = PrendyAssets
>(prendyAssets: A_PrendyAssets) {
  const { modelNames, dollNames, modelInfoByName, dollOptions } = prendyAssets;

  const {
    defaultInRange,
    makeModelAnimWeightsMoverState,
    makeToggledMeshesState,
    modelMoverRefs,
    modelOtherMeshesRefs,
  } = get_dollStoreUtils(prendyAssets);

  const defaultModelName = modelNames[0];

  const state = <T_DollName extends string, T_ModelName extends A_ModelName>(
    _dollName: T_DollName,
    modelName?: T_ModelName
  ) => {
    const safeModelName = modelName ?? defaultModelName;

    const { animationNames } = modelInfoByName[safeModelName];

    return {
      modelName: safeModelName as NonNullable<T_ModelName>, // to reference in refs aswell
      //  New room
      goalSpotNameAtNewPlace: null as null | A_AnySpotName, // when going to new place, start at this spot
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
      nowAnimation: animationNames[0] as A_AnimationNameByModel[T_ModelName], // NOTE AnimationNameFromDoll might work here?
      animationLoops: true, // currently unused
      //
      inRange: defaultInRange(),
      //
      isVisible: true,
    };
  };

  type DollAssetRefs<T_ModelName extends A_ModelName> = {
    meshes: Record<A_MeshNameByModel[T_ModelName] | "__root__", AbstractMesh>;
    skeleton: Skeleton;
    bones: Record<A_BoneNameByModel[T_ModelName], Bone>;
    aniGroups: Record<A_AnimationNameByModel[T_ModelName], AnimationGroup>;
    materials: Record<A_MaterialNameByModel[T_ModelName], Material>;
  };

  const refs = <T_DollName extends A_DollName, T_ModelName extends A_ModelName>(
    dollName: T_DollName,
    itemState: ReturnType<typeof state<T_DollName, A_DollOptions[T_DollName]["model"]>>
  ) => {
    const modelName = itemState.modelName;

    return {
      // local refs ( maybe replace with just the container hm)
      meshRef: null as null | AbstractMesh,
      otherMeshes: modelOtherMeshesRefs(modelName),
      entriesRef: null as null | InstantiatedEntries,
      aniGroupsRef: null as null | Record<A_AnimationNameByModel[T_ModelName], AnimationGroup>,
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
    [K_DollName in A_DollName]: ReturnType<typeof state<K_DollName, A_DollOptions[K_DollName]["model"]>>;
  };

  function makeAutmaticModelDollStartStates() {
    const partialDollStates = {} as Partial<DollStartStates>;
    forEach(dollNames as A_DollName[], (dollName) => {
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
