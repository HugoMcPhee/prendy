import { BackdopConcepFuncs, BackdopOptionsUntyped, PlaceInfoByNamePlaceholder } from "../typedConcepFuncs";
export declare function makeCharacterDynamicRules<ConcepFuncs extends BackdopConcepFuncs, BackdopOptions extends BackdopOptionsUntyped, CharacterName extends string, DollName extends string, AnyCameraName extends string, PlaceName extends string, PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>>(concepFuncs: ConcepFuncs, backdopStartOptions: BackdopOptions, characterNames: readonly CharacterName[], placeInfoByName: PlaceInfoByName): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
export declare function makeStartDynamicCharacterRulesForInitialState<ConcepFuncs extends BackdopConcepFuncs, CharacterDynamicRules extends ReturnType<typeof makeCharacterDynamicRules>, CharacterName extends string>(characterDynamicRules: CharacterDynamicRules, characterNames: readonly CharacterName[], concepFuncs: ConcepFuncs): () => () => void;
export declare function makeCharacterRules<ConcepFuncs extends BackdopConcepFuncs, PlaceName extends string, PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>>(concepFuncs: ConcepFuncs, placeInfoByName: PlaceInfoByName): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
