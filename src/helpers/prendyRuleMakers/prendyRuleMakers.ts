import { breakableForEach, forEach } from "chootils/dist/loops";
import { MyTypes } from "../../declarations";
import { meta } from "../../meta";
import { getCharDollStuff } from "../prendyUtils/characters";

// export each of the rule makers stuff from here :)

type PrendyStoreHelpers = MyTypes["Repond"];

type AllState = ReturnType<PrendyStoreHelpers["getState"]>;
type AllRefs = ReturnType<PrendyStoreHelpers["getRefs"]>;

type StoryState = AllState["story"]["main"];
type StoryRefs = AllRefs["story"]["main"];
type GlobalState = AllState["global"]["main"];

type AllPlacesState = AllState["places"];
type AllPlacesRefs = AllRefs["places"];

type APlaceRefs = AllPlacesRefs[keyof AllPlacesRefs];
type APlaceRefsCamsRefs = APlaceRefs["camsRefs"];

export function getUsefulStoryStuff() {
  const { getState, getRefs } = meta.repond!;

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
}
// }

// ItemState

// type GetState = MyTypes["Repond"]["getState"];
// type GetRefs = typeof getRefs;
// // type ItemType = keyof ReturnType<GetState> & keyof ReturnType<GetRefs>;
// type ItemType = keyof ReturnType<GetState>;
//
// type ItemState<T_ItemType extends ItemType> = ReturnType<
//   GetState
// >[T_ItemType][keyof ReturnType<GetState>[T_ItemType]];

export function setStoryState(newState: Partial<StoryState>) {
  const { setState } = meta.repond!;
  setState({ story: { main: newState } });
}

// export function makeAllStoryRuleMakers() {
type AnyTriggerName = MyTypes["Types"]["AnyTriggerName"];
type CharacterName = MyTypes["Types"]["CharacterName"];
type DollName = MyTypes["Types"]["DollName"];
type PickupName = MyTypes["Types"]["PickupName"];
type PlaceInfoByName = MyTypes["Types"]["PlaceInfoByName"];
type PlaceName = MyTypes["Types"]["PlaceName"];
type TriggerNameByPlace = MyTypes["Types"]["TriggerNameByPlace"];

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
//` makeCamChangeRules

// const { getRefs, getState, makeRules, startItemEffect, stopEffect, makeNestedRuleMaker, makeNestedLeaveRuleMaker } =
//   meta.repond!;

type T_ItemType = keyof ReturnType<MyTypes["Repond"]["getState"]>;

// type HelperType<T extends T_ItemType> = StoreHelperTypes<MyTypes["Repond"]["getState"], typeof getRefs, T>;

// type AllItemsState<T extends T_ItemType> = HelperType<T>["AllItemsState"];
type AllItemsState = ReturnType<MyTypes["Repond"]["getState"]>;
// type ItemState<T extends T_ItemType> = HelperType<T>["ItemState"];
// type ItemRefs<T extends T_ItemType> = HelperType<T>["ItemRefs"];

// Manually typing cause the generic fucntion type isnt kept from repond,
// maybe it would work if passing a generic type all the way down for PrendyStoreHelpers,
// or a new custom base level type (like A_CameraName) but it seems like a lot of passed generic types
// so trying to manually copy some types from repond
// NOTE ended up not reading from getState becuase that wasn't preserved too, so uses
// A_PlaceName and A_CameraNameByPlace directly

type CamChangeRulesParam = Partial<{
  [P_PlaceName in PlaceName]: Partial<
    Record<CameraNameFromPlace<P_PlaceName>, (usefulStuff: ReturnType<typeof getUsefulStoryStuff>) => void>
  >;
}>;

type CamChangeRulesReturn = {
  start: (ruleName: "whenPropertyChanges") => void;
  stop: (ruleName: "whenPropertyChanges") => void;
  startAll: () => void;
  stopAll: () => void;
  ruleNames: "whenPropertyChanges"[];
  run: (ruleName: "whenPropertyChanges") => void;
  runAll: () => void;
};

type CamChangeRules = (callBacksObject: CamChangeRulesParam) => CamChangeRulesReturn;

export function makeCamChangeRules(callBacksObject: CamChangeRulesParam) {
  const { makeNestedRuleMaker } = meta.repond!;
  return makeNestedRuleMaker(
    ["global", "main", "nowPlaceName"],
    ["global", "main", "nowCamName"],
    "cameraChange",
    getUsefulStoryStuff
  )(callBacksObject) as CamChangeRulesReturn;
}

export function makeCamLeaveRules(callBacksObject: CamChangeRulesParam) {
  const { makeNestedLeaveRuleMaker } = meta.repond!;
  return makeNestedLeaveRuleMaker(
    ["global", "main", "nowPlaceName"],
    ["global", "main", "nowCamName"],
    "cameraChange",
    getUsefulStoryStuff
  )(callBacksObject) as CamChangeRulesReturn;
}

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

