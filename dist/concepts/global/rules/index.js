import { makeGlobalChangePlaceRules } from "./changePlace";
import { makeGlobalGeneralRules } from "./general";
import { makeGlobalScenePlaneRules } from "./scenePlane";
import { makeGlobalVideoRules } from "./video";
export function makeStartAllGlobalRules(concepFuncs, prendyConcepts, prendyStartOptions, prendyArt) {
    // making rules
    const globalVideoRules = makeGlobalVideoRules(concepFuncs, prendyConcepts, prendyStartOptions, prendyArt);
    const globalChangePlaceRules = makeGlobalChangePlaceRules(concepFuncs, prendyConcepts, prendyStartOptions, prendyArt);
    const globalGeneralRules = makeGlobalGeneralRules(concepFuncs);
    const globalScenePlaneRules = makeGlobalScenePlaneRules(concepFuncs, prendyStartOptions);
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
