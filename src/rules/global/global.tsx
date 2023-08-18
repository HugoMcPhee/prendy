import { MyTypes } from "../../declarations";
import { get_globalChangePlaceRules } from "./changePlace";
import { get_globalGeneralRules } from "./general";
import { get_globalSlateRules as get_globalSceneSlateRules } from "./slate";
import { get_globalVideoRules } from "./video";

export function get_startAllGlobalRules<T_MyTypes extends MyTypes = MyTypes>(
  storeHelpers: T_MyTypes["StoreHelpers"],
  prendyStores: T_MyTypes["Stores"],
  prendyOptions: T_MyTypes["Main"]["PrendyOptions"],
  prendyAssets: T_MyTypes["Assets"]
) {
  // making rules
  const globalVideoRules = get_globalVideoRules(storeHelpers, prendyStores, prendyOptions, prendyAssets);
  const globalChangePlaceRules = get_globalChangePlaceRules<T_MyTypes>(storeHelpers, prendyOptions, prendyAssets);
  const globalGeneralRules = get_globalGeneralRules(storeHelpers);
  const globalSlateRules = get_globalSceneSlateRules(storeHelpers, prendyOptions);

  return function startAllGlobalRules() {
    globalVideoRules.startAll();
    globalChangePlaceRules.startAll();
    globalSlateRules.startAll();
    globalGeneralRules.startAll();

    return function stopAllGlobalRules() {
      globalVideoRules.stopAll();
      globalChangePlaceRules.stopAll();
      globalSlateRules.stopAll();
      globalGeneralRules.stopAll();
    };
  };
}
