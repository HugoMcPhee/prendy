import { meta } from "../../meta";
import { lookAtEachother, lookAtOtherCharacter, moveCharacterAt2DAngle, setCharAnimation, setCharPosition, setCharRotationY, springAddToCharRotationY, springCharRotation, } from "./characters";
import { setDollPosition, setDollRotation, setDollRotationY, springDollRotationY, springAddToDollRotationY, pushDollRotationY, lookAtOtherDoll, setDollAnimation, focusOnDoll, setDollToSpot, springDollToSpot, dollLooksAtSpot, moveDollAt2DAngle, hideDoll, toggleDollMeshes, getDollBonePosition, } from "./dolls";
import { enableMovement, isHolding, takePickup, setPlayerAnimations } from "./players";
import { goToNewPlace, hideWallIf, lookAtSpot, setCamera, setSegment, showStoryView } from "./scene";
import { playNewMusic, playSound, stopAllMusic, stopAllSounds, stopSound } from "./sound";
import { hideMiniBubble, showAlarmText, showMiniBubble, showSpeech } from "./speech";
import { hideSticker, moveSticker, showSticker } from "./stickers";
// importing each of the helpers
// function doThis
export function makePrendyStoryHelpers() {
    const prendyAssets = meta.assets;
    const prendyStores = meta.stores;
    const storeHelpers = meta.repond;
    return {
        characters: {
            setCharAnimation,
            setCharPosition,
            setCharRotationY,
            springCharRotation,
            springAddToCharRotationY,
            lookAtOtherCharacter,
            lookAtEachother,
            moveCharacterAt2DAngle,
        },
        dolls: {
            setDollPosition,
            setDollRotation,
            setDollRotationY,
            springDollRotationY,
            springAddToDollRotationY,
            pushDollRotationY,
            lookAtOtherDoll,
            setDollAnimation,
            focusOnDoll,
            setDollToSpot,
            springDollToSpot,
            dollLooksAtSpot,
            moveDollAt2DAngle,
            hideDoll,
            toggleDollMeshes,
            getDollBonePosition,
            // springDollPosition,
            // slideDollPosition,
        },
        players: {
            enableMovement,
            isHolding,
            takePickup,
            setPlayerAnimations,
        },
        scene: {
            // changeSegmentAtLoop,
            // changeCameraAtLoop,
            lookAtSpot,
            hideWallIf,
            showStoryView,
            setSegment,
            setCamera,
            goToNewPlace,
        },
        sound: { playNewMusic, stopAllMusic, playSound, stopSound, stopAllSounds },
        speech: {
            showSpeech,
            showMiniBubble,
            hideMiniBubble,
            showAlarmText,
        },
        stickers: { moveSticker, showSticker, hideSticker },
    };
}
