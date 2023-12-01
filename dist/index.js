import "@babylonjs/loaders";
import { meta } from "./meta";
import { initMovers } from "repond-movers";
import { timeStatePath } from "./stores/global/global";
export { DebugFrameRate } from "./components/DebugFrameRate";
export { makePrendyApp } from "./components/PrendyApp";
export * from "./declarations";
export { makePrendyOptions } from "./getPrendyOptions";
export { point3dToVector3, vector3ToPoint3d, vector3ToSafePoint3d } from "./helpers/babylonjs/vectors";
export { lookAtEachother, lookAtOtherCharacter, moveCharacterAt2DAngle, setCharAnimation, setCharPosition, setCharRotationY, springAddToCharRotationY, springCharRotation, } from "./helpers/prendyHelpers/characters";
export { dollLooksAtSpot, focusOnDoll, getDollBonePosition, hideDoll, lookAtOtherDoll, moveDollAt2DAngle, pushDollRotationY, setDollAnimation, setDollPosition, setDollRotation, setDollRotationY, setDollToSpot, springAddToDollRotationY, springDollRotationY, springDollToSpot, toggleDollMeshes, } from "./helpers/prendyHelpers/dolls";
export { makePrendyStoryHelpers } from "./helpers/prendyHelpers/helpers";
export { enableMovement, isHolding, setPlayerAnimations, takePickup } from "./helpers/prendyHelpers/players";
export { goToNewPlace, hideWallIf, lookAtSpot, setCamera, setSegment, showStoryView, } from "./helpers/prendyHelpers/scene";
export { playNewMusic, playSound, stopAllMusic, stopAllSounds, stopSound } from "./helpers/prendyHelpers/sound";
export { hideMiniBubble, showAlarmText, showMiniBubble, showSpeech } from "./helpers/prendyHelpers/speech";
export { hideSticker, moveSticker, showSticker } from "./helpers/prendyHelpers/stickers";
export { makeCamChangeRules, makeCamLeaveRules, makeCamSegmentRules, makeInteractButtonRules, makeOnInteractAtTrigger, makeOnInteractToTalk, makeOnUsePickupAtTrigger, makeOnUsePickupGenerally, makeOnUsePickupToTalk, makePickupsRules, makePlaceLoadRules, makePlaceUnloadRules, makeTouchRules, makeTriggerRules, } from "./helpers/prendyRuleMakers/prendyRuleMakers";
export { makePrendyStoryUtils } from "./helpers/prendyUtils/prendyUtils";
export { loadPrendyState, savePrendyState } from "./helpers/saving";
export { makeStartAndStopRules, makeStartPrendyMainRules, makeStartPrendyRules } from "./rules/rules";
export { makePrendyStores, prendyStepNames } from "./stores/stores";
export function initPrendy(assets, stores) {
    meta.assets = assets;
    meta.stores = stores;
    initMovers(timeStatePath);
}
export function getDefaultDollOptions(modelNames) {
    const modelDollOptions = {};
    modelNames.forEach((modelName) => (modelDollOptions[modelName] = { model: modelName }));
    return modelDollOptions;
}
