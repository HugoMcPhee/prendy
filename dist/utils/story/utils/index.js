import { makeCharacterStoryUtils } from "./characters";
import { makeDollStoryUtils } from "./dolls";
import { makeSceneStoryUtils } from "./scene";
import { makeSpotStoryUtils } from "./spots";
export function makeGameyStoryUtils(conceptoFuncs, gameyConcepts) {
    const { get2DAngleBetweenCharacters, get2DAngleFromCharacterToSpot, } = makeCharacterStoryUtils(conceptoFuncs);
    const { getModelNameFromDoll } = makeDollStoryUtils(conceptoFuncs, gameyConcepts);
    const { doWhenNowCamChanges, doWhenNowSegmentChanges, getSegmentFromStoryRules, } = makeSceneStoryUtils(conceptoFuncs);
    const { getSpotPosition, getSpotRotation } = makeSpotStoryUtils(conceptoFuncs);
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
