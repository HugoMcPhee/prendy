import { makeGlobalChangePlaceRules } from "./changePlace";
import { makeGlobalGeneralRules } from "./general";
import { makeGlobalScenePlaneRules } from "./scenePlane";
import { makeGlobalVideoRules } from "./video";
export function makeStartAllGlobalRules(concepFuncs, backdopConcepts, backdopStartOptions, placeInfoByName, dollNames) {
    // making rules
    const globalVideoRules = makeGlobalVideoRules(concepFuncs, backdopConcepts, backdopStartOptions, placeInfoByName, dollNames);
    const globalChangePlaceRules = makeGlobalChangePlaceRules(concepFuncs, backdopConcepts, backdopStartOptions, dollNames, placeInfoByName);
    const globalGeneralRules = makeGlobalGeneralRules(concepFuncs);
    const globalScenePlaneRules = makeGlobalScenePlaneRules(concepFuncs, backdopStartOptions);
    return function startAllGlobalRules() {
        // ----------------------------------
        // running rules
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
