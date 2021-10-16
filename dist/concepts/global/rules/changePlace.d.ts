import { GameyConceptoFuncs, GameyStartOptionsUntyped, PlaceholderGameyConcepts, PlaceInfoByNamePlaceholder } from "../../typedConceptoFuncs";
export declare function makeGlobalChangePlaceRules<ConceptoFuncs extends GameyConceptoFuncs, GameyConcepts extends PlaceholderGameyConcepts, GameyStartOptions extends GameyStartOptionsUntyped, DollName extends keyof ReturnType<ConceptoFuncs["getState"]>["dolls"] & string, // DollNameParameter extends string
PlaceName extends string, AnyCameraName extends string, PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>, CameraNameByPlace extends Record<PlaceName, string>, SegmentNameByPlace extends Record<PlaceName, string>>(conceptoFuncs: ConceptoFuncs, gameyConcepts: GameyConcepts, gameyStartOptions: GameyStartOptions, dollNames: readonly DollName[], placeInfoByName: PlaceInfoByName): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
