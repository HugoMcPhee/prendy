import { AbstractMesh, PBRMaterial } from "@babylonjs/core";
import { DollName, PlaceName, PrendyAssets, PrendyOptions, SpotNameByPlace } from "../../declarations";
import { PlaceholderPrendyStores, PrendyStoreHelpers } from "../../stores/typedStoreHelpers";
export declare function makeTyped_dollStoryUtils<StoreHelpers extends PrendyStoreHelpers, PrendyStores extends PlaceholderPrendyStores, A_DollName extends DollName = DollName, A_PlaceName extends PlaceName = PlaceName, A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace>(storeHelpers: StoreHelpers): {
    getModelNameFromDoll: <T_DollName extends A_DollName>(dollName: T_DollName) => NonNullable<NonNullable<PrendyStores["dolls"]["startStates"]>[T_DollName]>["modelName"];
    get2DAngleFromDollToSpot: <T_Place extends A_PlaceName>(dollA: A_DollName, place: T_Place, spot: A_SpotNameByPlace[T_Place]) => number;
    get2DAngleBetweenDolls: (dollA: A_DollName, dollB: A_DollName) => number;
};
export declare function enableCollisions(theMesh: AbstractMesh): void;
export declare function makeTyped_dollUtils<StoreHelpers extends PrendyStoreHelpers, PrendyStores extends PlaceholderPrendyStores>(storeHelpers: StoreHelpers, _prendyStores: PrendyStores, prendyStartOptions: PrendyOptions, prendyAssets: PrendyAssets): {
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
