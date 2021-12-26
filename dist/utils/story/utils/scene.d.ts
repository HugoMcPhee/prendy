import { PrendyStoreHelpers } from "../../../stores/typedStoreHelpers";
import { AnyCameraName, AnySegmentName, CameraNameByPlace, PlaceName } from "../../../declarations";
export declare function makeSceneStoryUtils<StoreHelpers extends PrendyStoreHelpers, A_AnyCameraName extends AnyCameraName = AnyCameraName, A_AnySegmentName extends AnySegmentName = AnySegmentName, A_CameraNameByPlace extends CameraNameByPlace = CameraNameByPlace, A_PlaceName extends PlaceName = PlaceName>(storeHelpers: StoreHelpers): {
    getSegmentFromStoryRules: <T_Place extends A_PlaceName, T_Cam extends A_CameraNameByPlace[T_Place]>(place: T_Place, cam: T_Cam) => any;
    doWhenNowSegmentChanges: (checkingSegmentName: A_AnySegmentName, callback: () => void) => string | null;
    doWhenNowCamChanges: (checkingCamName: A_AnyCameraName, callback: () => void) => string | null;
};
