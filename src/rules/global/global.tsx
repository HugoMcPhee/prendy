import { PrendyAssets, PrendyOptions } from "../../declarations";
import { PlaceholderPrendyStores, PrendyStoreHelpers } from "../../stores/typedStoreHelpers";
import { get_globalChangePlaceRules } from "./changePlace";
import { get_globalGeneralRules } from "./general";
import { get_globalSlateRules as get_globalSceneSlateRules } from "./slate";
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
  const globalSlateRules = get_globalSceneSlateRules(storeHelpers, prendyStartOptions);

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
