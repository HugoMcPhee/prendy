import { Vector3 } from "@babylonjs/core";
import { makeTyped_getCharDollStuff } from "../../helpers/prendyUtils/characters";
import { makeTyped_globalUtils } from "../../helpers/prendyUtils/global";
import { PrendyStoreHelpers, PlaceholderPrendyStores } from "../../stores/typedStoreHelpers";
import {
  AnimationNameByModel,
  PrendyOptions,
  CharacterName,
  CharacterOptions,
  DollName,
  DollOptions,
  ModelInfoByName,
} from "../../declarations";
import { makeTyped_characterStoryUtils } from "../../helpers/prendyUtils/characters";
import { makeTyped_dollStoryHelpers } from "./dolls";

export function makeTyped_characterStoryHelpers<
  StoreHelpers extends PrendyStoreHelpers,
  PrendyStores extends PlaceholderPrendyStores,
  A_AnimationNameByModel extends AnimationNameByModel = AnimationNameByModel,
  A_PrendyOptions extends PrendyOptions = PrendyOptions,
  A_CharacterName extends CharacterName = CharacterName,
  A_CharacterOptions extends CharacterOptions = CharacterOptions,
  A_DollName extends DollName = DollName,
  A_DollOptions extends DollOptions = DollOptions,
  A_ModelInfoByName extends ModelInfoByName = ModelInfoByName
>(
  storeHelpers: StoreHelpers,
  prendyStores: PrendyStores,
  prendyStartOptions: A_PrendyOptions,
  modelInfoByName: A_ModelInfoByName,
  characterNames: readonly A_CharacterName[]
) {
  type DollNameFromCharacter<T_CharacterName extends A_CharacterName> = A_CharacterOptions[T_CharacterName]["doll"];

  type ModelNameFromDoll<T_DollName extends A_DollName> = A_DollOptions[T_DollName]["model"];

  type ModelNameFromCharacter<T_CharacterName extends A_CharacterName> = ModelNameFromDoll<
    DollNameFromCharacter<T_CharacterName>
  >;

  type AnimationNameFromCharacter<T_CharacterName extends A_CharacterName> =
    A_AnimationNameByModel[ModelNameFromCharacter<T_CharacterName>];

  const { getGlobalState } = makeTyped_globalUtils(storeHelpers);

  const getCharDollStuff = makeTyped_getCharDollStuff(storeHelpers);

  const { get2DAngleBetweenCharacters } = makeTyped_characterStoryUtils(storeHelpers);

  const {
    moveDollAt2DAngle,
    setDollAnimation,
    setDollPosition,
    setDollRotationY,
    springAddToDollRotationY,
    springDollRotationY,
  } = makeTyped_dollStoryHelpers(storeHelpers, prendyStartOptions, modelInfoByName);

  function setCharAnimation<T_Character extends A_CharacterName>(
    character: T_Character,
    animation: AnimationNameFromCharacter<T_Character> // AnimationNameFromModel might keep the type better
  ) {
    const { dollName } = getCharDollStuff(character);
    setDollAnimation(dollName as A_DollName, animation as any);
  }

  function setCharPosition(charName: A_CharacterName, newPosition: Vector3) {
    const { dollName } = getCharDollStuff(charName);
    setDollPosition(dollName as A_DollName, newPosition);
  }

  function setCharRotationY(charName: A_CharacterName, newRotationY: number) {
    const { dollName } = getCharDollStuff(charName);
    setDollRotationY(dollName as A_DollName, newRotationY);
  }

  function springCharRotation(charName: A_CharacterName, newRotationY: number) {
    const { dollName } = getCharDollStuff(charName);
    springDollRotationY(dollName as A_DollName, newRotationY);
  }

  function springAddToCharRotationY(charName: A_CharacterName, addedRotation: number) {
    const { dollName } = getCharDollStuff(charName);
    springAddToDollRotationY(dollName as A_DollName, addedRotation);
  }

  function lookAtOtherCharacter(
    charA: A_CharacterName,
    charB?: A_CharacterName // defaults to playerChaarcter
  ) {
    // NOTE could be async
    const { playerCharacter } = getGlobalState();
    const editedCharB = charB ?? (playerCharacter as A_CharacterName);
    const { dollName } = getCharDollStuff(editedCharB);

    const angle = get2DAngleBetweenCharacters(editedCharB, charA);
    springDollRotationY(dollName as A_DollName, angle);
  }

  function lookAtEachother(characterA: A_CharacterName, characterB: A_CharacterName = characterNames[0]) {
    lookAtOtherCharacter(characterA, characterB);
    lookAtOtherCharacter(characterB, characterA);
  }

  function moveCharacterAt2DAngle(charName: A_CharacterName, angle: number) {
    const { dollName } = getCharDollStuff(charName);
    moveDollAt2DAngle(dollName as A_DollName, angle);
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
