import { get_characterStoryUtils } from "./characters";
import { get_dollStoryUtils } from "./dolls";
import { get_sceneStoryUtils } from "./scene";
import { get_spotStoryUtils } from "./spots";
export function makePrendyStoryUtils(storeHelpers, _prendyStores) {
    const { get2DAngleBetweenCharacters, get2DAngleFromCharacterToSpot } = get_characterStoryUtils(storeHelpers);
    const { getModelNameFromDoll, get2DAngleBetweenDolls, get2DAngleFromDollToSpot } = get_dollStoryUtils(storeHelpers);
    const { doWhenNowCamChanges, doWhenNowSegmentChanges, getSegmentFromStoryRules } = get_sceneStoryUtils(storeHelpers);
    const { getSpotPosition, getSpotRotation } = get_spotStoryUtils(storeHelpers);
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
