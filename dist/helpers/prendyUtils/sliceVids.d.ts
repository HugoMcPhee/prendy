import { MyTypes } from "../../declarations";
import { SliceVidState, VidSlice } from "../../stores/sliceVids";
export declare const BEFORE_LOOP_PADDING = 0.05;
export declare function get_getSliceVidVideo<T_MyTypes extends MyTypes = MyTypes>(storeHelpers: T_MyTypes["StoreHelpers"]): (itemName: T_MyTypes["Main"]["PlaceName"]) => any;
export declare function get_getSliceVidWaitingVideo<T_MyTypes extends MyTypes = MyTypes>(storeHelpers: T_MyTypes["StoreHelpers"]): (itemName: T_MyTypes["Main"]["PlaceName"]) => any;
export declare function get_sliceVidUtils<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"], storeHelpers: T_MyTypes["StoreHelpers"]): {
    getSliceVidVideo: (itemName: T_MyTypes["Main"]["PlaceName"]) => any;
    getSliceVidWaitingVideo: (itemName: T_MyTypes["Main"]["PlaceName"]) => any;
    doWhenSliceVidPlayingAsync: (sliceVidId: T_MyTypes["Main"]["PlaceName"]) => Promise<void>;
    doWhenSliceVidStateChanges: (sliceVidId: T_MyTypes["Main"]["PlaceName"], checkShouldRun: (newVidState: SliceVidState) => boolean, callback: () => void) => string | null;
    doWhenSliceVidPlaying: (sliceVidId: T_MyTypes["Main"]["PlaceName"], callback: () => void) => string | null;
    getSliceEndTime: (slice: VidSlice) => number;
    getSliceForPlace: <T_PlaceName extends T_MyTypes["Main"]["PlaceName"]>(place: T_PlaceName, camName: T_MyTypes["Main"]["CameraNameByPlace"][T_PlaceName], segment: T_MyTypes["Main"]["SegmentNameByPlace"][T_PlaceName]) => {
        time: any;
        duration: number;
    };
    checkForVideoLoop: (placeName: T_MyTypes["Main"]["PlaceName"]) => boolean;
    checkIfVideoUnloading: (placeName: T_MyTypes["Main"]["PlaceName"]) => boolean;
    checkIfVideoAlreadyChanging: (placeName: T_MyTypes["Main"]["PlaceName"]) => boolean;
};
