import { AbstractMesh, PBRMaterial } from "@babylonjs/core";
import { InRangeForDoll } from "./indexUtils";
import { BackdopConcepFuncs, BackdopOptionsUntyped, ModelInfoByNamePlaceholder, PlaceholderBackdopConcepts } from "../typedConcepFuncs";
export declare const rangeOptionsQuick: {
    readonly touch: number;
    readonly talk: number;
    readonly see: number;
};
export declare function enableCollisions(theMesh: AbstractMesh): void;
export declare function makeDollStoreUtils<ConcepFuncs extends BackdopConcepFuncs, BackdopOptions extends BackdopOptionsUntyped, BackdopConcepts extends PlaceholderBackdopConcepts, AnimationNameByModel extends Record<string, string>, StartState_Dolls extends ReturnType<ConcepFuncs["getState"]>["dolls"], DollName extends keyof ReturnType<ConcepFuncs["getState"]>["dolls"] & string, // DollNameParameter extends string
ModelName extends string, ModelInfoByName extends ModelInfoByNamePlaceholder<ModelName>>(concepFuncs: ConcepFuncs, backdopStartOptions: BackdopOptions, backdopConcepts: BackdopConcepts, dollNames: readonly DollName[], modelInfoByName: ModelInfoByName): {
    setDollAnimWeight: <T_DollName extends DollName, T_NewWeights extends Record<AnimationNameByModel[StartState_Dolls[T_DollName]["modelName"]], number>>(dollName: T_DollName, newWeights: Partial<T_NewWeights>) => void;
    getQuickDistanceBetweenDolls: (dollA: DollName, dollB: DollName) => number;
    inRangesAreTheSame: (inRangePropA: Record<DollName, InRangeForDoll>, inRangePropB: Record<DollName, InRangeForDoll>) => boolean;
    setupLightMaterial: (theMaterial: PBRMaterial | null) => void;
    saveModelStuffToDoll: <T_ModelName extends ModelName, T_DollName_1 extends DollName>({ modelName, dollName }: {
        modelName: T_ModelName;
        dollName: T_DollName_1;
    }) => void;
    updateDollScreenPosition: ({ dollName, instant, }: {
        dollName: DollName;
        instant?: boolean;
    }) => void;
};
