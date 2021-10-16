import { makeCharacterStoryHelpers } from "./characters";
import { makeDollStoryHelpers } from "./dolls";
import { makerPlayerStoryHelpers } from "./players";
import { makeSceneStoryHelpers } from "./scene";
import { makeSoundStoryHelpers } from "./sound";
import { makeSpeechStoryHelpers } from "./speech";
import { makeStickerStoryHelpers } from "./stickers";
// importing each of the helpers
// function doThis
export function makeGameyStoryHelpers(conceptoFuncs, gameyConcepts, gameyStartOptions, modelInfoByName, characterNames, placeInfoByName, musicNames, musicFiles) {
    const { lookAtEachother, lookAtOtherCharacter, moveCharacterAt2DAngle, setCharAnimation, setCharPosition, setCharRotationY, springAddToCharRotationY, springCharRotation, } = makeCharacterStoryHelpers(conceptoFuncs, gameyConcepts, gameyStartOptions, modelInfoByName, characterNames);
    const { focusOnDoll, hideDoll, moveDollAt2DAngle, setDollAnimation, setDollPosition, setDollRotation, setDollRotationY, setDollToSpot, springAddToDollRotationY, springDollRotationY, springDollToSpot, toggleDollMeshes, } = makeDollStoryHelpers(conceptoFuncs, gameyConcepts, gameyStartOptions, modelInfoByName);
    const { enableMovement, isHolding, setPlayerAnimations, setPlayerToStartSpot, takePickup, } = makerPlayerStoryHelpers(conceptoFuncs, gameyConcepts, gameyStartOptions, modelInfoByName, characterNames);
    // NOTE maybe return in categores like players.enableMovement()
    const { changeCameraAtLoop, changeSegmentAtLoop, goToNewPlace, hideWallIf, lookAtSpot, setCamera, setNextSegment, showStoryView, } = makeSceneStoryHelpers(conceptoFuncs, placeInfoByName, characterNames);
    const { playNewMusic, stopAllMusic } = makeSoundStoryHelpers(conceptoFuncs, musicNames, musicFiles);
    const { hideMiniBubble, showAlarmText, showMiniBubble, showSpeech, } = makeSpeechStoryHelpers(conceptoFuncs, gameyConcepts, gameyStartOptions, characterNames);
    const { hideSticker, moveSticker, showSticker } = makeStickerStoryHelpers(conceptoFuncs);
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
        setPlayerToStartSpot,
        takePickup,
        // scene
        changeCameraAtLoop,
        changeSegmentAtLoop,
        goToNewPlace,
        hideWallIf,
        lookAtSpot,
        setCamera,
        setNextSegment,
        showStoryView,
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
