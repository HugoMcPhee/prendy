import { get_globalChangePlaceRules } from "./changePlace";
import { get_globalGeneralRules } from "./general";
import { get_globalSlateRules as get_globalSceneSlateRules } from "./slate";
import { get_globalVideoRules } from "./video";
export function get_startAllGlobalRules(storeHelpers, prendyStores, prendyOptions, prendyAssets) {
    // making rules
    const globalVideoRules = get_globalVideoRules(storeHelpers, prendyStores, prendyOptions, prendyAssets);
    const globalChangePlaceRules = get_globalChangePlaceRules(storeHelpers, prendyOptions, prendyAssets);
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
