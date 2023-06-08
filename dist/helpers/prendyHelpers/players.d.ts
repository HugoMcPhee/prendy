import { AnyAnimationName, CharacterName, ModelInfoByName, PickupName, PrendyOptions, PrendyStoreHelpers, PrendyStores } from "../../declarations";
export declare function get_playerStoryHelpers(storeHelpers: PrendyStoreHelpers, prendyStores: PrendyStores, prendyStartOptions: PrendyOptions, modelInfoByName: ModelInfoByName, characterNames: readonly CharacterName[]): {
    enableMovement: (canMove?: boolean, revertDelay?: number) => Promise<void>;
    isHolding: (pickupName: PickupName) => any;
    takePickup: (pickup: PickupName, toHolding?: boolean) => void;
    setPlayerAnimations: (newAnimationNames: {
        walking: AnyAnimationName;
        idle: AnyAnimationName;
    }) => void;
};
