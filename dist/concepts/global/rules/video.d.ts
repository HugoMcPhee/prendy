import { GameyConceptoFuncs, GameyStartOptionsUntyped, PlaceholderGameyConcepts, PlaceInfoByNamePlaceholder } from "../../typedConceptoFuncs";
export declare function makeGlobalVideoRules<ConceptoFuncs extends GameyConceptoFuncs, GameyConcepts extends PlaceholderGameyConcepts, GameyStartOptions extends GameyStartOptionsUntyped, PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>, AnyCameraName extends string, AnySegmentName extends string, PlaceName extends string, DollName extends string, CameraNameByPlace extends Record<PlaceName, string>, SegmentNameByPlace extends Record<PlaceName, string>>(conceptoFuncs: ConceptoFuncs, gameyConcepts: GameyConcepts, gameyStartOptions: GameyStartOptions, placeInfoByName: PlaceInfoByName, dollNames: readonly DollName[]): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
