import {
  AnyCameraName,
  AnySegmentName,
  CameraNameByPlace,
  CharacterName,
  DollName,
  PlaceName,
  PrendyStoreHelpers,
  PrendyStores,
  SpotNameByPlace,
} from "../../declarations";
import { get_getUsefulStoryStuff } from "../prendyRuleMakers/prendyRuleMakers";
import { get_characterStoryUtils } from "./characters";
import { get_dollStoryUtils } from "./dolls";
import { get_sceneStoryUtils } from "./scene";
import { get_spotStoryUtils } from "./spots";

export function makePrendyStoryUtils<
  A_AnyCameraName extends AnyCameraName = AnyCameraName,
  A_AnySegmentName extends AnySegmentName = AnySegmentName,
  A_CameraNameByPlace extends CameraNameByPlace = CameraNameByPlace,
  A_CharacterName extends CharacterName = CharacterName,
  A_DollName extends DollName = DollName,
  A_PlaceName extends PlaceName = PlaceName,
  A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers,
  A_PrendyStores extends PrendyStores = PrendyStores,
  A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace
>(storeHelpers: A_PrendyStoreHelpers, _prendyStores: A_PrendyStores) {
  const { get2DAngleBetweenCharacters, get2DAngleFromCharacterToSpot } = get_characterStoryUtils<
    A_CharacterName,
    A_DollName,
    A_PlaceName,
    A_PrendyStoreHelpers,
    A_PrendyStores,
    A_SpotNameByPlace
  >(storeHelpers);
  const { getModelNameFromDoll, get2DAngleBetweenDolls, get2DAngleFromDollToSpot } = get_dollStoryUtils<
    A_DollName,
    A_PlaceName,
    A_PrendyStoreHelpers,
    A_PrendyStores,
    A_SpotNameByPlace
  >(storeHelpers);
  const {
    doWhenNowCamChanges,
    doWhenNowSegmentChanges,
    getSegmentFromStoryRules,
    waitForNowPlaceToChange,
    waitForPlaceFullyLoaded,
    waitForNowCamToChange,
    waitForNextTick,
  } = get_sceneStoryUtils<A_AnyCameraName, A_AnySegmentName, A_CameraNameByPlace, A_PlaceName, A_PrendyStoreHelpers>(
    storeHelpers
  );
  const { getSpotPosition, getSpotRotation } = get_spotStoryUtils<A_PlaceName, A_PrendyStoreHelpers, A_SpotNameByPlace>(
    storeHelpers
  );
  const getUsefulStoryStuff = get_getUsefulStoryStuff(storeHelpers);
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
    waitForNowPlaceToChange,
    waitForPlaceFullyLoaded,
    waitForNowCamToChange,
    waitForNextTick,
    getUsefulStoryStuff,
    // spots
    getSpotPosition,
    getSpotRotation,
  };
}
