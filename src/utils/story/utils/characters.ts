import { subtractPoints } from "shutils/dist/points2d";
import { getSpeedAndAngleFromVector } from "shutils/dist/speedAngleDistance2d";
import { BackdopConcepFuncs } from "../../../concepts/typedConcepFuncs";
import {
  CharacterName,
  PlaceName,
  SpotNameByPlace,
} from "../../../declarations";
//
import { makeSpotStoryUtils } from "../utils/spots";

export function makeCharacterStoryUtils<
  ConcepFuncs extends BackdopConcepFuncs,
  A_CharacterName extends CharacterName = CharacterName,
  A_PlaceName extends PlaceName = PlaceName,
  A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace
>(concepFuncs: ConcepFuncs) {
  const { getState } = concepFuncs;

  const { getSpotPosition } = makeSpotStoryUtils(concepFuncs);

  function get2DAngleFromCharacterToSpot<T_Place extends A_PlaceName>(
    character: A_CharacterName,
    place: T_Place,
    spot: A_SpotNameByPlace[T_Place]
  ) {
    const charactersState = getState().characters;
    const dollA = charactersState[character].dollName;

    const spotPosition = getSpotPosition(place, spot);

    if (!dollA || !spotPosition) return 0;

    const dollPos = getState().dolls[dollA].position;
    const dollPos2D = { x: dollPos.z, y: dollPos.x };
    const spotPos2D = { x: spotPosition.z, y: spotPosition.x };
    return getSpeedAndAngleFromVector(subtractPoints(dollPos2D, spotPos2D))
      .angle;
  }

  function get2DAngleBetweenCharacters(
    charA: A_CharacterName,
    charB: A_CharacterName
  ) {
    const charactersState = getState().characters;
    const dollA = charactersState[charA].dollName;
    const dollB = charactersState[charB].dollName;

    if (!dollA || !dollB) return 0;

    const dollAPos = getState().dolls[dollA].position;
    const dollBPos = getState().dolls[dollB].position;
    const dollAPos2D = { x: dollAPos.z, y: dollAPos.x };
    const dollBPos2D = { x: dollBPos.z, y: dollBPos.x };
    return getSpeedAndAngleFromVector(subtractPoints(dollAPos2D, dollBPos2D))
      .angle;
  }

  return { get2DAngleFromCharacterToSpot, get2DAngleBetweenCharacters };
}
