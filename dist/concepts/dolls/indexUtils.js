import { moverMultiRefs, makeMoverStateMaker } from "concep-movers";
import { forEach } from "shutils/dist/loops";
export function defaultInRangeForDoll() {
    return {
        touch: false,
        talk: false,
        see: false,
    };
}
export function getDefaultInRangeFunction(dollNames) {
    function defaultInRange() {
        const untypedInRangeObject = {};
        forEach(dollNames, (dollName) => {
            untypedInRangeObject[dollName] = defaultInRangeForDoll();
        });
        return untypedInRangeObject;
    }
    return defaultInRange;
}
export default function makeDollIndexUtils(dollNames, modelInfoByName) {
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
        modelMoverRefs,
        modelOtherMeshesRefs,
        defaultInRangeForDoll,
        defaultInRange,
    };
}