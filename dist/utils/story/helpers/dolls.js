import { forEach } from "shutils/dist/loops";
import { getVectorFromSpeedAndAngle } from "shutils/dist/speedAngleDistance2d";
import { makeGlobalStoreUtils } from "../../../concepts/global/utils";
import { vector3ToPoint3d } from "../../babylonjs";
import { makeDollStoryUtils } from "../utils/dolls";
import { makeSpotStoryUtils } from "../utils/spots";
export function makeDollStoryHelpers(concepFuncs, backdopConcepts, backdopStartOptions, modelInfoByName) {
    const { getRefs, getState, setState } = concepFuncs;
    const { setGlobalState } = makeGlobalStoreUtils(concepFuncs);
    const { getModelNameFromDoll } = makeDollStoryUtils(concepFuncs, backdopConcepts);
    const { getSpotPosition, getSpotRotation } = makeSpotStoryUtils(concepFuncs);
    // --------------------------------------------------------------
    function setDollPosition(dollName, newPositon) {
        const dollRefs = getRefs().dolls[dollName];
        if (!dollRefs.meshRef)
            return console.warn("NO MESH REF", dollName);
        const prevCollisionsEnabled = dollRefs.checkCollisions;
        dollRefs.checkCollisions = false;
        setState({ dolls: { [dollName]: { position: vector3ToPoint3d(newPositon) } } }, () => {
            // dollRefs.checkCollisions = prevCollisionsEnabled;
            dollRefs.checkCollisions = true;
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
    function setDollRotationY(dollName, newRotationY) {
        setState({
            dolls: {
                [dollName]: {
                    rotationY: newRotationY,
                    // rotationYGoal: newRotationY,
                },
            },
        });
    }
    function springDollRotationY(dollName, newRotation) {
        setState({ dolls: { [dollName]: { rotationYGoal: newRotation } } });
    }
    function springAddToDollRotationY(dollName, addedRotation) {
        setState((state) => ({
            dolls: {
                [dollName]: {
                    rotationYGoal: state.dolls[dollName].rotationYGoal + addedRotation,
                },
            },
        }));
    }
    function setDollAnimation(doll, animation) {
        setState({ dolls: { [doll]: { nowAnimation: animation } } });
    }
    function focusOnDoll(dollName, zoom) {
        setGlobalState({
            focusedDoll: dollName,
            planeZoomGoal: zoom !== undefined
                ? Math.min(zoom, backdopStartOptions.zoomLevels.max)
                : backdopStartOptions.zoomLevels.default,
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
        newPositionPoint.y += Math.random() * 0.001;
        setState({
            dolls: {
                [dollName]: {
                    // monkey: {
                    positionGoal: newPositionPoint,
                    positionMoveMode: "spring",
                    // rotationYGoal: useRotation ? newRotation.y : undefined,
                },
            },
        });
    }
    function moveDollAt2DAngle(dollName, angle) {
        const dollState = getState().dolls[dollName];
        const dollRefs = getRefs().dolls[dollName];
        const { positionIsMoving, positionMoveMode } = dollState;
        if (!positionIsMoving || positionMoveMode !== "push") {
            setState({
                dolls: {
                    [dollName]: { positionIsMoving: true, positionMoveMode: "push" },
                },
            });
        }
        let newVelocity = getVectorFromSpeedAndAngle(3, angle);
        setState({ dolls: { [dollName]: { rotationYGoal: angle + 180 } } });
        dollRefs.positionMoverRefs.velocity.z = newVelocity.x;
        dollRefs.positionMoverRefs.velocity.x = newVelocity.y;
        dollRefs.positionMoverRefs.velocity.y = -1.5;
    }
    function hideDoll(dollName, shouldHide = true) {
        // IDEA add doll state isHidden, and auto set isVisible/isEnabled with a doll rule
        const dollRefs = getRefs().dolls[dollName];
        if (!dollRefs.meshRef)
            return console.warn("no mesh ref for", dollName);
        if (shouldHide) {
            dollRefs.meshRef.setEnabled(false); // setEnabled also toggles mesh collisions
            dollRefs.checkCollisions = false;
        }
        else {
            dollRefs.meshRef.setEnabled(true);
            dollRefs.checkCollisions = true;
        }
    }
    function toggleDollMeshes(dollName, toggledMeshes) {
        // IDEA have dollState toggledMeshes and rules to auto enable the meshes
        // const { left_shoe, right_shoe, long_teeth } = otherMeshes;
        const otherMeshes = getRefs().dolls[dollName].otherMeshes;
        const modelName = getModelNameFromDoll(dollName);
        const modelInfo = modelInfoByName[modelName];
        const typedMeshNames = modelInfo.meshNames;
        forEach(typedMeshNames, (meshName) => {
            const newToggle = toggledMeshes[meshName];
            const theMesh = otherMeshes[meshName];
            if (theMesh && newToggle !== undefined)
                theMesh.setEnabled(newToggle);
        });
    }
    return {
        setDollPosition,
        // springDollPosition,
        // slideDollPosition,
        setDollRotation,
        setDollRotationY,
        springDollRotationY,
        springAddToDollRotationY,
        setDollAnimation,
        focusOnDoll,
        setDollToSpot,
        springDollToSpot,
        moveDollAt2DAngle,
        hideDoll,
        toggleDollMeshes,
    };
}
