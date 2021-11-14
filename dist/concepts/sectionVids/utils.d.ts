import { SectionVidState, VidSection } from ".";
import { BackdopArt, CameraNameByPlace, PlaceName, SegmentNameByPlace } from "../../declarations";
import { BackdopConcepFuncs } from "../typedConcepFuncs";
export declare const BEFORE_LOOP_PADDING = 0.05;
export declare function makeGetSectionVidVideo<ConcepFuncs extends BackdopConcepFuncs, PlaceName extends string>(concepFuncs: ConcepFuncs): (itemName: PlaceName) => any;
export declare function makeSectionVidStoreUtils<ConcepFuncs extends BackdopConcepFuncs>(concepFuncs: ConcepFuncs, backdopArt: BackdopArt): {
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
