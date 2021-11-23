import { PBRMaterial, SceneLoader } from "@babylonjs/core";
import { addItemToUniqueArray } from "chootils/dist/arrays";
import { PrendyArt, ModelName } from "../../declarations";
import { makeGetSceneOrEngineUtils } from "../../utils/babylonjs/getSceneOrEngine";
import { PrendyConcepFuncs } from "../typedConcepFuncs";

// handle laoding here ??

export function makeModelRules<ConcepFuncs extends PrendyConcepFuncs>(
  concepFuncs: ConcepFuncs,
  prendyArt: PrendyArt
) {
  const { makeRules, setState, getRefs } = concepFuncs;
  const { modelInfoByName } = prendyArt;

  const { getScene } = makeGetSceneOrEngineUtils(concepFuncs);

  async function startLoadingModel<T_ModelName extends ModelName>(
    modelName: T_ModelName
  ) {
    setState({ models: { [modelName]: { wantToLoad: false } } });

    const { modelFile } = modelInfoByName[modelName];

    const scene = getScene();
    if (!scene) {
      console.warn("tried to load ", modelName, " but there's no scene 🤷‍♀️");
      return;
    }

    const container = await SceneLoader.LoadAssetContainerAsync(
      modelFile,
      undefined,
      scene
    );

    const modelRef = getRefs().models[modelName];
    modelRef.container = container;
    modelRef.materialRef = container.materials[0]
      ? (container.materials[0] as PBRMaterial)
      : null;
    modelRef.materialRefs = container.materials as PBRMaterial[];
    setState({ models: { [modelName]: { isLoaded: true } } });

    // maybe ideally type the AssetContainer based on modelInfoByName :) ?
  }

  return makeRules((addItemEffect) => ({
    whenWantsToLoad: addItemEffect({
      onItemEffect({ itemName: modelName }) {
        // load the model async here, and store the result in refs,
        // and also hide  /disable the model mesh ?
        startLoadingModel(modelName as ModelName);
      },
      check: { type: "models", prop: "wantToLoad", becomes: "true" },
      whenToRun: "subscribe",
    }),
    whenIsLoaded: addItemEffect({
      onItemEffect({ itemName: modelName }) {
        console.log(modelName, " loaded");

        setState((state) => {
          // if (state.global.main.modelNamesLoaded.includes(modelName)) return {};

          return {
            global: {
              main: {
                modelNamesLoaded: addItemToUniqueArray(
                  state.global.main.modelNamesLoaded,
                  modelName
                ),
              },
            },
          };
        });
      },
      check: { type: "models", prop: "isLoaded", becomes: "true" },
      flow: "loadNewPlaceModels",
      whenToRun: "subscribe",
    }),
  }));
}
