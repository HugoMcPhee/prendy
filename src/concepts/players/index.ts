import { Point2D } from "shutils/dist/points2d";
import { BackdopOptionsUntyped } from "../typedConcepFuncs";

export default function players<
  BackdopOptions extends BackdopOptionsUntyped,
  AnyAnimationName extends string
>(backdopStartOptions: BackdopOptions) {
  type PlayerAnimationNames = {
    walking: AnyAnimationName;
    idle: AnyAnimationName;
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
      walking: backdopStartOptions.playerAnimations.walking,
      idle: backdopStartOptions.playerAnimations.idle,
    } as PlayerAnimationNames, // maybe typed somehow, from player character?
  });

  const refs = () => ({
    walkSpeed: backdopStartOptions.walkSpeed,
    canJumpTimeout: null as null | ReturnType<typeof setTimeout>,
    canShowVirtualButtonsTimeout: null as null | ReturnType<typeof setTimeout>,
    canHideVirtualButtonsTimeout: null as null | ReturnType<typeof setTimeout>,
  });

  const startStates = { main: state() };

  return { startStates, state, refs };
}
