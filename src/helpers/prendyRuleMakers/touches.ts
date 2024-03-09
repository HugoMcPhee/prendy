import { forEach } from "chootils/dist/loops";
import { getState, makeRules } from "repond";
import { meta } from "../../meta";
import { CharacterName, DollName } from "../../types";
import { getCharDollStuff } from "../prendyUtils/characters";
import { getUsefulStoryStuff } from "./prendyRuleMakers";

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
  const { characterName, distanceType = "touch", whenLeave = false } = options ?? {};
  return makeRules(({ itemEffect }) => ({
    whenInRangeChangesToCheckTouch: itemEffect({
      run({ newValue: inRange, prevValue: prevInRange, itemId: changedDollName, itemState: dollState }) {
        const { dollNames } = meta.assets!;
        const { playerCharacter } = getState().global.main;
        const charName = characterName || playerCharacter;

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
      name: `inRangeStoryRules_${characterName ?? "player"}_${distanceType}_${whenLeave}`,
      step: "collisionReaction",
      atStepEnd: true,
    }),
  }));
}
