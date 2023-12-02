import { DollOptionsPlaceholder, ModelInfoByNamePlaceholder, PlaceInfoByNamePlaceholder, PrendyOptionsUntyped, PrendyStoreHelpersUntyped as RepondHelpersUntyped, PrendyStoresUntyped } from "./stores/typedStoreHelpers";
export interface AssetsTypesUntyped {
    PrendyOptions: PrendyOptionsUntyped;
    PlaceInfoByName: PlaceInfoByNamePlaceholder<string>;
    ModelInfoByName: ModelInfoByNamePlaceholder<string>;
    DollOptions: DollOptionsPlaceholder<string, string>;
    CharacterOptions: Record<any, any>;
    ModelName: string;
    DollName: string;
    CharacterName: string;
    PlaceName: string;
    SoundName: string;
    MusicName: string;
    FontName: string;
    MusicFiles: Record<string, string>;
    SpeechVidFiles: Record<string, string>;
    SoundFiles: Record<string, string>;
    PickupsInfo: any;
    AnyCameraName: string;
    AnySegmentName: string;
    AnySpotName: string;
    AnyTriggerName: string;
    PickupName: string;
    AnyAnimationName: string;
    SpeechVidName: string;
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
    StoryPartName: string;
}
export interface CustomAssetsTypes {
}
export interface CustomRepondHelpers {
}
export interface CustomPrendyStores {
}
export interface AssetsTypes extends Omit<AssetsTypesUntyped, keyof CustomAssetsTypes>, CustomAssetsTypes {
}
export interface RepondHelpers extends Omit<RepondHelpersUntyped, keyof CustomRepondHelpers>, CustomRepondHelpers {
}
export interface PrendyStores extends Omit<PrendyStoresUntyped, keyof CustomPrendyStores>, CustomPrendyStores {
}
export type PrendyAssets = {
    placeInfoByName: AssetsTypes["PlaceInfoByName"];
    modelInfoByName: AssetsTypes["ModelInfoByName"];
    dollOptions: AssetsTypes["DollOptions"];
    characterOptions: AssetsTypes["CharacterOptions"];
    placeNames: readonly AssetsTypes["PlaceName"][];
    modelNames: readonly AssetsTypes["ModelName"][];
    dollNames: readonly AssetsTypes["DollName"][];
    characterNames: readonly AssetsTypes["CharacterName"][];
    musicNames: readonly AssetsTypes["MusicName"][];
    soundNames: readonly AssetsTypes["SoundName"][];
    fontNames: readonly AssetsTypes["FontName"][];
    pickupsInfo: AssetsTypes["PickupsInfo"];
    musicFiles: AssetsTypes["MusicFiles"];
    soundFiles: AssetsTypes["SoundFiles"];
    speechVidFiles: AssetsTypes["SpeechVidFiles"];
    prendyOptions: AssetsTypes["PrendyOptions"];
};
export type MyTypes = {
    Types: AssetsTypes;
    Assets: PrendyAssets;
};
