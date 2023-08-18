import { PrendyOptionsUntyped, DollOptionsPlaceholder, ModelInfoByNamePlaceholder, PlaceInfoByNamePlaceholder, PrendyStoreHelpersUntyped, PrendyStoresUntyped } from "./stores/typedStoreHelpers";
declare const _default: "default";
export default _default;
export interface AssetsTypesUntyped {
    PrendyOptions: PrendyOptionsUntyped;
    PlaceInfoByName: PlaceInfoByNamePlaceholder<string>;
    ModelInfoByName: ModelInfoByNamePlaceholder<string>;
    DollOptions: DollOptionsPlaceholder<string, string>;
    CharacterOptions: Record<any, any>;
    ModelName: string;
    DollName: string;
    CharacterName: string;
    AnyCameraName: string;
    AnySegmentName: string;
    AnySpotName: string;
    AnyTriggerName: string;
    PlaceName: string;
    PickupName: string;
    AnyAnimationName: string;
    SoundName: string;
    MusicName: string;
    FontName: string;
    SpeechVidName: string;
    StoryPartName: string;
    CameraNameByPlace: Record<string, string>;
    SoundspotNameByPlace: Record<string, string>;
    SpotNameByPlace: Record<string, string>;
    TriggerNameByPlace: Record<string, string>;
    WallNameByPlace: Record<string, string>;
    AnimationNameByModel: Record<string, string>;
    BoneNameByModel: Record<string, string>;
    MaterialNameByModel: Record<string, string>;
    MeshNameByModel: Record<string, string>;
    ModelNamesByPlaceLoose: any;
    SegmentNameByPlace: Record<string, string>;
    MusicFiles: Record<string, string>;
    SpeechVidFiles: Record<string, string>;
    SoundFiles: Record<string, string>;
    PickupsInfo: any;
}
export interface CustomAssetsTypes {
}
export interface CustomStoreHelpers {
}
export interface CustomPrendyStores {
}
export interface AssetsTypes extends Omit<AssetsTypesUntyped, keyof CustomAssetsTypes>, CustomAssetsTypes {
}
export interface PrendyStoreHelpers extends Omit<PrendyStoreHelpersUntyped, keyof CustomStoreHelpers>, CustomStoreHelpers {
}
export interface PrendyStores extends Omit<PrendyStoresUntyped, keyof CustomPrendyStores>, CustomPrendyStores {
}
export type PrendyOptions = AssetsTypes["PrendyOptions"];
export type PlaceInfoByName = AssetsTypes["PlaceInfoByName"];
export type ModelInfoByName = AssetsTypes["ModelInfoByName"];
export type DollOptions = AssetsTypes["DollOptions"];
export type CharacterOptions = AssetsTypes["CharacterOptions"];
export type ModelName = AssetsTypes["ModelName"];
export type DollName = AssetsTypes["DollName"];
export type CharacterName = AssetsTypes["CharacterName"];
export type AnyCameraName = AssetsTypes["AnyCameraName"];
export type AnySegmentName = AssetsTypes["AnySegmentName"];
export type AnySpotName = AssetsTypes["AnySpotName"];
export type AnyTriggerName = AssetsTypes["AnyTriggerName"];
export type PlaceName = AssetsTypes["PlaceName"];
export type PickupName = AssetsTypes["PickupName"];
export type AnyAnimationName = AssetsTypes["AnyAnimationName"];
export type SoundName = AssetsTypes["SoundName"];
export type MusicName = AssetsTypes["MusicName"];
export type FontName = AssetsTypes["FontName"];
export type SpeechVidName = AssetsTypes["SpeechVidName"];
export type StoryPartName = AssetsTypes["StoryPartName"];
export type CameraNameByPlace = AssetsTypes["CameraNameByPlace"];
export type SoundspotNameByPlace = AssetsTypes["SoundspotNameByPlace"];
export type SpotNameByPlace = AssetsTypes["SpotNameByPlace"];
export type TriggerNameByPlace = AssetsTypes["TriggerNameByPlace"];
export type WallNameByPlace = AssetsTypes["WallNameByPlace"];
export type AnimationNameByModel = AssetsTypes["AnimationNameByModel"];
export type BoneNameByModel = AssetsTypes["BoneNameByModel"];
export type MaterialNameByModel = AssetsTypes["MaterialNameByModel"];
export type MeshNameByModel = AssetsTypes["MeshNameByModel"];
export type ModelNamesByPlaceLoose = AssetsTypes["ModelNamesByPlaceLoose"];
export type SegmentNameByPlace = AssetsTypes["SegmentNameByPlace"];
export type MusicFiles = AssetsTypes["MusicFiles"];
export type SoundFiles = AssetsTypes["SoundFiles"];
export type SpeechVidFiles = AssetsTypes["SpeechVidFiles"];
export type PickupsInfo = AssetsTypes["PickupsInfo"];
export type PrendyAssets = {
    placeInfoByName: PlaceInfoByName;
    modelInfoByName: ModelInfoByName;
    dollOptions: DollOptions;
    characterOptions: CharacterOptions;
    placeNames: readonly PlaceName[];
    modelNames: readonly ModelName[];
    dollNames: readonly DollName[];
    characterNames: readonly CharacterName[];
    musicNames: readonly MusicName[];
    soundNames: readonly SoundName[];
    fontNames: readonly FontName[];
    pickupsInfo: PickupsInfo;
    musicFiles: MusicFiles;
    soundFiles: SoundFiles;
    speechVidFiles: SpeechVidFiles;
};
export type MyTypes = {
    Main: AssetsTypes;
    StoreHelpers: PrendyStoreHelpers;
    Stores: PrendyStores;
    Assets: PrendyAssets;
};
