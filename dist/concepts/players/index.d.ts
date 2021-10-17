import { Point2D } from "shutils/dist/points2d";
import { BackdopOptionsUntyped } from "../typedConcepFuncs";
export default function players<BackdopOptions extends BackdopOptionsUntyped, AnyAnimationName extends string>(backdopStartOptions: BackdopOptions): {
    startStates: {
        main: {
            lastSafeInputAngle: number;
            inputVelocity: Point2D;
            isJumping: boolean;
            isOnGround: boolean;
            canJump: boolean;
            interactButtonPressTime: number;
            jumpButtonPressTime: number;
            jumpButtonReleaseTime: number;
            pickupButtonPressTime: number;
            animationNames: {
                walking: AnyAnimationName;
                idle: AnyAnimationName;
            };
        };
    };
    state: () => {
        lastSafeInputAngle: number;
        inputVelocity: Point2D;
        isJumping: boolean;
        isOnGround: boolean;
        canJump: boolean;
        interactButtonPressTime: number;
        jumpButtonPressTime: number;
        jumpButtonReleaseTime: number;
        pickupButtonPressTime: number;
        animationNames: {
            walking: AnyAnimationName;
            idle: AnyAnimationName;
        };
    };
    refs: () => {
        walkSpeed: number;
        canJumpTimeout: number;
    };
};
