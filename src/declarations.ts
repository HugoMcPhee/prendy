import {
  DollOptionsPlaceholder,
  ModelInfoByNamePlaceholder,
  PlaceInfoByNamePlaceholder,
  PrendyOptionsUntyped,
} from "./stores/typedStoreHelpers";

export interface AssetsTypesUntyped {
  // Directly used for asset types
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
  // Only used as type helpers
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
  // TODO remove these
  StoryPartName: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomAssetsTypes {}

// The final usable assets types, with the custom types overriding the default ones
export interface AssetsTypes extends Omit<AssetsTypesUntyped, keyof CustomAssetsTypes>, CustomAssetsTypes {}

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

// NOTE
// the types are updated from each project (declaration merging)

export type MyTypes = {
  Types: AssetsTypes;
  Assets: PrendyAssets;
};
