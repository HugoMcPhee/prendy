import { AbstractMesh } from "@babylonjs/core";
import { forEach } from "chootils/dist/loops";
import { makeMoverStateMaker, moverMultiRefs } from "repond-movers";
import { MyTypes } from "../../declarations";
import { InRangeForDoll, defaultInRangeForDoll } from "../../helpers/prendyUtils/dolls";
import { ModelName, AnimationNameByModel, MeshNameByModel, DollName } from "../../types";

export default function get_dollStoreUtils<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"]) {
  const { dollNames, modelInfoByName } = prendyAssets;

  function makeModelAnimWeightsMoverState<T_ModelName extends ModelName>(modelName: T_ModelName) {
    const modelInfo = modelInfoByName[modelName];
    const { animationNames } = modelInfo;
    const _initialState = {} as Record<any, any>;

    forEach(animationNames, (aniName) => {
      _initialState[aniName] = 0;
    });

    const editedInitialState = _initialState as Record<AnimationNameByModel[T_ModelName], number>;

    return makeMoverStateMaker(() => editedInitialState);
  }

  function makeToggledMeshesState<T_ModelName extends ModelName>(modelName: T_ModelName) {
    const modelInfo = modelInfoByName[modelName];
    const { meshNames } = modelInfo;
    const meshesEnabled = {} as Record<any, any>;
    forEach(meshNames, (meshName) => (meshesEnabled[meshName] = true));

    // return meshesEnabled as Record<MeshNameByModel[T_ModelName], boolean>;
    return meshesEnabled as Record<MeshNameByModel[T_ModelName], boolean>;
  }

  function modelMoverRefs<T_ModelName extends ModelName, T_MoverName extends string>(
    modelName: T_ModelName,
    moverName: T_MoverName
  ) {
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

  function modelOtherMeshesRefs<T_ModelName extends ModelName>(modelName: T_ModelName) {
    const modelInfo = modelInfoByName[modelName];
    const { meshNames } = modelInfo;

    const untypedOtherMeshes = {} as Record<string, null>;

    forEach(meshNames, (meshName) => {
      untypedOtherMeshes[meshName] = null;
    });

    return untypedOtherMeshes as Record<MeshNameByModel[T_ModelName], AbstractMesh | null>;
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
    makeToggledMeshesState,
    modelMoverRefs,
    modelOtherMeshesRefs,
    defaultInRangeForDoll,
    defaultInRange,
  };
}
