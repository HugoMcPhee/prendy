import { AbstractMesh, Vector3 } from "@babylonjs/core";
export declare function setGlobalPositionWithCollisions(theMesh: AbstractMesh, newMeshPos: Vector3): {
    editedPosition: Vector3;
    positionWasEdited: boolean;
    positionDidChange: boolean;
};
