import { makeTyped_characterStoryUtils } from "./characters";
import { makeTyped_dollStoryUtils } from "./dolls";
import { makeTyped_sceneStoryUtils } from "./scene";
import { makeTyped_spotStoryUtils } from "./spots";
export function makePrendyStoryUtils(storeHelpers, _prendyStores) {
    const { get2DAngleBetweenCharacters, get2DAngleFromCharacterToSpot } = makeTyped_characterStoryUtils(storeHelpers);
    const { getModelNameFromDoll, get2DAngleBetweenDolls, get2DAngleFromDollToSpot } = makeTyped_dollStoryUtils(storeHelpers);
    const { doWhenNowCamChanges, doWhenNowSegmentChanges, getSegmentFromStoryRules } = makeTyped_sceneStoryUtils(storeHelpers);
    const { getSpotPosition, getSpotRotation } = makeTyped_spotStoryUtils(storeHelpers);
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
