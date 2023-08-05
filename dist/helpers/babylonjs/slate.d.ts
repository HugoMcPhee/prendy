import { AbstractMesh, Vector3 } from "@babylonjs/core";
import { Point2D } from "chootils/dist/points2d";
import { ModelName, PrendyOptions, PrendyStoreHelpers } from "../../declarations";
export declare function getScreenSize(): {
    x: number;
    y: number;
};
export declare const slateSize: {
    x: number;
    y: number;
};
export declare function get_slateUtils(storeHelpers: PrendyStoreHelpers, prendyStartOptions: PrendyOptions): {
    getPositionOnSlate: (theMesh: AbstractMesh, modelName: ModelName) => Vector3;
    focusSlateOnFocusedDoll: (instant?: "instant") => void;
    getSlatePositionNotOverEdges: (slatePos: Point2D, useGoal?: boolean) => Point2D;
    getViewSize: () => import("chootils/dist/sizes").Size;
    convertPointOnSlateToPointOnScreen: ({ pointOnSlate, slatePos, slateZoom, }: {
        pointOnSlate: Point2D;
        slatePos: Point2D;
        slateZoom: number;
    }) => Point2D;
    checkPointIsInsideSlate: (pointOnSlate: Point2D) => boolean;
    getShaderTransformStuff: () => {
        editedSlateSceneZoom: any;
        editedHardwareScaling: number;
    };
};
