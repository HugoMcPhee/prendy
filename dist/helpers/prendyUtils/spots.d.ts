import { Vector3 } from "@babylonjs/core";
import { MyTypes } from "../../declarations";
export declare function get_spotStoryUtils<T_MyTypes extends MyTypes = MyTypes>(storeHelpers: T_MyTypes["StoreHelpers"]): {
    getSpotPosition: <T_Place extends T_MyTypes["Main"]["PlaceName"]>(place: T_Place, spot: T_MyTypes["Main"]["SpotNameByPlace"][T_Place]) => Vector3;
    getSpotRotation: <T_Place_1 extends T_MyTypes["Main"]["PlaceName"]>(place: T_Place_1, spot: T_MyTypes["Main"]["SpotNameByPlace"][T_Place_1]) => Vector3;
};
