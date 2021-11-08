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
import {
  BackdopConcepFuncs,
  BackdopOptionsUntyped,
  ModelInfoByNamePlaceholder,
  PlaceholderBackdopConcepts,
  PlaceInfoByNamePlaceholder,
} from "./typedConcepFuncs";

export function makeStartBackdopRules<
  ConcepFuncs extends BackdopConcepFuncs,
  BackdopConcepts extends PlaceholderBackdopConcepts,
  BackdopOptions extends BackdopOptionsUntyped,
  PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>,
  AnyCameraName extends string,
  AnySegmentName extends string,
  PlaceName extends string,
  // DollName extends keyof ReturnType<ConcepFuncs["getState"]>["dolls"] &     string, // DollNameParameter extends string
  DollName extends string, // DollNameParameter extends string
  ModelName extends string,
  CharacterName extends string,
  CameraNameByPlace extends Record<PlaceName, string>,
  SegmentNameByPlace extends Record<PlaceName, string>,
  ModelInfoByName extends ModelInfoByNamePlaceholder<ModelName>,
  StartState_Dolls extends BackdopConcepts["dolls"]["startStates"] &
    ReturnType<ConcepFuncs["getState"]>["dolls"],
  AnyAnimationName extends string,
  AnimationNameByModel extends Record<ModelName, AnyAnimationName>
  // DollName extends keyof StartState_Dolls & string,
>(
  concepFuncs: ConcepFuncs,
  backdopConcepts: BackdopConcepts,
  BACKDOP_OPTIONS: BackdopOptions,
  placeInfoByName: PlaceInfoByName,
  dollNames: readonly DollName[],
  characterNames: readonly CharacterName[],
  modelInfoByName: ModelInfoByName
) {
  // making rules

  const keyboardConnectRules = makeKeyboardConnectRules(concepFuncs);
  const pointerConnectRules = makePointersConnectRules(concepFuncs);
  const startAllGlobalRules = makeStartAllGlobalRules<
    ConcepFuncs,
    BackdopConcepts,
    BackdopOptions,
    PlaceInfoByName,
    AnyCameraName,
    AnySegmentName,
    PlaceName,
    DollName,
    CameraNameByPlace,
    SegmentNameByPlace
  >(concepFuncs, backdopConcepts, BACKDOP_OPTIONS, placeInfoByName, dollNames);

  const modelRules = makeModelRules<ConcepFuncs, ModelName, ModelInfoByName>(
    concepFuncs,
    modelInfoByName
  );

  const playerRules = makePlayerRules<
    ConcepFuncs,
    BackdopOptions,
    CharacterName,
    PlaceInfoByName
  >(concepFuncs, BACKDOP_OPTIONS, placeInfoByName);

  const dollDynamicRules = makeDollDynamicRules<
    ConcepFuncs,
    BackdopOptions,
    BackdopConcepts,
    StartState_Dolls,
    DollName,
    ModelName,
    AnyAnimationName,
    AnimationNameByModel,
    ModelInfoByName
  >(concepFuncs, BACKDOP_OPTIONS, backdopConcepts, modelInfoByName, dollNames);

  const dollRules = makeDollRules<
    BackdopOptions,
    ReturnType<typeof makeDollDynamicRules>,
    ConcepFuncs,
    BackdopConcepts,
    StartState_Dolls,
    DollName,
    ModelName,
    AnyAnimationName,
    AnimationNameByModel,
    ModelInfoByName
  >(
    BACKDOP_OPTIONS,
    dollDynamicRules as ReturnType<typeof makeDollDynamicRules>,
    concepFuncs,
    backdopConcepts,
    modelInfoByName,
    dollNames
  );

  const speechBubbleRules = makeSpeechBubbleRules<ConcepFuncs, BackdopConcepts>(
    concepFuncs,
    backdopConcepts
  );

  const safeVidRules = makeSafeVidRules(concepFuncs);

  const safeSectionVidRules = makeSectionVidRules<
    ConcepFuncs,
    PlaceInfoByName,
    PlaceName,
    DollName,
    AnyCameraName,
    CameraNameByPlace,
    SegmentNameByPlace
  >(concepFuncs, placeInfoByName, dollNames);

  const characterDynamicRules = makeCharacterDynamicRules<
    ConcepFuncs,
    BackdopOptions,
    CharacterName,
    DollName,
    AnyCameraName,
    PlaceName,
    PlaceInfoByName
  >(concepFuncs, BACKDOP_OPTIONS, characterNames, placeInfoByName);

  const characterRules = makeCharacterRules<
    ConcepFuncs,
    PlaceName,
    PlaceInfoByName
  >(concepFuncs, placeInfoByName);

  const startDynamicCharacterRulesForInitialState =
    makeStartDynamicCharacterRulesForInitialState<
      ConcepFuncs,
      ReturnType<typeof makeCharacterDynamicRules>,
      CharacterName
    >(characterDynamicRules, characterNames, concepFuncs);

  // ----------------------------------------------
  // starting and stopping rules

  function startBackdopMainRules() {
    keyboardConnectRules.startAll();
    pointerConnectRules.startAll();
    // keyboardRules.startAll(); // NOTE does nothing
    const stopAllGlobalRules = startAllGlobalRules();
    modelRules.startAll();
    /*characters*/
    characterRules.startAll();
    const stopDynamicCharacterRulesForInitialState =
      startDynamicCharacterRulesForInitialState();
    /*dolls*/
    dollRules.startAll();
    const stopDynamicDollRulesForInitialState =
      startDynamicDollRulesForInitialState<
        ConcepFuncs,
        ReturnType<typeof makeDollDynamicRules>,
        DollName
      >(
        concepFuncs,
        dollDynamicRules as ReturnType<typeof makeDollDynamicRules>,
        dollNames
      );
    /**/
    playerRules.startAll();
    speechBubbleRules.startAll();
    safeVidRules.startAll();
    safeSectionVidRules.startAll();

    return function stopBackdopMainRules() {
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
      safeSectionVidRules.stopAll();
    };
  }

  function connectInputsToState() {
    // connectKeyboardInputsToState();
    // connectPointerInputsToState();
  }

  let didDoOneTimeStartStuff = false;

  return function startBackdopRules(fontNames: readonly string[]) {
    const stopBackdopMainRules = startBackdopMainRules();
    if (!didDoOneTimeStartStuff) {
      loadGoogleFonts(fontNames); // Auto-import fonts from google fonts :)
      // connectInputsToState();
      didDoOneTimeStartStuff = true;
    }

    return function stopBackdopRules() {
      stopBackdopMainRules();
    };
  };
}
