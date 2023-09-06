import { MyTypes } from "../../declarations";
import { get_globalChangePlaceRules } from "./changePlace";
import { get_globalGeneralRules } from "./general";
import { get_globalSlateRules as get_globalSceneSlateRules } from "./slate";
import { get_globalVideoRules } from "./video";

export function get_startAllGlobalRules<T_MyTypes extends MyTypes = MyTypes>(
  prendyAssets: T_MyTypes["Assets"],
  prendyStores: T_MyTypes["Stores"],
  storeHelpers: T_MyTypes["StoreHelpers"]
) {
  // making rules
  const globalVideoRules = get_globalVideoRules(prendyAssets, prendyStores, storeHelpers);
  const globalChangePlaceRules = get_globalChangePlaceRules<T_MyTypes>(prendyAssets, storeHelpers);
  const globalGeneralRules = get_globalGeneralRules(prendyAssets, storeHelpers);
  const globalSlateRules = get_globalSceneSlateRules(prendyAssets, storeHelpers);

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
