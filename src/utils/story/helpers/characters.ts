import { Vector3 } from "@babylonjs/core";
import { makeGetCharDollStuff } from "../../../concepts/characters/utils";
import { makeGlobalStoreUtils } from "../../../concepts/global/utils";
import {
  GameyConceptoFuncs,
  GameyStartOptionsUntyped,
  ModelInfoByNamePlaceholder,
  PlaceholderGameyConcepts,
} from "../../../concepts/typedConceptoFuncs";
import { makeCharacterStoryUtils } from "../utils/characters";
import { makeDollStoryHelpers } from "./dolls";

export function makeCharacterStoryHelpers<
  ConceptoFuncs extends GameyConceptoFuncs,
  GameyConcepts extends PlaceholderGameyConcepts,
  GameyStartOptions extends GameyStartOptionsUntyped,
  ModelName extends string,
  PlaceName extends string,
  DollName extends string,
  CharacterName extends string,
  AnimationNameByModel extends Record<ModelName, string>,
  MeshNameByModel extends Record<ModelName, string>,
  SpotNameByPlace extends Record<PlaceName, string>,
  ModelInfoByName extends ModelInfoByNamePlaceholder<ModelName>
>(
  conceptoFuncs: ConceptoFuncs,
  gameyConcepts: GameyConcepts,
  gameyStartOptions: GameyStartOptions,
  modelInfoByName: ModelInfoByName,
  characterNames: readonly CharacterName[]
) {
  const { getGlobalState } = makeGlobalStoreUtils(conceptoFuncs);

  const getCharDollStuff = makeGetCharDollStuff<ConceptoFuncs, CharacterName>(
    conceptoFuncs
  );

  type StartState_Characters = typeof gameyConcepts.characters.startStates;
  type StartState_Dolls = typeof gameyConcepts.dolls.startStates;

  type DollNameFromCharacter<
    T_CharacterName extends CharacterName
  > = StartState_Characters[T_CharacterName]["dollName"] & DollName; // NOTE the & might be messing with the returned type

  type ModelNameFromDoll<
    T_DollName extends DollName
  > = StartState_Dolls[T_DollName]["modelName"] & ModelName; // NOTE the & might be messing with the returned type

  type ModelNameFromCharacter<
    T_CharacterName extends CharacterName
  > = ModelNameFromDoll<NonNullable<DollNameFromCharacter<T_CharacterName>>>;

  const { get2DAngleBetweenCharacters } = makeCharacterStoryUtils<
    ConceptoFuncs,
    PlaceName,
    CharacterName,
    SpotNameByPlace
  >(conceptoFuncs);

  const {
    moveDollAt2DAngle,
    setDollAnimation,
    setDollPosition,
    setDollRotationY,
    springAddToDollRotationY,
    springDollRotationY,
  } = makeDollStoryHelpers<
    ConceptoFuncs,
    GameyConcepts,
    GameyStartOptions,
    ModelName,
    PlaceName,
    DollName,
    CharacterName,
    AnimationNameByModel,
    MeshNameByModel,
    SpotNameByPlace,
    ModelInfoByName
  >(conceptoFuncs, gameyConcepts, gameyStartOptions, modelInfoByName);

  function setCharAnimation<T_Character extends CharacterName>(
    character: T_Character,
    animation: AnimationNameByModel[ModelNameFromCharacter<T_Character>] // AnimationNameFromModel might keep the type better
  ) {
    const { dollName } = getCharDollStuff(character);
    setDollAnimation(dollName as DollName, animation);
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