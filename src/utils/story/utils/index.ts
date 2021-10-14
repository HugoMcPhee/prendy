import {
  GameyConceptoFuncs,
  PlaceholderGameyConcepts,
} from "../../../concepts/typedConceptoFuncs";
import { makeCharacterStoryUtils } from "./characters";
import { makeDollStoryUtils } from "./dolls";
import { makeSceneStoryUtils } from "./scene";
import { makeSpotStoryUtils } from "./spots";

export function makeGameyStoryUtils<
  ConceptoFuncs extends GameyConceptoFuncs,
  GameyConcepts extends PlaceholderGameyConcepts,
  DollName extends string,
  PlaceName extends string,
  CharacterName extends string,
  AnyCameraName extends string,
  AnySegmentName extends string,
  CameraNameByPlace extends Record<PlaceName, string>,
  SpotNameByPlace extends Record<PlaceName, string>
>(conceptoFuncs: ConceptoFuncs, gameyConcepts: GameyConcepts) {
  const {
    get2DAngleBetweenCharacters,
    get2DAngleFromCharacterToSpot,
  } = makeCharacterStoryUtils<
    ConceptoFuncs,
    PlaceName,
    CharacterName,
    SpotNameByPlace
  >(conceptoFuncs);
  const { getModelNameFromDoll } = makeDollStoryUtils<
    ConceptoFuncs,
    GameyConcepts,
    DollName
  >(conceptoFuncs, gameyConcepts);
  const {
    doWhenNowCamChanges,
    doWhenNowSegmentChanges,
    getSegmentFromStoryRules,
  } = makeSceneStoryUtils<
    ConceptoFuncs,
    AnyCameraName,
    AnySegmentName,
    PlaceName,
    CameraNameByPlace
  >(conceptoFuncs);
  const { getSpotPosition, getSpotRotation } = makeSpotStoryUtils<
    ConceptoFuncs,
    PlaceName,
    SpotNameByPlace
  >(conceptoFuncs);

  return {
    // characters
    get2DAngleBetweenCharacters,
    get2DAngleFromCharacterToSpot,
    // dolls
    getModelNameFromDoll,
    // scene
    doWhenNowCamChanges,
    doWhenNowSegmentChanges,
    getSegmentFromStoryRules,
    // spots
    getSpotPosition,
    getSpotRotation,
  };
}
