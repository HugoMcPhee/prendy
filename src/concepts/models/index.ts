import { AssetContainer, PBRMaterial } from "@babylonjs/core";
import { BackdopArt, ModelName } from "../../declarations";
import { forEach } from "shutils/dist/loops";

export default function models<
  A_BackdopArt extends BackdopArt = BackdopArt,
  A_ModelName extends ModelName = ModelName
>(backdopArt: A_BackdopArt) {
  const modelNames = backdopArt.modelNames as A_ModelName[];

  const state = <T_ModelName extends A_ModelName>(_modelName: T_ModelName) => {
    return {
      wantToLoad: false,
      isLoading: false,
      isLoaded: false,
    };
  };

  const refs = <T_ModelName extends A_ModelName>(_modelName: T_ModelName) => ({
    // originalMeshRef: null,
    container: null as null | AssetContainer,
    materialRef: null as null | PBRMaterial,
    materialRefs: null as null | PBRMaterial[],
  });

  class FuncTypeWrapper<T_ModelName extends A_ModelName> {
    // wrapped has no explicit return type so we can infer it
    wrapped(modelName: T_ModelName) {
      return state<T_ModelName>(modelName);
    }
  }
  type StateType<T extends A_ModelName> = ReturnType<
    FuncTypeWrapper<T>["wrapped"]
  >;

  type ModelStartStates = {
    [K_ModelName in A_ModelName]: StateType<K_ModelName>;
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
