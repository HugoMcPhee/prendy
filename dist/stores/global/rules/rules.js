import { makeTyped_globalChangePlaceRules } from "./changePlace";
import { makeTyped_globalGeneralRules } from "./general";
import { makeTyped_globalScenePlaneRules } from "./scenePlane";
import { makeTyped_globalVideoRules } from "./video";
export function makeTyped_startAllGlobalRules(storeHelpers, prendyStores, prendyStartOptions, prendyAssets) {
    // making rules
    const globalVideoRules = makeTyped_globalVideoRules(storeHelpers, prendyStores, prendyStartOptions, prendyAssets);
    const globalChangePlaceRules = makeTyped_globalChangePlaceRules(storeHelpers, prendyStores, prendyStartOptions, prendyAssets);
    const globalGeneralRules = makeTyped_globalGeneralRules(storeHelpers);
    const globalScenePlaneRules = makeTyped_globalScenePlaneRules(storeHelpers, prendyStartOptions);
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
