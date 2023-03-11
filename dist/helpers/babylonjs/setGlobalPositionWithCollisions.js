import { Vector3 } from "@babylonjs/core";
// import { useSpring } from "@react-spring/core";
import { pointIsZero, subtractPointsSafer, subtractPoints, pointBasicallyZero } from "chootils/dist/points3d";
import { vector3ToPoint3d } from "./vectors";
const reusablePosition = new Vector3(0, 0, 0);
export function setGlobalPositionWithCollisions(theMesh, newMeshPos) {
    // const currentMeshPosition = theMesh.absolutePosition.clone();
    const currentMeshPosition = vector3ToPoint3d(theMesh.absolutePosition);
    let collidedMeshPos = currentMeshPosition;
    let positionWasEdited = false;
    const movementAmount = subtractPoints(newMeshPos, currentMeshPosition);
    // const movementAmount = newMeshPos.subtract(currentMeshPosition);
    const positionDidChange = !pointIsZero(movementAmount);
    let collidedPosOffset = { x: 0, y: 0, z: 0 };
    if (positionDidChange) {
        reusablePosition.x = movementAmount.x;
        reusablePosition.y = movementAmount.y;
        reusablePosition.z = movementAmount.z;
        theMesh.moveWithCollisions(reusablePosition);
        theMesh.computeWorldMatrix(true);
        collidedMeshPos = vector3ToPoint3d(theMesh.absolutePosition);
        collidedPosOffset = subtractPointsSafer(newMeshPos, collidedMeshPos);
        // positionWasEdited = !pointIsZero(collidedPosOffset);
        positionWasEdited = !pointBasicallyZero(collidedPosOffset, 0.001);
        if (positionWasEdited) {
            // console.log("collidedPosOffset", collidedPosOffset);
            // console.log("positionWasEdited", positionWasEdited);
        }
    }
    return {
        editedPosition: collidedMeshPos,
        positionWasEdited,
        positionDidChange,
        collidedPosOffset,
    };
}
