import { PrendyStoreHelpers, PlaceholderPrendyStores } from "../../../stores/typedStoreHelpers";
import {
  AnyCameraName,
  AnySegmentName,
  CameraNameByPlace,
  CharacterName,
  DollName,
  PlaceName,
  SpotNameByPlace,
} from "../../../declarations";
import { makeTyped_characterStoryUtils } from "./characters";
import { makeTyped_dollStoryUtils } from "./dolls";
import { makeTyped_sceneStoryUtils } from "./scene";
import { makeTyped_spotStoryUtils } from "./spots";

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
  const { get2DAngleBetweenCharacters, get2DAngleFromCharacterToSpot } = makeTyped_characterStoryUtils<
    StoreHelpers,
    A_CharacterName,
    A_PlaceName,
    A_SpotNameByPlace
  >(storeHelpers);
  const { getModelNameFromDoll, get2DAngleBetweenDolls, get2DAngleFromDollToSpot } = makeTyped_dollStoryUtils<
    StoreHelpers,
    PrendyStores,
    A_DollName,
    A_PlaceName,
    A_SpotNameByPlace
  >(storeHelpers);
  const { doWhenNowCamChanges, doWhenNowSegmentChanges, getSegmentFromStoryRules } = makeTyped_sceneStoryUtils<
    StoreHelpers,
    A_AnyCameraName,
    A_AnySegmentName,
    A_CameraNameByPlace,
    A_PlaceName
  >(storeHelpers);
  const { getSpotPosition, getSpotRotation } = makeTyped_spotStoryUtils<StoreHelpers, A_PlaceName, A_SpotNameByPlace>(
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
