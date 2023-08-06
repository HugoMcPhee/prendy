import {
  DollName,
  PlaceName,
  PrendyAssets,
  PrendyOptions,
  PrendyStoreHelpers,
  PrendyStores,
  SpotNameByPlace,
} from "../../declarations";
import { get_globalChangePlaceRules } from "./changePlace";
import { get_globalGeneralRules } from "./general";
import { get_globalSlateRules as get_globalSceneSlateRules } from "./slate";
import { get_globalVideoRules } from "./video";

export function get_startAllGlobalRules<
  A_DollName extends DollName = DollName,
  A_PlaceName extends PlaceName = PlaceName,
  A_PrendyAssets extends PrendyAssets = PrendyAssets,
  A_PrendyOptions extends PrendyOptions = PrendyOptions,
  A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers,
  A_PrendyStores extends PrendyStores = PrendyStores,
  A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace
>(
  storeHelpers: A_PrendyStoreHelpers,
  prendyStores: A_PrendyStores,
  prendyStartOptions: A_PrendyOptions,
  prendyAssets: A_PrendyAssets
) {
  // making rules
  const globalVideoRules = get_globalVideoRules(storeHelpers, prendyStores, prendyStartOptions, prendyAssets);
  const globalChangePlaceRules = get_globalChangePlaceRules<
    A_DollName,
    A_PlaceName,
    A_PrendyAssets,
    A_PrendyOptions,
    A_PrendyStoreHelpers,
    A_PrendyStores,
    A_SpotNameByPlace
  >(storeHelpers, prendyStores, prendyStartOptions, prendyAssets);
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
