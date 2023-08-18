import { Vector3 } from "@babylonjs/core";
import { MyTypes } from "../../declarations";
import { get_characterStoryUtils, get_getCharDollStuff } from "../../helpers/prendyUtils/characters";
import { get_globalUtils } from "../../helpers/prendyUtils/global";
import { get_dollStoryHelpers } from "./dolls";

export function get_characterStoryHelpers<T_MyTypes extends MyTypes = MyTypes>(
  prendyAssets: T_MyTypes["Assets"],
  storeHelpers: T_MyTypes["StoreHelpers"]
) {
  type AnimationNameByModel = T_MyTypes["Main"]["AnimationNameByModel"];
  type CharacterName = T_MyTypes["Main"]["CharacterName"];
  type CharacterOptions = T_MyTypes["Main"]["CharacterOptions"];
  type DollName = T_MyTypes["Main"]["DollName"];
  type DollOptions = T_MyTypes["Main"]["DollOptions"];

  type DollNameFromCharacter<T_CharacterName extends CharacterName> = CharacterOptions[T_CharacterName]["doll"];

  type ModelNameFromDoll<T_DollName extends DollName> = DollOptions[T_DollName]["model"];

  type ModelNameFromCharacter<T_CharacterName extends CharacterName> = ModelNameFromDoll<
    DollNameFromCharacter<T_CharacterName>
  >;

  type AnimationNameFromCharacter<T_CharacterName extends CharacterName> =
    AnimationNameByModel[ModelNameFromCharacter<T_CharacterName>];

  const { modelInfoByName, characterNames } = prendyAssets;

  const { getGlobalState } = get_globalUtils(storeHelpers);
  const getCharDollStuff = get_getCharDollStuff(storeHelpers);
  const { get2DAngleBetweenCharacters } = get_characterStoryUtils<T_MyTypes>(storeHelpers);

  const {
    moveDollAt2DAngle,
    setDollAnimation,
    setDollPosition,
    setDollRotationY,
    springAddToDollRotationY,
    springDollRotationY,
  } = get_dollStoryHelpers(prendyAssets, storeHelpers);

  function setCharAnimation<T_Character extends CharacterName>(
    character: T_Character,
    animation: AnimationNameFromCharacter<T_Character> // AnimationNameFromModel might keep the type better
  ) {
    const { dollName } = getCharDollStuff(character);
    setDollAnimation(dollName as DollName, animation as any);
  }

  function setCharPosition(charName: CharacterName, newPosition: Vector3) {
    const { dollName } = getCharDollStuff(charName);
    setDollPosition(dollName as DollName, newPosition);
  }

  function setCharRotationY(charName: CharacterName, newRotationY: number) {
    const { dollName } = getCharDollStuff(charName);
    setDollRotationY(dollName as DollName, newRotationY);
  }

  function springCharRotation(charName: CharacterName, newRotationY: number) {
    const { dollName } = getCharDollStuff(charName);
    springDollRotationY(dollName as DollName, newRotationY);
  }

  function springAddToCharRotationY(charName: CharacterName, addedRotation: number) {
    const { dollName } = getCharDollStuff(charName);
    springAddToDollRotationY(dollName as DollName, addedRotation);
  }

  function lookAtOtherCharacter(
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

  function lookAtEachother(characterA: CharacterName, characterB: CharacterName = characterNames[0]) {
    lookAtOtherCharacter(characterA, characterB);
    lookAtOtherCharacter(characterB, characterA);
  }

  function moveCharacterAt2DAngle(charName: CharacterName, angle: number) {
    const { dollName } = getCharDollStuff(charName);
    moveDollAt2DAngle(dollName as DollName, angle);
  }

  return {
    setCharAnimation,
    setCharPosition,
    setCharRotationY,
    springCharRotation,
    springAddToCharRotationY,
    lookAtOtherCharacter,
    lookAtEachother,
    moveCharacterAt2DAngle,
  };
}
