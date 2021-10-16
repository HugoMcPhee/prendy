import { makeGlobalChangePlaceRules } from "./changePlace";
import { makeGlobalGeneralRules } from "./general";
import { makeGlobalScenePlaneRules } from "./scenePlane";
import { makeGlobalVideoRules } from "./video";
export function makeStartAllGlobalRules(conceptoFuncs, gameyConcepts, gameyStartOptions, placeInfoByName, dollNames) {
    // making rules
    const globalVideoRules = makeGlobalVideoRules(conceptoFuncs, gameyConcepts, gameyStartOptions, placeInfoByName, dollNames);
    const globalChangePlaceRules = makeGlobalChangePlaceRules(conceptoFuncs, gameyConcepts, gameyStartOptions, dollNames, placeInfoByName);
    const globalGeneralRules = makeGlobalGeneralRules(conceptoFuncs);
    const globalScenePlaneRules = makeGlobalScenePlaneRules(conceptoFuncs, gameyStartOptions);
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
