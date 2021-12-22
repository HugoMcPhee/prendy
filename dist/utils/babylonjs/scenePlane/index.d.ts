import { AbstractMesh, Mesh, Vector3 } from "@babylonjs/core";
import { PrendyStoreHelpers, PrendyOptionsUntyped } from "../../../concepts/typedStoreHelpers";
import { Point2D } from "chootils/dist/points2d";
export declare function makeScenePlaneUtils<StoreHelpers extends PrendyStoreHelpers, PrendyOptions extends PrendyOptionsUntyped>(storeHelpers: StoreHelpers, prendyStartOptions: PrendyOptions): {
    getPositionOnPlane: (theMesh: AbstractMesh) => Vector3;
    updatePlanePositionToFocusOnMesh: ({ meshRef, instant, }: {
        meshRef: AbstractMesh;
        instant?: boolean | undefined;
    }) => void;
    focusScenePlaneOnFocusedDoll: (instant?: "instant" | undefined) => void;
    getViewSize: () => {
        width: any;
        height: any;
    };
    getPlaneSize: (useGoalZoom?: boolean) => {
        width: number;
        height: number;
    };
    planeCenterPoint: () => {
        x: number;
        y: number;
    };
    viewCenterPoint: () => {
        x: number;
        y: number;
    };
    fitScenePlaneToScreen: (thePlane: Mesh) => void;
    convertPointOnPlaneToUnmovedPointOnScreen: (thePoint: {
        x: number;
        y: number;
    }) => {
        x: number;
        y: number;
    };
    convertToSafePointOnPlane: (pointOnPlane: Point2D) => Point2D;
    convertPointOnPlaneToPointOnScreen: ({ pointOnPlane, planePosition, }: {
        pointOnPlane: Point2D;
        planePosition: Point2D;
    }) => Point2D;
    getScenePlaneOverScreenEdgesAmount: (newPosition: {
        x: number;
        y: number;
    }) => {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };
    getSafePlanePositionFocusedOnPointOnPlain: (pointOnPlane: Point2D) => {
        x: number;
        y: number;
    };
    applyPlanePosition: (planePosition: {
        x: number;
        y: number;
    }) => void;
    convertScreenPointToPlaneScenePoint: (theScreenPoint: {
        x: number;
        y: number;
    }) => {
        x: number;
        y: number;
    };
    convertPlaneScenePointToScreenPoint: (thePlaneScenePoint: {
        x: number;
        y: number;
    }) => {
        x: number;
        y: number;
    };
    checkPointIsInsidePlane: (pointOnPlane: Point2D) => boolean;
};
