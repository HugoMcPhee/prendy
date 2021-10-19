import {
  AbstractMesh,
  AnimationGroup,
  Bone,
  InstantiatedEntries,
  Material,
  Skeleton,
} from "@babylonjs/core";
import {
  moverRefs,
  moverState,
  mover3dRefs,
  mover3dState,
} from "concep-movers";
import { forEach } from "shutils/dist/loops";
import { defaultPosition as defaultPosition2d } from "shutils/dist/points2d";
import {
  DollOptionsPlaceholder,
  ModelInfoByNamePlaceholder,
} from "../typedConcepFuncs";
import makeDollIndexUtils from "./indexUtils";

const HIDDEN_POSITION = { x: 0, y: 0, z: -1000 };

export default function dolls<
  ModelName extends string,
  DollName extends string,
  AnySpotName extends string,
  AnyAnimationName extends string,
  DollOptions extends DollOptionsPlaceholder<DollName, ModelName>,
  AnimationNameByModel extends Record<ModelName, AnyAnimationName>,
  BoneNameByModel extends Record<ModelName, string>,
  MaterialNameByModel extends Record<ModelName, string>,
  MeshNameByModel extends Record<ModelName, string>,
  ModelInfoByName extends ModelInfoByNamePlaceholder<ModelName>
>(
  modelNames: readonly ModelName[],
  dollNames: readonly DollName[],
  modelInfoByName: ModelInfoByName,
  dollOptions: DollOptions
) {
  const {
    defaultInRange,
    makeModelAnimWeightsMoverState,
    modelMoverRefs,
    modelOtherMeshesRefs,
  } = makeDollIndexUtils<
    DollName,
    ModelName,
    AnimationNameByModel,
    MeshNameByModel,
    ModelInfoByName
  >(dollNames, modelInfoByName);

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
      // nextSpotName: null as null | AnySpotName, // when going to new place, start at this spot
      nextSpotName: null as null | AnySpotName, // when going to new place, start at this spot
      //  Movers
      ...mover3dState("position", {
        value: HIDDEN_POSITION,
        valueGoal: HIDDEN_POSITION,
      }), // could have semnticolor icons split by numbers too
      ...moverState("rotationY"),
      //
      positionOnPlaneScene: defaultPosition2d(),
      // nowAnimation: animationNames[0] as AnimationNameByModel[T_ModelName],
      // animation Weights mover
      ...makeModelAnimWeightsMoverState(safeModelName)("animWeights"),
      nowAnimation: animationNames[0],
      animationLoops: true,
      //
      inRange: defaultInRange(),
    };
  };

  // hacky way to get return type from generic function
  // from Colin at https://stackoverflow.com/questions/50321419/typescript-returntype-of-generic-function
  class StateReturnType_Generic_Helper<
    T_A extends DollName,
    T_B extends ModelName
  > {
    // wrapped has no explicit return type so we can infer it
    wrapped(a: T_A, b: T_B) {
      return state<T_A, T_B>(a, b);
    }
  }
  type StateReturnType<
    T_A extends DollName,
    T_B extends ModelName
  > = ReturnType<StateReturnType_Generic_Helper<T_A, T_B>["wrapped"]>;

  type DollAssetRefs<T_ModelName extends ModelName> = {
    meshes: Record<MeshNameByModel[T_ModelName] | "__root__", AbstractMesh>;
    skeleton: Skeleton;
    bones: Record<BoneNameByModel[T_ModelName], Bone>;
    aniGroups: Record<AnimationNameByModel[T_ModelName], AnimationGroup>;
    materials: Record<MaterialNameByModel[T_ModelName], Material>;
  };

  const refs = <T_DollName extends DollName, T_ModelName extends ModelName>(
    dollName: T_DollName,
    itemState: StateReturnType<T_DollName, T_ModelName>
  ) => {
    const modelName = itemState.modelName;

    return {
      // local refs ( maybe replace with just the container hm)
      meshRef: null as null | AbstractMesh,
      otherMeshes: modelOtherMeshesRefs(modelName),
      entriesRef: null as null | InstantiatedEntries,
      aniGroupsRef: null as null | Record<
        AnimationNameByModel[T_ModelName],
        AnimationGroup
      >,
      assetRefs: null as null | DollAssetRefs<T_ModelName>,
      groundRef: null as null | AbstractMesh,
      checkCollisions: true, // prevents custom collision checking, like isTouching , and moveWithCollisions he the position state changes, NOTE might be okay to use meshRef.checkCollisions instead
      ...mover3dRefs("position", {
        mass: 20,
        damping: 0.5,
        friction: 0.5,
        stiffness: 0.65,
      }), // maybe also start movers using the main name
      ...moverRefs("rotationY", {
        mass: 100,
        damping: 2,
        friction: 20,
        stiffness: 20,
      }),
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
    [K_DollName in DollName]: StateReturnType<
      K_DollName,
      DollOptions[K_DollName]["model"]
    >;
  };

  function makeAutmaticModelDollStartStates() {
    const partialDollStates = {} as Partial<DollStartStates>;
    forEach(dollNames, (dollName) => {
      partialDollStates[dollName] = state(
        dollName,
        dollOptions[dollName].model
      );
    });
    return partialDollStates as DollStartStates;
  }

  const startStates = {
    // Automatically make dolls
    ...makeAutmaticModelDollStartStates(),
  };

  return { startStates, state, refs };
}
