import { AbstractMesh, PBRMaterial } from "@babylonjs/core";
import { DollName, PrendyAssets, PrendyOptions, PrendyStoreHelpers, PrendyStores, SpotNameByPlace } from "../../declarations";
export declare function get_dollStoryUtils(storeHelpers: PrendyStoreHelpers): {
    getModelNameFromDoll: <T_DollName extends string>(dollName: T_DollName) => any;
    get2DAngleFromDollToSpot: <T_Place extends string>(dollA: DollName, place: T_Place, spot: string) => number;
    get2DAngleBetweenDolls: (dollA: DollName, dollB: DollName) => number;
};
export declare function enableCollisions(theMesh: AbstractMesh): void;
export declare function get_dollUtils(storeHelpers: PrendyStoreHelpers, _prendyStores: PrendyStores, prendyStartOptions: PrendyOptions, prendyAssets: PrendyAssets): {
    setDollAnimWeight: <T_DollName extends string, T_NewWeights extends Record<string, number>>(dollName: T_DollName, newWeights: Partial<T_NewWeights>) => void;
    getQuickDistanceBetweenDolls: (dollA: DollName, dollB: DollName) => number;
    inRangesAreTheSame: (inRangePropA: InRangeForAllDolls, inRangePropB: InRangeForAllDolls) => boolean;
    setupLightMaterial: (theMaterial: PBRMaterial | null) => void;
    saveModelStuffToDoll: <T_ModelName extends string, T_DollName_1 extends string>({ modelName, dollName, }: {
        modelName: T_ModelName;
        dollName: T_DollName_1;
    }) => void;
    updateDollScreenPosition: ({ dollName, instant }: {
        dollName: DollName;
        instant?: boolean | undefined;
    }) => void;
};
export declare type InRangeForDoll = {
    touch: boolean;
    talk: boolean;
    see: boolean;
};
export declare function defaultInRangeForDoll(): {
    touch: boolean;
    talk: boolean;
    see: boolean;
};
declare type InRangeForAllDolls = Record<DollName, InRangeForDoll>;
export declare function getDefaultInRangeFunction(dollNames: readonly DollName[]): () => InRangeForAllDolls;
export {};
