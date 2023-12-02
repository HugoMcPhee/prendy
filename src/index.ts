import "@babylonjs/loaders";
import { MyTypes } from "./declarations";
import { meta } from "./meta";
import { initMovers } from "repond-movers";
import { timeStatePath } from "./stores/global/global";
export { DebugFrameRate } from "./components/DebugFrameRate";
export { makePrendyApp } from "./components/PrendyApp";
export * from "./declarations";
export { makePrendyOptions } from "./getPrendyOptions";
export { point3dToVector3, vector3ToPoint3d, vector3ToSafePoint3d } from "./helpers/babylonjs/vectors";
export {
  lookAtEachother,
  lookAtOtherCharacter,
  moveCharacterAt2DAngle,
  setCharAnimation,
  setCharPosition,
  setCharRotationY,
  springAddToCharRotationY,
  springCharRotation,
} from "./helpers/prendyHelpers/characters";
export {
  dollLooksAtSpot,
  focusOnDoll,
  getDollBonePosition,
  hideDoll,
  lookAtOtherDoll,
  moveDollAt2DAngle,
  pushDollRotationY,
  setDollAnimation,
  setDollPosition,
  setDollRotation,
  setDollRotationY,
  setDollToSpot,
  springAddToDollRotationY,
  springDollRotationY,
  springDollToSpot,
  toggleDollMeshes,
} from "./helpers/prendyHelpers/dolls";
export { makePrendyStoryHelpers } from "./helpers/prendyHelpers/helpers";
export { enableMovement, isHolding, setPlayerAnimations, takePickup } from "./helpers/prendyHelpers/players";
export {
  goToNewPlace,
  hideWallIf,
  lookAtSpot,
  setCamera,
  setSegment,
  showStoryView,
} from "./helpers/prendyHelpers/scene";
export { playNewMusic, playSound, stopAllMusic, stopAllSounds, stopSound } from "./helpers/prendyHelpers/sound";
export { hideMiniBubble, showAlarmText, showMiniBubble, showSpeech } from "./helpers/prendyHelpers/speech";
export { hideSticker, moveSticker, showSticker } from "./helpers/prendyHelpers/stickers";
export {
  makeCamChangeRules,
  makeCamLeaveRules,
  makeCamSegmentRules,
  makeInteractButtonRules,
  makeOnInteractAtTrigger,
  makeOnInteractToTalk,
  makeOnUsePickupAtTrigger,
  makeOnUsePickupGenerally,
  makeOnUsePickupToTalk,
  makePickupsRules,
  makePlaceLoadRules,
  makePlaceUnloadRules,
  makeTouchRules,
  makeTriggerRules,
} from "./helpers/prendyRuleMakers/prendyRuleMakers";
export { loadPrendyState, savePrendyState } from "./helpers/saving";
export { makeStartAndStopRules, makeStartPrendyMainRules, makeStartPrendyRules } from "./rules/rules";
export { makePrendyStores, prendyStepNames } from "./stores/stores";

// NOTE update to export all from?

export type DollOptionLoose<T_ModelName extends string> = { model: T_ModelName };
// export type DollOptionsLoose<T_ModelName extends string> = {
//   [K_ModelName in T_ModelName]: DollOptionLoose<K_ModelName>;
// };
export type DollOptionsLoose<T_ModelName extends string> = Record<string, DollOptionLoose<T_ModelName>>;

export type CharacterOptionLoose<T_DollName extends string, T_FontName extends string> = Record<
  string,
  { doll: T_DollName; font: T_FontName }
>;

export function initPrendy<T_MyTypes extends MyTypes = MyTypes>(assets: T_MyTypes["Assets"]) {
  meta.assets = assets;
  initMovers(timeStatePath);
}

export function getDefaultDollOptions<T_ModelName extends string>(modelNames: readonly T_ModelName[]) {
  type DollOption = { model: T_ModelName };
  const modelDollOptions: Record<string, DollOption> = {};
  modelNames.forEach((modelName) => (modelDollOptions[modelName] = { model: modelName }));
  return modelDollOptions as { [K_ModelName in T_ModelName]: { model: K_ModelName } };
}
