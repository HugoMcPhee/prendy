import { MyTypes } from "../../declarations";
export declare function get_playerStoryHelpers<T_MyTypes extends MyTypes = MyTypes>(storeHelpers: T_MyTypes["StoreHelpers"]): {
    enableMovement: (canMove?: boolean, revertDelay?: number) => Promise<void>;
    isHolding: (pickupName: T_MyTypes["Main"]["PickupName"]) => any;
    takePickup: (pickup: T_MyTypes["Main"]["PickupName"], toHolding?: boolean) => void;
    setPlayerAnimations: (newAnimationNames: {
        walking: T_MyTypes["Main"]["AnyAnimationName"];
        idle: T_MyTypes["Main"]["AnyAnimationName"];
    }) => void;
};
