import { AssetContainer, PBRMaterial } from "@babylonjs/core";
import { forEach } from "chootils/dist/loops";
import { MyTypes } from "../declarations";

export default function models<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"]) {
  type ModelName = T_MyTypes["Types"]["ModelName"];

  const modelNames = prendyAssets.modelNames as ModelName[];

  const getDefaultState = <T_ModelName extends ModelName>(_modelName: T_ModelName) => {
    return {
      wantToLoad: false,
      isLoading: false,
      isLoaded: false,
    };
  };

  const getDefaultRefs = <T_ModelName extends ModelName>(_modelName: T_ModelName) => ({
    // originalMeshRef: null,
    container: null as null | AssetContainer,
    materialRef: null as null | PBRMaterial,
    materialRefs: null as null | PBRMaterial[],
  });

  class FuncTypeWrapper<T_ModelName extends ModelName> {
    // wrapped has no explicit return type so we can infer it
    wrapped(modelName: T_ModelName) {
      return getDefaultState<T_ModelName>(modelName);
    }
  }
  type StateType<T extends ModelName> = ReturnType<FuncTypeWrapper<T>["wrapped"]>;

  type ModelStartStates = {
    [K_ModelName in ModelName]: StateType<K_ModelName>;
  };

  function makeAutmaticModelStartStates() {
    const partialModelStates = {} as Partial<ModelStartStates>;

    forEach(modelNames, (modelName) => {
      partialModelStates[modelName] = getDefaultState(modelName);
    });

    return partialModelStates as ModelStartStates;
  }

  const startStates = makeAutmaticModelStartStates();

  // {
  //   walker: state("walker"),
  //   bucket: state("bucket"),
  // };

  return { startStates, getDefaultState, getDefaultRefs };
}
