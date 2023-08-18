import { Point2D } from "chootils/dist/points2d";
import { MyTypes } from "../declarations";

export default function players<T_MyTypes extends MyTypes = MyTypes>(
  prendyOptions: T_MyTypes["Main"]["PrendyOptions"]
) {
  type AnyAnimationName = T_MyTypes["Main"]["AnyAnimationName"];

  type PlayerAnimationNames = {
    walking: AnyAnimationName;
    idle: AnyAnimationName;
  };

  const state = () => ({
    // player input stuff
    lastSafeInputAngle: 0 as number | null,
    inputVelocity: { x: 0, y: 0 } as Point2D,
    isJumping: false,
    isOnGround: true,
    canJump: true,
    interactButtonPressTime: Date.now(),
    jumpButtonPressTime: Date.now(),
    jumpButtonReleaseTime: Date.now(),
    pickupButtonPressTime: Date.now(),
    //
    virtualControlsPressTime: Date.now(),
    virtualControlsReleaseTime: Date.now(),
    canShowVirtualButtons: false,

    //

    animationNames: {
      walking: prendyOptions.playerAnimations.walking,
      idle: prendyOptions.playerAnimations.idle,
    } as PlayerAnimationNames, // maybe typed somehow, from player character?
  });

  const refs = () => ({
    walkSpeed: prendyOptions.walkSpeed,
    canJumpTimeout: null as null | ReturnType<typeof setTimeout>,
    canShowVirtualButtonsTimeout: null as null | ReturnType<typeof setTimeout>,
    canHideVirtualButtonsTimeout: null as null | ReturnType<typeof setTimeout>,
  });

  const startStates = { main: state() };

  return { startStates, state, refs };
}
