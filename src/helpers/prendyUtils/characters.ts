import { AbstractMesh } from "@babylonjs/core";
import { MyTypes } from "../../declarations";
import { meta } from "../../meta";
import { get2DAngleBetweenDolls, get2DAngleFromDollToSpot } from "./dolls";

// export export function get_characterStoryUtils<MyTypes extends MyTypes = MyTypes>(storeHelpers: MyTypes["Repond"]) {
type CharacterName = MyTypes["Types"]["CharacterName"];
type DollName = MyTypes["Types"]["DollName"];
type PlaceName = MyTypes["Types"]["PlaceName"];
type PrendyStoreHelpers = MyTypes["Repond"];
type PrendyStores = MyTypes["Stores"];
type SpotNameByPlace = MyTypes["Types"]["SpotNameByPlace"];

export function get2DAngleFromCharacterToSpot<T_Place extends PlaceName>(
  character: CharacterName,
  place: T_Place,
  spot: SpotNameByPlace[T_Place]
) {
  const { getState } = meta.repond!;

  const charactersState = getState().characters;
  const dollA = charactersState[character].dollName;

  return get2DAngleFromDollToSpot(dollA, place, spot);
}

export function get2DAngleBetweenCharacters(charA: CharacterName, charB: CharacterName) {
  const { getState } = meta.repond!;

  const charactersState = getState().characters;
  const dollA = charactersState[charA].dollName;
  const dollB = charactersState[charB].dollName;

  if (!dollA || !dollB) return 0;

  return get2DAngleBetweenDolls(dollA, dollB);
}

//  { get2DAngleFromCharacterToSpot, get2DAngleBetweenCharacters };
// }

// export export function get_getCharDollStuff<MyTypes extends MyTypes = MyTypes>(storeHelpers: MyTypes["Repond"]) {
// type PrendyStoreHelpers = MyTypes["Repond"];
// type CharacterName = MyTypes["Types"]["CharacterName"];

// NOTE could have character start options as a type to get accurate return types
type DollStates = ReturnType<PrendyStoreHelpers["getState"]>["dolls"];
type DollRefs = ReturnType<PrendyStoreHelpers["getRefs"]>["dolls"];

export function getCharDollStuff<T_CharacterName extends CharacterName>(charName: T_CharacterName) {
  const { getRefs, getState } = meta.repond!;

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
