import { Vector3 } from "@babylonjs/core";
import { MyTypes } from "../../declarations";
type AnimationNameByModel = MyTypes["Types"]["AnimationNameByModel"];
type BoneNameByModel = MyTypes["Types"]["BoneNameByModel"];
type DollName = MyTypes["Types"]["DollName"];
type DollOptions = MyTypes["Types"]["DollOptions"];
type MeshNameByModel = MyTypes["Types"]["MeshNameByModel"];
type ModelName = MyTypes["Types"]["ModelName"];
type PlaceName = MyTypes["Types"]["PlaceName"];
type SpotNameByPlace = MyTypes["Types"]["SpotNameByPlace"];
type ModelNameFromDoll<T_DollName extends DollName> = DollOptions[T_DollName]["model"];
type MeshNamesFromDoll<T_DollName extends DollName> = MeshNameByModel[ModelNameFromDoll<T_DollName>];
export declare function setDollPosition(dollName: DollName, newPositon: Vector3): void;
export declare function setDollRotation(dollName: DollName, newRotation: Vector3): void;
export declare function lookAtOtherDoll(dollA: DollName, dollB: DollName): void;
export declare function dollLooksAtSpot<T_PlaceName extends PlaceName>({ place, spot, doll, }: {
    place: T_PlaceName;
    spot: SpotNameByPlace[T_PlaceName];
    doll: DollName;
}): void;
export declare function setDollRotationY(dollName: DollName, newRotationY: number): void;
export declare function springDollRotationY(dollName: DollName, newRotation: number): void;
export declare function springAddToDollRotationY(dollName: DollName, addedRotation: number, useShortestAngle?: boolean): void;
export declare function setDollAnimation<T_Doll extends DollName>(doll: T_Doll, animation: AnimationNameByModel[ModelNameFromDoll<T_Doll>]): void;
export declare function focusOnDoll<T_Doll extends DollName>(dollName: T_Doll, zoom?: number): void;
export declare function setDollToSpot<T_PlaceName extends PlaceName>({ place, spot, doll: dollName, dontSetRotationState, }: {
    place: T_PlaceName;
    spot: SpotNameByPlace[T_PlaceName];
    doll: DollName;
    dontSetRotationState?: boolean;
}): void;
export declare function springDollToSpot<T_PlaceName extends PlaceName>({ place, spot, doll: dollName, }: {
    place: T_PlaceName;
    spot: SpotNameByPlace[T_PlaceName];
    doll: DollName;
}): void;
export declare function moveDollAt2DAngle(dollName: DollName, angle: number, speed?: number): void;
export declare function pushDollRotationY(dollName: DollName, direction: "right" | "left", speed?: number): void;
export declare function hideDoll(dollName: DollName, shouldHide?: boolean): void;
export declare function toggleDollMeshes<T_DollName extends DollName>(dollName: T_DollName, toggledMeshes: Partial<Record<MeshNamesFromDoll<T_DollName>, boolean>>): void;
export declare function getDollBonePosition<T_ModelName extends ModelName>({ doll, model, bone, }: {
    doll: DollName;
    model: T_ModelName;
    bone: BoneNameByModel[T_ModelName];
}): any;
export {};
