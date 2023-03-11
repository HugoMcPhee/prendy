import { AbstractMesh } from "@babylonjs/core";
import { Point3D } from "chootils/dist/points3d";
export declare function setGlobalPositionWithCollisions(theMesh: AbstractMesh, newMeshPos: Point3D): {
    editedPosition: Point3D;
    positionWasEdited: boolean;
    positionDidChange: boolean;
    collidedPosOffset: Point3D;
};
