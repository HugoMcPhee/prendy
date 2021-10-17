import {
  BackdopConcepFuncs,
  PlaceholderBackdopConcepts,
} from "../../../concepts/typedConcepFuncs";
import { makeCharacterStoryUtils } from "./characters";
import { makeDollStoryUtils } from "./dolls";
import { makeSceneStoryUtils } from "./scene";
import { makeSpotStoryUtils } from "./spots";

export function makeBackdopStoryUtils<
  ConcepFuncs extends BackdopConcepFuncs,
  BackdopConcepts extends PlaceholderBackdopConcepts,
  DollName extends string,
  PlaceName extends string,
  CharacterName extends string,
  AnyCameraName extends string,
  AnySegmentName extends string,
  CameraNameByPlace extends Record<PlaceName, string>,
  SpotNameByPlace extends Record<PlaceName, string>
>(concepFuncs: ConcepFuncs, backdopConcepts: BackdopConcepts) {
  const {
    get2DAngleBetweenCharacters,
    get2DAngleFromCharacterToSpot,
  } = makeCharacterStoryUtils<
    ConcepFuncs,
    PlaceName,
    CharacterName,
    SpotNameByPlace
  >(concepFuncs);
  const { getModelNameFromDoll } = makeDollStoryUtils<
    ConcepFuncs,
    BackdopConcepts,
    DollName
  >(concepFuncs, backdopConcepts);
  const {
    doWhenNowCamChanges,
    doWhenNowSegmentChanges,
    getSegmentFromStoryRules,
  } = makeSceneStoryUtils<
    ConcepFuncs,
    AnyCameraName,
    AnySegmentName,
    PlaceName,
    CameraNameByPlace
  >(concepFuncs);
  const { getSpotPosition, getSpotRotation } = makeSpotStoryUtils<
    ConcepFuncs,
    PlaceName,
    SpotNameByPlace
  >(concepFuncs);

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
