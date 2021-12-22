import { makeCharacterStoryUtils } from "./characters";
import { makeDollStoryUtils } from "./dolls";
import { makeSceneStoryUtils } from "./scene";
import { makeSpotStoryUtils } from "./spots";
export function makePrendyStoryUtils(storeHelpers, _prendyConcepts) {
    const { get2DAngleBetweenCharacters, get2DAngleFromCharacterToSpot, } = makeCharacterStoryUtils(storeHelpers);
    const { getModelNameFromDoll } = makeDollStoryUtils(storeHelpers);
    const { doWhenNowCamChanges, doWhenNowSegmentChanges, getSegmentFromStoryRules, } = makeSceneStoryUtils(storeHelpers);
    const { getSpotPosition, getSpotRotation } = makeSpotStoryUtils(storeHelpers);
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
