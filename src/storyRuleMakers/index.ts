import { breakableForEach, forEach } from "shutils/dist/loops";
import { makeGetCharDollStuff } from "../concepts/characters/utils";
import {
  BackdopConcepFuncs,
  PlaceInfoByNamePlaceholder,
} from "../concepts/typedConcepFuncs";

export default "default";

// export each of the rule makers stuff from here :)

export function makeGetUsefulStoryStuff<ConcepFuncs extends BackdopConcepFuncs>(
  concepFuncs: ConcepFuncs
) {
  const { getRefs, getState } = concepFuncs;

  type AllState = ReturnType<ConcepFuncs["getState"]>;
  type AllRefs = ReturnType<ConcepFuncs["getRefs"]>;

  type StoryState = AllState["story"]["main"];
  type StoryRefs = AllRefs["story"]["main"];
  type GlobalState = AllState["global"]["main"];

  type AllPlacesState = AllState["places"];
  type AllPlacesRefs = AllRefs["places"];

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
      nowSegmentName,
      nowPlaceName,
      placeState,
      nowCamName,
      placesRefs,
      placeRefs,
      camsRefs,
      camRefs,
    };
  };
}

export function makeSetStoryState<ConcepFuncs extends BackdopConcepFuncs>(
  concepFuncs: ConcepFuncs
) {
  const { setState } = concepFuncs;

  // ItemState

  // type GetState = typeof getState;
  // type GetRefs = typeof getRefs;
  // // type ItemType = keyof ReturnType<GetState> & keyof ReturnType<GetRefs>;
  // type ItemType = keyof ReturnType<GetState>;
  //
  // type ItemState<T_ItemType extends ItemType> = ReturnType<
  //   GetState
  // >[T_ItemType][keyof ReturnType<GetState>[T_ItemType]];

  type AllState = ReturnType<ConcepFuncs["getState"]>;
  type StoryState = AllState["story"]["main"];

  return function setStoryState(newState: Partial<StoryState>) {
    setState({ story: { main: newState } });
  };
}

export function makeAllStoryRuleMakers<
  ConcepFuncs extends BackdopConcepFuncs,
  PlaceName extends string,
  DollName extends string,
  CharacterName extends string,
  PickupName extends string,
  StoryPartName extends string, // maybe not have?
  CameraNameByPlace extends Record<PlaceName, string>,
  PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>,
  TriggerNameByPlace extends Record<PlaceName, string>
