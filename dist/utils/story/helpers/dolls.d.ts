import { Vector3 } from "@babylonjs/core";
import { PrendyStoreHelpers, PlaceholderPrendyConcepts } from "../../../stores/typedStoreHelpers";
import { AnimationNameByModel, PrendyOptions, CharacterName, CharacterOptions, DollName, DollOptions, MeshNameByModel, ModelInfoByName, ModelName, PlaceName, SpotNameByPlace, BoneNameByModel } from "../../../declarations";
export declare function makeDollStoryHelpers<StoreHelpers extends PrendyStoreHelpers, PrendyConcepts extends PlaceholderPrendyConcepts, A_AnimationNameByModel extends AnimationNameByModel = AnimationNameByModel, A_PrendyOptions extends PrendyOptions = PrendyOptions, A_CharacterName extends CharacterName = CharacterName, A_CharacterOptions extends CharacterOptions = CharacterOptions, A_DollName extends DollName = DollName, A_DollOptions extends DollOptions = DollOptions, A_MeshNameByModel extends MeshNameByModel = MeshNameByModel, A_ModelInfoByName extends ModelInfoByName = ModelInfoByName, A_ModelName extends ModelName = ModelName, A_PlaceName extends PlaceName = PlaceName, A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace, A_BoneNameByModel extends BoneNameByModel = BoneNameByModel>(storeHelpers: StoreHelpers, prendyStartOptions: A_PrendyOptions, modelInfoByName: A_ModelInfoByName): {
    setDollPosition: (dollName: A_DollName, newPositon: Vector3) => void;
    setDollRotation: (dollName: A_DollName, newRotation: Vector3) => void;
    setDollRotationY: (dollName: A_DollName, newRotationY: number) => void;
    springDollRotationY: (dollName: A_DollName, newRotation: number) => void;
    springAddToDollRotationY: (dollName: A_DollName, addedRotation: number, useShortestAngle?: boolean) => void;
    pushDollRotationY: (dollName: A_DollName, direction: "right" | "left", speed?: number) => void;
    lookAtOtherDoll: (dollA: A_DollName, dollB: A_DollName) => void;
    setDollAnimation: <T_Doll extends A_DollName>(doll: T_Doll, animation: A_AnimationNameByModel[A_DollOptions[T_Doll]["model"]]) => void;
    focusOnDoll: <T_Doll_1 extends A_DollName>(dollName: T_Doll_1, zoom?: number | undefined) => void;
    setDollToSpot: <T_PlaceName extends A_PlaceName>({ place, spot, doll: dollName, dontSetRotationState, }: {
        place: T_PlaceName;
        spot: A_SpotNameByPlace[T_PlaceName];
        doll: A_DollName;
        dontSetRotationState?: boolean | undefined;
    }) => void;
    springDollToSpot: <T_PlaceName_1 extends A_PlaceName>({ place, spot, doll: dollName, }: {
        place: T_PlaceName_1;
        spot: A_SpotNameByPlace[T_PlaceName_1];
        doll: A_DollName;
    }) => void;
    dollLooksAtSpot: <T_PlaceName_2 extends A_PlaceName>({ place, spot, doll, }: {
        place: T_PlaceName_2;
        spot: A_SpotNameByPlace[T_PlaceName_2];
        doll: A_DollName;
    }) => void;
    moveDollAt2DAngle: (dollName: A_DollName, angle: number, speed?: number) => void;
    hideDoll: (dollName: A_DollName, shouldHide?: boolean) => void;
    toggleDollMeshes: <T_DollName extends A_DollName>(dollName: T_DollName, toggledMeshes: Partial<Record<A_MeshNameByModel[A_DollOptions[T_DollName]["model"]], boolean>>) => void;
    getDollBonePosition: <T_ModelName extends string>({ doll, model, bone, }: {
        doll: DollName;
        model: T_ModelName;
        bone: string;
    }) => any;
};
