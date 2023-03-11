import { subtractPoints } from "chootils/dist/points2d";
import { getSpeedAndAngleFromVector } from "chootils/dist/speedAngleDistance2d";
import { PrendyStoreHelpers } from "../../stores/typedStoreHelpers";
import { CharacterName, PlaceName, SpotNameByPlace } from "../../declarations";
import { get_spotStoryUtils } from "./spots";
import { get_dollStoryUtils } from "./dolls";
import { AbstractMesh } from "@babylonjs/core";

export function get_characterStoryUtils<
  StoreHelpers extends PrendyStoreHelpers,
  A_CharacterName extends CharacterName = CharacterName,
  A_PlaceName extends PlaceName = PlaceName,
  A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace
>(storeHelpers: StoreHelpers) {
  const { getState } = storeHelpers;

  // const { getSpotPosition } = makeSpotStoryUtils(storeHelpers);
  const { get2DAngleBetweenDolls, get2DAngleFromDollToSpot } = get_dollStoryUtils(storeHelpers);

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
  function get2DAngleBetweenCharacters(charA: A_CharacterName, charB: A_CharacterName) {
    const charactersState = getState().characters;
    const dollA = charactersState[charA].dollName;
    const dollB = charactersState[charB].dollName;

    if (!dollA || !dollB) return 0;

    return get2DAngleBetweenDolls(dollA, dollB);
  }

  return { get2DAngleFromCharacterToSpot, get2DAngleBetweenCharacters };
}

export function get_getCharDollStuff<
  StoreHelpers extends PrendyStoreHelpers,
  A_CharacterName extends CharacterName = CharacterName
>(storeHelpers: StoreHelpers) {
  const { getRefs, getState } = storeHelpers;

  // NOTE could have character start options as a type to get accurate return types
  type DollStates = ReturnType<StoreHelpers["getState"]>["dolls"];
  type DollRefs = ReturnType<StoreHelpers["getRefs"]>["dolls"];

  return function getCharDollStuff<T_CharacterName extends A_CharacterName>(charName: T_CharacterName) {
    if (!getState().characters[charName]) {
      console.log("charName", charName);
      console.log(getState().characters);
    }

    const { dollName } = getState().characters[charName];
    const dollState = getState().dolls[dollName];
    const dollRefs = getRefs().dolls[dollName];
    const { meshRef } = dollRefs;

    return {
      dollName: dollName as keyof DollStates,
      meshRef: meshRef as AbstractMesh | null,
      dollRefs: dollRefs as DollRefs[keyof DollRefs],
      dollState: dollState as DollStates[keyof DollStates],
    };
  };
}
