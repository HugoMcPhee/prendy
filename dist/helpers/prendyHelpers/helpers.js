import { get_characterStoryHelpers } from "./characters";
import { get_dollStoryHelpers } from "./dolls";
import { get_playerStoryHelpers } from "./players";
import { get_sceneStoryHelpers } from "./scene";
import { get_soundStoryHelpers } from "./sound";
import { get_speechStoryHelpers } from "./speech";
import { get_stickerStoryHelpers } from "./stickers";
// importing each of the helpers
// function doThis
export function makePrendyStoryHelpers(storeHelpers, prendyStores, prendyStartOptions, prendyAssets) {
    const modelInfoByName = prendyAssets.modelInfoByName;
    const characterNames = prendyAssets.characterNames;
    const placeInfoByName = prendyAssets.placeInfoByName;
    const musicNames = prendyAssets.musicNames;
    const musicFiles = prendyAssets.musicFiles;
    const soundNames = prendyAssets.soundNames;
    const soundFiles = prendyAssets.soundFiles;
    const { lookAtEachother, lookAtOtherCharacter, moveCharacterAt2DAngle, setCharAnimation, setCharPosition, setCharRotationY, springAddToCharRotationY, springCharRotation, } = get_characterStoryHelpers(storeHelpers, prendyStores, prendyStartOptions, modelInfoByName, characterNames);
    const { focusOnDoll, hideDoll, moveDollAt2DAngle, lookAtOtherDoll, setDollAnimation, setDollPosition, setDollRotation, setDollRotationY, setDollToSpot, springAddToDollRotationY, springDollRotationY, pushDollRotationY, springDollToSpot, dollLooksAtSpot, toggleDollMeshes, getDollBonePosition, } = get_dollStoryHelpers(storeHelpers, prendyStartOptions, modelInfoByName);
    const { enableMovement, isHolding, setPlayerAnimations, takePickup } = get_playerStoryHelpers(storeHelpers, prendyStores, prendyStartOptions, modelInfoByName, characterNames);
    // NOTE maybe return in categores like players.enableMovement()
    const { goToNewPlace, hideWallIf, lookAtSpot, setCamera, setSegment, showStoryView } = get_sceneStoryHelpers(storeHelpers, placeInfoByName, characterNames);
    const { playNewMusic, stopAllMusic, playSound, stopSound, stopAllSounds } = get_soundStoryHelpers(storeHelpers, musicNames, musicFiles, soundNames, soundFiles);
    const { hideMiniBubble, showAlarmText, showMiniBubble, showSpeech } = get_speechStoryHelpers(storeHelpers, prendyStores, prendyStartOptions, characterNames);
    const { hideSticker, moveSticker, showSticker } = get_stickerStoryHelpers(storeHelpers);
    return {
        // characters
        lookAtEachother,
        lookAtOtherCharacter,
        moveCharacterAt2DAngle,
        setCharAnimation,
        setCharPosition,
        setCharRotationY,
        springAddToCharRotationY,
        springCharRotation,
        // dolls
        focusOnDoll,
        hideDoll,
        moveDollAt2DAngle,
        lookAtOtherDoll,
        setDollAnimation,
        setDollPosition,
        setDollRotation,
        setDollRotationY,
        setDollToSpot,
        springAddToDollRotationY,
        springDollRotationY,
        pushDollRotationY,
        springDollToSpot,
        dollLooksAtSpot,
        toggleDollMeshes,
        getDollBonePosition,
        //players
        enableMovement,
        isHolding,
        setPlayerAnimations,
        takePickup,
        // scene
        goToNewPlace,
        hideWallIf,
        lookAtSpot,
        showStoryView,
        setCamera,
        setSegment,
        // sound
        playNewMusic,
        stopAllMusic,
        playSound,
        stopSound,
        stopAllSounds,
        // speech
        hideMiniBubble,
        showAlarmText,
        showMiniBubble,
        showSpeech,
        // stickers
        hideSticker,
        moveSticker,
        showSticker,
    };
}
