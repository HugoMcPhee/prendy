import { forEach } from "chootils/dist/loops";
import { subtractPointsSafer } from "chootils/dist/points3d";
import { toRadians } from "chootils/dist/speedAngleDistance";
import { getShortestAngle, getVectorAngle } from "chootils/dist/speedAngleDistance2d";
import { makeRunMovers } from "repond-movers";
import { cloneObjectWithJson } from "repond/dist/utils";
import { setGlobalPositionWithCollisions } from "../helpers/babylonjs/setGlobalPositionWithCollisions";
import { get_slateUtils } from "../helpers/babylonjs/slate";
import { point3dToVector3 } from "../helpers/babylonjs/vectors";
import { getDefaultInRangeFunction, get_dollStoryUtils, get_dollUtils, } from "../helpers/prendyUtils/dolls";
// const dollDynamicRules = makeDynamicRules({
//   whenModelLoadsForDoll
// });
// when the models isLoading becomes true
// TODO add to art options?
const rangeOptions = {
    touch: 1,
    talk: 2,
    see: 6, // prev 20
};
export const rangeOptionsQuick = {
    touch: rangeOptions.touch * rangeOptions.touch,
    talk: rangeOptions.talk * rangeOptions.talk,
    see: rangeOptions.see * rangeOptions.see,
};
export function get_dollDynamicRules(storeHelpers, prendyOptions, prendyStores, prendyAssets) {
    const { saveModelStuffToDoll, setupLightMaterial } = get_dollUtils(storeHelpers, prendyOptions, prendyAssets);
    const { getRefs, getState, setState, makeDynamicRules } = storeHelpers;
    return makeDynamicRules(({ itemEffect, effect }) => ({
        waitForModelToLoad: itemEffect(({ dollName, modelName }) => ({
            run() {
                saveModelStuffToDoll({ dollName, modelName });
            },
            name: `doll_waitForModelToLoad${dollName}_${modelName}`,
            check: { type: "models", name: modelName, prop: "isLoaded", becomes: true },
            atStepEnd: true,
        })),
        // When the place and all characters are loaded
        whenWholePlaceFinishesLoading: itemEffect(({ dollName, modelName }) => ({
            run() {
                const dollRefs = getRefs().dolls[dollName];
                const modelRefs = getRefs().models[modelName];
                if (modelRefs.materialRefs) {
                    forEach(modelRefs.materialRefs, (materialRef) => setupLightMaterial(materialRef));
                }
                setupLightMaterial(modelRefs.materialRef);
                // using modelNamesByPlace, set the doll state to invisible if it's not in the current place
                const { nowPlaceName } = getState().global.main;
                // const { modelName } = getState().dolls[dollName];
                const { modelNamesByPlace } = prendyOptions;
                const modelNamesForPlace = modelNamesByPlace[nowPlaceName];
                const isInPlace = modelNamesForPlace.includes(modelName);
                if (!isInPlace) {
                    setState({ dolls: { [dollName]: { isVisible: false } } });
                }
                else {
                    setState({ dolls: { [dollName]: { isVisible: true } } });
                }
            },
            name: `doll_whenWholePlaceFinishesLoading${dollName}_${modelName}`,
            check: { type: "global", prop: ["isLoadingBetweenPlaces"], becomes: false },
            atStepEnd: true,
            step: "respondToNewPlace",
        })),
    }));
}
// FIXME
// maybe allow repond to run 'addedOrRemoved' rules for initialState?
// NOTE rules can be manually triggered atleast, but the rule might not know an item was added
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
export function get_dollRules(prendyOptions, dollDynamicRules, storeHelpers, prendyStores, prendyAssets) {
    const { modelInfoByName, dollNames } = prendyAssets;
    const { getQuickDistanceBetweenDolls, inRangesAreTheSame, setDollAnimWeight, updateDollScreenPosition } = get_dollUtils(storeHelpers, prendyOptions, prendyAssets);
    const { focusSlateOnFocusedDoll } = get_slateUtils(storeHelpers, prendyOptions);
    const { makeRules, getPreviousState, getState, setState, getRefs, onNextTick } = storeHelpers;
    const { runMover, runMover3d, runMoverMulti } = makeRunMovers(storeHelpers);
    const { getModelNameFromDoll, get2DAngleBetweenDolls, get2DAngleFromDollToSpot } = get_dollStoryUtils(storeHelpers);
    return makeRules(({ itemEffect, effect }) => ({
        // --------------------------------
        // loading model stuff
        // --------------------------------
        whenModelNameChanges: itemEffect({
            run({ itemName: dollName, newValue: newModelName, previousValue: prevModelName }) {
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
                const animationNames = modelInfoByName[modelName].animationNames;
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
                setState({ dolls: { [dollName]: { animWeightsIsMoving: true } } });
            },
            check: { type: "dolls", prop: "animWeightsGoal" },
            step: "dollAnimation2",
            atStepEnd: true,
        }),
        whenAnimationWeightsStartedMoving: itemEffect({
            run({ itemName: dollName }) {
                runMoverMulti({ name: dollName, type: "dolls", mover: "animWeights" });
            },
            check: { type: "dolls", prop: "animWeightsIsMoving", becomes: true },
            step: "dollAnimationStartMovers",
            atStepEnd: true,
        }),
        whenAnimWeightsChanged: itemEffect({
            run({ newValue: animWeights, itemState, itemRefs }) {
                const { modelName } = itemState;
                const animationNames = modelInfoByName[modelName].animationNames;
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
                        return;
                    }
                    if (aniRef && (aniRef === null || aniRef === void 0 ? void 0 : aniRef.speedRatio) !== prendyOptions.animationSpeed) {
                        aniRef.speedRatio = prendyOptions.animationSpeed;
                    }
                    const animWeight = animWeights[aniName];
                    const animIsStopped = animWeight < 0.003;
                    // stops playing if the weight is 0ish
                    if (animIsStopped) {
                        if (aniRef === null || aniRef === void 0 ? void 0 : aniRef.isPlaying)
                            aniRef.stop();
                    }
                    else {
                        if (!(aniRef === null || aniRef === void 0 ? void 0 : aniRef.isPlaying))
                            aniRef.start(itemState.animationLoops);
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
            run({ previousValue: oldYRotation, newValue: newYRotation, itemName: dollName }) {
                const yRotationDifference = oldYRotation - newYRotation;
                if (Math.abs(yRotationDifference) > 180) {
                    const shortestAngle = getShortestAngle(oldYRotation, newYRotation);
                    let editedYRotation = oldYRotation + shortestAngle;
                    setState({
                        dolls: { [dollName]: { rotationYGoal: editedYRotation, rotationYIsMoving: true } },
                    });
                }
                else {
                    setState({ dolls: { [dollName]: { rotationYIsMoving: true } } });
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
                runMover({ name: dollName, type: "dolls", mover: "rotationY" });
            },
            check: { type: "dolls", prop: "rotationYIsMoving", becomes: true },
            atStepEnd: true,
        }),
        // ___________________________________
        // position
        whenPositionChangesToEdit: itemEffect({
            run({ newValue: newPosition, previousValue: prevPosition, itemRefs, itemName: dollName, itemState }) {
                if (!itemRefs.meshRef)
                    return;
                if (itemRefs.canGoThroughWalls) {
                    // console.log("not checking collisions and setting position", dollName);
                    itemRefs.meshRef.setAbsolutePosition(point3dToVector3(newPosition));
                }
                else {
                    const { editedPosition, positionWasEdited, collidedPosOffset } = setGlobalPositionWithCollisions(itemRefs.meshRef, newPosition);
                    // (itemRefs.meshRef as Mesh).position = newMeshPosition;
                    // if a collision cauhed the mesh to not reach the position, update the position state
                    if (positionWasEdited) {
                        const shouldChangeAngle = Math.abs(collidedPosOffset.z) > 0.01 || Math.abs(collidedPosOffset.x) > 0.01;
                        let newYRotation = getState().dolls[dollName].rotationYGoal;
                        const positionOffset = subtractPointsSafer(prevPosition, editedPosition);
                        newYRotation = getVectorAngle({ x: positionOffset.z, y: positionOffset.x });
                        // console.log("collidedPosOffset", collidedPosOffset, "positionOffset", positionOffset);
                        setState(() => ({
                            dolls: {
                                [dollName]: {
                                    position: editedPosition,
                                    rotationYGoal: shouldChangeAngle ? newYRotation : undefined,
                                },
                            },
                        }));
                    }
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
                // console.log("a doll moved", _diffInfo);
                // forEach(diffInfo.itemsChanged.dolls)
                const defaultInRange = getDefaultInRangeFunction(dollNames);
                const newQuickDistancesMap = {};
                // {  rabbit : { cricket: 50, rabbit: 1000 }
                //    cricket : { cricket: 1000, rabbit: 50 }}
                let somethingChanged = false;
                const newDollsState = {};
                const tempNewDollsState = {};
                // forEach(diffInfo.itemsChanged.dolls as DollName[], (dollName) => {
                //   if (!diffInfo.propsChangedBool.dolls[dollName].position) return;
                forEach(dollNames, (dollName) => {
                    // if (!diffInfo.propsChangedBool.dolls[dollName].position) return;
                    // if position changed
                    const dollState = getState().dolls[dollName];
                    if (!dollState.isVisible)
                        return; // stop checking more if isVisible is false
                    newQuickDistancesMap[dollName] = {}; //
                    // newDollsState[dollName] = { inRange: defaultInRange() };
                    tempNewDollsState[dollName] = { inRange: defaultInRange() };
                    // get quick distances to each other doll
                    forEach(dollNames, (otherDollName) => {
                        var _a;
                        const otherDollState = getState().dolls[otherDollName];
                        if (!otherDollState.isVisible)
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
                        newQuickDistancesMap[dollName][otherDollName] = quickDistance;
                        tempNewDollsState[dollName].inRange[otherDollName].touch = quickDistance < rangeOptionsQuick.touch;
                        tempNewDollsState[dollName].inRange[otherDollName].talk = quickDistance < rangeOptionsQuick.talk;
                        tempNewDollsState[dollName].inRange[otherDollName].see = quickDistance < rangeOptionsQuick.see;
                    });
                    const currentDollState = getState().dolls[dollName];
                    const tempNewDollState = tempNewDollsState[dollName];
                    if (tempNewDollState === null || tempNewDollState === void 0 ? void 0 : tempNewDollState.inRange) {
                        if (!inRangesAreTheSame(tempNewDollState.inRange, currentDollState.inRange // FIXME DeepReadonlyObjects
                        )) {
                            newDollsState[dollName] = tempNewDollState;
                            somethingChanged = true;
                        }
                    }
                });
                if (somethingChanged) {
                    setState({ dolls: newDollsState });
                }
            },
            check: { type: "dolls", prop: ["position", "isVisible"] },
            atStepEnd: true,
            step: "checkCollisions",
        }),
        whenHidingUpdateInRange: itemEffect({
            run({ newValue: newIsVisible, itemName: dollName }) {
                // return early if it didn't just hide
                if (newIsVisible)
                    return;
                const defaultInRange = getDefaultInRangeFunction(dollNames);
                const tempNewAllDollsState = {};
                const newAllDollsState = {};
                // set all inRange to false for the doll that went invisible
                tempNewAllDollsState[dollName] = { inRange: defaultInRange() };
                forEach(dollNames, (otherDollName) => {
                    if (otherDollName === dollName)
                        return;
                    const otherDollState = getState().dolls[otherDollName];
                    tempNewAllDollsState[otherDollName] = { inRange: cloneObjectWithJson(otherDollState.inRange) };
                    // set the doll that became invisible to not in range for each other doll
                    tempNewAllDollsState[otherDollName].inRange[dollName].touch = false;
                    tempNewAllDollsState[otherDollName].inRange[dollName].talk = false;
                    tempNewAllDollsState[otherDollName].inRange[dollName].see = false;
                    const tempNewDollState = tempNewAllDollsState[otherDollName];
                    if (tempNewDollState === null || tempNewDollState === void 0 ? void 0 : tempNewDollState.inRange) {
                        if (!inRangesAreTheSame(tempNewDollState.inRange, otherDollState.inRange // FIXME DeepReadonlyObjects
                        )) {
                            newAllDollsState[otherDollName] = tempNewDollState;
                        }
                    }
                });
                // do it on next ticket , because the step that reacts to inRange changing is already done
                onNextTick(() => {
                    setState({ dolls: newAllDollsState });
                });
            },
            check: { type: "dolls", prop: "isVisible" },
            // atStepEnd: true,
            // step: "positionReaction",
        }),
        // when doll isVisibleChanges, check in range
        // should be a  dynamic rule ?
        updateDollScreenPositionWhenSlateMoves: effect({
            run() {
                const { playerCharacter } = getState().global.main;
                const { dollName } = getState().characters[playerCharacter];
                if (!dollName)
                    return;
                // NOTE TODO ideally add for each character automatically as a dynamic rule?
                forEach(dollNames, (dollName) => updateDollScreenPosition({ dollName: dollName, instant: false }));
            },
            // this happens before rendering because its in "derive" instead of "subscribe"
            check: { type: "global", prop: ["slatePos", "slateZoom"] },
            step: "slatePosition",
            atStepEnd: true,
        }),
        whenToggledMeshesChanges: itemEffect({
            run({ newValue: toggledMeshes, itemName: dollName, itemRefs }) {
                const { otherMeshes } = itemRefs;
                if (!otherMeshes)
                    return;
                const modelName = getModelNameFromDoll(dollName);
                const modelInfo = modelInfoByName[modelName];
                const typedMeshNames = modelInfo.meshNames;
                forEach(typedMeshNames, (meshName) => {
                    const newToggle = toggledMeshes[meshName];
                    const theMesh = otherMeshes[meshName];
                    if (theMesh && newToggle !== undefined)
                        theMesh.setEnabled(newToggle);
                });
            },
            check: { type: "dolls", prop: "toggledMeshes" },
            step: "default",
            atStepEnd: true,
        }),
        whenIsVisibleChanges: itemEffect({
            run({ newValue: isVisible, itemName: dollName, itemRefs: dollRefs }) {
                const modelName = getModelNameFromDoll(dollName);
                const modelInfo = modelInfoByName[modelName];
                if (!dollRefs.meshRef)
                    return console.warn("isVisible change: no mesh ref for", dollName);
                if (dollName === "shoes") {
                    console.log("shoes isVisible change", isVisible);
                }
                if (isVisible) {
                    dollRefs.meshRef.setEnabled(true);
                    // dollRefs.canCollide = true;
                }
                else {
                    dollRefs.meshRef.setEnabled(false); // setEnabled also toggles mesh collisions
                    // dollRefs.canCollide = false;
                }
            },
            check: { type: "dolls", prop: "isVisible" },
            step: "default",
            atStepEnd: true,
        }),
    }));
}
