import {
  PrendyOptionsUntyped,
  DollOptionsPlaceholder,
  ModelInfoByNamePlaceholder,
  PlaceInfoByNamePlaceholder,
  PrendyStoreHelpersUntyped,
  PrendyStoresUntyped,
} from "./stores/typedStoreHelpers";

export default "default";

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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomAssetsTypes {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomStoreHelpers {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomPrendyStores {}

// The final usable assets types, with the custom types overriding the default ones
export interface AssetsTypes extends Omit<AssetsTypesUntyped, keyof CustomAssetsTypes>, CustomAssetsTypes {}
// The final usable store helpers types, with the custom types overriding the default ones
export interface PrendyStoreHelpers
  extends Omit<PrendyStoreHelpersUntyped, keyof CustomStoreHelpers>,
    CustomStoreHelpers {}
// The final usable store types, with the custom types overriding the default ones
export interface PrendyStores extends Omit<PrendyStoresUntyped, keyof CustomPrendyStores>, CustomPrendyStores {}

// NOTE these shouldn't be used directly, since they get compiled to the basic default (non custom project) types
// use a generic T_AssetsTypes , and get types from that to keep custom per project types
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

// NOTE generic types are used to prevent the typescript compiler simplifying types
// like Record<PlaceName, Something> to Record<string, Something>
// the types are updated from each project (declaration merging)
// This collect all the custom types into one, so a single generic parameter can be used in prendy functions
// like example<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"])

export type MyTypes = {
  Main: AssetsTypes;
  StoreHelpers: PrendyStoreHelpers;
  Stores: PrendyStores;
  Assets: PrendyAssets;
};
