import { AbstractMesh } from "@babylonjs/core";
import {
  AnimationNameByModel,
  PrendyAssets,
  DollName,
  MeshNameByModel,
  ModelName,
} from "../../declarations";
import { makeMoverStateMaker, moverMultiRefs } from "pietem-movers";
import { forEach } from "chootils/dist/loops";
//

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

export default function makeDollIndexUtils(prendyAssets: PrendyAssets) {
  const { dollNames, modelInfoByName } = prendyAssets;

  function makeModelAnimWeightsMoverState<T_ModelName extends ModelName>(
    modelName: T_ModelName
  ) {
    const modelInfo = modelInfoByName[modelName];
    const { animationNames } = modelInfo;
    const _initialState = {} as Record<any, any>;

    forEach(animationNames, (aniName) => {
      _initialState[aniName] = 0;
    });

    const editedInitialState = _initialState as Record<
      AnimationNameByModel[T_ModelName],
      number
    >;

    return makeMoverStateMaker(() => editedInitialState);
  }

  function modelMoverRefs<
    T_ModelName extends ModelName,
    T_MoverName extends string
  >(modelName: T_ModelName, moverName: T_MoverName) {
    const modelInfo = modelInfoByName[modelName];
    const { animationNames } = modelInfo;

    return moverMultiRefs(moverName, animationNames, {
      mass: 41.5,
      stiffness: 40,
      damping: 10,
      // slide
      friction: 0.16,
    });
  }

  function modelOtherMeshesRefs<T_ModelName extends ModelName>(
    modelName: T_ModelName
  ) {
    const modelInfo = modelInfoByName[modelName];
    const { meshNames } = modelInfo;

    const untypedOtherMeshes = {} as Record<string, null>;

    forEach(meshNames, (meshName) => {
      untypedOtherMeshes[meshName] = null;
    });

    return untypedOtherMeshes as Record<
      MeshNameByModel[T_ModelName],
      AbstractMesh | null
    >;
  }

  // const defaultModelName = Object.keys(modelInfoByName)[0] as ModelName;
  // export const defaultModelName = modelNames[0];

  type InRangeForAllDolls = Record<DollName, InRangeForDoll>;

  function defaultInRange() {
    const untypedInRangeObject = {} as Record<string, InRangeForDoll>;

    forEach(dollNames, (dollName) => {
      untypedInRangeObject[dollName] = defaultInRangeForDoll();
    });
    return untypedInRangeObject as InRangeForAllDolls;
  }

  return {
    makeModelAnimWeightsMoverState,
    modelMoverRefs,
    modelOtherMeshesRefs,
    defaultInRangeForDoll,
    defaultInRange,
  };
}
