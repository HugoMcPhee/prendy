import { makeRunMovers } from "pietem-movers";
import { forEach } from "chootils/dist/loops";
import { samePoints as samePoints3d, subtractPointsSafer, } from "chootils/dist/points3d";
import { toRadians } from "chootils/dist/speedAngleDistance";
import { getShortestAngle, getVectorAngle, } from "chootils/dist/speedAngleDistance2d";
import { point3dToVector3, vector3ToSafePoint3d } from "../../utils/babylonjs";
import { makeScenePlaneUtils } from "../../utils/babylonjs/scenePlane";
//
import { setGlobalPositionWithCollisions } from "../../utils/babylonjs/setGlobalPositionWithCollisions";
import { getDefaultInRangeFunction } from "./indexUtils";
import { makeDollStoreUtils, rangeOptionsQuick } from "./utils";
// const dollDynamicRules = makeDynamicRules({
//   whenModelLoadsForDoll
// });
// when the models isLoading becomes true
export function makeDollDynamicRules(storeHelpers, prendyStartOptions, prendyStores, prendyAssets) {
    const { saveModelStuffToDoll, setupLightMaterial } = makeDollStoreUtils(storeHelpers, prendyStores, prendyStartOptions, prendyAssets);
    const { getRefs, makeDynamicRules } = storeHelpers;
    return makeDynamicRules(({ itemEffect, effect }) => ({
        waitForModelToLoad: itemEffect(({ dollName, modelName, }) => ({
            run() {
                saveModelStuffToDoll({ dollName, modelName });
            },
            name: `doll_waitForModelToLoad${dollName}_${modelName}`,
            check: {
                type: "models",
                name: modelName,
                prop: "isLoaded",
                becomes: true,
            },
            atStepEnd: true,
        })),
        // When the plaec and all characters are loaded
        whenWholePlaceFinishesLoading: itemEffect(({ dollName, modelName, }) => ({
            run() {
                const dollRefs = getRefs().dolls[dollName];
                const modelRefs = getRefs().models[modelName];
                if (modelRefs.materialRefs) {
                    forEach(modelRefs.materialRefs, (materialRef) => setupLightMaterial(materialRef));
                }
                setupLightMaterial(modelRefs.materialRef);
                if (dollRefs.meshRef) {
                    // dollRefs.meshRef.material = modelRefs.materialRef;
                }
                // forEach(modelNamesLoaded, (modelName) => {
                //   const modelRefs = getRefs().models[modelName];
                //   setupLightMaterial(modelRefs.materialRef);
                // });
                // forEach(dollNames, (dollName) => {
                //   const dollRefs = getRefs().dolls[dollName];
                //   const { modelName } = getState().dolls[dollName];
                //   const modelRefs = getRefs().models[modelName];
                //
                //   dollRefs.materialRef = modelRefs.materialRef;
                // });
                // setupLightMaterial(dollRefs.materialRef);
            },
            name: `doll_whenWholePlaceFinishesLoading${dollName}_${modelName}`,
            check: {
                type: "global",
                prop: ["isLoadingBetweenPlaces"],
                becomes: false,
            },
            atStepEnd: true,
        })),
    }));
}
// FIXME
// maybe allow pietem to run 'addedOrRemoved' rules for initialState?
export function startDynamicDollRulesForInitialState(storeHelpers, dollDynamicRules, dollNames) {
    const { getState } = storeHelpers;
    forEach(dollNames, (dollName) => {
        const { modelName } = getState().dolls[dollName];
        if (!modelName)
            return;
        dollDynamicRules.startAll({ dollName, modelName });
    });
    return function stopDynamicDollRulesForInitialState() {
        forEach(dollNames, (dollName) => {
            const { modelName } = getState().dolls[dollName];
            if (!modelName)
                return;
            dollDynamicRules.stopAll({ dollName, modelName });
        });
    };
}
export function makeDollRules(prendyStartOptions, dollDynamicRules, storeHelpers, prendyStores, prendyAssets) {
    const { modelInfoByName, dollNames } = prendyAssets;
    const { getQuickDistanceBetweenDolls, inRangesAreTheSame, setDollAnimWeight, updateDollScreenPosition, } = makeDollStoreUtils(storeHelpers, prendyStores, prendyStartOptions, prendyAssets);
    const { focusScenePlaneOnFocusedDoll } = makeScenePlaneUtils(storeHelpers, prendyStartOptions);
    const { makeRules, getPreviousState, getState, setState, getRefs } = storeHelpers;
    const { runMover, runMover3d, runMoverMulti } = makeRunMovers(storeHelpers);
    return makeRules(({ itemEffect, effect }) => ({
        // --------------------------------
        // loading model stuff
        // --------------------------------
        whenModelNameChanges: itemEffect({
            run({ itemName: dollName, newValue: newModelName, previousValue: prevModelName, }) {
                // stop the previous dynamic rule, and start the new one
                dollDynamicRules.stopAll({ dollName, modelName: prevModelName });
                dollDynamicRules.startAll({ dollName, modelName: newModelName });
            },
            check: { type: "dolls", prop: "modelName" },
        }),
        whenDollAddedOrRemoved: effect({
            run(diffInfo) {
                //TODO maybe make it easier to add itemAdded rule and itemRemoved rule
                // stop the previous dynamic rule, and start the new one
                forEach(diffInfo.itemsRemoved.dolls, (dollName) => {
                    const { modelName } = getPreviousState().dolls[dollName];
                    dollDynamicRules.stopAll({ dollName, modelName });
                });
                forEach(diffInfo.itemsAdded.dolls, (dollName) => {
                    const { modelName } = getState().dolls[dollName];
                    dollDynamicRules.startAll({ dollName, modelName });
                });
            },
            check: { type: "dolls", addedOrRemoved: true },
        }),
        // --------------------------------
        // animations
        // --------------------------------
        whenNowAnimationChanged: itemEffect({
            run({ newValue: nowAnimation, itemState, itemName: dollName }) {
                const { modelName } = itemState;
                const animationNames = modelInfoByName[modelName]
                    .animationNames;
                // type T_ModelName = typeof modelName;
                // let newWeights = {} as Record<
                //   AnimationNameByModel[T_ModelName],
                //   number
                // >;
                let newWeights = {};
                forEach(animationNames, (aniName) => {
                    newWeights[aniName] = nowAnimation === aniName ? 1 : 0;
                });
                setDollAnimWeight(dollName, newWeights);
            },
            check: { type: "dolls", prop: "nowAnimation" },
            step: "dollAnimation",
            atStepEnd: true,
        }),
        whenAnimWeightsGoalChanged: itemEffect({
            run({ itemName: dollName }) {
                setState({
                    dolls: { [dollName]: { animWeightsIsMoving: true } },
                });
            },
            check: { type: "dolls", prop: "animWeightsGoal" },
            step: "dollAnimation2",
            atStepEnd: true,
        }),
        whenAnimationWeightsStartedMoving: itemEffect({
            run({ itemName: dollName }) {
                runMoverMulti({
                    name: dollName,
                    type: "dolls",
                    mover: "animWeights",
                });
            },
            check: { type: "dolls", prop: "animWeightsIsMoving", becomes: true },
            step: "dollAnimationStartMovers",
            atStepEnd: true,
        }),
        whenAnimWeightsChanged: itemEffect({
            run({ newValue: animWeights, itemState, itemRefs }) {
                const { modelName } = itemState;
                const animationNames = modelInfoByName[modelName]
                    .animationNames;
                if (!itemRefs.aniGroupsRef)
                    return;
                forEach(animationNames, (aniName) => {
                    if (!itemRefs.aniGroupsRef)
                        return;
                    const aniRef = itemRefs.aniGroupsRef[aniName];
                    // const { timerSpeed } = getRefs().global.main;
                    // if (aniRef._speedRatio !== timerSpeed) {
                    //   aniRef._speedRatio = timerSpeed;
                    // }
                    if (!aniRef) {
                        console.warn("tried to use undefined animation", aniName);
                    }
                    if (aniRef &&
                        (aniRef === null || aniRef === void 0 ? void 0 : aniRef.speedRatio) !== prendyStartOptions.animationSpeed) {
                        aniRef.speedRatio = prendyStartOptions.animationSpeed;
                    }
                    const animWeight = animWeights[aniName];
                    const animIsStopped = animWeight < 0.003;
                    // stops playing if the weight is 0ish
                    if (animIsStopped) {
                        if (aniRef === null || aniRef === void 0 ? void 0 : aniRef.isPlaying) {
                            aniRef.stop();
                        }
                    }
                    else {
                        if (!(aniRef === null || aniRef === void 0 ? void 0 : aniRef.isPlaying)) {
                            aniRef.start(itemState.animationLoops);
                        }
                    }
                    aniRef === null || aniRef === void 0 ? void 0 : aniRef.setWeightForAllAnimatables(animWeights[aniName]);
                });
            },
            check: { type: "dolls", prop: "animWeights" },
            atStepEnd: true,
            step: "dollAnimation2",
        }),
        // --------------------------------
        // other drawing stuff
        // --------------------------------
        whenRotationYChanged: itemEffect({
            run({ newValue: newRotationY, itemRefs }) {
                if (!itemRefs.meshRef)
                    return;
                itemRefs.meshRef.rotation.y = toRadians(newRotationY);
            },
            atStepEnd: true,
            check: { type: "dolls", prop: "rotationY" },
        }),
        //
        whenRotationGoalChanged: itemEffect({
            run({ previousValue: oldYRotation, newValue: newYRotation, itemName: dollName, }) {
                const yRotationDifference = oldYRotation - newYRotation;
                if (Math.abs(yRotationDifference) > 180) {
                    const shortestAngle = getShortestAngle(oldYRotation, newYRotation);
                    let editedYRotation = oldYRotation + shortestAngle;
                    setState({
                        dolls: {
                            [dollName]: {
                                rotationYGoal: editedYRotation,
                                rotationYIsMoving: true,
                            },
                        },
                    });
                }
                else {
                    setState({
                        dolls: { [dollName]: { rotationYIsMoving: true } },
                    });
                }
            },
            check: { type: "dolls", prop: "rotationYGoal" },
        }),
        whenPositionGoalChanged: itemEffect({
            run({ itemName: dollName, itemRefs: dollRefs, itemState: dollState }) {
                setState({ dolls: { [dollName]: { positionIsMoving: true } } });
                const { positionMoveMode: moveMode } = dollState;
                // TEMPORARY : ideally this is automatic for movers?
                if (moveMode === "spring")
                    dollRefs.positionMoverRefs.recentSpeeds = [];
            },
            atStepEnd: true,
            step: "dollAnimation2",
            check: { type: "dolls", prop: "positionGoal" },
        }),
        whenStartedMoving: itemEffect({
            run({ itemName: dollName }) {
                runMover3d({ name: dollName, type: "dolls", mover: "position" });
            },
            check: { type: "dolls", prop: "positionIsMoving", becomes: true },
            step: "dollAnimationStartMovers",
            atStepEnd: true,
        }),
        whenStartedRotating: itemEffect({
            run({ itemName: dollName }) {
                runMover({
                    name: dollName,
                    type: "dolls",
                    mover: "rotationY",
                });
            },
            check: { type: "dolls", prop: "rotationYIsMoving", becomes: true },
            atStepEnd: true,
        }),
        // ___________________________________
        // position
        whenPositionChangesToEdit: itemEffect({
            run({ newValue: newPosition, previousValue: prevPosition, itemRefs, itemName: dollName, }) {
                if (!itemRefs.meshRef)
                    return;
                if (samePoints3d(newPosition, prevPosition))
                    return;
                // if (dollName === "key") {
                //   console.log("sdkfksfdlfsdkkfsdlkfsd");
                //
                //   console.log("itemRefs.checkCollisions", itemRefs.checkCollisions);
                //   if (!itemRefs.checkCollisions) {
                //     itemRefs.meshRef.setAbsolutePosition(point3dToVector3(newPosition));
                //   }
                // }
                if (itemRefs.checkCollisions) {
                    const newMeshPosition = point3dToVector3(newPosition);
                    const { editedPosition, positionWasEdited, collidedPosOffset } = setGlobalPositionWithCollisions(itemRefs.meshRef, newMeshPosition);
                    // if a collision cauhed the mesh to not reach the position, update the position state
                    if (positionWasEdited) {
                        const shouldChangeAngle = Math.abs(collidedPosOffset.z) > 0.01 ||
                            Math.abs(collidedPosOffset.x) > 0.01;
                        let newYRotation = getState().dolls[dollName].rotationYGoal;
                        const positionOffset = subtractPointsSafer(prevPosition, editedPosition);
                        newYRotation = getVectorAngle({
                            x: positionOffset.z,
                            y: positionOffset.x,
                        });
                        setState(() => ({
                            dolls: {
                                [dollName]: {
                                    position: vector3ToSafePoint3d(editedPosition),
                                    rotationYGoal: shouldChangeAngle ? newYRotation : undefined,
                                },
                            },
                        }));
                    }
                }
                else {
                    // if (dollName === "key") {
                    //   console.log("sdkfksfdlfsdkkfsdlkfsd");
                    //
                    //   console.log("itemRefs.checkCollisions", itemRefs.checkCollisions);
                    // if (!itemRefs.checkCollisions) {
                    itemRefs.meshRef.setAbsolutePosition(point3dToVector3(newPosition));
                    // }
                    // }
                }
                updateDollScreenPosition({
                    dollName: dollName,
                    instant: false,
                });
            },
            check: { type: "dolls", prop: "position" },
            step: "editPosition",
            atStepEnd: true,
        }),
        whenPositionChangesCheckInRange: effect({
            run(_diffInfo) {
                // forEach(diffInfo.itemsChanged.dolls)
                const defaultInRange = getDefaultInRangeFunction(dollNames);
                const newQuickDistancesMap = {};
                // {  rabbit : { cricket: 50, rabbit: 1000 }
                //    cricket : { cricket: 1000, rabbit: 50 }}
                const newDollsState = {};
                const tempNewDollsState = {};
                // forEach(diffInfo.itemsChanged.dolls as DollName[], (dollName) => {
                //   if (!diffInfo.propsChangedBool.dolls[dollName].position) return;
                forEach(dollNames, (dollName) => {
                    // if (!diffInfo.propsChangedBool.dolls[dollName].position) return;
                    // if position changed
                    const dollRef = getRefs().dolls[dollName];
                    if (!dollRef.checkCollisions)
                        return; // stop checking more if checkCollisions is false
                    newQuickDistancesMap[dollName] = {}; //
                    // newDollsState[dollName] = { inRange: defaultInRange() };
                    tempNewDollsState[dollName] = { inRange: defaultInRange() };
                    // get quick distances to each other doll
                    forEach(dollNames, (otherDollName) => {
                        var _a;
                        const otherDollRef = getRefs().dolls[otherDollName];
                        if (!otherDollRef.checkCollisions)
                            return;
                        let quickDistance = 100000000;
                        if (dollName === otherDollName) {
                            quickDistance = 100000000;
                        }
                        // if the reverse distance was already found use that
                        if (((_a = newQuickDistancesMap[otherDollName]) === null || _a === void 0 ? void 0 : _a[dollName]) !== undefined) {
                            quickDistance = newQuickDistancesMap[otherDollName][dollName];
                        }
                        else {
                            quickDistance = getQuickDistanceBetweenDolls(dollName, otherDollName);
                        }
                        // FIXME type?
                        newQuickDistancesMap[dollName][otherDollName] =
                            quickDistance;
                        tempNewDollsState[dollName].inRange[otherDollName].touch =
                            quickDistance < rangeOptionsQuick.touch;
                        tempNewDollsState[dollName].inRange[otherDollName].talk =
                            quickDistance < rangeOptionsQuick.talk;
                        tempNewDollsState[dollName].inRange[otherDollName].see =
                            quickDistance < rangeOptionsQuick.see;
                    });
                    const currentDollState = getState().dolls[dollName];
                    const tempNewDollState = tempNewDollsState[dollName];
                    if (tempNewDollState === null || tempNewDollState === void 0 ? void 0 : tempNewDollState.inRange) {
                        if (!inRangesAreTheSame(tempNewDollState.inRange, currentDollState.inRange // FIXME DeepReadonlyObjects
                        )) {
                            newDollsState[dollName] = tempNewDollState;
                        }
                    }
                });
                setState({ dolls: newDollsState });
            },
            check: { type: "dolls", prop: ["position"] },
            atStepEnd: true,
            step: "checkCollisions",
        }),
        // should be a  dynamic rule ?
        whenCameraChangesForPlanePosition: effect({
            // in a different flow to "cameraChange"
            run() {
                focusScenePlaneOnFocusedDoll("instant");
            },
            check: { type: "places", prop: ["nowCamName"] },
            step: "planePosition",
        }),
        updateDollScreenPositionWhenScenePlaneMoves: effect({
            run() {
                const { playerCharacter } = getState().global.main;
                const { dollName } = getState().characters[playerCharacter];
                if (!dollName)
                    return;
                // NOTE TODO ideally add for each character autamotically as a dynamic rule?
                forEach(dollNames, (dollName) => updateDollScreenPosition({ dollName: dollName, instant: false }));
            },
            // this happens before rendering because its in "derive" instead of "subscribe"
            check: { type: "global", prop: ["planePos", "planeZoom"] },
            step: "planePosition",
        }),
    }));
}
