import {
  PrendyConcepFuncs,
  PlaceholderPrendyConcepts,
} from "../../../concepts/typedConcepFuncs";
import {
  AnyCameraName,
  AnySegmentName,
  CameraNameByPlace,
  CharacterName,
  DollName,
  PlaceName,
  SpotNameByPlace,
} from "../../../declarations";
import { makeCharacterStoryUtils } from "./characters";
import { makeDollStoryUtils } from "./dolls";
import { makeSceneStoryUtils } from "./scene";
import { makeSpotStoryUtils } from "./spots";

export function makePrendyStoryUtils<
  ConcepFuncs extends PrendyConcepFuncs,
  PrendyConcepts extends PlaceholderPrendyConcepts,
  A_AnyCameraName extends AnyCameraName = AnyCameraName,
  A_AnySegmentName extends AnySegmentName = AnySegmentName,
  A_CameraNameByPlace extends CameraNameByPlace = CameraNameByPlace,
  A_PlaceName extends PlaceName = PlaceName,
  A_CharacterName extends CharacterName = CharacterName,
  A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace,
  A_DollName extends DollName = DollName
>(concepFuncs: ConcepFuncs, _prendyConcepts: PrendyConcepts) {
  const {
    get2DAngleBetweenCharacters,
    get2DAngleFromCharacterToSpot,
  } = makeCharacterStoryUtils<
    ConcepFuncs,
    A_CharacterName,
    A_PlaceName,
    A_SpotNameByPlace
  >(concepFuncs);
  const { getModelNameFromDoll } = makeDollStoryUtils<
    ConcepFuncs,
    PrendyConcepts,
    A_DollName
  >(concepFuncs);
  const {
    doWhenNowCamChanges,
    doWhenNowSegmentChanges,
    getSegmentFromStoryRules,
  } = makeSceneStoryUtils<
    ConcepFuncs,
    A_AnyCameraName,
    A_AnySegmentName,
    A_CameraNameByPlace,
    A_PlaceName
  >(concepFuncs);
  const { getSpotPosition, getSpotRotation } = makeSpotStoryUtils<
    ConcepFuncs,
    A_PlaceName,
    A_SpotNameByPlace
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
