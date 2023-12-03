import { AbstractMesh } from "@babylonjs/core";
import { AllRefs, AllState, getRefs, getState } from "repond";
import { CharacterName, PlaceName, SpotNameByPlace } from "../../types";
import { get2DAngleBetweenDolls, get2DAngleFromDollToSpot } from "./dolls";

export function get2DAngleFromCharacterToSpot<T_Place extends PlaceName>(
  character: CharacterName,
  place: T_Place,
  spot: SpotNameByPlace[T_Place]
) {
  const charactersState = getState().characters;
  const dollA = charactersState[character].dollName;

  return get2DAngleFromDollToSpot(dollA, place, spot);
}

export function get2DAngleBetweenCharacters(charA: CharacterName, charB: CharacterName) {
  const charactersState = getState().characters;
  const dollA = charactersState[charA].dollName;
  const dollB = charactersState[charB].dollName;

  if (!dollA || !dollB) return 0;

  return get2DAngleBetweenDolls(dollA, dollB);
}

//  { get2DAngleFromCharacterToSpot, get2DAngleBetweenCharacters };
// }

// NOTE could have character start options as a type to get accurate return types
type DollStates = AllState["dolls"];
type DollRefs = AllRefs["dolls"];

export function getCharDollStuff<T_CharacterName extends CharacterName>(charName: T_CharacterName) {
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
}
// }
