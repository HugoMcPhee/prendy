import { BackdopConcepFuncs, PlaceInfoByNamePlaceholder } from "../typedConcepFuncs";
export declare function makePlayerRules<ConcepFuncs extends BackdopConcepFuncs, CharacterName extends string, PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>>(concepFuncs: ConcepFuncs, placeInfoByName: PlaceInfoByName): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