export function makeCamSegmentRules(callBacksObject: CamSegmentRulesOptions) {
  const { getRefs } = meta.repond!;
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

export function makePickupsRules({
  onUsePickupAtTrigger,
  onUsePickupToTalk,
  onUsePickupGenerally,
}: {
  onUsePickupAtTrigger: ReturnType<typeof makeOnUsePickupAtTrigger>;
  onUsePickupToTalk: ReturnType<typeof makeOnUsePickupToTalk>;
  onUsePickupGenerally: ReturnType<typeof makeOnUsePickupGenerally>;
}) {
  const { getRefs } = meta.repond!;

  const onPickupButtonClick = (pickupName: PickupName) => {
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

export function makeInteractButtonRules({
  onInteractAtTrigger,
  onInteractAtTalk,
}: {
  onInteractAtTrigger: ReturnType<typeof makeOnInteractAtTrigger>;
  onInteractAtTalk: ReturnType<typeof makeOnInteractToTalk>;
}) {
  const { makeRules } = meta.repond!;

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
export function makeOnInteractAtTrigger(
  callBacksObject: OnInteractAtTriggerOptions,
  characterName: CharacterName = meta.assets!.characterNames[0]
) {
  const { placeInfoByName } = meta.assets!;

  const { getState } = meta.repond!;

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
export function makeOnInteractToTalk(
  callBacksObject: OnInteractToTalkOptions,
  distanceType: "touch" | "talk" = "talk",
  characterName: CharacterName = meta.assets!.characterNames[0]
) {
  const { getState } = meta.repond!;
  const { dollNames } = meta.assets!;

  const onClickInteractButton = () => {
    const usefulStoryStuff = getUsefulStoryStuff();
    const { aConvoIsHappening, playerMovingPaused } = usefulStoryStuff.globalState;

    if (aConvoIsHappening || playerMovingPaused) return;

    const { dollState, dollRefs: charDollRefs, dollName: charDollName } = getCharDollStuff(characterName) ?? {};
    if (!dollState) return;
    const { inRange } = dollState;

    breakableForEach(dollNames, (dollName) => {
      const dollState = getState().dolls[dollName];

      const callBackToRun = callBacksObject[dollName];
      const isInTalkRange = inRange[dollName][distanceType];
      // && dollState.isVisible
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
  [P_PlaceName in PlaceName]: Partial<{
    [P_TriggerName in TriggerNameByPlace[P_PlaceName]]: Partial<{
      [P_PickupName in PickupName]: StoryCallback;
    }>;
  }>;
}>;
// the returned function gets run onClick in the pickup picture button gui
export function makeOnUsePickupAtTrigger(
  callBacksObject: OnUsePickupAtTriggerOptions,
  characterName: CharacterName = meta.assets!.characterNames[0]
) {
  const { getState } = meta.repond!;
  const { placeInfoByName } = meta.assets!;

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
export function makeOnUsePickupGenerally(callBacksObject: OnUsePickupGenerallyOptions) {
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
export function makeOnUsePickupToTalk(
  callBacksObject: OnUsePickupToTalkOptions,
  characterName: CharacterName = meta.assets!.characterNames[0]
) {
  const { dollNames } = meta.assets!;
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
export function makePlaceLoadRules(atStartOfEachPlace: StoryCallback, callBacksObject: PlaceLoadRulesOptions) {
  const { makeRules } = meta.repond!;

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
export function makePlaceUnloadRules(callBacksObject: PlaceLoadRulesOptions) {
  const { makeRules, startItemEffect, stopEffect } = meta.repond!;

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
// makeTouchRules
// doll touch rules

type TouchRulesOptions = Partial<{
  [P_DollName in DollName]: (usefulStuff: ReturnType<typeof getUsefulStoryStuff>) => void;
}>;
export function makeTouchRules(
  callBacksObject: TouchRulesOptions,
  options?: {
    characterName?: CharacterName;
    distanceType?: "touch" | "talk" | "see";
    whenLeave?: boolean;
  }
) {
  const { getState, makeRules } = meta.repond!;
  const { dollNames } = meta.assets!;

  const { characterName, distanceType = "touch", whenLeave = false } = options ?? {};

  const { playerCharacter } = getState().global.main;
  const charName = characterName || playerCharacter;

  return makeRules(({ itemEffect }) => ({
    whenInRangeChangesToCheckTouch: itemEffect({
      run({ newValue: inRange, previousValue: prevInRange, itemName: changedDollName, itemState: dollState }) {
        const { dollName: charDollName } = getCharDollStuff(charName as CharacterName) ?? {};

        // at the moment runs for every doll instead of just the main character,
        // could maybe fix with dynamic rule for character that checks for doll changes (and runs at start)
        if (!charDollName || changedDollName !== charDollName) return;
        // || !dollState.isVisible

        const usefulStoryStuff = getUsefulStoryStuff();

        forEach(dollNames, (dollName) => {
          const otherDollState = getState().dolls[dollName];

          // if (!otherDollState.isVisible) return;

          const justEntered = inRange[dollName][distanceType] && !prevInRange[dollName][distanceType];
          const justLeft = !inRange[dollName][distanceType] && prevInRange[dollName][distanceType];

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
      atStepEnd: true,
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
export function makeTriggerRules(
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

  const charactersWithTriggers = Object.keys(callBacksObject) as CharacterName[];
  console.log("charactersWithTriggers", charactersWithTriggers);
  const { makeRules } = meta.repond!;
  const { placeInfoByName } = meta.assets!;

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
        name: charactersWithTriggers,
      },
      step: "collisionReaction",
    }),
  }));
}

// return {
//   makeCamChangeRules,
//   makeCamLeaveRules,
//   makeCamSegmentRules,
//   makeOnInteractAtTrigger,
//   makeOnInteractToTalk,
//   makeInteractButtonRules,
//   makeOnUsePickupAtTrigger,
//   makeOnUsePickupGenerally,
//   makeOnUsePickupToTalk,
//   makePickupsRules,
//   makePlaceLoadRules,
//   makePlaceUnloadRules,
//   makeTouchRules,
//   makeTriggerRules,
//   // makeStoryPartRules,
//   // makeRuleMaker,
//   // makeNestedRuleMaker,
//   // makeNestedLeaveRuleMaker,
// };
