import { AnyAnimationName, PrendyOptions } from "../../declarations";
import { Point2D } from "chootils/dist/points2d";

export default function players<
  A_AnyAnimationName extends AnyAnimationName = AnyAnimationName,
  A_PrendyOptions extends PrendyOptions = PrendyOptions
>(prendyStartOptions: A_PrendyOptions) {
  type PlayerAnimationNames = {
    walking: A_AnyAnimationName;
    idle: A_AnyAnimationName;
  };

  const state = () => ({
    // player input stuff
    lastSafeInputAngle: 0 as number | null,
    inputVelocity: { x: 0, y: 0 } as Point2D,
    isJumping: false,
    isOnGround: false,
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
      walking: prendyStartOptions.playerAnimations.walking,
      idle: prendyStartOptions.playerAnimations.idle,
    } as PlayerAnimationNames, // maybe typed somehow, from player character?
  });

  const refs = () => ({
    walkSpeed: prendyStartOptions.walkSpeed,
    canJumpTimeout: null as null | ReturnType<typeof setTimeout>,
    canShowVirtualButtonsTimeout: null as null | ReturnType<typeof setTimeout>,
    canHideVirtualButtonsTimeout: null as null | ReturnType<typeof setTimeout>,
  });

  const startStates = { main: state() };

  return { startStates, state, refs };
}
