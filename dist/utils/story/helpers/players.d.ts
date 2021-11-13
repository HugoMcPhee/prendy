import { BackdopConcepFuncs, PlaceholderBackdopConcepts } from "../../../concepts/typedConcepFuncs";
import { AnyAnimationName, BackdopOptions, CharacterName, ModelInfoByName, PickupName } from "../../../declarations";
export declare function makerPlayerStoryHelpers<ConcepFuncs extends BackdopConcepFuncs, BackdopConcepts extends PlaceholderBackdopConcepts>(concepFuncs: ConcepFuncs, backdopConcepts: BackdopConcepts, backdopStartOptions: BackdopOptions, modelInfoByName: ModelInfoByName, characterNames: readonly CharacterName[]): {
    enableMovement: (canMove?: boolean, revertDelay?: number | undefined) => Promise<void>;
    setPlayerToStartSpot: () => void;
    isHolding: (pickupName: PickupName) => any;
    takePickup: (pickup: PickupName, toHolding?: boolean) => void;
    setPlayerAnimations: (newAnimationNames: {
        walking: AnyAnimationName;
        idle: AnyAnimationName;
    }) => void;
};
