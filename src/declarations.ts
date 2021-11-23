import {
  PrendyOptionsUntyped,
  DollOptionsPlaceholder,
  ModelInfoByNamePlaceholder,
  PlaceInfoByNamePlaceholder,
} from "./concepts/typedConcepFuncs";

export default "default";

export interface ArtTypesUntyped {
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
export interface CustomArtTypes {}

export interface FinalArtTypes
  extends Omit<ArtTypesUntyped, keyof CustomArtTypes>,
    CustomArtTypes {}

export type PrendyOptions = FinalArtTypes["PrendyOptions"];
export type PlaceInfoByName = FinalArtTypes["PlaceInfoByName"];
export type ModelInfoByName = FinalArtTypes["ModelInfoByName"];
export type DollOptions = FinalArtTypes["DollOptions"];
export type CharacterOptions = FinalArtTypes["CharacterOptions"];
export type ModelName = FinalArtTypes["ModelName"];
export type DollName = FinalArtTypes["DollName"];
export type CharacterName = FinalArtTypes["CharacterName"];
export type AnyCameraName = FinalArtTypes["AnyCameraName"];
export type AnySegmentName = FinalArtTypes["AnySegmentName"];
export type AnySpotName = FinalArtTypes["AnySpotName"];
export type AnyTriggerName = FinalArtTypes["AnyTriggerName"];
export type PlaceName = FinalArtTypes["PlaceName"];
export type PickupName = FinalArtTypes["PickupName"];
export type AnyAnimationName = FinalArtTypes["AnyAnimationName"];
export type SoundName = FinalArtTypes["SoundName"];
export type MusicName = FinalArtTypes["MusicName"];
export type FontName = FinalArtTypes["FontName"];
export type SpeechVidName = FinalArtTypes["SpeechVidName"];
export type StoryPartName = FinalArtTypes["StoryPartName"];
export type CameraNameByPlace = FinalArtTypes["CameraNameByPlace"];
export type SoundspotNameByPlace = FinalArtTypes["SoundspotNameByPlace"];
export type SpotNameByPlace = FinalArtTypes["SpotNameByPlace"];
export type TriggerNameByPlace = FinalArtTypes["TriggerNameByPlace"];
export type WallNameByPlace = FinalArtTypes["WallNameByPlace"];
export type AnimationNameByModel = FinalArtTypes["AnimationNameByModel"];
export type BoneNameByModel = FinalArtTypes["BoneNameByModel"];
export type MaterialNameByModel = FinalArtTypes["MaterialNameByModel"];
export type MeshNameByModel = FinalArtTypes["MeshNameByModel"];
export type ModelNamesByPlaceLoose = FinalArtTypes["ModelNamesByPlaceLoose"];
export type SegmentNameByPlace = FinalArtTypes["SegmentNameByPlace"];
export type MusicFiles = FinalArtTypes["MusicFiles"];
export type SoundFiles = FinalArtTypes["SoundFiles"];
export type SpeechVidFiles = FinalArtTypes["SpeechVidFiles"];
export type PickupsInfo = FinalArtTypes["PickupsInfo"];

export type PrendyArt = {
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
