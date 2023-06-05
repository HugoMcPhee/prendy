import {
  AnyCameraName,
  AnySegmentName,
  CameraNameByPlace,
  CharacterName,
  DollName,
  PlaceName,
  SpotNameByPlace,
} from "../../declarations";
import { PlaceholderPrendyStores, PrendyStoreHelpers } from "../../stores/typedStoreHelpers";
import { get_characterStoryUtils } from "./characters";
import { get_dollStoryUtils } from "./dolls";
import { get_sceneStoryUtils } from "./scene";
import { get_spotStoryUtils } from "./spots";

export function makePrendyStoryUtils<
  StoreHelpers extends PrendyStoreHelpers,
  PrendyStores extends PlaceholderPrendyStores,
  A_AnyCameraName extends AnyCameraName = AnyCameraName,
  A_AnySegmentName extends AnySegmentName = AnySegmentName,
  A_CameraNameByPlace extends CameraNameByPlace = CameraNameByPlace,
  A_PlaceName extends PlaceName = PlaceName,
  A_CharacterName extends CharacterName = CharacterName,
  A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace,
  A_DollName extends DollName = DollName
>(storeHelpers: StoreHelpers, _prendyStores: PrendyStores) {
  const { get2DAngleBetweenCharacters, get2DAngleFromCharacterToSpot } = get_characterStoryUtils<
    StoreHelpers,
    A_CharacterName,
    A_PlaceName,
    A_SpotNameByPlace
  >(storeHelpers);
  const { getModelNameFromDoll, get2DAngleBetweenDolls, get2DAngleFromDollToSpot } = get_dollStoryUtils<
    StoreHelpers,
    PrendyStores,
    A_DollName,
    A_PlaceName,
    A_SpotNameByPlace
  >(storeHelpers);
  const { doWhenNowCamChanges, doWhenNowSegmentChanges, getSegmentFromStoryRules } = get_sceneStoryUtils<
    StoreHelpers,
    A_AnyCameraName,
    A_AnySegmentName,
    A_CameraNameByPlace,
    A_PlaceName
  >(storeHelpers);
  const { getSpotPosition, getSpotRotation } = get_spotStoryUtils<StoreHelpers, A_PlaceName, A_SpotNameByPlace>(
    storeHelpers
  );

  return {
    // characters
    get2DAngleBetweenCharacters,
    get2DAngleFromCharacterToSpot,
    // dolls
    getModelNameFromDoll,
    get2DAngleBetweenDolls,
    get2DAngleFromDollToSpot,
    // scene
    doWhenNowCamChanges,
    doWhenNowSegmentChanges,
    getSegmentFromStoryRules,
    // spots
    getSpotPosition,
    getSpotRotation,
  };
}
