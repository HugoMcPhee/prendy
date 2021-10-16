import { GameyConceptoFuncs, GameyStartOptionsUntyped, PlaceInfoByNamePlaceholder } from "../typedConceptoFuncs";
export declare function makeCharacterDynamicRules<ConceptoFuncs extends GameyConceptoFuncs, GameyStartOptions extends GameyStartOptionsUntyped, CharacterName extends string, DollName extends string, AnyCameraName extends string, PlaceName extends string, PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>>(conceptoFuncs: ConceptoFuncs, gameyStartOptions: GameyStartOptions, characterNames: readonly CharacterName[], placeInfoByName: PlaceInfoByName): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
export declare function makeStartDynamicCharacterRulesForInitialState<ConceptoFuncs extends GameyConceptoFuncs, CharacterDynamicRules extends ReturnType<typeof makeCharacterDynamicRules>, CharacterName extends string>(characterDynamicRules: CharacterDynamicRules, characterNames: readonly CharacterName[], conceptoFuncs: ConceptoFuncs): () => () => void;
export declare function makeCharacterRules<ConceptoFuncs extends GameyConceptoFuncs, PlaceName extends string, PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>>(conceptoFuncs: ConceptoFuncs, placeInfoByName: PlaceInfoByName): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
