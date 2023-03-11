import { PrendyAssets, PrendyOptions } from "../../declarations";
import { PrendyStoreHelpers, PlaceholderPrendyStores } from "../../stores/typedStoreHelpers";
import { get_globalChangePlaceRules } from "./changePlace";
import { get_globalGeneralRules } from "./general";
import { get_globalScenePlaneRules } from "./scenePlane";
import { get_globalVideoRules } from "./video";

export function get_startAllGlobalRules<
  StoreHelpers extends PrendyStoreHelpers,
  PrendyStores extends PlaceholderPrendyStores
>(
  storeHelpers: StoreHelpers,
  prendyStores: PrendyStores,
  prendyStartOptions: PrendyOptions,
  prendyAssets: PrendyAssets
) {
  // making rules
  const globalVideoRules = get_globalVideoRules(storeHelpers, prendyStores, prendyStartOptions, prendyAssets);
  const globalChangePlaceRules = get_globalChangePlaceRules(
    storeHelpers,
    prendyStores,
    prendyStartOptions,
    prendyAssets
  );
  const globalGeneralRules = get_globalGeneralRules(storeHelpers);
  const globalScenePlaneRules = get_globalScenePlaneRules(storeHelpers, prendyStartOptions);

  return function startAllGlobalRules() {
    globalVideoRules.startAll();
    globalChangePlaceRules.startAll();
    globalScenePlaneRules.startAll();
    globalGeneralRules.startAll();

    return function stopAllGlobalRules() {
      globalVideoRules.stopAll();
      globalChangePlaceRules.stopAll();
      globalScenePlaneRules.stopAll();
      globalGeneralRules.stopAll();
    };
  };
}
