import { Vector3 } from "@babylonjs/core";
import { MyTypes } from "../../declarations";
import { get2DAngleBetweenCharacters, getCharDollStuff } from "../../helpers/prendyUtils/characters";
import { getGlobalState } from "../prendyUtils/global";
import {
  setDollAnimation,
  setDollPosition,
  setDollRotationY,
  springDollRotationY,
  springAddToDollRotationY,
  moveDollAt2DAngle,
} from "./dolls";
import { meta } from "../../meta";

// export export function get_characterStoryHelpers<MyTypes extends MyTypes = MyTypes>() {
type AnimationNameByModel = MyTypes["Types"]["AnimationNameByModel"];
type CharacterName = MyTypes["Types"]["CharacterName"];
type CharacterOptions = MyTypes["Types"]["CharacterOptions"];
type DollName = MyTypes["Types"]["DollName"];
type DollOptions = MyTypes["Types"]["DollOptions"];

type DollNameFromCharacter<T_CharacterName extends CharacterName> = CharacterOptions[T_CharacterName]["doll"];

type ModelNameFromDoll<T_DollName extends DollName> = DollOptions[T_DollName]["model"];

type ModelNameFromCharacter<T_CharacterName extends CharacterName> = ModelNameFromDoll<
  DollNameFromCharacter<T_CharacterName>
>;

type AnimationNameFromCharacter<T_CharacterName extends CharacterName> =
  AnimationNameByModel[ModelNameFromCharacter<T_CharacterName>];

// const { modelInfoByName, characterNames } = prendyAssets;

// const getCharDollStuff = get_getCharDollStuff(storeHelpers);
// const { get2DAngleBetweenCharacters } = get_characterStoryUtils<MyTypes>(storeHelpers);

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

export function lookAtEachother(characterA: CharacterName, characterB: CharacterName = meta.assets!.characterNames[0]) {
  lookAtOtherCharacter(characterA, characterB);
  lookAtOtherCharacter(characterB, characterA);
}

export function moveCharacterAt2DAngle(charName: CharacterName, angle: number) {
  const { dollName } = getCharDollStuff(charName);
  moveDollAt2DAngle(dollName as DollName, angle);
}

// }
