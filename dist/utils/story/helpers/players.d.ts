import { BackdopConcepFuncs, PlaceholderBackdopConcepts } from "../../../concepts/typedConcepFuncs";
import { AnyAnimationName, BackdopOptions, CharacterName, ModelInfoByName, PickupName } from "../../../declarations";
export declare function makerPlayerStoryHelpers<ConcepFuncs extends BackdopConcepFuncs, BackdopConcepts extends PlaceholderBackdopConcepts, A_AnyAnimationName extends AnyAnimationName = AnyAnimationName, A_BackdopOptions extends BackdopOptions = BackdopOptions, A_CharacterName extends CharacterName = CharacterName, A_ModelInfoByName extends ModelInfoByName = ModelInfoByName, A_PickupName extends PickupName = PickupName>(concepFuncs: ConcepFuncs, backdopConcepts: BackdopConcepts, backdopStartOptions: A_BackdopOptions, modelInfoByName: A_ModelInfoByName, characterNames: readonly A_CharacterName[]): {
    enableMovement: (canMove?: boolean, revertDelay?: number | undefined) => Promise<void>;
    isHolding: (pickupName: A_PickupName) => any;
    takePickup: (pickup: A_PickupName, toHolding?: boolean) => void;
    setPlayerAnimations: (newAnimationNames: {
        walking: A_AnyAnimationName;
        idle: A_AnyAnimationName;
    }) => void;
};
