import "@babylonjs/loaders";
import { MyTypes } from "./declarations";
import { makePrendyStoryHelpers } from "./helpers/prendyHelpers/helpers";
import { makeAllStoryRuleMakers } from "./helpers/prendyRuleMakers/prendyRuleMakers";
export { loadPrendyState, savePrendyState } from "./helpers/saving";
import { meta } from "./meta";
import { get_dollRules } from "./rules/dolls";
export {
  setCharAnimation,
  setCharPosition,
  setCharRotationY,
  springCharRotation,
  springAddToCharRotationY,
  lookAtOtherCharacter,
  lookAtEachother,
  moveCharacterAt2DAngle,
} from "./helpers/prendyHelpers/characters";
export {
  setDollPosition,
  setDollRotation,
  setDollRotationY,
  springDollRotationY,
  springAddToDollRotationY,
  pushDollRotationY,
  lookAtOtherDoll,
  setDollAnimation,
  focusOnDoll,
  setDollToSpot,
  springDollToSpot,
  dollLooksAtSpot,
  moveDollAt2DAngle,
  hideDoll,
  toggleDollMeshes,
  getDollBonePosition,
} from "./helpers/prendyHelpers/dolls";
export { enableMovement, isHolding, takePickup, setPlayerAnimations } from "./helpers/prendyHelpers/players";
export {
  lookAtSpot,
  hideWallIf,
  showStoryView,
  setSegment,
  setCamera,
  goToNewPlace,
} from "./helpers/prendyHelpers/scene";
export { playNewMusic, stopAllMusic, playSound, stopSound, stopAllSounds } from "./helpers/prendyHelpers/sound";
export { showSpeech, showMiniBubble, hideMiniBubble, showAlarmText } from "./helpers/prendyHelpers/speech";
export { moveSticker, showSticker, hideSticker } from "./helpers/prendyHelpers/stickers";
export { get_DebugFrameRate as makeDebugFrameRate } from "./components/DebugFrameRate";
export { makePrendyApp } from "./components/PrendyApp";
export * from "./declarations";
export { makePrendyOptions } from "./getPrendyOptions";
export { point3dToVector3, vector3ToPoint3d, vector3ToSafePoint3d } from "./helpers/babylonjs/vectors";
export { makePrendyStoryHelpers } from "./helpers/prendyHelpers/helpers";
export { makeAllStoryRuleMakers } from "./helpers/prendyRuleMakers/prendyRuleMakers";
export { makePrendyStoryUtils } from "./helpers/prendyUtils/prendyUtils";
export { makeStartAndStopRules, makeStartPrendyMainRules, makeStartPrendyRules } from "./rules/rules";
export { makePrendyStores, prendyStepNames } from "./stores/stores";

export type DollOptionLoose<T_ModelName extends string> = { model: T_ModelName };
// export type DollOptionsLoose<T_ModelName extends string> = {
//   [K_ModelName in T_ModelName]: DollOptionLoose<K_ModelName>;
// };
export type DollOptionsLoose<T_ModelName extends string> = Record<string, DollOptionLoose<T_ModelName>>;

export type CharacterOptionLoose<T_DollName extends string, T_FontName extends string> = Record<
  string,
  { doll: T_DollName; font: T_FontName }
>;

export const definiedPrendyRules = {
  dolls: null as null | ReturnType<typeof get_dollRules>,
};

export function makePrendy<T_MyTypes extends MyTypes = MyTypes>(
  assets: T_MyTypes["Assets"],
  stores: T_MyTypes["Stores"],
  repond: T_MyTypes["Repond"]
) {
  meta.assets = assets;
  meta.repond = repond;
  meta.stores = stores;

  return makeAllStoryRuleMakers();
}

export function getDefaultDollOptions<T_ModelName extends string>(modelNames: readonly T_ModelName[]) {
  type DollOption = { model: T_ModelName };
  const modelDollOptions: Record<string, DollOption> = {};
  modelNames.forEach((modelName) => (modelDollOptions[modelName] = { model: modelName }));
  return modelDollOptions as { [K_ModelName in T_ModelName]: { model: K_ModelName } };
}
