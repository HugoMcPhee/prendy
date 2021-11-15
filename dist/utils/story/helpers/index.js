import { makeCharacterStoryHelpers } from "./characters";
import { makeDollStoryHelpers } from "./dolls";
import { makerPlayerStoryHelpers } from "./players";
import { makeSceneStoryHelpers } from "./scene";
import { makeSoundStoryHelpers } from "./sound";
import { makeSpeechStoryHelpers } from "./speech";
import { makeStickerStoryHelpers } from "./stickers";
// importing each of the helpers
// function doThis
export function makeBackdopStoryHelpers(concepFuncs, backdopConcepts, backdopStartOptions, backdopArt) {
    const modelInfoByName = backdopArt.modelInfoByName;
    const characterNames = backdopArt.characterNames;
    const placeInfoByName = backdopArt.placeInfoByName;
    const musicNames = backdopArt.musicNames;
    const musicFiles = backdopArt.musicFiles;
    const { lookAtEachother, lookAtOtherCharacter, moveCharacterAt2DAngle, setCharAnimation, setCharPosition, setCharRotationY, springAddToCharRotationY, springCharRotation, } = makeCharacterStoryHelpers(concepFuncs, backdopConcepts, backdopStartOptions, modelInfoByName, characterNames);
    const { focusOnDoll, hideDoll, moveDollAt2DAngle, setDollAnimation, setDollPosition, setDollRotation, setDollRotationY, setDollToSpot, springAddToDollRotationY, springDollRotationY, springDollToSpot, toggleDollMeshes, } = makeDollStoryHelpers(concepFuncs, backdopConcepts, backdopStartOptions, modelInfoByName);
    const { enableMovement, isHolding, setPlayerAnimations, setPlayerToStartSpot, takePickup, } = makerPlayerStoryHelpers(concepFuncs, backdopConcepts, backdopStartOptions, modelInfoByName, characterNames);
    // NOTE maybe return in categores like players.enableMovement()
    const { goToNewPlace, hideWallIf, lookAtSpot, setCamera, setSegment, showStoryView, } = makeSceneStoryHelpers(concepFuncs, placeInfoByName, characterNames);
    const { playNewMusic, stopAllMusic } = makeSoundStoryHelpers(concepFuncs, musicNames, musicFiles);
    const { hideMiniBubble, showAlarmText, showMiniBubble, showSpeech, } = makeSpeechStoryHelpers(concepFuncs, backdopConcepts, backdopStartOptions, characterNames);
    const { hideSticker, moveSticker, showSticker } = makeStickerStoryHelpers(concepFuncs);
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
