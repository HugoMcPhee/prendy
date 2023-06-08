import { Vector3 } from "@babylonjs/core";
import { AnimationNameByModel, BoneNameByModel, DollName, ModelInfoByName, PrendyOptions, PrendyStoreHelpers, SpotNameByPlace } from "../../declarations";
export declare function get_dollStoryHelpers(storeHelpers: PrendyStoreHelpers, prendyStartOptions: PrendyOptions, modelInfoByName: ModelInfoByName): {
    setDollPosition: (dollName: DollName, newPositon: Vector3) => void;
    setDollRotation: (dollName: DollName, newRotation: Vector3) => void;
    setDollRotationY: (dollName: DollName, newRotationY: number) => void;
    springDollRotationY: (dollName: DollName, newRotation: number) => void;
    springAddToDollRotationY: (dollName: DollName, addedRotation: number, useShortestAngle?: boolean) => void;
    pushDollRotationY: (dollName: DollName, direction: "right" | "left", speed?: number) => void;
    lookAtOtherDoll: (dollA: DollName, dollB: DollName) => void;
    setDollAnimation: <T_Doll extends string>(doll: T_Doll, animation: string) => void;
    focusOnDoll: <T_Doll_1 extends string>(dollName: T_Doll_1, zoom?: number) => void;
    setDollToSpot: <T_PlaceName extends string>({ place, spot, doll, dontSetRotationState, }: {
        place: T_PlaceName;
        spot: string;
        doll: DollName;
        dontSetRotationState?: boolean | undefined;
    }) => void;
    springDollToSpot: <T_PlaceName_1 extends string>({ place, spot, doll, }: {
        place: T_PlaceName_1;
        spot: string;
        doll: DollName;
    }) => void;
    dollLooksAtSpot: <T_PlaceName_2 extends string>({ place, spot, doll, }: {
        place: T_PlaceName_2;
        spot: string;
        doll: DollName;
    }) => void;
    moveDollAt2DAngle: (dollName: DollName, angle: number, speed?: number) => void;
    hideDoll: (dollName: DollName, shouldHide?: boolean) => void;
    toggleDollMeshes: <T_DollName extends string>(dollName: T_DollName, toggledMeshes: Partial<Record<string, boolean>>) => void;
    getDollBonePosition: <T_ModelName extends string>({ doll, model, bone, }: {
        doll: DollName;
        model: T_ModelName;
        bone: string;
    }) => any;
};
