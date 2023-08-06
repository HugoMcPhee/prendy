import { AnyCameraName, AnySegmentName, CameraNameByPlace, PlaceName, PrendyStoreHelpers } from "../../declarations";
export declare function get_sceneStoryUtils<A_AnyCameraName extends AnyCameraName = AnyCameraName, A_AnySegmentName extends AnySegmentName = AnySegmentName, A_CameraNameByPlace extends CameraNameByPlace = CameraNameByPlace, A_PlaceName extends PlaceName = PlaceName, A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers>(storeHelpers: A_PrendyStoreHelpers): {
    getSegmentFromStoryRules: <T_Place extends A_PlaceName, T_Cam extends A_CameraNameByPlace[T_Place]>(place: T_Place, cam: T_Cam) => any;
    doWhenNowSegmentChanges: (checkingSegmentName: A_AnySegmentName, callback: () => void) => string | null;
    doWhenNowCamChanges: (checkingCamName: A_AnyCameraName, callback: () => void) => string | null;
    waitForNowPlaceToChange: (checkingPlaceName: A_PlaceName) => Promise<void>;
    waitForPlaceFullyLoaded: (checkingPlaceName: A_PlaceName) => Promise<void>;
    waitForNowCamToChange: (checkingCamName: A_AnyCameraName) => Promise<void>;
    waitForNextTick: () => Promise<unknown>;
};
