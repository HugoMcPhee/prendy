import { Vector3 } from "@babylonjs/core";
import { PlaceName, PrendyStoreHelpers, SpotNameByPlace } from "../../declarations";
export declare function get_spotStoryUtils<A_PlaceName extends PlaceName = PlaceName, A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers, A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace>(storeHelpers: A_PrendyStoreHelpers): {
    getSpotPosition: <T_Place extends A_PlaceName>(place: T_Place, spot: A_SpotNameByPlace[T_Place]) => Vector3;
    getSpotRotation: <T_Place_1 extends A_PlaceName>(place: T_Place_1, spot: A_SpotNameByPlace[T_Place_1]) => Vector3;
};
