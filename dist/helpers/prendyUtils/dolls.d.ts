import { AbstractMesh, PBRMaterial } from "@babylonjs/core";
import { MyTypes } from "../../declarations";
type DollName = MyTypes["Types"]["DollName"];
type PlaceName = MyTypes["Types"]["PlaceName"];
type PrendyStores = MyTypes["Stores"];
type SpotNameByPlace = MyTypes["Types"]["SpotNameByPlace"];
type StartState_Dolls = NonNullable<PrendyStores["dolls"]["startStates"]>;
type ModelNameFromDoll<T_DollName extends DollName> = NonNullable<StartState_Dolls[T_DollName]>["modelName"];
export declare function getModelNameFromDoll<T_DollName extends DollName>(dollName: T_DollName): ModelNameFromDoll<T_DollName>;
export declare function get2DAngleFromDollToSpot<T_Place extends PlaceName>(dollA: DollName, place: T_Place, spot: SpotNameByPlace[T_Place]): number;
export declare function get2DAngleBetweenDolls(dollA: DollName, dollB: DollName): number;
export declare function enableCollisions(theMesh: AbstractMesh): void;
type AnimationNameByModel = MyTypes["Types"]["AnimationNameByModel"];
type ModelName = MyTypes["Types"]["ModelName"];
export declare function setDollAnimWeight<T_DollName extends DollName, T_NewWeights extends Record<AnimationNameByModel[ModelNameFromDoll<T_DollName>], number>>(dollName: T_DollName, newWeights: Partial<T_NewWeights>): void;
export declare function getQuickDistanceBetweenDolls(dollA: DollName, dollB: DollName): number;
type InRangeForAllDolls = Record<DollName, InRangeForDoll>;
type InRangeProperty = InRangeForAllDolls;
export declare function inRangesAreTheSame(inRangePropA: InRangeProperty, inRangePropB: InRangeProperty): boolean;
export declare function setupLightMaterial(theMaterial: PBRMaterial | null): void;
export declare function saveModelStuffToDoll<T_ModelName extends ModelName, T_DollName extends DollName>({ modelName, dollName, }: {
    modelName: T_ModelName;
    dollName: T_DollName;
}): void;
export declare function updateDollScreenPosition({ dollName, instant }: {
    dollName: DollName;
    instant?: boolean;
}): void;
export type InRangeForDoll = {
    touch: boolean;
    talk: boolean;
    see: boolean;
};
export declare function defaultInRangeForDoll(): {
    touch: boolean;
    talk: boolean;
    see: boolean;
};
export declare function getDefaultInRangeFunction(dollNames: readonly MyTypes["Types"]["DollName"][]): () => Record<string, InRangeForDoll>;
export {};
