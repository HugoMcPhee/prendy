import { AnyAnimationName, PrendyOptions } from "../../declarations";
import { Point2D } from "chootils/dist/points2d";
export default function players<A_AnyAnimationName extends AnyAnimationName = AnyAnimationName, A_PrendyOptions extends PrendyOptions = PrendyOptions>(prendyStartOptions: A_PrendyOptions): {
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
                walking: A_AnyAnimationName;
                idle: A_AnyAnimationName;
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
            walking: A_AnyAnimationName;
            idle: A_AnyAnimationName;
        };
    };
    refs: () => {
        walkSpeed: number;
        canJumpTimeout: number | null;
        canShowVirtualButtonsTimeout: number | null;
        canHideVirtualButtonsTimeout: number | null;
    };
};
