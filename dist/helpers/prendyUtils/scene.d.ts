import { MyTypes } from "../../declarations";
export declare function get_sceneStoryUtils<T_MyTypes extends MyTypes = MyTypes>(storeHelpers: T_MyTypes["StoreHelpers"]): {
    getSegmentFromStoryRules: <T_Place extends T_MyTypes["Main"]["PlaceName"], T_Cam extends T_MyTypes["Main"]["CameraNameByPlace"][T_Place]>(place: T_Place, cam: T_Cam) => any;
    doWhenNowSegmentChanges: (checkingSegmentName: T_MyTypes["Main"]["AnySegmentName"], callback: () => void) => string | null;
    doWhenNowCamChanges: (checkingCamName: T_MyTypes["Main"]["AnyCameraName"], callback: () => void) => string | null;
    waitForNowPlaceToChange: (checkingPlaceName: T_MyTypes["Main"]["PlaceName"]) => Promise<void>;
    waitForPlaceFullyLoaded: (checkingPlaceName: T_MyTypes["Main"]["PlaceName"]) => Promise<void>;
    waitForNowCamToChange: (checkingCamName: T_MyTypes["Main"]["AnyCameraName"]) => Promise<void>;
    waitForNextTick: () => Promise<unknown>;
};
