import { breakableForEach, forEach } from "chootils/dist/loops";
import {
  AnyTriggerName,
  CameraNameByPlace,
  CharacterName,
  DollName,
  PickupName,
  PlaceInfoByName,
  PlaceName,
  PrendyStoreHelpers,
  StoryPartName,
  TriggerNameByPlace,
} from "../../declarations";
import { PrendyStoreHelpersUntyped } from "../../stores/typedStoreHelpers";
import { get_getCharDollStuff } from "../prendyUtils/characters";
import { PrendyStepName } from "../../stores/stores";

// export each of the rule makers stuff from here :)

export function get_getUsefulStoryStuff(storeHelpers: PrendyStoreHelpers) {
  const { getRefs, getState } = storeHelpers;

  type AllState = ReturnType<PrendyStoreHelpers["getState"]>;
  type AllRefs = ReturnType<PrendyStoreHelpers["getRefs"]>;

  type StoryState = AllState["story"]["main"];
  type StoryRefs = AllRefs["story"]["main"];
  type GlobalState = AllState["global"]["main"];

  type AllPlacesState = AllState["places"];
  type AllPlacesRefs = AllRefs["places"];

  type APlaceRefs = AllPlacesRefs[keyof AllPlacesRefs];
  type APlaceRefsCamsRefs = APlaceRefs["camsRefs"];

  return function getUsefulStoryStuff() {
    const storyState = getState().story.main as StoryState;
    const storyRefs = getRefs().story.main as StoryRefs;
    const globalState = getState().global.main as GlobalState;
    const { nowPlaceName, nowSegmentName } = globalState;
    const { nowCamName } = globalState;
    const placesRefs = getRefs().places as AllPlacesRefs;
    const placeRefs = placesRefs[nowPlaceName];
    const { camsRefs } = placesRefs[nowPlaceName];
    const camRefs = camsRefs[nowCamName];

    return {
      storyState,
      storyRefs,
      globalState,
      nowSegmentName: nowSegmentName as GlobalState["nowSegmentName"],
      nowPlaceName: nowPlaceName as GlobalState["nowPlaceName"],
      nowCamName: nowCamName as GlobalState["nowCamName"],
      placesRefs: placesRefs as AllPlacesRefs,
      placeRefs: placeRefs as APlaceRefs,
      camsRefs: camsRefs as APlaceRefsCamsRefs,
      camRefs: camRefs as APlaceRefsCamsRefs[keyof APlaceRefsCamsRefs],
    };
  };
}

export function get_setStoryState(storeHelpers: PrendyStoreHelpers) {
  const { setState } = storeHelpers;

  // ItemState

  // type GetState = typeof getState;
  // type GetRefs = typeof getRefs;
  // // type ItemType = keyof ReturnType<GetState> & keyof ReturnType<GetRefs>;
  // type ItemType = keyof ReturnType<GetState>;
  //
  // type ItemState<T_ItemType extends ItemType> = ReturnType<
  //   GetState
  // >[T_ItemType][keyof ReturnType<GetState>[T_ItemType]];

  type AllState = ReturnType<PrendyStoreHelpers["getState"]>;
  type StoryState = AllState["story"]["main"];

  return function setStoryState(newState: Partial<StoryState>) {
    setState({ story: { main: newState } });
  };
}

