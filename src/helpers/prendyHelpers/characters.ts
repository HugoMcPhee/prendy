import { Vector3 } from "@babylonjs/core";
import { get2DAngleBetweenCharacters, getCharDollStuff } from "../../helpers/prendyUtils/characters";
import { meta } from "../../meta";
import { AnimationNameFromCharacter, CharacterName, DollName } from "../../types";
import { getGlobalState } from "../prendyUtils/global";
import {
  moveDollAt2DAngle,
  setDollAnimation,
  setDollPosition,
  setDollRotationY,
  springAddToDollRotationY,
  springDollRotationY,
} from "./dolls";

export function setCharAnimation<T_Character extends CharacterName>(
  character: T_Character,
  animation: AnimationNameFromCharacter<T_Character> // AnimationNameFromModel might keep the type better
) {
  const { dollName } = getCharDollStuff(character);
  setDollAnimation(dollName as DollName, animation as any);
}

export function setCharPosition(charName: CharacterName, newPosition: Vector3) {
  const { dollName } = getCharDollStuff(charName);
  setDollPosition(dollName as DollName, newPosition);
}

export function setCharRotationY(charName: CharacterName, newRotationY: number) {
  const { dollName } = getCharDollStuff(charName);
  setDollRotationY(dollName as DollName, newRotationY);
}

export function springCharRotation(charName: CharacterName, newRotationY: number) {
  const { dollName } = getCharDollStuff(charName);
  springDollRotationY(dollName as DollName, newRotationY);
}

export function springAddToCharRotationY(charName: CharacterName, addedRotation: number) {
  const { dollName } = getCharDollStuff(charName);
  springAddToDollRotationY(dollName as DollName, addedRotation);
}

export function lookAtOtherCharacter(
  charA: CharacterName,
  charB?: CharacterName // defaults to playerChaarcter
) {
  // NOTE could be async
  const { playerCharacter } = getGlobalState();
  const editedCharB = charB ?? (playerCharacter as CharacterName);
  const { dollName } = getCharDollStuff(editedCharB);

  const angle = get2DAngleBetweenCharacters(editedCharB, charA);
  springDollRotationY(dollName as DollName, angle);
}

export function lookAtEachother(characterA: CharacterName, characterBParam: CharacterName) {
  const characterB = characterBParam || meta.assets!.characterNames[0];
  lookAtOtherCharacter(characterA, characterB);
  lookAtOtherCharacter(characterB, characterA);
}

export function moveCharacterAt2DAngle(charName: CharacterName, angle: number) {
  const { dollName } = getCharDollStuff(charName);
  moveDollAt2DAngle(dollName as DollName, angle);
}

// }
