import { MyTypes } from "../../declarations";
import { lookAtEachother, lookAtOtherCharacter, moveCharacterAt2DAngle, setCharAnimation, setCharPosition, setCharRotationY, springAddToCharRotationY, springCharRotation } from "./characters";
import { setDollPosition, setDollRotation, setDollRotationY, springDollRotationY, springAddToDollRotationY, pushDollRotationY, lookAtOtherDoll, setDollAnimation, focusOnDoll, setDollToSpot, springDollToSpot, dollLooksAtSpot, moveDollAt2DAngle, hideDoll, toggleDollMeshes, getDollBonePosition } from "./dolls";
import { enableMovement, isHolding, takePickup, setPlayerAnimations } from "./players";
import { goToNewPlace, hideWallIf, lookAtSpot, setCamera, setSegment, showStoryView } from "./scene";
import { playNewMusic, playSound, stopAllMusic, stopAllSounds, stopSound } from "./sound";
import { hideMiniBubble, showAlarmText, showMiniBubble, showSpeech } from "./speech";
import { hideSticker, moveSticker, showSticker } from "./stickers";
export declare function makePrendyStoryHelpers<T_MyTypes extends MyTypes = MyTypes>(): {
    characters: {
        setCharAnimation: typeof setCharAnimation;
        setCharPosition: typeof setCharPosition;
        setCharRotationY: typeof setCharRotationY;
        springCharRotation: typeof springCharRotation;
        springAddToCharRotationY: typeof springAddToCharRotationY;
        lookAtOtherCharacter: typeof lookAtOtherCharacter;
        lookAtEachother: typeof lookAtEachother;
        moveCharacterAt2DAngle: typeof moveCharacterAt2DAngle;
    };
    dolls: {
        setDollPosition: typeof setDollPosition;
        setDollRotation: typeof setDollRotation;
        setDollRotationY: typeof setDollRotationY;
        springDollRotationY: typeof springDollRotationY;
        springAddToDollRotationY: typeof springAddToDollRotationY;
        pushDollRotationY: typeof pushDollRotationY;
        lookAtOtherDoll: typeof lookAtOtherDoll;
        setDollAnimation: typeof setDollAnimation;
        focusOnDoll: typeof focusOnDoll;
        setDollToSpot: typeof setDollToSpot;
        springDollToSpot: typeof springDollToSpot;
        dollLooksAtSpot: typeof dollLooksAtSpot;
        moveDollAt2DAngle: typeof moveDollAt2DAngle;
        hideDoll: typeof hideDoll;
        toggleDollMeshes: typeof toggleDollMeshes;
        getDollBonePosition: typeof getDollBonePosition;
    };
    players: {
        enableMovement: typeof enableMovement;
        isHolding: typeof isHolding;
        takePickup: typeof takePickup;
        setPlayerAnimations: typeof setPlayerAnimations;
    };
    scene: {
        lookAtSpot: typeof lookAtSpot;
        hideWallIf: typeof hideWallIf;
        showStoryView: typeof showStoryView;
        setSegment: typeof setSegment;
        setCamera: typeof setCamera;
        goToNewPlace: typeof goToNewPlace;
    };
    sound: {
        playNewMusic: typeof playNewMusic;
        stopAllMusic: typeof stopAllMusic;
        playSound: typeof playSound;
        stopSound: typeof stopSound;
        stopAllSounds: typeof stopAllSounds;
    };
    speech: {
        showSpeech: typeof showSpeech;
        showMiniBubble: typeof showMiniBubble;
        hideMiniBubble: typeof hideMiniBubble;
        showAlarmText: typeof showAlarmText;
    };
    stickers: {
        moveSticker: typeof moveSticker;
        showSticker: typeof showSticker;
        hideSticker: typeof hideSticker;
    };
};
