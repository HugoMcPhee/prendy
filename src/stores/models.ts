import { AssetContainer, PBRMaterial } from "@babylonjs/core";
import { PrendyAssets, ModelName } from "../declarations";
import { forEach } from "chootils/dist/loops";

export default function models(prendyAssets: PrendyAssets) {
  const modelNames = prendyAssets.modelNames as ModelName[];

  const state = <T_ModelName extends ModelName>(_modelName: T_ModelName) => {
    return {
      wantToLoad: false,
      isLoading: false,
      isLoaded: false,
    };
  };

  const refs = <T_ModelName extends ModelName>(_modelName: T_ModelName) => ({
    // originalMeshRef: null,
    container: null as null | AssetContainer,
    materialRef: null as null | PBRMaterial,
    materialRefs: null as null | PBRMaterial[],
  });

  class FuncTypeWrapper<T_ModelName extends ModelName> {
    // wrapped has no explicit return type so we can infer it
    wrapped(modelName: T_ModelName) {
      return state<T_ModelName>(modelName);
    }
  }
  type StateType<T extends ModelName> = ReturnType<FuncTypeWrapper<T>["wrapped"]>;

  type ModelStartStates = {
    [K_ModelName in ModelName]: StateType<K_ModelName>;
  };

  function makeAutmaticModelStartStates() {
    const partialModelStates = {} as Partial<ModelStartStates>;

    forEach(modelNames, (modelName) => {
      partialModelStates[modelName] = state(modelName);
    });

    return partialModelStates as ModelStartStates;
  }

  const startStates = makeAutmaticModelStartStates();

  // {
  //   walker: state("walker"),
  //   bucket: state("bucket"),
  // };

  return { startStates, state, refs };
}
