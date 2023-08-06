import { AbstractMesh, PBRMaterial } from "@babylonjs/core";
import { AnimationNameByModel, DollName, ModelName, PlaceName, PrendyAssets, PrendyOptions, PrendyStoreHelpers, PrendyStores, SpotNameByPlace } from "../../declarations";
export declare function get_dollStoryUtils<A_DollName extends DollName = DollName, A_PlaceName extends PlaceName = PlaceName, A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers, A_PrendyStores extends PrendyStores = PrendyStores, A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace>(storeHelpers: A_PrendyStoreHelpers): {
    getModelNameFromDoll: <T_DollName extends A_DollName>(dollName: T_DollName) => NonNullable<NonNullable<A_PrendyStores["dolls"]["startStates"]>[T_DollName]>["modelName"];
    get2DAngleFromDollToSpot: <T_Place extends A_PlaceName>(dollA: A_DollName, place: T_Place, spot: A_SpotNameByPlace[T_Place]) => number;
    get2DAngleBetweenDolls: (dollA: A_DollName, dollB: A_DollName) => number;
};
export declare function enableCollisions(theMesh: AbstractMesh): void;
export declare function get_dollUtils<A_AnimationNameByModel extends AnimationNameByModel = AnimationNameByModel, A_DollName extends DollName = DollName, A_ModelName extends ModelName = ModelName, A_PrendyAssets extends PrendyAssets = PrendyAssets, A_PrendyOptions extends PrendyOptions = PrendyOptions, A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers, A_PrendyStores extends PrendyStores = PrendyStores>(storeHelpers: A_PrendyStoreHelpers, _prendyStores: A_PrendyStores, prendyStartOptions: A_PrendyOptions, prendyAssets: A_PrendyAssets): {
    setDollAnimWeight: <T_DollName extends A_DollName, T_NewWeights extends Record<A_AnimationNameByModel[(A_PrendyStores["dolls"]["startStates"] & ReturnType<A_PrendyStoreHelpers["getState"]>["dolls"])[T_DollName]["modelName"]], number>>(dollName: T_DollName, newWeights: Partial<T_NewWeights>) => void;
    getQuickDistanceBetweenDolls: (dollA: A_DollName, dollB: A_DollName) => number;
    inRangesAreTheSame: (inRangePropA: Record<A_DollName, InRangeForDoll>, inRangePropB: Record<A_DollName, InRangeForDoll>) => boolean;
    setupLightMaterial: (theMaterial: PBRMaterial | null) => void;
    saveModelStuffToDoll: <T_ModelName extends A_ModelName, T_DollName_1 extends A_DollName>({ modelName, dollName, }: {
        modelName: T_ModelName;
        dollName: T_DollName_1;
    }) => void;
    updateDollScreenPosition: ({ dollName, instant }: {
        dollName: A_DollName;
        instant?: boolean | undefined;
    }) => void;
};
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
export declare function getDefaultInRangeFunction<A_DollName extends DollName = DollName>(dollNames: readonly A_DollName[]): () => Record<A_DollName, InRangeForDoll>;