export function makeAllStoryRuleMakers(
  storeHelpers: PrendyStoreHelpers,
  placeInfoByName: PlaceInfoByName,
  characterNames: readonly CharacterName[],
  dollNames: readonly DollName[]
) {
  const {
    getRefs,
    getState,
    getPreviousState,
    setState,
    makeRules,
    startItemEffect,
    stopEffect,
    onNextTick,
    makeNestedRuleMaker,
    makeNestedLeaveRuleMaker,
  } = storeHelpers;

  const getCharDollStuff = get_getCharDollStuff(storeHelpers);

  const getUsefulStoryStuff = get_getUsefulStoryStuff(storeHelpers);

  type StoryCallback = (usefulStuff: ReturnType<typeof getUsefulStoryStuff>) => void;

  type SegmentNameFromCameraAndPlace<
    T_Place extends keyof PlaceInfoByName,
    T_Cam extends keyof PlaceInfoByName[T_Place]["segmentTimesByCamera"]
  > = keyof PlaceInfoByName[T_Place]["segmentTimesByCamera"][T_Cam];

  type CameraNameFromPlace<T_Place extends keyof PlaceInfoByName> =
    keyof PlaceInfoByName[T_Place]["segmentTimesByCamera"];

  type CamSegmentRulesOptionsUntyped = Partial<{
    [P_PlaceName in PlaceName]: Partial<{
      [P_CamName in CameraNameFromPlace<P_PlaceName>]: (
        usefulStuff: Record<any, any> // usefulStoryStuff, but before the types for global state exist
      ) => SegmentNameFromCameraAndPlace<P_PlaceName, P_CamName>;
    }>;
  }>;

  // --------------------------------------------------
  //
  // makeCamChangeRules
  const makeCamChangeRules = makeNestedRuleMaker(
    ["global", "main", "nowPlaceName"],
    ["global", "main", "nowCamName"],
    "cameraChange",
    getUsefulStoryStuff
  );

  const makeCamLeaveRules = makeNestedLeaveRuleMaker(
    ["global", "main", "nowPlaceName"],
    ["global", "main", "nowCamName"],
    "cameraChange",
    getUsefulStoryStuff
  );

  // --------------------------------------------------
  //
  // makeCamSegmentRules
  type CamSegmentRulesOptions = Partial<{
    [P_PlaceName in PlaceName]: Partial<{
      [P_CamName in CameraNameFromPlace<P_PlaceName>]: (
        usefulStuff: ReturnType<typeof getUsefulStoryStuff>
      ) => SegmentNameFromCameraAndPlace<P_PlaceName, P_CamName>;
    }>;
  }>;

  function makeCamSegmentRules(callBacksObject: CamSegmentRulesOptions) {
    return {
      startAll() {
        // This sets an options object in global refs that gets checked when changing segment,
        // so no rules are actually started here, but it uses the same format as the other rule makers
        getRefs().global.main.camSegmentRulesOptions = callBacksObject as CamSegmentRulesOptionsUntyped;
      },
      stopAll() {
        /* nothing to stop */
      },
    };
  }

  function makePickupsRules({
    onUsePickupAtTrigger,
    onUsePickupToTalk,
    onUsePickupGenerally,
  }: {
    onUsePickupAtTrigger: ReturnType<typeof makeOnUsePickupAtTrigger>;
    onUsePickupToTalk: ReturnType<typeof makeOnUsePickupToTalk>;
    onUsePickupGenerally: ReturnType<typeof makeOnUsePickupGenerally>;
  }) {
    const onPickupButtonClick = (pickupName: PickupName) => {
      setState({ players: { main: { interactButtonPressTime: Date.now() } } });
      const didUsePickupAtTrigger = onUsePickupAtTrigger(pickupName);
      const didUsePickupWithDoll = onUsePickupToTalk(pickupName);

      console.log("didUsePickupAtTrigger", didUsePickupAtTrigger);
      console.log("didUsePickupWithDoll", didUsePickupWithDoll);

      // NOTE the top two functions can return true if they ran,
      // and if neither returned true, it runs the general one
      if (!didUsePickupAtTrigger && !didUsePickupWithDoll) {
        onUsePickupGenerally(pickupName);
      }
    };

    return {
      startAll() {
        // This sets an onClick callback in global refs that gets called when clicking the pickup button,
        // so no rules are actually started here, but it uses the same format as the other rule makers
        getRefs().global.main.onPickupButtonClick = onPickupButtonClick;
      },
      stopAll() {
        /* nothing to stop */
      },
    };
  }

  function makeInteractButtonRules({
    onInteractAtTrigger,
    onInteractAtTalk,
  }: {
    onInteractAtTrigger: ReturnType<typeof makeOnInteractAtTrigger>;
    onInteractAtTalk: ReturnType<typeof makeOnInteractToTalk>;
  }) {
    const interactButtonRules = makeRules(({ itemEffect, effect }) => ({
      whenInteractButtonClicked: itemEffect({
        run() {
          onInteractAtTrigger();
          onInteractAtTalk();
        },
        check: { prop: "interactButtonPressTime", type: "players" },
        // atStepEnd: true,
        step: "story", // story insead of input, so virtual stick animations dont overwrite the story click ones
      }),
    }));
    return interactButtonRules;
  }

  // --------------------------------------------------
  //
  // makeOnInteractAtTrigger
  // when pressing interact button at trigger

  type OnInteractAtTriggerOptions = Partial<{
    [P_PlaceName in PlaceName]: Partial<{
      [P_TriggerName in TriggerNameByPlace[P_PlaceName]]: StoryCallback;
    }>;
  }>;
  // the returned function when the interact buttons clicked
  function makeOnInteractAtTrigger(
    callBacksObject: OnInteractAtTriggerOptions,
    characterName: CharacterName = characterNames[0]
  ) {
    const onClickInteractButton = () => {
      const usefulStoryStuff = getUsefulStoryStuff();

      const { aConvoIsHappening, nowPlaceName, playerMovingPaused } = usefulStoryStuff.globalState;
      if (aConvoIsHappening || playerMovingPaused) return;

      const { atTriggers } = getState().characters[characterName];

      const triggerNames = placeInfoByName[nowPlaceName].triggerNames as AnyTriggerName[];
      // NOTE Could b breakable if only checking one trigger
      forEach(triggerNames, (triggerName) => {
        if (atTriggers[triggerName]) {
          // removing types to fix issue
          (callBacksObject as Record<any, any>)[nowPlaceName]?.[triggerName]?.(usefulStoryStuff);
        }
      });
    };

    return onClickInteractButton;
  }

  // --------------------------------------------------
  //
  // makeOnInteractToTalk
  // when 'talking' to a doll

  type OnInteractToTalkOptions = Partial<{
    [P_DollName in DollName]: StoryCallback;
  }>;
  // the returned function gets run when interact button's clicked
  function makeOnInteractToTalk(
    callBacksObject: OnInteractToTalkOptions,
    distanceType: "touch" | "talk" = "talk",
    characterName: CharacterName = characterNames[0]
  ) {
    const onClickInteractButton = () => {
      const usefulStoryStuff = getUsefulStoryStuff();

      const { aConvoIsHappening, playerMovingPaused } = usefulStoryStuff.globalState;
      console.log("playerMovingPaused", playerMovingPaused, "aConvoIsHappening", aConvoIsHappening);

      if (aConvoIsHappening || playerMovingPaused) return;

      const { dollState, dollRefs: charDollRefs, dollName: charDollName } = getCharDollStuff(characterName) ?? {};
      if (!dollState) return;
      const { inRange } = dollState;

      breakableForEach(dollNames, (dollName) => {
        const dollState = getState().dolls[dollName];

        const callBackToRun = callBacksObject[dollName];
        const isInTalkRange = inRange[dollName][distanceType];
        if (dollName !== charDollName && isInTalkRange && dollState.isVisible) {
          callBackToRun?.(usefulStoryStuff);
          return true; // break
        }
      });
    };

    return onClickInteractButton;
  }

  // --------------------------------------------------
  //
  // makeOnUsePickupAtTrigger
  // use pickup button at trigger reactions

  type OnUsePickupAtTriggerOptions = Partial<{
    [P_PlaceName in PlaceName]: Partial<{
      [P_TriggerName in TriggerNameByPlace[P_PlaceName]]: Partial<{
        [P_PickupName in PickupName]: StoryCallback;
      }>;
    }>;
  }>;
  // the returned function gets run onClick in the pickup picture button gui
  function makeOnUsePickupAtTrigger(
    callBacksObject: OnUsePickupAtTriggerOptions,
    characterName: CharacterName = characterNames[0]
  ) {
    const onClickPickupButton = <T_PickupName extends PickupName>(pickupName: T_PickupName) => {
      let didInteractWithSomething = false;

      const usefulStoryStuff = getUsefulStoryStuff();

      const { aConvoIsHappening, nowPlaceName } = usefulStoryStuff.globalState;
      const { atTriggers } = getState().characters[characterName];

      console.log("makeOnUsePickupAtTrigger, aConvoIsHappening", aConvoIsHappening);

      if (aConvoIsHappening) return;

      const triggerNames = placeInfoByName[nowPlaceName].triggerNames as AnyTriggerName[];

      // NOTE Could b breakable if only checking one trigger
      forEach(triggerNames, (triggerName) => {
        if (atTriggers[triggerName]) {
          const whatToDo = (callBacksObject as Record<any, any>)?.[nowPlaceName]?.[triggerName]?.[pickupName];
          if (whatToDo) {
            whatToDo(usefulStoryStuff);
            didInteractWithSomething = true;
          }
        }
      });
      return didInteractWithSomething;
    };

    return onClickPickupButton;
  }

  // --------------------------------------------------
  //
  // makeOnUsePickupGenerally
  // use pickup button in general reactions
  type OnUsePickupGenerallyOptions = Partial<{
    [P_PickupName in PickupName]: StoryCallback;
  }>;
  // the returned function gets run onClick in the pickup picture button gui
  function makeOnUsePickupGenerally(callBacksObject: OnUsePickupGenerallyOptions) {
    const onClickPickupButton = <T_PickupName extends PickupName>(pickupName: T_PickupName) => {
      const usefulStoryStuff = getUsefulStoryStuff();
      const { aConvoIsHappening } = usefulStoryStuff.globalState;

      if (aConvoIsHappening) return;

      // NOTE this should only run if an item wasn't just used with a trigger or a doll
      (callBacksObject as Record<any, any>)?.[pickupName]?.(usefulStoryStuff);
    };

    return onClickPickupButton;
  }

  // --------------------------------------------------
  //
  // makeOnUsePickupToTalk
  // use pickup button at trigger reactions

  type OnUsePickupToTalkOptions = Partial<{
    [P_DollName in DollName]: Partial<{
      [P_PickupName in PickupName]: StoryCallback;
    }>;
  }>;
  // the returned function gets run onClick in the pickup picture button gui
  function makeOnUsePickupToTalk(
    callBacksObject: OnUsePickupToTalkOptions,
    characterName: CharacterName = characterNames[0]
  ) {
    const onClickPickupButton = <T_PickupName extends PickupName>(pickupName: T_PickupName) => {
      let didInteractWithSomething = false;

      const usefulStoryStuff = getUsefulStoryStuff();

      const { aConvoIsHappening } = usefulStoryStuff.globalState;

      if (aConvoIsHappening) return;

      const { dollState, dollName: charDollName } = getCharDollStuff(characterName) ?? {};
      if (!dollState) return;
      const { inRange } = dollState;

      breakableForEach(dollNames, (dollName) => {
        const whatToDo = callBacksObject[dollName]?.[pickupName];
        const isInTalkRange = inRange[dollName].talk;
        if (dollName !== charDollName && isInTalkRange) {
          if (whatToDo) {
            whatToDo(usefulStoryStuff);
            didInteractWithSomething = true;
          }

          return true; // break
        }
      });
      return didInteractWithSomething;
    };

    return onClickPickupButton;
  }

  // --------------------------------------------------
  //
  // makePlaceLoadRules

  type PlaceLoadRulesOptions = Partial<{
    [P_PlaceName in PlaceName]: StoryCallback;
  }>;
  function makePlaceLoadRules(atStartOfEachPlace: StoryCallback, callBacksObject: PlaceLoadRulesOptions) {
    return makeRules(({ itemEffect }) => ({
      whenPlaceFinishedLoading: itemEffect({
        run() {
          // onNextTick(() => {
          const usefulStoryStuff = getUsefulStoryStuff();
          const { nowPlaceName } = usefulStoryStuff;

          atStartOfEachPlace?.(usefulStoryStuff);

          (callBacksObject as Record<any, any>)[nowPlaceName]?.(usefulStoryStuff);
          // });
        },
        check: {
          type: "global",
          prop: ["isLoadingBetweenPlaces"],
          becomes: false,
        },
        // step: "respondToNewPlace",
        step: "respondToNewPlaceStory",
        atStepEnd: true,
      }),
    }));
  }
  function makePlaceUnloadRules(callBacksObject: PlaceLoadRulesOptions) {
    return makeRules(({ itemEffect }) => ({
      whenPlaceFinishedUnloading: itemEffect({
        run({ previousValue: prevPlace, newValue: newPlace }) {
          let ruleName = startItemEffect({
            run() {
              stopEffect(ruleName);
              // console.log("unload rules for", prevPlace);
              const usefulStoryStuff = getUsefulStoryStuff();
              (callBacksObject as Record<any, any>)[prevPlace]?.(usefulStoryStuff);
            },
            check: {
              type: "global",
              prop: ["isLoadingBetweenPlaces"],
              becomes: false,
            },
            atStepEnd: true,
            step: "input",
          });
        },
        check: { type: "global", prop: ["nowPlaceName"] },
        step: "story",
        atStepEnd: true,
      }),
    }));
  }

  // --------------------------------------------------
  //
  // makeStoryPartRules

  // Replaced with makeRuleMaker for each project
  // const makeStoryPartRules = makeRuleMaker("story", "main", "storyPart");
  // could have chapterName > storyPart too with  makeNestedRuleMaker

  // --------------------------------------------------
  //
  // makeRuleMaker

  // type AllState = ReturnType<PrendyStoreHelpers["getState"]>;
  // type StoreName = keyof AllState;

  // function makeRuleMaker<
  //   T_StoreName extends StoreName,
  //   T_StoreItemName extends keyof AllState[T_StoreName] & string,
  //   T_PropertyName extends keyof AllState[T_StoreName][T_StoreItemName] & string,
  //   T_StepName extends PrendyStepName
  // >(storeName: T_StoreName, storeItemName: T_StoreItemName, storyProperty: T_PropertyName, stepName?: T_StepName) {
  //   type StoreState = AllState[T_StoreName][T_StoreItemName];

  //   type PropertyValue = StoreState[T_PropertyName];
  //   type RulesOptions = Partial<Record<PropertyValue, (usefulStuff: ReturnType<typeof getUsefulStoryStuff>) => void>>;
  //   const ruleName = `customRuleFor_${storeName}_${storyProperty}${Math.random()}`;
  //   function newRuleMaker(callBacksObject: RulesOptions) {
  //     return makeRules(({ effect }) => ({
  //       whenPropertyChanges: effect({
  //         run(_diffInfo) {
  //           const usefulStoryStuff = getUsefulStoryStuff();
  //           const latestValue = getState()[storeName][storeItemName][storyProperty] as PropertyValue;

  //           callBacksObject[latestValue]?.(usefulStoryStuff);
  //         },
  //         check: {
  //           prop: [storyProperty],
  //           name: storeItemName,
  //           type: storeName,
  //         },
  //         step: stepName ?? "story",
  //         atStepEnd: true,
  //         name: ruleName,
  //       }),
  //     }));
  //   }

  //   return newRuleMaker;
  // }

  // makeNestedRuleMaker, similar to makeRuleMaker but accepts parameters for two store properties (can be from different stores) , and the callback fires when properties of both stores change
  // function makeNestedRuleMaker<
  //   T_StoreName1 extends StoreName,
  //   T_StoreItemName1 extends keyof AllState[T_StoreName1] & string,
  //   T_PropertyName1 extends keyof AllState[T_StoreName1][T_StoreItemName1] & string,
  //   T_StoreName2 extends StoreName,
  //   T_StoreItemName2 extends keyof AllState[T_StoreName2] & string,
  //   T_PropertyName2 extends keyof AllState[T_StoreName2][T_StoreItemName2] & string,
  //   T_StepName extends PrendyStepName
  // >(
  //   storeInfo1: [T_StoreName1, T_StoreItemName1, T_PropertyName1],
  //   storeInfo2: [T_StoreName2, T_StoreItemName2, T_PropertyName2],
  //   stepName?: T_StepName
  // ) {
  //   const [storeName1, storeItemName1, storyProperty1] = storeInfo1;
  //   const [storeName2, storeItemName2, storyProperty2] = storeInfo2;

  //   type StoreState1 = AllState[T_StoreName1][T_StoreItemName1];
  //   type StoreState2 = AllState[T_StoreName2][T_StoreItemName2];

  //   type PropertyValue1 = StoreState1[T_PropertyName1];
  //   type PropertyValue2 = StoreState2[T_PropertyName2];
  //   type RulesOptions = Partial<
  //     Record<
  //       PropertyValue1,
  //       Partial<Record<PropertyValue2, (usefulStuff: ReturnType<typeof getUsefulStoryStuff>) => void>>
  //     >
  //   >;
  //   const ruleName = `customRuleFor_${storeName1}_${storyProperty1}_${storeName2}_${storyProperty2}${Math.random()}`;
  //   function newRuleMaker(callBacksObject: RulesOptions) {
  //     return makeRules(({ effect }) => ({
  //       whenPropertyChanges: effect({
  //         run(_diffInfo) {
  //           const usefulStoryStuff = getUsefulStoryStuff();
  //           const latestValue1 = getState()[storeName1][storeItemName1][storyProperty1] as PropertyValue1;
  //           const latestValue2 = getState()[storeName2][storeItemName2][storyProperty2] as PropertyValue2;

  //           callBacksObject[latestValue1]?.[latestValue2]?.(usefulStoryStuff);
  //         },
  //         check: [
  //           { prop: [storyProperty1], name: storeItemName1, type: storeName1 },
  //           { prop: [storyProperty2], name: storeItemName2, type: storeName2 },
  //         ],
  //         step: stepName ?? "story",
  //         atStepEnd: true,
  //         name: ruleName,
  //       }),
  //     }));
  //   }

  //   return newRuleMaker;
  // }

  // makeNestedLeaveRuleMaker, the same as makeNestedRuleMaker , but the callback fires when the properties of both stores become NOT the specified values, but were previously
  // function makeNestedLeaveRuleMaker<
  //   T_StoreName1 extends StoreName,
  //   T_StoreItemName1 extends keyof AllState[T_StoreName1] & string,
  //   T_PropertyName1 extends keyof AllState[T_StoreName1][T_StoreItemName1] & string,
  //   T_StoreName2 extends StoreName,
  //   T_StoreItemName2 extends keyof AllState[T_StoreName2] & string,
  //   T_PropertyName2 extends keyof AllState[T_StoreName2][T_StoreItemName2] & string,
  //   T_StepName extends PrendyStepName
  // >(
  //   storeInfo1: [T_StoreName1, T_StoreItemName1, T_PropertyName1],
  //   storeInfo2: [T_StoreName2, T_StoreItemName2, T_PropertyName2],
  //   stepName?: T_StepName
  // ) {
  //   const [storeName1, storeItemName1, storyProperty1] = storeInfo1;
  //   const [storeName2, storeItemName2, storyProperty2] = storeInfo2;

  //   type StoreState1 = AllState[T_StoreName1][T_StoreItemName1];
  //   type StoreState2 = AllState[T_StoreName2][T_StoreItemName2];

  //   type PropertyValue1 = StoreState1[T_PropertyName1];
  //   type PropertyValue2 = StoreState2[T_PropertyName2];
  //   type RulesOptions = Partial<
  //     Record<
  //       PropertyValue1,
  //       Partial<Record<PropertyValue2, (usefulStuff: ReturnType<typeof getUsefulStoryStuff>) => void>>
  //     >
  //   >;
  //   const ruleName = `customLeaveRuleFor_${storeName1}_${storyProperty1}_${storeName2}_${storyProperty2}${Math.random()}`;
  //   function newRuleMaker(callBacksObject: RulesOptions) {
  //     return makeRules(({ effect }) => ({
  //       whenPropertyChanges: effect({
  //         run(_diffInfo) {
  //           const usefulStoryStuff = getUsefulStoryStuff();
  //           const latestValue1 = getState()[storeName1][storeItemName1][storyProperty1] as PropertyValue1;
  //           const latestValue2 = getState()[storeName2][storeItemName2][storyProperty2] as PropertyValue2;
  //           const prevValue1 = getPreviousState()[storeName1][storeItemName1][storyProperty1] as PropertyValue1;
  //           const prevValue2 = getPreviousState()[storeName2][storeItemName2][storyProperty2] as PropertyValue2;

  //           callBacksObject[prevValue1]?.[prevValue2]?.(usefulStoryStuff);
  //         },
  //         check: [
  //           { prop: [storyProperty1], name: storeItemName1, type: storeName1 },
  //           { prop: [storyProperty2], name: storeItemName2, type: storeName2 },
  //         ],
  //         step: stepName ?? "story",
  //         atStepEnd: true,
  //         name: ruleName,
  //       }),
  //     }));
  //   }

  //   return newRuleMaker;
  // }

  // --------------------------------------------------
  // makeTouchRules
  // doll touch rules

  type TouchRulesOptions = Partial<{
    [P_DollName in DollName]: (usefulStuff: ReturnType<typeof getUsefulStoryStuff>) => void;
  }>;
  function makeTouchRules(
    callBacksObject: TouchRulesOptions,
    options?: {
      characterName?: CharacterName;
      distanceType?: "touch" | "talk" | "see";
      whenLeave?: boolean;
    }
  ) {
    const { characterName, distanceType = "touch", whenLeave = false } = options ?? {};

    const { playerCharacter } = getState().global.main;
    const charName = characterName || playerCharacter;

    return makeRules(({ itemEffect }) => ({
      whenInRangeChangesToCheckTouch: itemEffect({
        run({ newValue: inRange, previousValue: prevInRange, itemName: changedDollName, itemState: dollState }) {
          const { dollName: charDollName } = getCharDollStuff(charName as CharacterName) ?? {};
          // at the moment runs for every doll instead of just the main character,
          // could maybe fix with dynamic rule for character that checks for doll changes (and runs at start)
          if (!charDollName || changedDollName !== charDollName || !dollState.isVisible) return;

          const usefulStoryStuff = getUsefulStoryStuff();

          forEach(dollNames, (dollName) => {
            const otherDollState = getState().dolls[dollName];

            if (!otherDollState.isVisible) return;

            const justEntered = inRange[dollName][distanceType] && !prevInRange[dollName][distanceType];
            const justLeft = !inRange[dollName][distanceType] && prevInRange[dollName][distanceType];
            // console.warn(dollName, { justEntered, justLeft });

            const whatToRun = callBacksObject[dollName];
            if (dollName !== charDollName) {
              if ((whenLeave && justLeft) || (!whenLeave && justEntered)) whatToRun?.(usefulStoryStuff);
            }
          });
        },
        check: {
          prop: ["inRange"],
          type: "dolls",
        },
        name: `inRangeStoryRules_${charName}_${distanceType}_${whenLeave}`,
        step: "collisionReaction",
      }),
    }));
  }

  // --------------------------------------------------
  //
  // makeTriggerRules

  type TriggerRulesOptions = Partial<{
    [P_CharacterName in CharacterName]: Partial<{
      [P_PlaceName in PlaceName]: Partial<{
        [P_TriggerName in TriggerNameByPlace[P_PlaceName]]: StoryCallback;
      }>;
    }>;
  }>;
  function makeTriggerRules(
    callBacksObject: TriggerRulesOptions,
    options?: {
      // characterName?: CharacterName;
      whenLeave?: boolean;
    }
  ) {
    // TODO make dynamic rule?
    // this won't update the playerCharacter at the moment
    const { whenLeave = false } = options ?? {};

    // const { playerCharacter } = getState().global.main;
    // const charName = characterName || playerCharacter;

    return makeRules(({ itemEffect }) => ({
      whenAtTriggersChanges: itemEffect({
        run({ newValue: atTriggers, previousValue: prevAtTriggers, itemName: characterName }) {
          const usefulStoryStuff = getUsefulStoryStuff();
          const { nowPlaceName } = usefulStoryStuff;

          if (!(callBacksObject as Record<any, any>)[characterName]) {
            return;
          }

          const triggerNames = placeInfoByName[nowPlaceName].triggerNames as AnyTriggerName[];

          forEach(triggerNames, (triggerName) => {
            const justEntered = atTriggers[triggerName] && !prevAtTriggers[triggerName];
            const justLeft = !atTriggers[triggerName] && prevAtTriggers[triggerName];

            if ((whenLeave && justLeft) || (!whenLeave && justEntered)) {
              (callBacksObject as Record<any, any>)[characterName]?.[nowPlaceName]?.[triggerName]?.(usefulStoryStuff);
            }
          });
        },
        check: {
          prop: ["atTriggers"],
          type: "characters",
        },
        step: "collisionReaction",
      }),
    }));
  }

  return {
    makeCamChangeRules,
    makeCamLeaveRules,
    makeCamSegmentRules,
    makeOnInteractAtTrigger,
    makeOnInteractToTalk,
    makeInteractButtonRules,
    makeOnUsePickupAtTrigger,
    makeOnUsePickupGenerally,
    makeOnUsePickupToTalk,
    makePickupsRules,
    makePlaceLoadRules,
    makePlaceUnloadRules,
    // makeStoryPartRules,
    makeTouchRules,
    makeTriggerRules,
    // makeRuleMaker,
    // makeNestedRuleMaker,
    // makeNestedLeaveRuleMaker,
  };
}
