import { VidType } from "../../utils/consts";
import { SectionVidState, VidSection } from ".";
import { BackdopConcepFuncs, PlaceInfoByNamePlaceholder } from "../typedConcepFuncs";
export declare const BEFORE_LOOP_PADDING = 0.05;
export declare function makeGetSectionVidVideo<ConcepFuncs extends BackdopConcepFuncs, PlaceName extends string>(concepFuncs: ConcepFuncs): (itemName: PlaceName, vidType?: VidType) => any;
export declare function makeSectionVidStoreUtils<ConcepFuncs extends BackdopConcepFuncs, PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>, PlaceName extends string, DollName extends string, AnyCameraName extends string, CameraNameByPlace extends Record<PlaceName, string>, SegmentNameByPlace extends Record<PlaceName, string>>(concepFuncs: ConcepFuncs, placeInfoByName: PlaceInfoByName, dollNames: readonly DollName[]): {
    getSectionVidVideo: (itemName: PlaceName, vidType?: "depth" | "color") => any;
    doWhenSectionVidPlayingAsync: (sectionVidId: PlaceName) => Promise<void>;
    doWhenSectionVidStateChanges: (sectionVidId: PlaceName, checkShouldRun: (newVidState: SectionVidState) => boolean, callback: () => void) => string;
    doWhenSectionVidPlaying: (sectionVidId: PlaceName, callback: () => void) => string;
    getSectionEndTime: (section: VidSection) => number;
    getSectionForPlace: <T_PlaceName extends PlaceName>(place: T_PlaceName, camName: CameraNameByPlace[T_PlaceName], segment: SegmentNameByPlace[T_PlaceName]) => {
        time: any;
        duration: number;
    };
    checkForVideoLoop: (itemName: PlaceName) => boolean;
};
