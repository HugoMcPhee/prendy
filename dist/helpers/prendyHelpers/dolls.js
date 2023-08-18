import { Space, Vector3 } from "@babylonjs/core";
import { getShortestAngle, getVectorFromSpeedAndAngle } from "chootils/dist/speedAngleDistance2d";
import { get_dollStoryUtils } from "../../helpers/prendyUtils/dolls";
import { get_globalUtils } from "../../helpers/prendyUtils/global";
import { get_spotStoryUtils } from "../../helpers/prendyUtils/spots";
import { vector3ToPoint3d } from "../babylonjs/vectors";
export function get_dollStoryHelpers(storeHelpers, prendyOptions, modelInfoByName) {
    const { getRefs, getState, setState } = storeHelpers;
    const { setGlobalState } = get_globalUtils(storeHelpers);
    const { getModelNameFromDoll, get2DAngleBetweenDolls, get2DAngleFromDollToSpot } = get_dollStoryUtils(storeHelpers);
    const { getSpotPosition, getSpotRotation } = get_spotStoryUtils(storeHelpers);
    // --------------------------------------------------------------
    function setDollPosition(dollName, newPositon) {
        const dollRefs = getRefs().dolls[dollName];
        if (!dollRefs.meshRef)
            return console.warn("NO MESH REF", dollName);
        // const prevCollisionsEnabled = dollRefs.canCollide;
        dollRefs.canGoThroughWalls = true;
        setState({ dolls: { [dollName]: { position: vector3ToPoint3d(newPositon) } } }, () => {
            dollRefs.canGoThroughWalls = false;
            setState({ dolls: { [dollName]: { position: vector3ToPoint3d(newPositon) } } });
        });
    }
    function springDollPosition(dollName, newPositon) { }
    function slideDollPosition(dollName, newPositon) { }
    function setDollRotation(dollName, newRotation) {
        const dollRefs = getRefs().dolls[dollName];
        if (!dollRefs.meshRef)
            return console.warn("no mesh ref", dollName);
        dollRefs.meshRef.rotationQuaternion = null;
        dollRefs.meshRef.rotation = newRotation; // the spot rotation can be on all x,y and z
        // setDollRotationY(dollName, newRotation.y); // currently this will replace the meshes  xz rotations TODO have doll 3d rotation state
    }
    function lookAtOtherDoll(dollA, dollB // defaults to playerChaarcter
    ) {
        // NOTE could be async
        const angle = get2DAngleBetweenDolls(dollB, dollA);
        springDollRotationY(dollB, angle);
    }
    function dollLooksAtSpot({ place, spot, doll, }) {
        const angle = get2DAngleFromDollToSpot(doll, place, spot);
        springDollRotationY(doll, angle);
    }
    function setDollRotationY(dollName, newRotationY) {
        setState({
            dolls: {
                [dollName]: {
                    rotationY: newRotationY,
                    // rotationYGoal: newRotationY, // NOTE setting both can make the goal rotate multiple times, it might not be finding the shortest angle
                },
            },
        });
    }
    function springDollRotationY(dollName, newRotation) {
        setState({ dolls: { [dollName]: { rotationYGoal: newRotation } } });
    }
    function springAddToDollRotationY(dollName, addedRotation, useShortestAngle = false) {
        setState((state) => {
            const currentAngle = state.dolls[dollName].rotationYGoal;
            let newAngle = currentAngle + addedRotation;
            if (useShortestAngle) {
                newAngle = currentAngle + getShortestAngle(currentAngle, newAngle);
            }
            return {
                dolls: {
                    [dollName]: {
                        rotationYGoal: newAngle,
                        rotationYIsMoving: true,
                        rotationYMoveMode: "spring",
                    },
                },
            };
        });
    }
    function setDollAnimation(doll, animation) {
        setState({ dolls: { [doll]: { nowAnimation: animation } } });
    }
    function focusOnDoll(dollName, zoom) {
        setGlobalState({
            focusedDoll: dollName,
            slateZoomGoal: zoom !== undefined ? Math.min(zoom, prendyOptions.zoomLevels.max) : prendyOptions.zoomLevels.default,
        });
    }
    function setDollToSpot({ place, spot, doll: dollName, dontSetRotationState, }) {
        const newPositon = getSpotPosition(place, spot);
        const newRotation = getSpotRotation(place, spot);
        const dollRefs = getRefs().dolls[dollName];
        if (!dollRefs.meshRef)
            return console.warn("no mesh ref for", dollName);
        setDollPosition(dollName, newPositon);
        if (!dontSetRotationState)
            setDollRotation(dollName, newRotation);
    }
    // NOTE this isn't really working atm, maybe because falling sortof sets positionMoveMode to "push" ?
    // it was the movement speed being slow so stopping the mover from keeping going
    function springDollToSpot({ place, spot, doll: dollName, }) {
        const newPositon = getSpotPosition(place, spot);
        // const newRotation = getSpotRotation(place, spot);
        // FIXME , adding random so the same spot can be set as goal twice
        const newPositionPoint = vector3ToPoint3d(newPositon);
        newPositionPoint.y += Math.random() * 0.0001;
        setState({
            dolls: {
                [dollName]: {
                    positionGoal: newPositionPoint,
                    positionMoveMode: "spring",
                    // rotationYGoal: useRotation ? newRotation.y : undefined,
                },
            },
        });
    }
    function moveDollAt2DAngle(dollName, angle, speed = 3) {
        const dollState = getState().dolls[dollName];
        const dollRefs = getRefs().dolls[dollName];
        const { positionIsMoving, positionMoveMode } = dollState;
        if (!positionIsMoving || positionMoveMode !== "push") {
            setState({
                dolls: { [dollName]: { positionIsMoving: true, positionMoveMode: "push" } },
            });
        }
        let newVelocity = getVectorFromSpeedAndAngle(speed, angle);
        setState({ dolls: { [dollName]: { rotationYGoal: angle + 180 } } });
        dollRefs.positionMoverRefs.velocity.z = newVelocity.x;
        dollRefs.positionMoverRefs.velocity.x = newVelocity.y;
        dollRefs.positionMoverRefs.velocity.y = -1.5;
    }
    function pushDollRotationY(dollName, direction, speed = 3) {
        const dollState = getState().dolls[dollName];
        const dollRefs = getRefs().dolls[dollName];
        const { rotationYIsMoving, rotationYMoveMode } = dollState;
        if (speed === 0) {
            setState({ dolls: { [dollName]: { rotationYIsMoving: false } } });
            dollRefs.rotationYMoverRefs.velocity = 0;
        }
        if (!rotationYIsMoving || rotationYMoveMode !== "push") {
            setState({
                dolls: {
                    [dollName]: { rotationYIsMoving: true, rotationYMoveMode: "push" },
                },
            });
        }
        let newVelocity = direction === "right" ? speed : -speed;
        // setState({ dolls: { [dollName]: { rotationYGoal: angle + 180 } } });
        dollRefs.rotationYMoverRefs.velocity = newVelocity;
        // dollRefs.rotationYMoverRefs.velocity.z = newVelocity.x;
        // dollRefs.rotationYMoverRefs.velocity.x = newVelocity.y;
        // dollRefs.rotationYMoverRefs.velocity.y = -1.5;
    }
    function hideDoll(dollName, shouldHide = true) {
        setState({ dolls: { [dollName]: { isVisible: !shouldHide } } }, () => { });
    }
    function toggleDollMeshes(dollName, toggledMeshes) {
        // IDEA have dollState toggledMeshes and rules to auto enable the meshes
        // const { left_shoe, right_shoe, long_teeth } = otherMeshes;
        // const otherMeshes = getRefs().dolls[dollName].otherMeshes;
        // const modelName = getModelNameFromDoll(dollName);
        // const modelInfo = modelInfoByName[modelName as unknown as ModelName];
        // const typedMeshNames = modelInfo.meshNames as unknown as MeshNamesFromDoll<T_DollName>[];
        // TODO move this into a rule listening to toggledMeshes state
        // forEach(typedMeshNames, (meshName) => {
        //   const newToggle = toggledMeshes[meshName];
        //   const theMesh = otherMeshes[meshName];
        //   if (theMesh && newToggle !== undefined) theMesh.setEnabled(newToggle!);
        // });
        // NOTE could update to set properties in a loop to avoid spreading
        setState((state) => ({
            dolls: { [dollName]: { toggledMeshes: { ...state.dolls[dollName].toggledMeshes, ...toggledMeshes } } },
        }));
    }
    function getDollBonePosition({ doll, model, bone, }) {
        var _a, _b;
        // ModelNameFromDoll
        const dollRefs = getRefs().dolls.dino;
        const dollBone = (_b = (_a = dollRefs.assetRefs) === null || _a === void 0 ? void 0 : _a.bones) === null || _b === void 0 ? void 0 : _b[bone];
        if (dollRefs.meshRef) {
            dollRefs.meshRef.scaling = new Vector3(1.95, 1.95, -1.95);
            // dollRefs.canCollide = true;
        }
        if (dollBone && dollRefs.meshRef) {
            let position = dollBone.getPosition(Space.WORLD, dollRefs.meshRef);
            return position || Vector3.Zero();
        }
        return Vector3.Zero();
    }
    return {
        setDollPosition,
        setDollRotation,
        setDollRotationY,
        springDollRotationY,
        springAddToDollRotationY,
        pushDollRotationY,
        lookAtOtherDoll,
        setDollAnimation,
        focusOnDoll,
        setDollToSpot,
        springDollToSpot,
        dollLooksAtSpot,
        moveDollAt2DAngle,
        hideDoll,
        toggleDollMeshes,
        getDollBonePosition,
        // springDollPosition,
        // slideDollPosition,
    };
}
