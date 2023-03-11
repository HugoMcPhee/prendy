import { AbstractMesh, Vector3 } from "@babylonjs/core";
import { Point2D } from "chootils/dist/points2d";
import { PrendyOptionsUntyped, PrendyStoreHelpers } from "../../stores/typedStoreHelpers";
export declare function getScreenSize(): {
    x: number;
    y: number;
};
export declare const planeSize: {
    x: number;
    y: number;
};
export declare function get_scenePlaneUtils<StoreHelpers extends PrendyStoreHelpers, PrendyOptions extends PrendyOptionsUntyped>(storeHelpers: StoreHelpers, prendyStartOptions: PrendyOptions): {
    getPositionOnPlane: (theMesh: AbstractMesh) => Vector3;
    focusScenePlaneOnFocusedDoll: (instant?: "instant") => void;
    getPlanePositionNotOverEdges: (planePos: Point2D, useGoal?: boolean) => Point2D;
    getViewSize: () => import("chootils/dist/sizes").Size;
    convertPointOnPlaneToPointOnScreen: ({ pointOnPlane, planePos, planeZoom, }: {
        pointOnPlane: Point2D;
        planePos: Point2D;
        planeZoom: number;
    }) => Point2D;
    checkPointIsInsidePlane: (pointOnPlane: Point2D) => boolean;
    getShaderTransformStuff: () => {
        editedPlaneSceneZoom: any;
        editedHardwareScaling: number;
    };
};
