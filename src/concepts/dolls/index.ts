import {
  AbstractMesh,
  AnimationGroup,
  Bone,
  InstantiatedEntries,
  Material,
  Skeleton,
} from "@babylonjs/core";
import {
  mover3dRefs,
  mover3dState,
  moverRefs,
  moverState,
} from "pietem-movers";
import { forEach } from "chootils/dist/loops";
import { defaultPosition as defaultPosition2d } from "chootils/dist/points2d";
import {
  AnimationNameByModel,
  AnyAnimationName,
  AnySpotName,
  PrendyArt,
  BoneNameByModel,
  DollName,
  DollOptions,
  MaterialNameByModel,
  MeshNameByModel,
  ModelName,
} from "../../declarations";
import makeDollIndexUtils from "./indexUtils";

const HIDDEN_POSITION = { x: 0, y: 0, z: -1000 };

export default function dolls<
  A_AnimationNameByModel extends AnimationNameByModel = AnimationNameByModel,
  A_AnyAnimationName extends AnyAnimationName = AnyAnimationName,
  A_AnySpotName extends AnySpotName = AnySpotName,
  A_PrendyArt extends PrendyArt = PrendyArt,
  A_BoneNameByModel extends BoneNameByModel = BoneNameByModel,
  A_DollName extends DollName = DollName,
  A_DollOptions extends DollOptions = DollOptions,
  A_MaterialNameByModel extends MaterialNameByModel = MaterialNameByModel,
  A_MeshNameByModel extends MeshNameByModel = MeshNameByModel,
  A_ModelName extends ModelName = ModelName
>(prendyArt: A_PrendyArt) {
  const { modelNames, dollNames, modelInfoByName, dollOptions } = prendyArt;

  const {
    defaultInRange,
    makeModelAnimWeightsMoverState,
    modelMoverRefs,
    modelOtherMeshesRefs,
  } = makeDollIndexUtils(prendyArt);

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
      // nextSpotName: null as null | AnySpotName, // when going to new place, start at this spot
      nextSpotName: null as null | A_AnySpotName, // when going to new place, start at this spot
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
      nowAnimation: animationNames[0] as A_AnyAnimationName, // NOTE AnimationNameFromDoll might work here?
      animationLoops: true,
      //
      inRange: defaultInRange(),
    };
  };

  // hacky way to get return type from generic function
  // from Colin at https://stackoverflow.com/questions/50321419/typescript-returntype-of-generic-function
  class StateReturnType_Generic_Helper<
    T_A extends A_DollName,
    T_B extends A_ModelName
  > {
    // wrapped has no explicit return type so we can infer it
    wrapped(a: T_A, b: T_B) {
      return state<T_A, T_B>(a, b);
    }
  }
  type StateReturnType<
    T_A extends A_DollName,
    T_B extends A_ModelName
  > = ReturnType<StateReturnType_Generic_Helper<T_A, T_B>["wrapped"]>;

  type DollAssetRefs<T_ModelName extends A_ModelName> = {
    meshes: Record<A_MeshNameByModel[T_ModelName] | "__root__", AbstractMesh>;
    skeleton: Skeleton;
    bones: Record<A_BoneNameByModel[T_ModelName], Bone>;
    aniGroups: Record<A_AnimationNameByModel[T_ModelName], AnimationGroup>;
    materials: Record<A_MaterialNameByModel[T_ModelName], Material>;
  };

  const refs = <T_DollName extends A_DollName, T_ModelName extends A_ModelName>(
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
        A_AnimationNameByModel[T_ModelName],
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
    [K_DollName in A_DollName]: StateReturnType<
      K_DollName,
      A_DollOptions[K_DollName]["model"]
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
