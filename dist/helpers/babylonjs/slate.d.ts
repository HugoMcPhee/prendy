import { AbstractMesh, Camera, Matrix, Vector3 } from "@babylonjs/core";
import { Point2D } from "chootils/dist/points2d";
import { MyTypes } from "../../declarations";
export declare function getScreenSize(): {
    x: number;
    y: number;
};
export declare const slateSize: {
    x: number;
    y: number;
};
type ModelName = MyTypes["Types"]["ModelName"];
export declare function getProjectionMatrixCustomSize(theCamera: Camera, theSize: {
    width: number;
    height: number;
}): Matrix;
export declare function getPositionOnSlate(theMesh: AbstractMesh, modelName: ModelName): Vector3;
export declare function getSlatePositionNotOverEdges(slatePos: Point2D, useGoal?: boolean): Point2D;
export declare function focusSlateOnFocusedDoll(instant?: "instant"): void;
export declare function getViewSize(): import("chootils/dist/sizes").Size;
export declare function checkPointIsInsideSlate(pointOnSlate: Point2D): boolean;
export declare function convertPointOnSlateToPointOnScreen({ pointOnSlate, // point on slate goes from 0 - 1920, 0 - 1080, when the point is from the top left to bottom right
slatePos, // slate position is 0 when centered, then its the amount of offset (in percentage?)
slateZoom, }: {
    pointOnSlate: Point2D;
    slatePos: Point2D;
    slateZoom: number;
}): Point2D;
export declare function getShaderTransformStuff(): {
    editedSlateSceneZoom: number;
    editedHardwareScaling: number;
};
export {};
