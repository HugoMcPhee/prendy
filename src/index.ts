import "@babylonjs/loaders";
import { initMovers } from "repond-movers";
import { MyTypes } from "./declarations";
import { meta } from "./meta";
import { timeStatePath } from "./stores/global/global";
import loadGoogleFonts from "./helpers/loadGoogleFonts";
import loadStyles from "./helpers/loadStyles";
import { Globals } from "react-spring";
import { onNextTick } from "repond";
export { prendyEffectGroups, prendyParamEffectGroups } from "./effects/effects";
export { DebugFrameRate } from "./components/DebugFrameRate";
export { PrendyApp } from "./components/PrendyApp";
export * from "./declarations";
export { makePrendyOptions } from "./getPrendyOptions";
export * from "./helpers/babylonjs/vectors";
export * from "./helpers/prendyHelpers/characters";
export * from "./helpers/prendyHelpers/dolls";
export * from "./helpers/prendyHelpers/players";
export * from "./helpers/prendyHelpers/scene";
export * from "./helpers/prendyHelpers/sound";
export * from "./helpers/prendyHelpers/speech";
export * from "./helpers/prendyHelpers/stickers";
export * from "./helpers/prendyRuleMakers/cameras";
export * from "./helpers/prendyRuleMakers/interact";
export * from "./helpers/prendyRuleMakers/pickups";
export * from "./helpers/prendyRuleMakers/places";
export * from "./helpers/prendyRuleMakers/prendyRuleMakers";
export * from "./helpers/prendyRuleMakers/segments";
export * from "./helpers/prendyRuleMakers/touches";
export * from "./helpers/prendyRuleMakers/triggers";
// NOTE update to export all from?
export { loadPrendyState, savePrendyState } from "./helpers/saving";
export { makePrendyStores, prendyStepNames } from "./stores/stores";
export { prendyEventGroups } from "./events/events";

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
  loadGoogleFonts(meta.assets!.fontNames); // Auto-import fonts from google fonts :)
  loadStyles();
  Globals.assign({ frameLoop: "always", requestAnimationFrame: onNextTick }); // for react-spring
}

export function getDefaultDollOptions<T_ModelName extends string>(modelNames: readonly T_ModelName[]) {
  type DollOption = { model: T_ModelName };
  const modelDollOptions: Record<string, DollOption> = {};
  modelNames.forEach((modelName) => (modelDollOptions[modelName] = { model: modelName }));
  return modelDollOptions as { [K_ModelName in T_ModelName]: { model: K_ModelName } };
}
