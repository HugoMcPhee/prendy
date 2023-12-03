import { breakableForEach, forEach } from "chootils/dist/loops";
import { getState, makeRules } from "repond";
import { meta } from "../../meta";
import { AnyTriggerName, CharacterName, DollName, PlaceName, StoryCallback, TriggerNameByPlace } from "../../types";
import { getCharDollStuff } from "../prendyUtils/characters";
import { getUsefulStoryStuff } from "./prendyRuleMakers";

export function makeInteractButtonRules({
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
export function makeOnInteractAtTrigger(
  callBacksObject: OnInteractAtTriggerOptions,
  characterNameParam?: CharacterName
) {
  const onClickInteractButton = () => {
    const { placeInfoByName } = meta.assets!;
    const characterName = characterNameParam || meta.assets!.characterNames[0];

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
  characterNameParam?: CharacterName
) {
  const onClickInteractButton = () => {
    const characterName = characterNameParam || meta.assets!.characterNames[0];
    const { dollNames } = meta.assets!;

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
