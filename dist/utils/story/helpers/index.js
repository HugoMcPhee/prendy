import { makeCharacterStoryHelpers } from "./characters";
import { makeDollStoryHelpers } from "./dolls";
import { makerPlayerStoryHelpers } from "./players";
import { makeSceneStoryHelpers } from "./scene";
import { makeSoundStoryHelpers } from "./sound";
import { makeSpeechStoryHelpers } from "./speech";
import { makeStickerStoryHelpers } from "./stickers";
// importing each of the helpers
// function doThis
export function makePrendyStoryHelpers(storeHelpers, prendyConcepts, prendyStartOptions, prendyArt) {
    const modelInfoByName = prendyArt.modelInfoByName;
    const characterNames = prendyArt.characterNames;
    const placeInfoByName = prendyArt.placeInfoByName;
    const musicNames = prendyArt.musicNames;
    const musicFiles = prendyArt.musicFiles;
    const { lookAtEachother, lookAtOtherCharacter, moveCharacterAt2DAngle, setCharAnimation, setCharPosition, setCharRotationY, springAddToCharRotationY, springCharRotation, } = makeCharacterStoryHelpers(storeHelpers, prendyConcepts, prendyStartOptions, modelInfoByName, characterNames);
    const { focusOnDoll, hideDoll, moveDollAt2DAngle, setDollAnimation, setDollPosition, setDollRotation, setDollRotationY, setDollToSpot, springAddToDollRotationY, springDollRotationY, springDollToSpot, toggleDollMeshes, } = makeDollStoryHelpers(storeHelpers, prendyStartOptions, modelInfoByName);
    const { enableMovement, isHolding, setPlayerAnimations, takePickup, } = makerPlayerStoryHelpers(storeHelpers, prendyConcepts, prendyStartOptions, modelInfoByName, characterNames);
    // NOTE maybe return in categores like players.enableMovement()
    const { goToNewPlace, hideWallIf, lookAtSpot, setCamera, setSegment, showStoryView, } = makeSceneStoryHelpers(storeHelpers, placeInfoByName, characterNames);
    const { playNewMusic, stopAllMusic } = makeSoundStoryHelpers(storeHelpers, musicNames, musicFiles);
    const { hideMiniBubble, showAlarmText, showMiniBubble, showSpeech, } = makeSpeechStoryHelpers(storeHelpers, prendyConcepts, prendyStartOptions, characterNames);
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
        setDollAnimation,
        setDollPosition,
        setDollRotation,
        setDollRotationY,
        setDollToSpot,
        springAddToDollRotationY,
        springDollRotationY,
        springDollToSpot,
        toggleDollMeshes,
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
