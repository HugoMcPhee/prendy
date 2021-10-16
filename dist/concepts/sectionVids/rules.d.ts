import { GameyConceptoFuncs, PlaceInfoByNamePlaceholder } from "../typedConceptoFuncs";
export declare function makeSectionVidRules<ConceptoFuncs extends GameyConceptoFuncs, PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>, PlaceName extends string, DollName extends string, AnyCameraName extends string, CameraNameByPlace extends Record<PlaceName, string>, SegmentNameByPlace extends Record<PlaceName, string>>(conceptoFuncs: ConceptoFuncs, placeInfoByName: PlaceInfoByName, dollNames: readonly DollName[]): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
