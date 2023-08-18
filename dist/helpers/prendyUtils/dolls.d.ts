import { AbstractMesh, PBRMaterial } from "@babylonjs/core";
import { MyTypes } from "../../declarations";
export declare function get_dollStoryUtils<T_MyTypes extends MyTypes = MyTypes>(storeHelpers: T_MyTypes["StoreHelpers"]): {
    getModelNameFromDoll: <T_DollName extends T_MyTypes["Main"]["DollName"]>(dollName: T_DollName) => NonNullable<NonNullable<T_MyTypes["Stores"]["dolls"]["startStates"]>[T_DollName]>["modelName"];
    get2DAngleFromDollToSpot: <T_Place extends T_MyTypes["Main"]["PlaceName"]>(dollA: T_MyTypes["Main"]["DollName"], place: T_Place, spot: T_MyTypes["Main"]["SpotNameByPlace"][T_Place]) => number;
    get2DAngleBetweenDolls: (dollA: T_MyTypes["Main"]["DollName"], dollB: T_MyTypes["Main"]["DollName"]) => number;
};
export declare function enableCollisions(theMesh: AbstractMesh): void;
export declare function get_dollUtils<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"], storeHelpers: T_MyTypes["StoreHelpers"]): {
    setDollAnimWeight: <T_DollName extends T_MyTypes["Main"]["DollName"], T_NewWeights extends Record<T_MyTypes["Main"]["AnimationNameByModel"][(T_MyTypes["Stores"]["dolls"]["startStates"] & ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["dolls"])[T_DollName]["modelName"]], number>>(dollName: T_DollName, newWeights: Partial<T_NewWeights>) => void;
    getQuickDistanceBetweenDolls: (dollA: T_MyTypes["Main"]["DollName"], dollB: T_MyTypes["Main"]["DollName"]) => number;
    inRangesAreTheSame: (inRangePropA: Record<T_MyTypes["Main"]["DollName"], InRangeForDoll>, inRangePropB: Record<T_MyTypes["Main"]["DollName"], InRangeForDoll>) => boolean;
    setupLightMaterial: (theMaterial: PBRMaterial | null) => void;
    saveModelStuffToDoll: <T_ModelName extends T_MyTypes["Main"]["ModelName"], T_DollName_1 extends T_MyTypes["Main"]["DollName"]>({ modelName, dollName, }: {
        modelName: T_ModelName;
        dollName: T_DollName_1;
    }) => void;
    updateDollScreenPosition: ({ dollName, instant }: {
        dollName: T_MyTypes["Main"]["DollName"];
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
export declare function getDefaultInRangeFunction<T_MyTypes extends MyTypes = MyTypes>(dollNames: readonly MyTypes["Main"]["DollName"][]): () => Record<T_MyTypes["Main"]["DollName"], InRangeForDoll>;
