import { BackdopConcepFuncs, BackdopOptionsUntyped, PlaceInfoByNamePlaceholder } from "../../../concepts/typedConcepFuncs";
export declare function makeUsePlace<ConcepFuncs extends BackdopConcepFuncs, BackdopOptions extends BackdopOptionsUntyped, PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>, PlaceName extends string, DollName extends string, AnyCameraName extends string, CharacterName extends string, SoundName extends string, SoundFiles extends Record<SoundName, string>, CameraNameByPlace extends Record<PlaceName, string>, SegmentNameByPlace extends Record<PlaceName, string>>(concepFuncs: ConcepFuncs, backdopStartOptions: BackdopOptions, placeInfoByName: PlaceInfoByName, dollNames: readonly DollName[], soundFiles: SoundFiles): <T_PlaceName extends PlaceName>(placeName: T_PlaceName) => {
    container: import("@babylonjs/core").AssetContainer;
    meshes: Record<any, import("@babylonjs/core").Mesh>;
    cameras: Record<any, import("@babylonjs/core").Camera>;
};
