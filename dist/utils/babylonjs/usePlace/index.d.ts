import { GameyConceptoFuncs, GameyStartOptionsUntyped, PlaceInfoByNamePlaceholder } from "../../../concepts/typedConceptoFuncs";
export declare function makeUsePlace<ConceptoFuncs extends GameyConceptoFuncs, GameyStartOptions extends GameyStartOptionsUntyped, PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>, PlaceName extends string, DollName extends string, AnyCameraName extends string, CharacterName extends string, SoundName extends string, SoundFiles extends Record<SoundName, string>, CameraNameByPlace extends Record<PlaceName, string>, SegmentNameByPlace extends Record<PlaceName, string>>(conceptoFuncs: ConceptoFuncs, gameyStartOptions: GameyStartOptions, placeInfoByName: PlaceInfoByName, dollNames: readonly DollName[], soundFiles: SoundFiles): <T_PlaceName extends PlaceName>(placeName: T_PlaceName) => {
    container: import("@babylonjs/core").AssetContainer;
    meshes: Record<any, import("@babylonjs/core").Mesh>;
    cameras: Record<any, import("@babylonjs/core").Camera>;
};
