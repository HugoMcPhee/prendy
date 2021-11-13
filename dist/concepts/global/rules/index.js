import { makeGlobalChangePlaceRules } from "./changePlace";
import { makeGlobalGeneralRules } from "./general";
import { makeGlobalScenePlaneRules } from "./scenePlane";
import { makeGlobalVideoRules } from "./video";
export function makeStartAllGlobalRules(concepFuncs, backdopConcepts, backdopStartOptions, backdopArt) {
    // making rules
    const globalVideoRules = makeGlobalVideoRules(concepFuncs, backdopConcepts, backdopStartOptions, backdopArt);
    const globalChangePlaceRules = makeGlobalChangePlaceRules(concepFuncs, backdopConcepts, backdopStartOptions, backdopArt);
    const globalGeneralRules = makeGlobalGeneralRules(concepFuncs);
    const globalScenePlaneRules = makeGlobalScenePlaneRules(concepFuncs, backdopStartOptions);
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
