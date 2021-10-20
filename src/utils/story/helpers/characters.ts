import { Vector3 } from "@babylonjs/core";
import { makeGetCharDollStuff } from "../../../concepts/characters/utils";
import { makeGlobalStoreUtils } from "../../../concepts/global/utils";
import {
  BackdopConcepFuncs,
  BackdopOptionsUntyped,
  CharacterOptionsPlaceholder,
  DollOptionsPlaceholder,
  ModelInfoByNamePlaceholder,
  PlaceholderBackdopConcepts,
} from "../../../concepts/typedConcepFuncs";
import { makeCharacterStoryUtils } from "../utils/characters";
import { makeDollStoryHelpers } from "./dolls";

export function makeCharacterStoryHelpers<
  ConcepFuncs extends BackdopConcepFuncs,
  BackdopConcepts extends PlaceholderBackdopConcepts,
  BackdopOptions extends BackdopOptionsUntyped,
  ModelName extends string,
  PlaceName extends string,
  DollName extends string,
  CharacterName extends string,
  FontName extends string,
  AnimationNameByModel extends Record<any, string>,
  MeshNameByModel extends Record<ModelName, string>,
  SpotNameByPlace extends Record<PlaceName, string>,
  ModelInfoByName extends ModelInfoByNamePlaceholder<ModelName>,
  CharacterOptions extends CharacterOptionsPlaceholder<
    CharacterName,
    DollName,
    FontName
  >,
  DollOptions extends DollOptionsPlaceholder<DollName, ModelName>
>(
  concepFuncs: ConcepFuncs,
  backdopConcepts: BackdopConcepts,
  backdopStartOptions: BackdopOptions,
  modelInfoByName: ModelInfoByName,
  characterNames: readonly CharacterName[]
) {
  const { getGlobalState } = makeGlobalStoreUtils(concepFuncs);

  const getCharDollStuff = makeGetCharDollStuff<ConcepFuncs, CharacterName>(
    concepFuncs
  );

  type DollNameFromCharacter<
    T_CharacterName extends CharacterName
  > = CharacterOptions[T_CharacterName]["doll"];

  type ModelNameFromDoll<
    T_DollName extends DollName
  > = DollOptions[T_DollName]["model"];

  type ModelNameFromCharacter<
    T_CharacterName extends CharacterName
  > = ModelNameFromDoll<DollNameFromCharacter<T_CharacterName>>;

  type AnimationNameFromCharacter<
    T_CharacterName extends CharacterName
  > = AnimationNameByModel[ModelNameFromCharacter<T_CharacterName>];

  const { get2DAngleBetweenCharacters } = makeCharacterStoryUtils<
    ConcepFuncs,
    PlaceName,
    CharacterName,
    SpotNameByPlace
  >(concepFuncs);

  const {
    moveDollAt2DAngle,
    setDollAnimation,
    setDollPosition,
    setDollRotationY,
    springAddToDollRotationY,
    springDollRotationY,
  } = makeDollStoryHelpers<
    ConcepFuncs,
    BackdopConcepts,
    BackdopOptions,
    ModelName,
    PlaceName,
    DollName,
    CharacterName,
    FontName,
    AnimationNameByModel,
    MeshNameByModel,
    SpotNameByPlace,
    ModelInfoByName,
    CharacterOptions,
    DollOptions
  >(concepFuncs, backdopConcepts, backdopStartOptions, modelInfoByName);

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

  function springAddToCharRotationY(
    charName: CharacterName,
    addedRotation: number
  ) {
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

  function lookAtEachother(
    characterA: CharacterName,
    characterB: CharacterName = characterNames[0]
  ) {
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
