import {
  PrendyStoreHelpers,
  PlaceholderPrendyConcepts,
} from "../../../stores/typedStoreHelpers";
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
  StoreHelpers extends PrendyStoreHelpers,
  PrendyConcepts extends PlaceholderPrendyConcepts,
  A_AnyCameraName extends AnyCameraName = AnyCameraName,
  A_AnySegmentName extends AnySegmentName = AnySegmentName,
  A_CameraNameByPlace extends CameraNameByPlace = CameraNameByPlace,
  A_PlaceName extends PlaceName = PlaceName,
  A_CharacterName extends CharacterName = CharacterName,
  A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace,
  A_DollName extends DollName = DollName
>(storeHelpers: StoreHelpers, _prendyConcepts: PrendyConcepts) {
  const {
    get2DAngleBetweenCharacters,
    get2DAngleFromCharacterToSpot,
  } = makeCharacterStoryUtils<
    StoreHelpers,
    A_CharacterName,
    A_PlaceName,
    A_SpotNameByPlace
  >(storeHelpers);
  const { getModelNameFromDoll } = makeDollStoryUtils<
    StoreHelpers,
    PrendyConcepts,
    A_DollName
  >(storeHelpers);
  const {
    doWhenNowCamChanges,
    doWhenNowSegmentChanges,
    getSegmentFromStoryRules,
  } = makeSceneStoryUtils<
    StoreHelpers,
    A_AnyCameraName,
    A_AnySegmentName,
    A_CameraNameByPlace,
    A_PlaceName
  >(storeHelpers);
  const { getSpotPosition, getSpotRotation } = makeSpotStoryUtils<
    StoreHelpers,
    A_PlaceName,
    A_SpotNameByPlace
  >(storeHelpers);

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
