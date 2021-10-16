import { Vector3 } from "@babylonjs/core";
import { GameyConceptoFuncs, GameyStartOptionsUntyped, ModelInfoByNamePlaceholder, PlaceholderGameyConcepts } from "../../../concepts/typedConceptoFuncs";
export declare function makeCharacterStoryHelpers<ConceptoFuncs extends GameyConceptoFuncs, GameyConcepts extends PlaceholderGameyConcepts, GameyStartOptions extends GameyStartOptionsUntyped, ModelName extends string, PlaceName extends string, DollName extends string, CharacterName extends string, AnimationNameByModel extends Record<ModelName, string>, MeshNameByModel extends Record<ModelName, string>, SpotNameByPlace extends Record<PlaceName, string>, ModelInfoByName extends ModelInfoByNamePlaceholder<ModelName>>(conceptoFuncs: ConceptoFuncs, gameyConcepts: GameyConcepts, gameyStartOptions: GameyStartOptions, modelInfoByName: ModelInfoByName, characterNames: readonly CharacterName[]): {
    setCharAnimation: <T_Character extends CharacterName>(character: T_Character, animation: AnimationNameByModel[any]) => void;
    setCharPosition: (charName: CharacterName, newPosition: Vector3) => void;
    setCharRotationY: (charName: CharacterName, newRotationY: number) => void;
    springCharRotation: (charName: CharacterName, newRotationY: number) => void;
    springAddToCharRotationY: (charName: CharacterName, addedRotation: number) => void;
    lookAtOtherCharacter: (charA: CharacterName, charB?: CharacterName) => void;
    lookAtEachother: (characterA: CharacterName, characterB?: CharacterName) => void;
    moveCharacterAt2DAngle: (charName: CharacterName, angle: number) => void;
};
