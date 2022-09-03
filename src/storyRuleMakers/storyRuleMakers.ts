import { breakableForEach, forEach } from "chootils/dist/loops";
import { makeTyped_getCharDollStuff } from "../stores/characters/utils";
import { PrendyStoreHelpers } from "../stores/typedStoreHelpers";
import {
  AnyTriggerName,
  CameraNameByPlace,
  CharacterName,
  DollName,
  PickupName,
  PlaceInfoByName,
  PlaceName,
  StoryPartName,
  TriggerNameByPlace,
} from "../declarations";
import { makeTyped_dollStoryHelpers } from "../utils/story/helpers/dolls";

// export each of the rule makers stuff from here :)

export function makeTyped_getUsefulStoryStuff<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers) {
  const { getRefs, getState } = storeHelpers;

  type AllState = ReturnType<StoreHelpers["getState"]>;
  type AllRefs = ReturnType<StoreHelpers["getRefs"]>;

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
    const { chapterName, storyPart } = storyState;
    const { nowPlaceName, nowSegmentName } = globalState;
    const allPlacesState = getState().places as AllPlacesState;
    const placeState = allPlacesState[nowPlaceName];
    const { nowCamName } = placeState;
    const placesRefs = getRefs().places as AllPlacesRefs;
    const placeRefs = placesRefs[nowPlaceName];
    const { camsRefs } = placesRefs[nowPlaceName];
    const camRefs = camsRefs[nowCamName];

    return {
      storyState,
      storyRefs,
      globalState,
      chapterName: chapterName as StoryState["chapterName"],
      storyPart: storyPart as StoryState["storyPart"],
      nowSegmentName: nowSegmentName as GlobalState["nowSegmentName"],
      nowPlaceName: nowPlaceName as GlobalState["nowPlaceName"],
      placeState: placeState as AllPlacesState[keyof AllPlacesState],
      nowCamName: nowCamName as AllPlacesState[keyof AllPlacesState]["nowCamName"],
      placesRefs: placesRefs as AllPlacesRefs,
      placeRefs: placeRefs as APlaceRefs,
      camsRefs: camsRefs as APlaceRefsCamsRefs,
      camRefs: camRefs as APlaceRefsCamsRefs[keyof APlaceRefsCamsRefs],
    };
  };
}

export function makeTyped_setStoryState<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers) {
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

  type AllState = ReturnType<StoreHelpers["getState"]>;
  type StoryState = AllState["story"]["main"];

  return function setStoryState(newState: Partial<StoryState>) {
    setState({ story: { main: newState } });
  };
}

export function makeAllStoryRuleMakers<
  StoreHelpers extends PrendyStoreHelpers,
  A_AnyTriggerName extends AnyTriggerName = AnyTriggerName,
  A_CameraNameByPlace extends CameraNameByPlace = CameraNameByPlace,
  A_CharacterName extends CharacterName = CharacterName,
  A_DollName extends DollName = DollName,
  A_PickupName extends PickupName = PickupName,
  A_PlaceInfoByName extends PlaceInfoByName = PlaceInfoByName,
  A_PlaceName extends PlaceName = PlaceName,
  A_StoryPartName extends StoryPartName = StoryPartName,
  A_TriggerNameByPlace extends TriggerNameByPlace = TriggerNameByPlace
