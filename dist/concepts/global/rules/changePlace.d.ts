import { BackdopConcepFuncs, BackdopOptionsUntyped, PlaceholderBackdopConcepts, PlaceInfoByNamePlaceholder } from "../../typedConcepFuncs";
export declare function makeGlobalChangePlaceRules<ConcepFuncs extends BackdopConcepFuncs, BackdopConcepts extends PlaceholderBackdopConcepts, BackdopOptions extends BackdopOptionsUntyped, DollName extends keyof ReturnType<ConcepFuncs["getState"]>["dolls"] & string, // DollNameParameter extends string
PlaceName extends string, AnyCameraName extends string, PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>, CameraNameByPlace extends Record<PlaceName, string>, SegmentNameByPlace extends Record<PlaceName, string>>(concepFuncs: ConcepFuncs, backdopConcepts: BackdopConcepts, backdopStartOptions: BackdopOptions, dollNames: readonly DollName[], placeInfoByName: PlaceInfoByName): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
