import { Vector3 } from "@babylonjs/core";
// import { useSpring } from "@react-spring/core";
import { pointIsZero, subtractPointsSafer } from "shutils/dist/points3d";
export function setGlobalPositionWithCollisions(theMesh, newMeshPos) {
    const currentMeshPosition = theMesh.absolutePosition.clone();
    let collidedMeshPos = currentMeshPosition;
    let positionWasEdited = false;
    const movementAmount = newMeshPos.subtract(currentMeshPosition);
    const positionDidChange = !movementAmount.equals(Vector3.Zero());
    if (positionDidChange) {
        theMesh.moveWithCollisions(movementAmount);
        // theMesh.computeWorldMatrix(true);
        collidedMeshPos = theMesh.getAbsolutePosition().clone();
        const collidedPosOffset = subtractPointsSafer(newMeshPos, collidedMeshPos);
        positionWasEdited = !pointIsZero(collidedPosOffset);
    }
    return {
        editedPosition: collidedMeshPos,
        positionWasEdited,
        positionDidChange,
    };
}
