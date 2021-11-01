import { BackdopConcepFuncs, BackdopOptionsUntyped, PlaceInfoByNamePlaceholder } from "../typedConcepFuncs";
export declare function makePlayerRules<ConcepFuncs extends BackdopConcepFuncs, BackdopOptions extends BackdopOptionsUntyped, CharacterName extends string, PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>>(concepFuncs: ConcepFuncs, BACKDOP_OPTIONS: BackdopOptions, placeInfoByName: PlaceInfoByName): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
