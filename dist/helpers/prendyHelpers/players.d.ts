import { AnyAnimationName, CharacterName, ModelInfoByName, PickupName, PrendyOptions, PrendyStoreHelpers, PrendyStores } from "../../declarations";
export declare function get_playerStoryHelpers<A_AnyAnimationName extends AnyAnimationName = AnyAnimationName, A_CharacterName extends CharacterName = CharacterName, A_ModelInfoByName extends ModelInfoByName = ModelInfoByName, A_PickupName extends PickupName = PickupName, A_PrendyOptions extends PrendyOptions = PrendyOptions, A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers, A_PrendyStores extends PrendyStores = PrendyStores>(storeHelpers: A_PrendyStoreHelpers, prendyStores: A_PrendyStores, prendyStartOptions: A_PrendyOptions, modelInfoByName: A_ModelInfoByName, characterNames: readonly A_CharacterName[]): {
    enableMovement: (canMove?: boolean, revertDelay?: number) => Promise<void>;
    isHolding: (pickupName: A_PickupName) => any;
    takePickup: (pickup: A_PickupName, toHolding?: boolean) => void;
    setPlayerAnimations: (newAnimationNames: {
        walking: A_AnyAnimationName;
        idle: A_AnyAnimationName;
    }) => void;
};
