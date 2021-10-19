import { BackdopConcepFuncs, BackdopOptionsUntyped, ModelInfoByNamePlaceholder, PlaceholderBackdopConcepts } from "../../../concepts/typedConcepFuncs";
export declare function makerPlayerStoryHelpers<ConcepFuncs extends BackdopConcepFuncs, BackdopConcepts extends PlaceholderBackdopConcepts, BackdopOptions extends BackdopOptionsUntyped, ModelName extends string, PlaceName extends string, DollName extends string, CharacterName extends string, AnyAnimationName extends string, PickupName extends string, AnimationNameByModel extends Record<ModelName, string>, MeshNameByModel extends Record<ModelName, string>, SpotNameByPlace extends Record<PlaceName, string>, ModelInfoByName extends ModelInfoByNamePlaceholder<ModelName>>(concepFuncs: ConcepFuncs, backdopConcepts: BackdopConcepts, backdopStartOptions: BackdopOptions, modelInfoByName: ModelInfoByName, characterNames: readonly CharacterName[]): {
    enableMovement: (canMove?: boolean, revertDelay?: number | undefined) => Promise<void>;
    setPlayerToStartSpot: () => void;
    isHolding: (pickupName: PickupName) => any;
    takePickup: (pickup: PickupName, toHolding?: boolean) => void;
    setPlayerAnimations: (newAnimationNames: {
        walking: AnyAnimationName;
        idle: AnyAnimationName;
    }) => void;
};
