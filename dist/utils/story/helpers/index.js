import { makeCharacterStoryHelpers } from "./characters";
import { makeDollStoryHelpers } from "./dolls";
import { makerPlayerStoryHelpers } from "./players";
import { makeSceneStoryHelpers } from "./scene";
import { makeSoundStoryHelpers } from "./sound";
import { makeSpeechStoryHelpers } from "./speech";
import { makeStickerStoryHelpers } from "./stickers";
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
    const { lookAtEachother, lookAtOtherCharacter, moveCharacterAt2DAngle, setCharAnimation, setCharPosition, setCharRotationY, springAddToCharRotationY, springCharRotation, } = makeCharacterStoryHelpers(storeHelpers, prendyStores, prendyStartOptions, modelInfoByName, characterNames);
    const { focusOnDoll, hideDoll, moveDollAt2DAngle, lookAtOtherDoll, setDollAnimation, setDollPosition, setDollRotation, setDollRotationY, setDollToSpot, springAddToDollRotationY, springDollRotationY, pushDollRotationY, springDollToSpot, dollLooksAtSpot, toggleDollMeshes, getDollBonePosition, } = makeDollStoryHelpers(storeHelpers, prendyStartOptions, modelInfoByName);
    const { enableMovement, isHolding, setPlayerAnimations, takePickup } = makerPlayerStoryHelpers(storeHelpers, prendyStores, prendyStartOptions, modelInfoByName, characterNames);
    // NOTE maybe return in categores like players.enableMovement()
    const { goToNewPlace, hideWallIf, lookAtSpot, setCamera, setSegment, showStoryView, } = makeSceneStoryHelpers(storeHelpers, placeInfoByName, characterNames);
    const { playNewMusic, stopAllMusic, playSound, stopSound, stopAllSounds } = makeSoundStoryHelpers(storeHelpers, musicNames, musicFiles, soundNames, soundFiles);
    const { hideMiniBubble, showAlarmText, showMiniBubble, showSpeech } = makeSpeechStoryHelpers(storeHelpers, prendyStores, prendyStartOptions, characterNames);
    const { hideSticker, moveSticker, showSticker } = makeStickerStoryHelpers(storeHelpers);
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
