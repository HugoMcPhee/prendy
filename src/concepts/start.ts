import loadGoogleFonts from "../utils/loadGoogleFonts";
import {
  makeCharacterDynamicRules,
  makeCharacterRules,
  makeStartDynamicCharacterRulesForInitialState,
} from "./characters/rules";
import {
  makeDollDynamicRules,
  makeDollRules,
  startDynamicDollRulesForInitialState,
} from "./dolls/rules";
import { makeStartAllGlobalRules } from "./global/rules";
import { makeKeyboardConnectRules } from "./keyboards/connect";
import { makeModelRules } from "./models/rules";
import { makePlayerRules } from "./players/rules";
import { makePointersConnectRules } from "./pointers";
import { makeSafeVidRules } from "./safeVids/rules";
import { makeSectionVidRules } from "./sectionVids/rules";
import { makeSpeechBubbleRules } from "./speechBubbles/rules";
import { makeStackVidRules } from "./stackVids/rules";
import {
  GameyConceptoFuncs,
  GameyStartOptionsUntyped,
  ModelInfoByNamePlaceholder,
  PlaceholderGameyConcepts,
  PlaceInfoByNamePlaceholder,
} from "./typedConceptoFuncs";

export function makeStartGameyRules<
  ConceptoFuncs extends GameyConceptoFuncs,
  GameyConcepts extends PlaceholderGameyConcepts,
  GameyStartOptions extends GameyStartOptionsUntyped,
  PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>,
  AnyCameraName extends string,
  AnySegmentName extends string,
  PlaceName extends string,
  // DollName extends keyof ReturnType<ConceptoFuncs["getState"]>["dolls"] &     string, // DollNameParameter extends string
  DollName extends string, // DollNameParameter extends string
  ModelName extends string,
  CharacterName extends string,
  CameraNameByPlace extends Record<PlaceName, string>,
  SegmentNameByPlace extends Record<PlaceName, string>,
  ModelInfoByName extends ModelInfoByNamePlaceholder<ModelName>,
  StartState_Dolls extends GameyConcepts["dolls"]["startStates"] &
    ReturnType<ConceptoFuncs["getState"]>["dolls"],
  AnyAnimationName extends string,
  AnimationNameByModel extends Record<ModelName, AnyAnimationName>
  // DollName extends keyof StartState_Dolls & string,
