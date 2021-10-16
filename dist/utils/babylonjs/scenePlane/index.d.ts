import { AbstractMesh, Mesh, Vector3 } from "@babylonjs/core";
import { GameyConceptoFuncs, GameyStartOptionsUntyped } from "../../../concepts/typedConceptoFuncs";
import { Point2D } from "shutils/dist/points2d";
export declare function makeScenePlaneUtils<ConceptoFuncs extends GameyConceptoFuncs, GameyStartOptions extends GameyStartOptionsUntyped>(conceptoFuncs: ConceptoFuncs, gameyStartOptions: GameyStartOptions): {
    getPositionOnPlane: (theMesh: AbstractMesh) => Vector3;
    updatePlanePositionToFocusOnMesh: ({ meshRef, instant, }: {
        meshRef: AbstractMesh;
        instant?: boolean;
    }) => void;
    focusScenePlaneOnFocusedDoll: (instant?: "instant") => void;
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
};
