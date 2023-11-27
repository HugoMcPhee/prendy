import { MyTypes } from "../../declarations";
type AnyAnimationName = MyTypes["Types"]["AnyAnimationName"];
type PickupName = MyTypes["Types"]["PickupName"];
type PlayerAnimationNames = {
    walking: AnyAnimationName;
    idle: AnyAnimationName;
};
export declare function enableMovement(canMove?: boolean, revertDelay?: number): Promise<void>;
export declare function isHolding(pickupName: PickupName): any;
export declare function takePickup(pickup: PickupName, toHolding?: boolean): void;
export declare function setPlayerAnimations(newAnimationNames: PlayerAnimationNames): void;
export {};
