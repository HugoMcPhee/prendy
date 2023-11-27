import "@babylonjs/loaders";
import { makeAllStoryRuleMakers } from "./helpers/prendyRuleMakers/prendyRuleMakers";
export { loadPrendyState, savePrendyState } from "./helpers/saving";
import { meta } from "./meta";
export { setCharAnimation, setCharPosition, setCharRotationY, springCharRotation, springAddToCharRotationY, lookAtOtherCharacter, lookAtEachother, moveCharacterAt2DAngle, } from "./helpers/prendyHelpers/characters";
export { setDollPosition, setDollRotation, setDollRotationY, springDollRotationY, springAddToDollRotationY, pushDollRotationY, lookAtOtherDoll, setDollAnimation, focusOnDoll, setDollToSpot, springDollToSpot, dollLooksAtSpot, moveDollAt2DAngle, hideDoll, toggleDollMeshes, getDollBonePosition, } from "./helpers/prendyHelpers/dolls";
export { enableMovement, isHolding, takePickup, setPlayerAnimations } from "./helpers/prendyHelpers/players";
export { lookAtSpot, hideWallIf, showStoryView, setSegment, setCamera, goToNewPlace, } from "./helpers/prendyHelpers/scene";
export { playNewMusic, stopAllMusic, playSound, stopSound, stopAllSounds } from "./helpers/prendyHelpers/sound";
export { showSpeech, showMiniBubble, hideMiniBubble, showAlarmText } from "./helpers/prendyHelpers/speech";
export { moveSticker, showSticker, hideSticker } from "./helpers/prendyHelpers/stickers";
export { get_DebugFrameRate as makeDebugFrameRate } from "./components/DebugFrameRate";
export { makePrendyApp } from "./components/PrendyApp";
export * from "./declarations";
export { makePrendyOptions } from "./getPrendyOptions";
export { point3dToVector3, vector3ToPoint3d, vector3ToSafePoint3d } from "./helpers/babylonjs/vectors";
export { makePrendyStoryHelpers } from "./helpers/prendyHelpers/helpers";
export { makeAllStoryRuleMakers } from "./helpers/prendyRuleMakers/prendyRuleMakers";
export { makePrendyStoryUtils } from "./helpers/prendyUtils/prendyUtils";
export { makeStartAndStopRules, makeStartPrendyMainRules, makeStartPrendyRules } from "./rules/rules";
export { makePrendyStores, prendyStepNames } from "./stores/stores";
export const definiedPrendyRules = {
    dolls: null,
};
export function makePrendy(assets, stores, repond) {
    meta.assets = assets;
    meta.repond = repond;
    meta.stores = stores;
    return makeAllStoryRuleMakers();
}
export function getDefaultDollOptions(modelNames) {
    const modelDollOptions = {};
    modelNames.forEach((modelName) => (modelDollOptions[modelName] = { model: modelName }));
    return modelDollOptions;
}
