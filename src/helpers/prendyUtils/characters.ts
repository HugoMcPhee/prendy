import { AbstractMesh } from "@babylonjs/core";
import { CharacterName, PlaceName, PrendyStoreHelpers, SpotNameByPlace } from "../../declarations";
import { get_dollStoryUtils } from "./dolls";

export function get_characterStoryUtils(storeHelpers: PrendyStoreHelpers) {
  const { getState } = storeHelpers;
  const { get2DAngleBetweenDolls, get2DAngleFromDollToSpot } = get_dollStoryUtils(storeHelpers);

  function get2DAngleFromCharacterToSpot<T_Place extends PlaceName>(
    character: CharacterName,
    place: T_Place,
    spot: SpotNameByPlace[T_Place]
  ) {
    const charactersState = getState().characters;
    const dollA = charactersState[character].dollName;

    return get2DAngleFromDollToSpot(dollA, place, spot);
  }

  function get2DAngleBetweenCharacters(charA: CharacterName, charB: CharacterName) {
    const charactersState = getState().characters;
    const dollA = charactersState[charA].dollName;
    const dollB = charactersState[charB].dollName;

    if (!dollA || !dollB) return 0;

    return get2DAngleBetweenDolls(dollA, dollB);
  }

  return { get2DAngleFromCharacterToSpot, get2DAngleBetweenCharacters };
}

export function get_getCharDollStuff(storeHelpers: PrendyStoreHelpers) {
  const { getRefs, getState } = storeHelpers;

  // NOTE could have character start options as a type to get accurate return types
  type DollStates = ReturnType<PrendyStoreHelpers["getState"]>["dolls"];
  type DollRefs = ReturnType<PrendyStoreHelpers["getRefs"]>["dolls"];

  return function getCharDollStuff<T_CharacterName extends CharacterName>(charName: T_CharacterName) {
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
