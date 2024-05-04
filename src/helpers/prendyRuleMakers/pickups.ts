import { breakableForEach, forEach } from "chootils/dist/loops";
import { getRefs, getState, onNextTick } from "repond";
import { meta } from "../../meta";
import {
  AnyTriggerName,
  CharacterName,
  DollName,
  PickupName,
  PlaceName,
  StoryCallback,
  TriggerNameByPlace,
} from "../../types";
import { getCharDollStuff } from "../prendyUtils/characters";
import { getUsefulStoryStuff } from "./prendyRuleMakers";

export function initPickupsEffects({
  onUsePickupAtTrigger,
  onUsePickupToTalk,
  onUsePickupGenerally,
}: {
  onUsePickupAtTrigger: ReturnType<typeof makeOnUsePickupAtTrigger>;
  onUsePickupToTalk: ReturnType<typeof makeOnUsePickupToTalk>;
  onUsePickupGenerally: ReturnType<typeof makeOnUsePickupGenerally>;
}) {
  const onPickupButtonClick = (pickupName: PickupName) => {
    const didUsePickupAtTrigger = onUsePickupAtTrigger(pickupName);
    const didUsePickupWithDoll = onUsePickupToTalk(pickupName);

    // console.log("didUsePickupAtTrigger", didUsePickupAtTrigger);
    // console.log("didUsePickupWithDoll", didUsePickupWithDoll);

    // NOTE the top two functions can return true if they ran,
    // and if neither returned true, it runs the general one
    if (!didUsePickupAtTrigger && !didUsePickupWithDoll) {
      onUsePickupGenerally(pickupName);
    }
  };

  onNextTick(() => {
    // This sets an onClick callback in global refs that gets called when clicking the pickup button,
    // so no rules are actually started here, but it uses the same format as the other rule makers
    getRefs().global.main.onPickupButtonClick = onPickupButtonClick;
  });
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
  characterNameParam?: CharacterName
) {
  const onClickPickupButton = <T_PickupName extends PickupName>(pickupName: T_PickupName) => {
    const characterName = characterNameParam || meta.assets!.characterNames[0];
    const { placeInfoByName } = meta.assets!;
    const usefulStoryStuff = getUsefulStoryStuff();
    let didInteractWithSomething = false;

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
export function makeOnUsePickupToTalk(callBacksObject: OnUsePickupToTalkOptions, characterNameParam?: CharacterName) {
  const onClickPickupButton = <T_PickupName extends PickupName>(pickupName: T_PickupName) => {
    const characterName = characterNameParam || meta.assets!.characterNames[0];
    const { dollNames } = meta.assets!;
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
