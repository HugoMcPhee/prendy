import { makeCharacterStoryUtils } from "./characters";
import { makeDollStoryUtils } from "./dolls";
import { makeSceneStoryUtils } from "./scene";
import { makeSpotStoryUtils } from "./spots";
export function makeBackdopStoryUtils(concepFuncs, _backdopConcepts) {
    const { get2DAngleBetweenCharacters, get2DAngleFromCharacterToSpot, } = makeCharacterStoryUtils(concepFuncs);
    const { getModelNameFromDoll } = makeDollStoryUtils(concepFuncs);
    const { doWhenNowCamChanges, doWhenNowSegmentChanges, getSegmentFromStoryRules, } = makeSceneStoryUtils(concepFuncs);
    const { getSpotPosition, getSpotRotation } = makeSpotStoryUtils(concepFuncs);
    return {
        // characters
        get2DAngleBetweenCharacters,
        get2DAngleFromCharacterToSpot,
        // dolls
        getModelNameFromDoll,
        // scene
        doWhenNowCamChanges,
        doWhenNowSegmentChanges,
        getSegmentFromStoryRules,
        // spots
        getSpotPosition,
        getSpotRotation,
    };
}