>(
  storeHelpers: StoreHelpers,
  placeInfoByName: A_PlaceInfoByName,
  characterNames: readonly A_CharacterName[],
  dollNames: readonly A_DollName[]
) {
  const { getRefs, getState, makeRules, startItemEffect, stopEffect, onNextTick } = storeHelpers;

  const getCharDollStuff = makeTyped_getCharDollStuff(storeHelpers);

  const getUsefulStoryStuff = makeTyped_getUsefulStoryStuff(storeHelpers);

  type StoryCallback = (usefulStuff: ReturnType<typeof getUsefulStoryStuff>) => void;

  type SegmentNameFromCameraAndPlace<
    T_Place extends keyof A_PlaceInfoByName,
    T_Cam extends keyof A_PlaceInfoByName[T_Place]["segmentTimesByCamera"]
  > = keyof A_PlaceInfoByName[T_Place]["segmentTimesByCamera"][T_Cam];

  type CameraNameFromPlace<T_Place extends keyof A_PlaceInfoByName> =
    keyof A_PlaceInfoByName[T_Place]["segmentTimesByCamera"];

  type CamSegmentRulesOptionsUntyped = Partial<{
    [P_PlaceName in A_PlaceName]: Partial<{
      [P_CamName in CameraNameFromPlace<P_PlaceName>]: (
        usefulStuff: Record<any, any> // usefulStoryStuff, but before the types for global state exist
      ) => SegmentNameFromCameraAndPlace<P_PlaceName, P_CamName>;
    }>;
  }>;

  // --------------------------------------------------
  //
  // makeCamChangeRules
  type CamChangeRulesOptions = Partial<{
    [P_PlaceName in A_PlaceName]: Partial<{
      [P_TriggerName in A_CameraNameByPlace[P_PlaceName]]: StoryCallback;
    }>;
  }>;
  function makeCamChangeRules(callBacksObject: CamChangeRulesOptions) {
    return makeRules(({ itemEffect }) => ({
      whenCameraChanges: itemEffect({
        run({ newValue: nowCamName }) {
          const usefulStoryStuff = getUsefulStoryStuff();
          const { nowPlaceName } = usefulStoryStuff;
          (callBacksObject as Record<any, any>)[nowPlaceName]?.[nowCamName]?.(usefulStoryStuff);
        },
        check: { prop: "nowCamName", type: "places" },
        step: "cameraChange",
        atStepEnd: true,
      }),
    }));
  }
  function makeCamLeaveRules(callBacksObject: CamChangeRulesOptions) {
    return makeRules(({ itemEffect }) => ({
      whenCameraChanges: itemEffect({
        run({ previousValue: prevCamName }) {
          const usefulStoryStuff = getUsefulStoryStuff();
          const { nowPlaceName } = usefulStoryStuff;
          (callBacksObject as Record<any, any>)[nowPlaceName]?.[prevCamName]?.(usefulStoryStuff);
        },
        check: { prop: "nowCamName", type: "places" },
        step: "cameraChange",
        atStepEnd: true,
      }),
    }));
  }

  // --------------------------------------------------
  //
  // makeCamSegmentRules
  type CamSegmentRulesOptions = Partial<{
    [P_PlaceName in A_PlaceName]: Partial<{
      [P_CamName in CameraNameFromPlace<P_PlaceName>]: (
        usefulStuff: ReturnType<typeof getUsefulStoryStuff>
      ) => SegmentNameFromCameraAndPlace<P_PlaceName, P_CamName>;
    }>;
  }>;

  //  This sets an options object in global refs that gets checked when changing segment
  function makeCamSegmentRules(callBacksObject: CamSegmentRulesOptions) {
    setTimeout(() => {
      getRefs().global.main.camSegmentRulesOptions = callBacksObject as CamSegmentRulesOptionsUntyped;
    }, 0);
    return true;
  }

  // --------------------------------------------------
  //
  // makeOnInteractAtTrigger
  // when pressing interact button at trigger

  type OnInteractAtTriggerOptions = Partial<{
    [P_PlaceName in A_PlaceName]: Partial<{
      [P_TriggerName in A_TriggerNameByPlace[P_PlaceName]]: StoryCallback;
    }>;
  }>;
  // the returned function when the interact buttons clicked
  function makeOnInteractAtTrigger(
    callBacksObject: OnInteractAtTriggerOptions,
    characterName: A_CharacterName = characterNames[0]
  ) {
    const onClickInteractButton = () => {
      const usefulStoryStuff = getUsefulStoryStuff();

      const { aConvoIsHappening, nowPlaceName, playerMovingPaused } = usefulStoryStuff.globalState;
      if (aConvoIsHappening || playerMovingPaused) return;

      const { atTriggers } = getState().characters[characterName];

      const triggerNames = placeInfoByName[nowPlaceName].triggerNames as A_AnyTriggerName[];
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
    [P_DollName in A_DollName]: StoryCallback;
  }>;
  // the returned function gets run when interact button's clicked
  function makeOnInteractToTalk(
    callBacksObject: OnInteractToTalkOptions,
    distanceType: "touch" | "talk" = "talk",
    characterName: A_CharacterName = characterNames[0]
  ) {
    const onClickInteractButton = () => {
      const usefulStoryStuff = getUsefulStoryStuff();

      const { aConvoIsHappening, playerMovingPaused } = usefulStoryStuff.globalState;

      if (aConvoIsHappening || playerMovingPaused) return;

      const { dollState, dollName: charDollName } = getCharDollStuff(characterName) ?? {};
      if (!dollState) return;
      const { inRange } = dollState;

      breakableForEach(dollNames, (dollName) => {
        const callBackToRun = callBacksObject[dollName];
        const isInTalkRange = inRange[dollName][distanceType];
        if (dollName !== charDollName && isInTalkRange) {
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
    [P_PlaceName in A_PlaceName]: Partial<{
      [P_TriggerName in A_TriggerNameByPlace[P_PlaceName]]: Partial<{
        [P_PickupName in A_PickupName]: StoryCallback;
      }>;
    }>;
  }>;
  // the returned function gets run onClick in the pickup picture button gui
  function makeOnUsePickupAtTrigger(
    callBacksObject: OnUsePickupAtTriggerOptions,
    characterName: A_CharacterName = characterNames[0]
  ) {
    const onClickPickupButton = <T_PickupName extends A_PickupName>(pickupName: T_PickupName) => {
      let didInteractWithSomething = false;

      const usefulStoryStuff = getUsefulStoryStuff();

      const { aConvoIsHappening, nowPlaceName } = usefulStoryStuff.globalState;
      const { atTriggers } = getState().characters[characterName];

      if (aConvoIsHappening) return;

      const triggerNames = placeInfoByName[nowPlaceName].triggerNames as A_AnyTriggerName[];

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
    [P_PickupName in A_PickupName]: StoryCallback;
  }>;
  // the returned function gets run onClick in the pickup picture button gui
  function makeOnUsePickupGenerally(callBacksObject: OnUsePickupGenerallyOptions) {
    const onClickPickupButton = <T_PickupName extends A_PickupName>(pickupName: T_PickupName) => {
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
    [P_DollName in A_DollName]: Partial<{
      [P_PickupName in A_PickupName]: StoryCallback;
    }>;
  }>;
  // the returned function gets run onClick in the pickup picture button gui
  function makeOnUsePickupToTalk(
    callBacksObject: OnUsePickupToTalkOptions,
    characterName: A_CharacterName = characterNames[0]
  ) {
    const onClickPickupButton = <T_PickupName extends A_PickupName>(pickupName: T_PickupName) => {
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
    [P_PlaceName in A_PlaceName]: StoryCallback;
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
        step: "respondToNewPlace",
        atStepEnd: true,
      }),
    }));
  }
  function makePlaceNotLoadedRules(callBacksObject: PlaceLoadRulesOptions) {
    return makeRules(({ itemEffect }) => ({
      whenPlaceFinishedLoading: itemEffect({
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

  // could have this as chapterName > storyPart too
  type StoryPartRulesOptions = Partial<
    Record<A_StoryPartName, (usefulStuff: ReturnType<typeof getUsefulStoryStuff>) => void>
  >;
  function makeStoryPartRules(callBacksObject: StoryPartRulesOptions) {
    return makeRules(({ effect }) => ({
      whenStoryPartChanges: effect({
        run(_diffInfo) {
          const usefulStoryStuff = getUsefulStoryStuff();
          const { storyPart } = usefulStoryStuff;
          callBacksObject[storyPart as A_StoryPartName]?.(usefulStoryStuff);
        },
        check: {
          prop: ["storyPart"],
          type: "story",
        },
        step: "story",
        atStepEnd: true,
      }),
    }));
  }

  // --------------------------------------------------
  // makeTouchRules
  // doll touch rules

  type TouchRulesOptions = Partial<{
    [P_DollName in A_DollName]: (usefulStuff: ReturnType<typeof getUsefulStoryStuff>) => void;
  }>;
  function makeTouchRules(
    callBacksObject: TouchRulesOptions,
    options?: {
      characterName?: A_CharacterName;
      distanceType?: "touch" | "talk" | "see";
      whenLeave?: boolean;
    }
  ) {
    const { characterName, distanceType = "touch", whenLeave = false } = options ?? {};

    const { playerCharacter } = getState().global.main;
    const charName = characterName || playerCharacter;

    return makeRules(({ itemEffect }) => ({
      whenInRangeChangesToCheckTouch: itemEffect({
        run({ newValue: inRange, previousValue: prevInRange, itemName: changedDollName }) {
          const { dollName: charDollName } = getCharDollStuff(charName as A_CharacterName) ?? {};
          // at the moment runs for every doll instead of just the main character,
          // could maybe fix with dynamic rule for character that checks for doll changes (and runs at start)
          if (!charDollName || changedDollName !== charDollName) return;

          const usefulStoryStuff = getUsefulStoryStuff();

          forEach(dollNames, (dollName) => {
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
    [P_CharacterName in A_CharacterName]: Partial<{
      [P_PlaceName in A_PlaceName]: Partial<{
        [P_TriggerName in A_TriggerNameByPlace[P_PlaceName]]: StoryCallback;
      }>;
    }>;
  }>;
  function makeTriggerRules(
    callBacksObject: TriggerRulesOptions,
    options?: {
      // characterName?: A_CharacterName;
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

          const triggerNames = placeInfoByName[nowPlaceName].triggerNames as A_AnyTriggerName[];

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
    makeOnUsePickupAtTrigger,
    makeOnUsePickupGenerally,
    makeOnUsePickupToTalk,
    makePlaceLoadRules,
    makePlaceNotLoadedRules,
    makeStoryPartRules,
    makeTouchRules,
    makeTriggerRules,
  };
}
