import { PrendyStoreHelpers, PlaceholderPrendyStores } from "../../stores/typedStoreHelpers";
import { AnyAnimationName, PrendyOptions, CharacterName, ModelInfoByName, PickupName } from "../../declarations";
export declare function makeTyped_playerStoryHelpers<StoreHelpers extends PrendyStoreHelpers, PrendyStores extends PlaceholderPrendyStores, A_AnyAnimationName extends AnyAnimationName = AnyAnimationName, A_PrendyOptions extends PrendyOptions = PrendyOptions, A_CharacterName extends CharacterName = CharacterName, A_ModelInfoByName extends ModelInfoByName = ModelInfoByName, A_PickupName extends PickupName = PickupName>(storeHelpers: StoreHelpers, prendyStores: PrendyStores, prendyStartOptions: A_PrendyOptions, modelInfoByName: A_ModelInfoByName, characterNames: readonly A_CharacterName[]): {
    enableMovement: (canMove?: boolean, revertDelay?: number) => Promise<void>;
    isHolding: (pickupName: A_PickupName) => any;
    takePickup: (pickup: A_PickupName, toHolding?: boolean) => void;
    setPlayerAnimations: (newAnimationNames: {
        walking: A_AnyAnimationName;
        idle: A_AnyAnimationName;
    }) => void;
};
