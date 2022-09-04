import {
  PrendyOptionsUntyped,
  DollOptionsPlaceholder,
  ModelInfoByNamePlaceholder,
  PlaceInfoByNamePlaceholder,
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

export interface FinalAssetsTypes extends Omit<AssetsTypesUntyped, keyof CustomAssetsTypes>, CustomAssetsTypes {}

export type PrendyOptions = FinalAssetsTypes["PrendyOptions"];
export type PlaceInfoByName = FinalAssetsTypes["PlaceInfoByName"];
export type ModelInfoByName = FinalAssetsTypes["ModelInfoByName"];
export type DollOptions = FinalAssetsTypes["DollOptions"];
export type CharacterOptions = FinalAssetsTypes["CharacterOptions"];
export type ModelName = FinalAssetsTypes["ModelName"];
export type DollName = FinalAssetsTypes["DollName"];
export type CharacterName = FinalAssetsTypes["CharacterName"];
export type AnyCameraName = FinalAssetsTypes["AnyCameraName"];
export type AnySegmentName = FinalAssetsTypes["AnySegmentName"];
export type AnySpotName = FinalAssetsTypes["AnySpotName"];
export type AnyTriggerName = FinalAssetsTypes["AnyTriggerName"];
export type PlaceName = FinalAssetsTypes["PlaceName"];
export type PickupName = FinalAssetsTypes["PickupName"];
export type AnyAnimationName = FinalAssetsTypes["AnyAnimationName"];
export type SoundName = FinalAssetsTypes["SoundName"];
export type MusicName = FinalAssetsTypes["MusicName"];
export type FontName = FinalAssetsTypes["FontName"];
export type SpeechVidName = FinalAssetsTypes["SpeechVidName"];
export type StoryPartName = FinalAssetsTypes["StoryPartName"];
export type CameraNameByPlace = FinalAssetsTypes["CameraNameByPlace"];
export type SoundspotNameByPlace = FinalAssetsTypes["SoundspotNameByPlace"];
export type SpotNameByPlace = FinalAssetsTypes["SpotNameByPlace"];
export type TriggerNameByPlace = FinalAssetsTypes["TriggerNameByPlace"];
export type WallNameByPlace = FinalAssetsTypes["WallNameByPlace"];
export type AnimationNameByModel = FinalAssetsTypes["AnimationNameByModel"];
export type BoneNameByModel = FinalAssetsTypes["BoneNameByModel"];
export type MaterialNameByModel = FinalAssetsTypes["MaterialNameByModel"];
export type MeshNameByModel = FinalAssetsTypes["MeshNameByModel"];
export type ModelNamesByPlaceLoose = FinalAssetsTypes["ModelNamesByPlaceLoose"];
export type SegmentNameByPlace = FinalAssetsTypes["SegmentNameByPlace"];
export type MusicFiles = FinalAssetsTypes["MusicFiles"];
export type SoundFiles = FinalAssetsTypes["SoundFiles"];
export type SpeechVidFiles = FinalAssetsTypes["SpeechVidFiles"];
export type PickupsInfo = FinalAssetsTypes["PickupsInfo"];

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
