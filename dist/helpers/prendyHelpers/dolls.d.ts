import { Vector3 } from "@babylonjs/core";
import { MyTypes } from "../../declarations";
export declare function get_dollStoryHelpers<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"], storeHelpers: T_MyTypes["StoreHelpers"]): {
    setDollPosition: (dollName: T_MyTypes["Main"]["DollName"], newPositon: Vector3) => void;
    setDollRotation: (dollName: T_MyTypes["Main"]["DollName"], newRotation: Vector3) => void;
    setDollRotationY: (dollName: T_MyTypes["Main"]["DollName"], newRotationY: number) => void;
    springDollRotationY: (dollName: T_MyTypes["Main"]["DollName"], newRotation: number) => void;
    springAddToDollRotationY: (dollName: T_MyTypes["Main"]["DollName"], addedRotation: number, useShortestAngle?: boolean) => void;
    pushDollRotationY: (dollName: T_MyTypes["Main"]["DollName"], direction: "right" | "left", speed?: number) => void;
    lookAtOtherDoll: (dollA: T_MyTypes["Main"]["DollName"], dollB: T_MyTypes["Main"]["DollName"]) => void;
    setDollAnimation: <T_Doll extends T_MyTypes["Main"]["DollName"]>(doll: T_Doll, animation: T_MyTypes["Main"]["AnimationNameByModel"][T_MyTypes["Main"]["DollOptions"][T_Doll]["model"]]) => void;
    focusOnDoll: <T_Doll_1 extends T_MyTypes["Main"]["DollName"]>(dollName: T_Doll_1, zoom?: number) => void;
    setDollToSpot: <T_PlaceName extends T_MyTypes["Main"]["PlaceName"]>({ place, spot, doll: dollName, dontSetRotationState, }: {
        place: T_PlaceName;
        spot: T_MyTypes["Main"]["SpotNameByPlace"][T_PlaceName];
        doll: T_MyTypes["Main"]["DollName"];
        dontSetRotationState?: boolean | undefined;
    }) => void;
    springDollToSpot: <T_PlaceName_1 extends T_MyTypes["Main"]["PlaceName"]>({ place, spot, doll: dollName, }: {
        place: T_PlaceName_1;
        spot: T_MyTypes["Main"]["SpotNameByPlace"][T_PlaceName_1];
        doll: T_MyTypes["Main"]["DollName"];
    }) => void;
    dollLooksAtSpot: <T_PlaceName_2 extends T_MyTypes["Main"]["PlaceName"]>({ place, spot, doll, }: {
        place: T_PlaceName_2;
        spot: T_MyTypes["Main"]["SpotNameByPlace"][T_PlaceName_2];
        doll: T_MyTypes["Main"]["DollName"];
    }) => void;
    moveDollAt2DAngle: (dollName: T_MyTypes["Main"]["DollName"], angle: number, speed?: number) => void;
    hideDoll: (dollName: T_MyTypes["Main"]["DollName"], shouldHide?: boolean) => void;
    toggleDollMeshes: <T_DollName extends T_MyTypes["Main"]["DollName"]>(dollName: T_DollName, toggledMeshes: Partial<Record<T_MyTypes["Main"]["MeshNameByModel"][T_MyTypes["Main"]["DollOptions"][T_DollName]["model"]], boolean>>) => void;
    getDollBonePosition: <T_ModelName extends T_MyTypes["Main"]["ModelName"]>({ doll, model, bone, }: {
        doll: T_MyTypes["Main"]["DollName"];
        model: T_ModelName;
        bone: T_MyTypes["Main"]["BoneNameByModel"][T_ModelName];
    }) => any;
};
