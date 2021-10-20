import { Vector3 } from "@babylonjs/core";
import { BackdopConcepFuncs, BackdopOptionsUntyped, CharacterOptionsPlaceholder, DollOptionsPlaceholder, ModelInfoByNamePlaceholder, PlaceholderBackdopConcepts } from "../../../concepts/typedConcepFuncs";
export declare function makeDollStoryHelpers<ConcepFuncs extends BackdopConcepFuncs, BackdopConcepts extends PlaceholderBackdopConcepts, BackdopOptions extends BackdopOptionsUntyped, ModelName extends string, PlaceName extends string, DollName extends string, CharacterName extends string, FontName extends string, AnimationNameByModel extends Record<any, string>, MeshNameByModel extends Record<ModelName, string>, SpotNameByPlace extends Record<PlaceName, string>, ModelInfoByName extends ModelInfoByNamePlaceholder<ModelName>, CharacterOptions extends CharacterOptionsPlaceholder<CharacterName, DollName, FontName>, DollOptions extends DollOptionsPlaceholder<DollName, ModelName>>(concepFuncs: ConcepFuncs, backdopConcepts: BackdopConcepts, backdopStartOptions: BackdopOptions, modelInfoByName: ModelInfoByName): {
    setDollPosition: (dollName: DollName, newPositon: Vector3) => void;
    setDollRotation: (dollName: DollName, newRotation: Vector3) => void;
    setDollRotationY: (dollName: DollName, newRotationY: number) => void;
    springDollRotationY: (dollName: DollName, newRotation: number) => void;
    springAddToDollRotationY: (dollName: DollName, addedRotation: number) => void;
    setDollAnimation: <T_Doll extends DollName>(doll: T_Doll, animation: AnimationNameByModel[DollOptions[T_Doll]["model"]]) => void;
    focusOnDoll: <T_Doll_1 extends DollName>(dollName: T_Doll_1, zoom?: number | undefined) => void;
    setDollToSpot: <T_PlaceName extends PlaceName>({ place, spot, doll: dollName, dontSetRotationState, }: {
        place: T_PlaceName;
        spot: SpotNameByPlace[T_PlaceName];
        doll: DollName;
        dontSetRotationState?: boolean | undefined;
    }) => void;
    springDollToSpot: <T_PlaceName_1 extends PlaceName>({ place, spot, doll: dollName, }: {
        place: T_PlaceName_1;
        spot: SpotNameByPlace[T_PlaceName_1];
        doll: DollName;
    }) => void;
    moveDollAt2DAngle: (dollName: DollName, angle: number) => void;
    hideDoll: (dollName: DollName, shouldHide?: boolean) => void;
    toggleDollMeshes: <T_DollName extends DollName>(dollName: T_DollName, toggledMeshes: Partial<Record<MeshNameByModel[DollOptions[T_DollName]["model"]], boolean>>) => void;
};
