import { AnyCameraName, AnySegmentName, PrendyStoreHelpers } from "../../declarations";
export declare function get_sceneStoryUtils(storeHelpers: PrendyStoreHelpers): {
    getSegmentFromStoryRules: <T_Place extends string, T_Cam extends string>(place: T_Place, cam: T_Cam) => any;
    doWhenNowSegmentChanges: (checkingSegmentName: AnySegmentName, callback: () => void) => string | null;
    doWhenNowCamChanges: (checkingCamName: AnyCameraName, callback: () => void) => string | null;
};
