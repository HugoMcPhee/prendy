import { forEach } from "chootils/dist/loops";
import { makeRules } from "repond";
import { meta } from "../../meta";
import { AnyTriggerName, CharacterName, PlaceName, StoryCallback, TriggerNameByPlace } from "../../types";
import { getUsefulStoryStuff } from "./prendyRuleMakers";

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

  const charactersWithTriggers = Object.keys(callBacksObject) as CharacterName[];

  return makeRules(({ itemEffect }) => ({
    whenAtTriggersChanges: itemEffect({
      run({ newValue: atTriggers, prevValue: prevAtTriggers, itemId: characterName }) {
        const { placeInfoByName } = meta.assets!;

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
