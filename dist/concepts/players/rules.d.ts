import { GameyConceptoFuncs, PlaceInfoByNamePlaceholder } from "../typedConceptoFuncs";
export declare function makePlayerRules<ConceptoFuncs extends GameyConceptoFuncs, CharacterName extends string, PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>>(conceptoFuncs: ConceptoFuncs, placeInfoByName: PlaceInfoByName): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
