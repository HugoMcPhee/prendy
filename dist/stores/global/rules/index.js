import { makeGlobalChangePlaceRules } from "./changePlace";
import { makeGlobalGeneralRules } from "./general";
import { makeGlobalScenePlaneRules } from "./scenePlane";
import { makeGlobalVideoRules } from "./video";
export function makeStartAllGlobalRules(storeHelpers, prendyStores, prendyStartOptions, prendyAssets) {
    // making rules
    const globalVideoRules = makeGlobalVideoRules(storeHelpers, prendyStores, prendyStartOptions, prendyAssets);
    const globalChangePlaceRules = makeGlobalChangePlaceRules(storeHelpers, prendyStores, prendyStartOptions, prendyAssets);
    const globalGeneralRules = makeGlobalGeneralRules(storeHelpers);
    const globalScenePlaneRules = makeGlobalScenePlaneRules(storeHelpers, prendyStartOptions);
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
