import { SceneLoader } from "@babylonjs/core";
import { addItemToUniqueArray } from "chootils/dist/arrays";
import { get_getSceneOrEngineUtils } from "../helpers/babylonjs/getSceneOrEngineUtils";
// handle loading here ??
export function get_modelRules(prendyAssets, storeHelpers) {
    const { makeRules, setState, getRefs } = storeHelpers;
    const { modelInfoByName } = prendyAssets;
    const { getScene } = get_getSceneOrEngineUtils(storeHelpers);
    async function startLoadingModel(modelName) {
        setState({ models: { [modelName]: { wantToLoad: false } } });
        const { modelFile } = modelInfoByName[modelName];
        const scene = getScene();
        if (!scene) {
            console.warn("tried to load ", modelName, " but there's no scene 🤷‍♀️");
            return;
        }
        const container = await SceneLoader.LoadAssetContainerAsync(modelFile, undefined, scene);
        const modelRef = getRefs().models[modelName];
        modelRef.container = container;
        modelRef.materialRef = container.materials[0] ? container.materials[0] : null;
        modelRef.materialRefs = container.materials;
        setState({ models: { [modelName]: { isLoaded: true } } });
        // maybe ideally type the AssetContainer based on modelInfoByName :) ?
    }
    return makeRules(({ itemEffect }) => ({
        whenWantsToLoad: itemEffect({
            run({ itemName: modelName }) {
                // load the model async here, and store the result in refs,
                // and also hide  /disable the model mesh ?
                startLoadingModel(modelName);
            },
            check: { type: "models", prop: "wantToLoad", becomes: true },
            atStepEnd: true,
        }),
        whenIsLoaded: itemEffect({
            run({ itemName: modelName }) {
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
}
