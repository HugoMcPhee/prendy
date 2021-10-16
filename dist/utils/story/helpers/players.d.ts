import { GameyConceptoFuncs, GameyStartOptionsUntyped, ModelInfoByNamePlaceholder, PlaceholderGameyConcepts } from "../../../concepts/typedConceptoFuncs";
export declare function makerPlayerStoryHelpers<ConceptoFuncs extends GameyConceptoFuncs, GameyConcepts extends PlaceholderGameyConcepts, GameyStartOptions extends GameyStartOptionsUntyped, ModelName extends string, PlaceName extends string, DollName extends string, CharacterName extends string, AnyAnimationName extends string, PickupName extends string, AnimationNameByModel extends Record<ModelName, string>, MeshNameByModel extends Record<ModelName, string>, SpotNameByPlace extends Record<PlaceName, string>, ModelInfoByName extends ModelInfoByNamePlaceholder<ModelName>>(conceptoFuncs: ConceptoFuncs, gameyConcepts: GameyConcepts, gameyStartOptions: GameyStartOptions, modelInfoByName: ModelInfoByName, characterNames: readonly CharacterName[]): {
    enableMovement: (canMove?: boolean, revertDelay?: number) => Promise<void>;
    setPlayerToStartSpot: () => void;
    isHolding: (pickupName: PickupName) => any;
    takePickup: (pickup: PickupName, toHolding?: boolean) => void;
    setPlayerAnimations: (newAnimationNames: {
        walking: AnyAnimationName;
        idle: AnyAnimationName;
    }) => void;
};
