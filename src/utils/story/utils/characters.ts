import { subtractPoints } from "chootils/dist/points2d";
import { getSpeedAndAngleFromVector } from "chootils/dist/speedAngleDistance2d";
import { PrendyStoreHelpers } from "../../../stores/typedStoreHelpers";
import {
  CharacterName,
  PlaceName,
  SpotNameByPlace,
} from "../../../declarations";
//
import { makeSpotStoryUtils } from "../utils/spots";
import { makeDollStoryUtils } from "./dolls";

export function makeCharacterStoryUtils<
  StoreHelpers extends PrendyStoreHelpers,
  A_CharacterName extends CharacterName = CharacterName,
  A_PlaceName extends PlaceName = PlaceName,
  A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace
>(storeHelpers: StoreHelpers) {
  const { getState } = storeHelpers;

  // const { getSpotPosition } = makeSpotStoryUtils(storeHelpers);
  const {
    get2DAngleBetweenDolls,
    get2DAngleFromDollToSpot,
  } = makeDollStoryUtils(storeHelpers);

  function get2DAngleFromCharacterToSpot<T_Place extends A_PlaceName>(
    character: A_CharacterName,
    place: T_Place,
    spot: A_SpotNameByPlace[T_Place]
  ) {
    const charactersState = getState().characters;
    const dollA = charactersState[character].dollName;

    return get2DAngleFromDollToSpot(dollA, place, spot);
  }

  // TODO use get2DAngleBetweenDolls from makeDollStoryUtils
  function get2DAngleBetweenCharacters(
    charA: A_CharacterName,
    charB: A_CharacterName
  ) {
    const charactersState = getState().characters;
    const dollA = charactersState[charA].dollName;
    const dollB = charactersState[charB].dollName;

    if (!dollA || !dollB) return 0;

    return get2DAngleBetweenDolls(dollA, dollB);
  }

  return { get2DAngleFromCharacterToSpot, get2DAngleBetweenCharacters };
}
