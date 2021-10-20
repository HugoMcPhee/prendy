import { Vector3 } from "@babylonjs/core";
import { BackdopConcepFuncs, BackdopOptionsUntyped, CharacterOptionsPlaceholder, DollOptionsPlaceholder, ModelInfoByNamePlaceholder, PlaceholderBackdopConcepts } from "../../../concepts/typedConcepFuncs";
export declare function makeCharacterStoryHelpers<ConcepFuncs extends BackdopConcepFuncs, BackdopConcepts extends PlaceholderBackdopConcepts, BackdopOptions extends BackdopOptionsUntyped, ModelName extends string, PlaceName extends string, DollName extends string, CharacterName extends string, FontName extends string, AnimationNameByModel extends Record<any, string>, MeshNameByModel extends Record<ModelName, string>, SpotNameByPlace extends Record<PlaceName, string>, ModelInfoByName extends ModelInfoByNamePlaceholder<ModelName>, CharacterOptions extends CharacterOptionsPlaceholder<CharacterName, DollName, FontName>, DollOptions extends DollOptionsPlaceholder<DollName, ModelName>>(concepFuncs: ConcepFuncs, backdopConcepts: BackdopConcepts, backdopStartOptions: BackdopOptions, modelInfoByName: ModelInfoByName, characterNames: readonly CharacterName[]): {
    setCharAnimation: <T_Character extends CharacterName>(character: T_Character, animation: AnimationNameByModel[DollOptions[CharacterOptions[T_Character]["doll"]]["model"]]) => void;
    setCharPosition: (charName: CharacterName, newPosition: Vector3) => void;
    setCharRotationY: (charName: CharacterName, newRotationY: number) => void;
    springCharRotation: (charName: CharacterName, newRotationY: number) => void;
    springAddToCharRotationY: (charName: CharacterName, addedRotation: number) => void;
    lookAtOtherCharacter: (charA: CharacterName, charB?: CharacterName | undefined) => void;
    lookAtEachother: (characterA: CharacterName, characterB?: CharacterName) => void;
    moveCharacterAt2DAngle: (charName: CharacterName, angle: number) => void;
};
