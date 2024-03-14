import { AbstractMesh, Sound, Vector3 } from "@babylonjs/core";
import { MyTypes } from "./declarations";
import { AllRefs, AllState, getRefs, getState } from "repond";
import { getUsefulStoryStuff } from "./helpers/prendyRuleMakers/prendyRuleMakers";

export type DollName = MyTypes["Types"]["DollName"];
export type ModelName = MyTypes["Types"]["ModelName"];
export type AnyAnimationName = MyTypes["Types"]["AnyAnimationName"];
export type CameraNameByPlace = MyTypes["Types"]["CameraNameByPlace"];
export type CharacterName = MyTypes["Types"]["CharacterName"];
export type ModelNamesByPlaceLoose = MyTypes["Types"]["ModelNamesByPlaceLoose"];
export type PickupName = MyTypes["Types"]["PickupName"];
export type PlaceName = MyTypes["Types"]["PlaceName"];
export type SegmentNameByPlace = MyTypes["Types"]["SegmentNameByPlace"];
export type SpotNameByPlace = MyTypes["Types"]["SpotNameByPlace"];
export type TriggerNameByPlace = MyTypes["Types"]["TriggerNameByPlace"];
export type AnyTriggerName = MyTypes["Types"]["AnyTriggerName"];
export type PlaceInfoByName = MyTypes["Types"]["PlaceInfoByName"];
export type SpeechVidFiles = MyTypes["Types"]["SpeechVidFiles"];
export type AnyCameraName = MyTypes["Types"]["AnyCameraName"];
export type CharacterOptions = MyTypes["Types"]["CharacterOptions"];
export type SoundspotNameByPlace = MyTypes["Types"]["SoundspotNameByPlace"];
export type WallNameByPlace = MyTypes["Types"]["WallNameByPlace"];
export type FontName = MyTypes["Types"]["FontName"];
export type SpeechVidName = MyTypes["Types"]["SpeechVidName"];
export type AnimationNameByModel = MyTypes["Types"]["AnimationNameByModel"];
export type AnySpotName = MyTypes["Types"]["AnySpotName"];
export type BoneNameByModel = MyTypes["Types"]["BoneNameByModel"];
export type DollOptions = MyTypes["Types"]["DollOptions"];
export type MaterialNameByModel = MyTypes["Types"]["MaterialNameByModel"];
export type MeshNameByModel = MyTypes["Types"]["MeshNameByModel"];
export type ModelNameFromDoll<T_DollName extends DollName> = DollOptions[T_DollName]["model"];
export type MeshNamesFromDoll<T_DollName extends DollName> = MeshNameByModel[ModelNameFromDoll<T_DollName>];
export type AnySegmentName = MyTypes["Types"]["AnySegmentName"];
export type SoundName = MyTypes["Types"]["SoundName"];
export type MusicName = MyTypes["Types"]["MusicName"];

export type SegmentNameFromCameraAndPlace<
  T_Place extends keyof PlaceInfoByName,
  T_Cam extends keyof PlaceInfoByName[T_Place]["segmentTimesByCamera"]
> = keyof PlaceInfoByName[T_Place]["segmentTimesByCamera"][T_Cam];

// Store types
export type StoryState = AllState["story"]["main"];
export type StoryRefs = AllRefs["story"]["main"];
export type GlobalState = AllState["global"]["main"];

export type AllPlacesState = AllState["places"];
export type AllPlacesRefs = AllRefs["places"];

export type APlaceRefs = AllPlacesRefs[keyof AllPlacesRefs];
export type APlaceRefsCamsRefs = APlaceRefs["camsRefs"];

// export type SpeechBubbleName = keyof AllState["speechBubbles"];
export type SpeechBubbleName = keyof AllState["speechBubbles"] extends never ? string : keyof AllState["speechBubbles"];

// Helper types
export type CameraNameFromPlace<T_Place extends keyof PlaceInfoByName> =
  keyof PlaceInfoByName[T_Place]["segmentTimesByCamera"];
export type DollNameFromCharacter<T_CharacterName extends CharacterName> = CharacterOptions[T_CharacterName]["doll"];
export type ModelNameFromCharacter<T_CharacterName extends CharacterName> = ModelNameFromDoll<
  DollNameFromCharacter<T_CharacterName>
>;
export type AnimationNameFromCharacter<T_CharacterName extends CharacterName> =
  AnimationNameByModel[ModelNameFromCharacter<T_CharacterName>];

export type SpotPositions<T_PlaceName extends PlaceName> = {
  [P_SpotName in SpotNameByPlace[T_PlaceName]]: Vector3;
};
export type SpotRotations<T_PlaceName extends PlaceName> = {
  [P_SpotName in SpotNameByPlace[T_PlaceName]]: Vector3;
};
export type SoundspotSounds<T_PlaceName extends PlaceName> = {
  [P_SoundName in SoundspotNameByPlace[T_PlaceName]]: Sound | null;
};
export type TriggerMeshes<T_PlaceName extends PlaceName> = {
  [P_TriggerName in TriggerNameByPlace[T_PlaceName]]: AbstractMesh | null;
};
export type WallMeshes<T_PlaceName extends PlaceName> = {
  [P_WallName in WallNameByPlace[T_PlaceName]]: AbstractMesh | null;
};

export type StoryCallback = (usefulStuff: ReturnType<typeof getUsefulStoryStuff>) => void;
