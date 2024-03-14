import { useEffect } from "react";
import { startAllEffectGroups, stopAllEffectGroups } from "repond";
import { updateAppVisibility } from "./appVisibility";
import {
  characterEffects,
  characterParamEffects,
  startDynamicCharacterRulesForInitialState,
  stopDynamicCharacterRulesForInitialState,
} from "./characters";
import {
  dollEffects,
  dollParamEffects,
  startDynamicDollRulesForInitialState,
  stopDynamicDollRulesForInitialState,
} from "./dolls";
import { globalChangePlaceEffects } from "./global/changePlace";
import { globalGeneralEffects } from "./global/general";
import { globalSlateEffects } from "./global/slate";
import { globalVideoEffects } from "./global/video";
import { connectKeyboardInputsToState, disconnectKeyboardInputsToState } from "./keyboards";
import { miniBubbleEffects } from "./miniBubbles";
import { modelEffects } from "./models";
import { placeEffects } from "./places";
import { playerEffects } from "./players";
import { sliceVidEffects } from "./sliceVids";
import { speechBubbleEffects } from "./speechBubbles";
import { safeVidEffects } from "./stateVids";

// Export the paramEffects to be used in the project with initEffectGroups
export const prendyEffectGroups = {
  globalVideoEffects,
  globalChangePlaceEffects,
  globalSlateEffects,
  globalGeneralEffects,
  characterEffects,
  dollEffects,
  modelEffects,
  placeEffects,
  playerEffects,
  sliceVidEffects,
  speechBubbleEffects,
  safeVidEffects,
  miniBubbleEffects,
};

// Export the paramEffects to be used in the project with initParamEffectGroups
export const prendyParamEffectGroups = {
  characterParamEffects,
  dollParamEffects,
};

// NOTE this starts all effectGroups even ones defined in the project
function startPrendyMainRules() {
  connectKeyboardInputsToState();
  document.addEventListener("visibilitychange", updateAppVisibility);
  startDynamicCharacterRulesForInitialState();
  startDynamicDollRulesForInitialState();
  startAllEffectGroups();
}
function stopPrendyMainRules() {
  disconnectKeyboardInputsToState();
  document.removeEventListener("visibilitychange", updateAppVisibility);
  stopDynamicCharacterRulesForInitialState();
  stopDynamicDollRulesForInitialState();
  stopAllEffectGroups();
}

export function StartAndStopPrendyRules({}: {}) {
  useEffect(() => {
    startPrendyMainRules();
    return () => stopPrendyMainRules();
  });
  return null;
}

// NOTE types not declared here, since they can be declared in the project
// But could uncomment while developing the library
// declare module "repond/src/declarations" {
//   interface CustomRepondTypes {
//     EffectGroups: typeof prendyEffectGroups;
//     ParamEffectGroups: typeof prendyParamEffectGroups;
//   }
// }
