import { AnyAnimationName, BackdopOptions } from "../../declarations";
import { Point2D } from "shutils/dist/points2d";
export default function players(backdopStartOptions: BackdopOptions): {
    startStates: {
        main: {
            lastSafeInputAngle: number | null;
            inputVelocity: Point2D;
            isJumping: boolean;
            isOnGround: boolean;
            canJump: boolean;
            interactButtonPressTime: number;
            jumpButtonPressTime: number;
            jumpButtonReleaseTime: number;
            pickupButtonPressTime: number;
            virtualControlsPressTime: number;
            virtualControlsReleaseTime: number;
            canShowVirtualButtons: boolean;
            animationNames: {
                walking: AnyAnimationName;
                idle: AnyAnimationName;
            };
        };
    };
    state: () => {
        lastSafeInputAngle: number | null;
        inputVelocity: Point2D;
        isJumping: boolean;
        isOnGround: boolean;
        canJump: boolean;
        interactButtonPressTime: number;
        jumpButtonPressTime: number;
        jumpButtonReleaseTime: number;
        pickupButtonPressTime: number;
        virtualControlsPressTime: number;
        virtualControlsReleaseTime: number;
        canShowVirtualButtons: boolean;
        animationNames: {
            walking: AnyAnimationName;
            idle: AnyAnimationName;
        };
    };
    refs: () => {
        walkSpeed: number;
        canJumpTimeout: number | null;
        canShowVirtualButtonsTimeout: number | null;
        canHideVirtualButtonsTimeout: number | null;
    };
};
