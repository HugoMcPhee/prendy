import { forEach } from "shutils/dist/loops";
export default function models(backdopArt) {
    const { modelNames } = backdopArt;
    const state = (_modelName) => {
        return {
            wantToLoad: false,
            isLoading: false,
            isLoaded: false,
        };
    };
    const refs = (_modelName) => ({
        // originalMeshRef: null,
        container: null,
        materialRef: null,
        materialRefs: null,
    });
    class FuncTypeWrapper {
        // wrapped has no explicit return type so we can infer it
        wrapped(modelName) {
            return state(modelName);
        }
    }
    function makeAutmaticModelStartStates() {
        const partialModelStates = {};
        forEach(modelNames, (modelName) => {
            partialModelStates[modelName] = state(modelName);
        });
        return partialModelStates;
    }
    const startStates = makeAutmaticModelStartStates();
    // {
    //   walker: state("walker"),
    //   bucket: state("bucket"),
    // };
    return { startStates, state, refs };
}
