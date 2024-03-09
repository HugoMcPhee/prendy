import { PBRMaterial, SceneLoader } from "@babylonjs/core";
import { addItemToUniqueArray } from "chootils/dist/arrays";
import { MyTypes } from "../declarations";
import { getScene } from "../helpers/babylonjs/getSceneOrEngineUtils";
import { meta } from "../meta";
import { setState, getRefs, makeRules } from "repond";
import { ModelName } from "../types";

// handle loading here ??

async function startLoadingModel<T_ModelName extends ModelName>(modelName: T_ModelName) {
  setState({ models: { [modelName]: { wantToLoad: false } } });

  const { modelInfoByName } = meta.assets!;

  const { modelFile } = modelInfoByName[modelName];

  const scene = getScene();
  if (!scene) {
    console.warn("tried to load ", modelName, " but there's no scene 🤷‍♀️");
    return;
  }

  const container = await SceneLoader.LoadAssetContainerAsync(modelFile, undefined, scene);

  const modelRef = getRefs().models[modelName];
  modelRef.container = container;
  modelRef.materialRef = container.materials[0] ? (container.materials[0] as PBRMaterial) : null;
  modelRef.materialRefs = container.materials as PBRMaterial[];

  setState({ models: { [modelName]: { isLoaded: true } } });

  // maybe ideally type the AssetContainer based on modelInfoByName :) ?
}

export const modelRules = makeRules(({ itemEffect }) => ({
  whenWantsToLoad: itemEffect({
    run({ itemId: modelName }) {
      // load the model async here, and store the result in refs,
      // and also hide  /disable the model mesh ?
      startLoadingModel(modelName as ModelName);
    },
    check: { type: "models", prop: "wantToLoad", becomes: true },
    atStepEnd: true,
  }),
  whenIsLoaded: itemEffect({
    run({ itemId: modelName }) {
      setState((state) => {
        // if (state.global.main.modelNamesLoaded.includes(modelName)) return {};

        return {
          global: {
            main: {
              modelNamesLoaded: addItemToUniqueArray(state.global.main.modelNamesLoaded, modelName),
            },
          },
        };
      });
    },
    check: { type: "models", prop: "isLoaded", becomes: true },
    step: "loadNewPlaceModels",
    atStepEnd: true,
  }),
}));
