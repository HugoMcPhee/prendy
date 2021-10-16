import { VidType } from "../../utils/consts";
import { SectionVidState, VidSection } from ".";
import { GameyConceptoFuncs, PlaceInfoByNamePlaceholder } from "../typedConceptoFuncs";
export declare const BEFORE_LOOP_PADDING = 0.05;
export declare function makeGetSectionVidVideo<ConceptoFuncs extends GameyConceptoFuncs, PlaceName extends string>(conceptoFuncs: ConceptoFuncs): (itemName: PlaceName, vidType?: VidType) => any;
export declare function makeSectionVidStoreUtils<ConceptoFuncs extends GameyConceptoFuncs, PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>, PlaceName extends string, DollName extends string, AnyCameraName extends string, CameraNameByPlace extends Record<PlaceName, string>, SegmentNameByPlace extends Record<PlaceName, string>>(conceptoFuncs: ConceptoFuncs, placeInfoByName: PlaceInfoByName, dollNames: readonly DollName[]): {
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
