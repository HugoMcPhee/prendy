import { forEach } from "chootils/dist/loops";
import { makeMoverStateMaker, moverMultiRefs } from "repond-movers";
import { defaultInRangeForDoll } from "../../helpers/prendyUtils/dolls";
export default function get_dollStoreUtils(prendyAssets) {
    const { dollNames, modelInfoByName } = prendyAssets;
    function makeModelAnimWeightsMoverState(modelName) {
        const modelInfo = modelInfoByName[modelName];
        const { animationNames } = modelInfo;
        const _initialState = {};
        forEach(animationNames, (aniName) => {
            _initialState[aniName] = 0;
        });
        const editedInitialState = _initialState;
        return makeMoverStateMaker(() => editedInitialState);
    }
    function makeToggledMeshesState(modelName) {
        const modelInfo = modelInfoByName[modelName];
        const { meshNames } = modelInfo;
        const meshesEnabled = {};
        forEach(meshNames, (meshName) => (meshesEnabled[meshName] = true));
        // return meshesEnabled as Record<MeshNameByModel[T_ModelName], boolean>;
        return meshesEnabled;
    }
    function modelMoverRefs(modelName, moverName) {
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
    function modelOtherMeshesRefs(modelName) {
        const modelInfo = modelInfoByName[modelName];
        const { meshNames } = modelInfo;
        const untypedOtherMeshes = {};
        forEach(meshNames, (meshName) => {
            untypedOtherMeshes[meshName] = null;
        });
        return untypedOtherMeshes;
    }
    function defaultInRange() {
        const untypedInRangeObject = {};
        forEach(dollNames, (dollName) => {
            untypedInRangeObject[dollName] = defaultInRangeForDoll();
        });
        return untypedInRangeObject;
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