>(
  concepFuncs: ConcepFuncs,
  placeInfoByName: PlaceInfoByName,
  characterNames: readonly CharacterName[],
  dollNames: readonly DollName[]
) {
  const {
    getRefs,
    getState,
    makeRules,
    startItemEffect,
    stopEffect,
  } = concepFuncs;

  type SegmentNameFromCameraAndPlace<
    T_Place extends keyof PlaceInfoByName,
    T_Cam extends keyof PlaceInfoByName[T_Place]["segmentTimesByCamera"]
  > = keyof PlaceInfoByName[T_Place]["segmentTimesByCamera"][T_Cam];

  type CameraNameFromPlace<
    T_Place extends keyof PlaceInfoByName
  > = keyof PlaceInfoByName[T_Place]["segmentTimesByCamera"];

  type CamSegmentRulesOptionsUntyped = Partial<
    {
      [P_PlaceName in PlaceName]: Partial<
        {
          [P_CamName in CameraNameFromPlace<P_PlaceName>]: (
            usefulStuff: Record<any, any> // usefulStoryStuff, but before the types for global state exist
          ) => SegmentNameFromCameraAndPlace<P_PlaceName, P_CamName>;
        }
      >;
    }
  >;

  const getCharDollStuff = makeGetCharDollStuff<ConcepFuncs, CharacterName>(
    concepFuncs
  );

  const getUsefulStoryStuff = makeGetUsefulStoryStuff(concepFuncs);

  type StoryCallback = (
    usefulStuff: ReturnType<typeof getUsefulStoryStuff>
  ) => void;

  // --------------------------------------------------
  //
  // makeCamChangeRules
  type CamChangeRulesOptions = Partial<
    {
      [P_PlaceName in PlaceName]: Partial<
        { [P_TriggerName in CameraNameByPlace[P_PlaceName]]: StoryCallback }
      >;
    }
  >;
  function makeCamChangeRules(callBacksObject: CamChangeRulesOptions) {
    return makeRules((addItemEffect) => ({
      whenCameraChanges: addItemEffect({
        onItemEffect({ newValue: nowCamName }) {
          const usefulStoryStuff = getUsefulStoryStuff();
          const { nowPlaceName } = usefulStoryStuff;
          (callBacksObject as Record<any, any>)[nowPlaceName]?.[nowCamName]?.(
            usefulStoryStuff
          );
        },
        check: { prop: "nowCamName", type: "places" },
        flow: "cameraChange",
        whenToRun: "subscribe",
      }),
    }));
  }

  // --------------------------------------------------
  //
  // makeCamSegmentRules
  type CamSegmentRulesOptions = Partial<
    {
      [P_PlaceName in PlaceName]: Partial<
        {
          [P_CamName in CameraNameFromPlace<P_PlaceName>]: (
            usefulStuff: ReturnType<typeof getUsefulStoryStuff>
          ) => SegmentNameFromCameraAndPlace<P_PlaceName, P_CamName>;
        }
      >;
    }
  >;

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

  type OnInteractAtTriggerOptions = Partial<
    {
      [P_PlaceName in PlaceName]: Partial<
        { [P_TriggerName in TriggerNameByPlace[P_PlaceName]]: StoryCallback }
      >;
    }
  >;
  // the returned function when the interact buttons clicked
  function makeOnInteractAtTrigger(
    callBacksObject: OnInteractAtTriggerOptions,
    characterName: CharacterName = characterNames[0]
  ) {
    const onClickInteractButton = () => {
      const usefulStoryStuff = getUsefulStoryStuff();

      const {
        aConvoIsHappening,
        nowPlaceName,
        playerMovingPaused,
      } = usefulStoryStuff.globalState;
      if (aConvoIsHappening || playerMovingPaused) return;

      const { atTriggers } = getState().characters[characterName];

      const { triggerNames } = placeInfoByName[nowPlaceName];
      // NOTE Could b breakable if only checking one trigger
      forEach(triggerNames, (triggerName) => {
        if (atTriggers[triggerName]) {
          // removing types to fix issue
          (callBacksObject as Record<any, any>)[nowPlaceName]?.[triggerName]?.(
            usefulStoryStuff
          );
        }
      });
    };

    return onClickInteractButton;
  }

  // --------------------------------------------------
  //
  // makeOnInteractToTalk
  // when 'talking' to a doll

  type OnInteractToTalkOptions = Partial<
    { [P_DollName in DollName]: StoryCallback }
  >;
  // the returned function gets run when interact button's clicked
  function makeOnInteractToTalk(
    callBacksObject: OnInteractToTalkOptions,
    characterName: CharacterName = characterNames[0]
  ) {
    const onClickInteractButton = () => {
      const usefulStoryStuff = getUsefulStoryStuff();

      const {
        aConvoIsHappening,
        playerMovingPaused,
      } = usefulStoryStuff.globalState;

      if (aConvoIsHappening || playerMovingPaused) return;

      const { dollState, dollName: charDollName } =
        getCharDollStuff(characterName) ?? {};
      if (!dollState) return;
      const { inRange } = dollState;

      breakableForEach(dollNames, (dollName) => {
        const callBackToRun = callBacksObject[dollName];
        const isInTalkRange = inRange[dollName].talk;
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

  type OnUsePickupAtTriggerOptions = Partial<
    {
      [P_PlaceName in PlaceName]: Partial<
        {
          [P_TriggerName in TriggerNameByPlace[P_PlaceName]]: Partial<
            { [P_PickupName in PickupName]: StoryCallback }
          >;
        }
      >;
    }
  >;
  // the returned function gets run onClick in the pickup picture button gui
  function makeOnUsePickupAtTrigger(
    callBacksObject: OnUsePickupAtTriggerOptions,
    characterName: CharacterName = characterNames[0]
  ) {
    const onClickPickupButton = <T_PickupName extends PickupName>(
      pickupName: T_PickupName
    ) => {
      let didInteractWithSomething = false;

      const usefulStoryStuff = getUsefulStoryStuff();

      const { aConvoIsHappening, nowPlaceName } = usefulStoryStuff.globalState;
      const { atTriggers } = getState().characters[characterName];

      if (aConvoIsHappening) return;

      const { triggerNames } = placeInfoByName[nowPlaceName];
      // NOTE Could b breakable if only checking one trigger
      forEach(triggerNames, (triggerName) => {
        if (atTriggers[triggerName]) {
          const whatToDo = (callBacksObject as Record<any, any>)?.[
            nowPlaceName
          ]?.[triggerName]?.[pickupName];
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
  type OnUsePickupGenerallyOptions = Partial<
    { [P_PickupName in PickupName]: StoryCallback }
  >;
  // the returned function gets run onClick in the pickup picture button gui
  function makeOnUsePickupGenerally(
    callBacksObject: OnUsePickupGenerallyOptions
  ) {
    const onClickPickupButton = <T_PickupName extends PickupName>(
      pickupName: T_PickupName
    ) => {
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

  type OnUsePickupToTalkOptions = Partial<
    {
      [P_DollName in DollName]: Partial<
        { [P_PickupName in PickupName]: StoryCallback }
      >;
    }
  >;
  // the returned function gets run onClick in the pickup picture button gui
  function makeOnUsePickupToTalk(
    callBacksObject: OnUsePickupToTalkOptions,
    characterName: CharacterName = characterNames[0]
  ) {
    const onClickPickupButton = <T_PickupName extends PickupName>(
      pickupName: T_PickupName
    ) => {
      let didInteractWithSomething = false;

      const usefulStoryStuff = getUsefulStoryStuff();

      const { aConvoIsHappening } = usefulStoryStuff.globalState;

      if (aConvoIsHappening) return;

      const { dollState, dollName: charDollName } =
        getCharDollStuff(characterName) ?? {};
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

  type PlaceLoadRulesOptions = Partial<
    { [P_PlaceName in PlaceName]: StoryCallback }
  >;
  function makePlaceLoadRules(
    atStartOfEachPlace: StoryCallback,
    callBacksObject: PlaceLoadRulesOptions
  ) {
    return makeRules((addItemEffect) => ({
      whenPlaceFinishedLoading: addItemEffect({
        onItemEffect() {
          // setState({}, () => {
          const usefulStoryStuff = getUsefulStoryStuff();
          const { nowPlaceName } = usefulStoryStuff;

          atStartOfEachPlace?.(usefulStoryStuff);

          (callBacksObject as Record<any, any>)[nowPlaceName]?.(
            usefulStoryStuff
          );
          // });
        },
        check: {
          type: "global",
          prop: ["isLoadingBetweenPlaces"],
          becomes: "false",
        },
        flow: "respondToNewPlace",
        whenToRun: "subscribe",
      }),
    }));
  }
  function makePlaceNotLoadedRules(callBacksObject: PlaceLoadRulesOptions) {
    return makeRules((addItemEffect) => ({
      whenPlaceFinishedLoading: addItemEffect({
        onItemEffect({ previousValue: prevPlace, newValue: newPlace }) {
          let ruleName = startItemEffect({
            onItemEffect() {
              stopEffect(ruleName);
              console.log("unload rules for", prevPlace);
              const usefulStoryStuff = getUsefulStoryStuff();
              (callBacksObject as Record<any, any>)[prevPlace]?.(
                usefulStoryStuff
              );
            },
            check: {
              type: "global",
              prop: ["isLoadingBetweenPlaces"],
              becomes: "false",
            },
            whenToRun: "subscribe",
            flow: "input",
          });
        },
        check: { type: "global", prop: ["nowPlaceName"] },
        flow: "story",
        whenToRun: "subscribe",
      }),
    }));
  }

  // --------------------------------------------------
  //
  // makeStoryPartRules

  // could have this as chapterName > storyPart too
  type StoryPartRulesOptions = Partial<
    Record<
      StoryPartName,
      (usefulStuff: ReturnType<typeof getUsefulStoryStuff>) => void
    >
  >;
  function makeStoryPartRules(callBacksObject: StoryPartRulesOptions) {
    return makeRules((_addItemEffect, addEffect) => ({
      whenStoryPartChanges: addEffect({
        onEffect(_diffInfo) {
          const usefulStoryStuff = getUsefulStoryStuff();
          const { storyPart } = usefulStoryStuff;
          callBacksObject[storyPart as StoryPartName]?.(usefulStoryStuff);
        },
        check: {
          prop: ["storyPart"],
          type: "story",
        },
        flow: "story",
        whenToRun: "subscribe",
      }),
    }));
  }

  // --------------------------------------------------
  // makeTouchRules
  // doll touch rules

  type TouchRulesOptions = Partial<
    {
      [P_DollName in DollName]: (
        usefulStuff: ReturnType<typeof getUsefulStoryStuff>
      ) => void;
    }
  >;
  function makeTouchRules(
    callBacksObject: TouchRulesOptions,
    options?: {
      characterName?: CharacterName;
      distanceType?: "touch" | "talk";
      whenLeave?: boolean;
    }
  ) {
    const {
      characterName = "walker",
      distanceType = "touch",
      whenLeave = false,
    } = options ?? {};

    return makeRules((addItemEffect) => ({
      whenInRangeChangesToCheckTouch: addItemEffect({
        onItemEffect({
          newValue: inRange,
          previousValue: prevInRange,
          itemName: changedDollName,
        }) {
          const { dollName: charDollName } =
            getCharDollStuff(characterName as CharacterName) ?? {};
          // at the moment runs for every doll instead of just the main character,
          // could maybe fix with dynamic rule for character that checks for doll changes (and runs at start)
          if (!charDollName || changedDollName !== charDollName) return;

          const usefulStoryStuff = getUsefulStoryStuff();

          forEach(dollNames, (dollName) => {
            const justEntered =
              inRange[dollName][distanceType] &&
              !prevInRange[dollName][distanceType];
            const justLeft =
              !inRange[dollName][distanceType] &&
              prevInRange[dollName][distanceType];
            // console.warn(dollName, { justEntered, justLeft });

            const whatToRun = callBacksObject[dollName];
            if (dollName !== charDollName) {
              if ((whenLeave && justLeft) || (!whenLeave && justEntered))
                whatToRun?.(usefulStoryStuff);
            }
          });
        },
        check: {
          prop: ["inRange"],
          type: "dolls",
        },
        name: `inRangeStoryRules_${characterName}_${distanceType}_${whenLeave}`,
        flow: "collisionReaction",
      }),
    }));
  }

  // --------------------------------------------------
  //
  // makeTriggerRules

  type TriggerRulesOptions = Partial<
    {
      [P_PlaceName in PlaceName]: Partial<
        { [P_TriggerName in TriggerNameByPlace[P_PlaceName]]: StoryCallback }
      >;
    }
  >;
  function makeTriggerRules(
    callBacksObject: TriggerRulesOptions,
    options?: {
      characterName?: CharacterName;
      whenLeave?: boolean;
    }
  ) {
    const { characterName = "walker", whenLeave = false } = options ?? {};
    return makeRules((addItemEffect) => ({
      whenAtTriggersChanges: addItemEffect({
        onItemEffect({ newValue: atTriggers, previousValue: prevAtTriggers }) {
          const usefulStoryStuff = getUsefulStoryStuff();
          const { nowPlaceName } = usefulStoryStuff;
          const { triggerNames } = placeInfoByName[nowPlaceName];
          forEach(triggerNames, (triggerName) => {
            const justEntered =
              atTriggers[triggerName] && !prevAtTriggers[triggerName];
            const justLeft =
              !atTriggers[triggerName] && prevAtTriggers[triggerName];

            if ((whenLeave && justLeft) || (!whenLeave && justEntered)) {
              (callBacksObject as Record<any, any>)[nowPlaceName]?.[
                triggerName
              ]?.(usefulStoryStuff);
            }
          });
        },
        check: {
          prop: ["atTriggers"],
          type: "characters",
          name: characterName,
        },
        flow: "collisionReaction",
      }),
    }));
  }

  return {
    makeCamChangeRules,
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
