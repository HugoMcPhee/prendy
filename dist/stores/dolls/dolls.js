import { forEach } from "chootils/dist/loops";
import { defaultPosition as defaultPosition2d } from "chootils/dist/points2d";
import { mover3dRefs, mover3dState, moverRefs, moverState } from "pietem-movers";
import makeTyped_dollStoreUtils from "./dollStoreUtils";
const HIDDEN_POSITION = { x: 0, y: 0, z: -1000 };
export default function dolls(prendyAssets) {
    const { modelNames, dollNames, modelInfoByName, dollOptions } = prendyAssets;
    const { defaultInRange, makeModelAnimWeightsMoverState, modelMoverRefs, modelOtherMeshesRefs } = makeTyped_dollStoreUtils(prendyAssets);
    const defaultModelName = modelNames[0];
    const state = (_dollName, modelName) => {
        const safeModelName = modelName !== null && modelName !== void 0 ? modelName : defaultModelName;
        const { animationNames } = modelInfoByName[safeModelName];
        return {
            modelName: safeModelName,
            //  New room
            // nextSpotName: null as null | AnySpotName, // when going to new place, start at this spot
            nextSpotName: null,
            //  Movers
            ...mover3dState("position", {
                value: HIDDEN_POSITION,
                valueGoal: HIDDEN_POSITION,
            }),
            ...moverState("rotationY"),
            //
            positionOnPlaneScene: defaultPosition2d(),
            // nowAnimation: animationNames[0] as AnimationNameByModel[T_ModelName],
            // animation Weights mover
            ...makeModelAnimWeightsMoverState(safeModelName)("animWeights"),
            nowAnimation: animationNames[0],
            animationLoops: true,
            //
            inRange: defaultInRange(),
        };
    };
    // hacky way to get return type from generic function
    // from Colin at https://stackoverflow.com/questions/50321419/typescript-returntype-of-generic-function
    class StateReturnType_Generic_Helper {
        // wrapped has no explicit return type so we can infer it
        wrapped(a, b) {
            return state(a, b);
        }
    }
    const refs = (dollName, itemState) => {
        const modelName = itemState.modelName;
        return {
            // local refs ( maybe replace with just the container hm)
            meshRef: null,
            otherMeshes: modelOtherMeshesRefs(modelName),
            entriesRef: null,
            aniGroupsRef: null,
            assetRefs: null,
            groundRef: null,
            checkCollisions: true,
            ...mover3dRefs("position", {
                mass: 20,
                damping: 0.5,
                friction: 0.5,
                stiffness: 0.65,
            }),
            ...moverRefs("rotationY", { mass: 100, damping: 2, stiffness: 20, friction: 20 }),
            ...modelMoverRefs(modelName, "animWeights"),
        };
    };
    function makeAutmaticModelDollStartStates() {
        const partialDollStates = {};
        forEach(dollNames, (dollName) => {
            partialDollStates[dollName] = state(dollName, dollOptions[dollName].model);
        });
        return partialDollStates;
    }
    const startStates = {
        // Automatically make dolls
        ...makeAutmaticModelDollStartStates(),
    };
    return { startStates, state, refs };
}
