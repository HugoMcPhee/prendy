import { PrendyStoreHelpers } from "../../stores/typedStoreHelpers";
import { PlaceName, SpotNameByPlace } from "../../declarations";
import { Vector3 } from "@babylonjs/core";
export declare function get_spotStoryUtils<StoreHelpers extends PrendyStoreHelpers, A_PlaceName extends PlaceName = PlaceName, A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace>(storeHelpers: StoreHelpers): {
    getSpotPosition: <T_Place extends A_PlaceName>(place: T_Place, spot: A_SpotNameByPlace[T_Place]) => Vector3;
    getSpotRotation: <T_Place_1 extends A_PlaceName>(place: T_Place_1, spot: A_SpotNameByPlace[T_Place_1]) => Vector3;
};
