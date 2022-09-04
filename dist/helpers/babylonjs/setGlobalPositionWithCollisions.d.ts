import { AbstractMesh, Vector3 } from "@babylonjs/core";
import { Point3D } from "chootils/dist/points3d";
export declare function setGlobalPositionWithCollisions(theMesh: AbstractMesh, newMeshPos: Vector3): {
    editedPosition: Vector3;
    positionWasEdited: boolean;
    positionDidChange: boolean;
    collidedPosOffset: Point3D;
};
