import { Point2D } from "shutils/dist/points2d";
import { GameyStartOptionsUntyped } from "../typedConceptoFuncs";

export default function players<
  GameyStartOptions extends GameyStartOptionsUntyped,
  AnyAnimationName extends string
>(gameyStartOptions: GameyStartOptions) {
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
    animationNames: {
      walking: "dog_walking",
      idle: "dog_idle",
    } as PlayerAnimationNames, // maybe typed somehow, from player character?
  });

  const refs = () => ({
    walkSpeed: gameyStartOptions.walkSpeed,
    canJumpTimeout: null as null | ReturnType<typeof setTimeout>,
  });

  const startStates = { main: state() };

  return { startStates, state, refs };
}
