import { makeCharacterStoryUtils } from "./characters";
import { makeDollStoryUtils } from "./dolls";
import { makeSceneStoryUtils } from "./scene";
import { makeSpotStoryUtils } from "./spots";
export function makePrendyStoryUtils(storeHelpers, _prendyStores) {
    const { get2DAngleBetweenCharacters, get2DAngleFromCharacterToSpot } = makeCharacterStoryUtils(storeHelpers);
    const { getModelNameFromDoll, get2DAngleBetweenDolls, get2DAngleFromDollToSpot, } = makeDollStoryUtils(storeHelpers);
    const { doWhenNowCamChanges, doWhenNowSegmentChanges, getSegmentFromStoryRules, } = makeSceneStoryUtils(storeHelpers);
    const { getSpotPosition, getSpotRotation } = makeSpotStoryUtils(storeHelpers);
    return {
        // characters
        get2DAngleBetweenCharacters,
        get2DAngleFromCharacterToSpot,
        // dolls
        getModelNameFromDoll,
        get2DAngleBetweenDolls,
        get2DAngleFromDollToSpot,
        // scene
        doWhenNowCamChanges,
        doWhenNowSegmentChanges,
        getSegmentFromStoryRules,
        // spots
        getSpotPosition,
        getSpotRotation,
    };
}
