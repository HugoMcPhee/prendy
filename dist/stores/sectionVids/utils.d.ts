import { SectionVidState, VidSection } from ".";
import { PrendyAssets, CameraNameByPlace, PlaceName, SegmentNameByPlace } from "../../declarations";
import { PrendyStoreHelpers } from "../typedStoreHelpers";
export declare const BEFORE_LOOP_PADDING = 0.05;
export declare function makeGetSectionVidVideo<StoreHelpers extends PrendyStoreHelpers, PlaceName extends string>(storeHelpers: StoreHelpers): (itemName: PlaceName) => any;
export declare function makeSectionVidStoreUtils<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers, prendyAssets: PrendyAssets): {
    getSectionVidVideo: (itemName: string) => any;
    doWhenSectionVidPlayingAsync: (sectionVidId: PlaceName) => Promise<void>;
    doWhenSectionVidStateChanges: (sectionVidId: PlaceName, checkShouldRun: (newVidState: SectionVidState) => boolean, callback: () => void) => string | null;
    doWhenSectionVidPlaying: (sectionVidId: PlaceName, callback: () => void) => string | null;
    getSectionEndTime: (section: VidSection) => number;
    getSectionForPlace: <T_PlaceName extends string>(place: T_PlaceName, camName: string, segment: string) => {
        time: any;
        duration: number;
    };
    checkForVideoLoop: (itemName: PlaceName) => boolean;
};
