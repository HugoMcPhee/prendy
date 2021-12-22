import { PrendyStoreHelpers } from "../../../concepts/typedStoreHelpers";
import { PlaceName, SpotNameByPlace } from "../../../declarations";
export declare function makeSpotStoryUtils<StoreHelpers extends PrendyStoreHelpers, A_PlaceName extends PlaceName = PlaceName, A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace>(storeHelpers: StoreHelpers): {
    getSpotPosition: <T_Place extends A_PlaceName>(place: T_Place, spot: A_SpotNameByPlace[T_Place]) => any;
    getSpotRotation: <T_Place_1 extends A_PlaceName>(place: T_Place_1, spot: A_SpotNameByPlace[T_Place_1]) => any;
};
