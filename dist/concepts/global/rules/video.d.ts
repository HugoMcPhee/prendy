import { BackdopConcepFuncs, BackdopOptionsUntyped, PlaceholderBackdopConcepts, PlaceInfoByNamePlaceholder } from "../../typedConcepFuncs";
export declare function makeGlobalVideoRules<ConcepFuncs extends BackdopConcepFuncs, BackdopConcepts extends PlaceholderBackdopConcepts, BackdopOptions extends BackdopOptionsUntyped, PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>, AnyCameraName extends string, AnySegmentName extends string, PlaceName extends string, DollName extends string, CameraNameByPlace extends Record<PlaceName, string>, SegmentNameByPlace extends Record<PlaceName, string>>(concepFuncs: ConcepFuncs, backdopConcepts: BackdopConcepts, backdopStartOptions: BackdopOptions, placeInfoByName: PlaceInfoByName, dollNames: readonly DollName[]): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
