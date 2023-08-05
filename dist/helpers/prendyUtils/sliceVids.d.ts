import { CameraNameByPlace, PlaceName, PrendyAssets, PrendyOptions, PrendyStoreHelpers, SegmentNameByPlace } from "../../declarations";
import { SliceVidState, VidSlice } from "../../stores/sliceVids";
export declare const BEFORE_LOOP_PADDING = 0.05;
export declare function get_getSliceVidVideo(storeHelpers: PrendyStoreHelpers): (itemName: PlaceName) => any;
export declare function get_getSliceVidWaitingVideo(storeHelpers: PrendyStoreHelpers): (itemName: PlaceName) => any;
export declare function get_sliceVidUtils(storeHelpers: PrendyStoreHelpers, prendyOptions: PrendyOptions, prendyAssets: PrendyAssets): {
    getSliceVidVideo: (itemName: string) => any;
    getSliceVidWaitingVideo: (itemName: string) => any;
    doWhenSliceVidPlayingAsync: (sliceVidId: PlaceName) => Promise<void>;
    doWhenSliceVidStateChanges: (sliceVidId: PlaceName, checkShouldRun: (newVidState: SliceVidState) => boolean, callback: () => void) => string | null;
    doWhenSliceVidPlaying: (sliceVidId: PlaceName, callback: () => void) => string | null;
    getSliceEndTime: (slice: VidSlice) => number;
    getSliceForPlace: <T_PlaceName extends string>(place: T_PlaceName, camName: string, segment: string) => {
        time: any;
        duration: number;
    };
    checkForVideoLoop: (placeName: PlaceName) => boolean;
    checkIfVideoUnloading: (placeName: PlaceName) => boolean;
    checkIfVideoAlreadyChanging: (placeName: PlaceName) => boolean;
};
