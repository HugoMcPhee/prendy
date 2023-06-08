/// <reference types="node" />
import { AnyAnimationName, PrendyOptions } from "../declarations";
import { Point2D } from "chootils/dist/points2d";
export default function players(prendyStartOptions: PrendyOptions): {
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
        canJumpTimeout: NodeJS.Timeout | null;
        canShowVirtualButtonsTimeout: NodeJS.Timeout | null;
        canHideVirtualButtonsTimeout: NodeJS.Timeout | null;
    };
};