>(
  conceptoFuncs: ConceptoFuncs,
  gameyConcepts: GameyConcepts,
  gameyStartOptions: GameyStartOptions,
  placeInfoByName: PlaceInfoByName,
  dollNames: readonly DollName[],
  characterNames: readonly CharacterName[],
  modelInfoByName: ModelInfoByName
) {
  // making rules

  const keyboardConnectRules = makeKeyboardConnectRules(conceptoFuncs);
  const pointerConnectRules = makePointersConnectRules(conceptoFuncs);
  const startAllGlobalRules = makeStartAllGlobalRules<
    ConceptoFuncs,
    GameyConcepts,
    GameyStartOptions,
    PlaceInfoByName,
    AnyCameraName,
    AnySegmentName,
    PlaceName,
    DollName,
    CameraNameByPlace,
    SegmentNameByPlace
  >(
    conceptoFuncs,
    gameyConcepts,
    gameyStartOptions,
    placeInfoByName,
    dollNames
  );

  const modelRules = makeModelRules<ConceptoFuncs, ModelName, ModelInfoByName>(
    conceptoFuncs,
    modelInfoByName
  );

  const playerRules = makePlayerRules<
    ConceptoFuncs,
    CharacterName,
    PlaceInfoByName
  >(conceptoFuncs, placeInfoByName);

  const dollDynamicRules = makeDollDynamicRules<
    ConceptoFuncs,
    GameyStartOptions,
    GameyConcepts,
    StartState_Dolls,
    DollName,
    ModelName,
    AnyAnimationName,
    AnimationNameByModel,
    ModelInfoByName
  >(
    conceptoFuncs,
    gameyStartOptions,
    gameyConcepts,
    modelInfoByName,
    dollNames
  );

  const dollRules = makeDollRules<
    GameyStartOptions,
    ReturnType<typeof makeDollDynamicRules>,
    ConceptoFuncs,
    GameyConcepts,
    StartState_Dolls,
    DollName,
    ModelName,
    AnyAnimationName,
    AnimationNameByModel,
    ModelInfoByName
  >(
    gameyStartOptions,
    dollDynamicRules as ReturnType<typeof makeDollDynamicRules>,
    conceptoFuncs,
    gameyConcepts,
    modelInfoByName,
    dollNames
  );

  const speechBubbleRules = makeSpeechBubbleRules<ConceptoFuncs, GameyConcepts>(
    conceptoFuncs,
    gameyConcepts
  );

  const safeVidRules = makeSafeVidRules(conceptoFuncs);

  const safeSectionStackVidRules = makeSectionVidRules<
    ConceptoFuncs,
    PlaceInfoByName,
    PlaceName,
    DollName,
    AnyCameraName,
    CameraNameByPlace,
    SegmentNameByPlace
  >(conceptoFuncs, placeInfoByName, dollNames);

  const safeStackVidRules = makeStackVidRules(conceptoFuncs);

  const characterDynamicRules = makeCharacterDynamicRules<
    ConceptoFuncs,
    GameyStartOptions,
    CharacterName,
    DollName,
    AnyCameraName,
    PlaceName,
    PlaceInfoByName
  >(conceptoFuncs, gameyStartOptions, characterNames, placeInfoByName);

  const characterRules = makeCharacterRules<
    ConceptoFuncs,
    PlaceName,
    PlaceInfoByName
  >(conceptoFuncs, placeInfoByName);

  const startDynamicCharacterRulesForInitialState = makeStartDynamicCharacterRulesForInitialState<
    ConceptoFuncs,
    ReturnType<typeof makeCharacterDynamicRules>,
    CharacterName
  >(characterDynamicRules, characterNames, conceptoFuncs);

  // ----------------------------------------------
  // starting and stopping rules

  function startGameyMainRules() {
    keyboardConnectRules.startAll();
    pointerConnectRules.startAll();
    // keyboardRules.startAll(); // NOTE does nothing
    const stopAllGlobalRules = startAllGlobalRules();
    modelRules.startAll();
    /*characters*/
    characterRules.startAll();
    const stopDynamicCharacterRulesForInitialState = startDynamicCharacterRulesForInitialState();
    /*dolls*/
    dollRules.startAll();
    const stopDynamicDollRulesForInitialState = startDynamicDollRulesForInitialState<
      ConceptoFuncs,
      ReturnType<typeof makeDollDynamicRules>,
      DollName
    >(
      conceptoFuncs,
      dollDynamicRules as ReturnType<typeof makeDollDynamicRules>,
      dollNames
    );
    /**/
    playerRules.startAll();
    speechBubbleRules.startAll();
    safeVidRules.startAll();
    safeStackVidRules.startAll();
    safeSectionStackVidRules.startAll();

    return function stopGameyMainRules() {
      keyboardConnectRules.stopAll();
      pointerConnectRules.stopAll();
      // keyboardRules.stopAll();
      stopAllGlobalRules();
      modelRules.stopAll();
      /*characters*/
      characterRules.stopAll();
      stopDynamicCharacterRulesForInitialState();
      /*dolls*/
      dollRules.stopAll();
      stopDynamicDollRulesForInitialState();
      /**/
      playerRules.stopAll();
      speechBubbleRules.stopAll();
      safeVidRules.stopAll();
      safeStackVidRules.stopAll();
      safeSectionStackVidRules.stopAll();
    };
  }

  function connectInputsToState() {
    // connectKeyboardInputsToState();
    // connectPointerInputsToState();
  }

  let didDoOneTimeStartStuff = false;

  return function startGameyRules(fontNames: readonly string[]) {
    const stopGameyMainRules = startGameyMainRules();
    if (!didDoOneTimeStartStuff) {
      loadGoogleFonts(fontNames); // Auto-import fonts from google fonts :)
      // connectInputsToState();
      didDoOneTimeStartStuff = true;
    }

    return function stopGameyRules() {
      stopGameyMainRules();
    };
  };
}
