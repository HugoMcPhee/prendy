import { AbstractMesh, PBRMaterial } from "@babylonjs/core";
import { PrendyArt, PrendyOptions, DollName } from "../../declarations";
import { PrendyStoreHelpers, PlaceholderPrendyConcepts } from "../typedStoreHelpers";
import { InRangeForDoll } from "./indexUtils";
export declare const rangeOptionsQuick: {
    readonly touch: number;
    readonly talk: number;
    readonly see: number;
};
export declare function enableCollisions(theMesh: AbstractMesh): void;
export declare function makeDollStoreUtils<StoreHelpers extends PrendyStoreHelpers, PrendyConcepts extends PlaceholderPrendyConcepts>(storeHelpers: StoreHelpers, _prendyConcepts: PrendyConcepts, prendyStartOptions: PrendyOptions, prendyArt: PrendyArt): {
    setDollAnimWeight: <T_DollName extends string, T_NewWeights extends Record<string, number>>(dollName: T_DollName, newWeights: Partial<T_NewWeights>) => void;
    getQuickDistanceBetweenDolls: (dollA: DollName, dollB: DollName) => number;
    inRangesAreTheSame: (inRangePropA: {
        [x: string]: InRangeForDoll;
    }, inRangePropB: {
        [x: string]: InRangeForDoll;
    }) => boolean;
    setupLightMaterial: (theMaterial: PBRMaterial | null) => void;
    saveModelStuffToDoll: <T_ModelName extends string, T_DollName_1 extends string>({ modelName, dollName }: {
        modelName: T_ModelName;
        dollName: T_DollName_1;
    }) => void;
    updateDollScreenPosition: ({ dollName, instant, }: {
        dollName: DollName;
        instant?: boolean | undefined;
    }) => void;
};
