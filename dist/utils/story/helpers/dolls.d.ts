import { Vector3 } from "@babylonjs/core";
import { BackdopConcepFuncs, PlaceholderBackdopConcepts } from "../../../concepts/typedConcepFuncs";
import { AnimationNameByModel, BackdopOptions, DollName, DollOptions, MeshNameByModel, ModelInfoByName, SpotNameByPlace } from "../../../declarations";
declare type ModelNameFromDoll<T_DollName extends DollName> = DollOptions[T_DollName]["model"];
declare type MeshNamesFromDoll<T_DollName extends DollName> = MeshNameByModel[ModelNameFromDoll<T_DollName>];
export declare function makeDollStoryHelpers<ConcepFuncs extends BackdopConcepFuncs, BackdopConcepts extends PlaceholderBackdopConcepts>(concepFuncs: ConcepFuncs, backdopConcepts: BackdopConcepts, backdopStartOptions: BackdopOptions, modelInfoByName: ModelInfoByName): {
    setDollPosition: (dollName: DollName, newPositon: Vector3) => void;
    setDollRotation: (dollName: DollName, newRotation: Vector3) => void;
    setDollRotationY: (dollName: DollName, newRotationY: number) => void;
    springDollRotationY: (dollName: DollName, newRotation: number) => void;
    springAddToDollRotationY: (dollName: DollName, addedRotation: number) => void;
    setDollAnimation: <T_Doll extends string>(doll: T_Doll, animation: string) => void;
    focusOnDoll: <T_Doll_1 extends string>(dollName: T_Doll_1, zoom?: number | undefined) => void;
    setDollToSpot: <T_PlaceName extends string>({ place, spot, doll: dollName, dontSetRotationState, }: {
        place: T_PlaceName;
        spot: string;
        doll: DollName;
        dontSetRotationState?: boolean | undefined;
    }) => void;
    springDollToSpot: <T_PlaceName_1 extends string>({ place, spot, doll: dollName, }: {
        place: T_PlaceName_1;
        spot: string;
        doll: DollName;
    }) => void;
    moveDollAt2DAngle: (dollName: DollName, angle: number) => void;
    hideDoll: (dollName: DollName, shouldHide?: boolean) => void;
    toggleDollMeshes: <T_DollName extends string>(dollName: T_DollName, toggledMeshes: Partial<Record<string, boolean>>) => void;
};
export {};
