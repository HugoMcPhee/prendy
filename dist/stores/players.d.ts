import { Point2D } from "chootils/dist/points2d";
import { MyTypes } from "../declarations";
export default function players<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"]): {
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
                walking: T_MyTypes["Types"]["AnyAnimationName"];
                idle: T_MyTypes["Types"]["AnyAnimationName"];
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
            walking: T_MyTypes["Types"]["AnyAnimationName"];
            idle: T_MyTypes["Types"]["AnyAnimationName"];
        };
    };
    refs: () => {
        topWalkSpeed: number;
        canJumpTimeout: number | null;
        canShowVirtualButtonsTimeout: number | null;
        canHideVirtualButtonsTimeout: number | null;
    };
};
