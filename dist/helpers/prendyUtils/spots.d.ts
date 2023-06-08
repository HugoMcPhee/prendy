import { Vector3 } from "@babylonjs/core";
import { PrendyStoreHelpers, SpotNameByPlace } from "../../declarations";
export declare function get_spotStoryUtils(storeHelpers: PrendyStoreHelpers): {
    getSpotPosition: <T_Place extends string>(place: T_Place, spot: string) => Vector3;
    getSpotRotation: <T_Place_1 extends string>(place: T_Place_1, spot: string) => Vector3;
};
