import { Vector3 } from "@babylonjs/core";
import { BackdopConcepFuncs, PlaceholderBackdopConcepts } from "../../../concepts/typedConcepFuncs";
import { AnimationNameByModel, BackdopOptions, CharacterName, CharacterOptions, DollName, DollOptions, ModelInfoByName } from "../../../declarations";
export declare function makeCharacterStoryHelpers<ConcepFuncs extends BackdopConcepFuncs, BackdopConcepts extends PlaceholderBackdopConcepts, A_AnimationNameByModel extends AnimationNameByModel = AnimationNameByModel, A_BackdopOptions extends BackdopOptions = BackdopOptions, A_CharacterName extends CharacterName = CharacterName, A_CharacterOptions extends CharacterOptions = CharacterOptions, A_DollName extends DollName = DollName, A_DollOptions extends DollOptions = DollOptions, A_ModelInfoByName extends ModelInfoByName = ModelInfoByName>(concepFuncs: ConcepFuncs, backdopConcepts: BackdopConcepts, backdopStartOptions: A_BackdopOptions, modelInfoByName: A_ModelInfoByName, characterNames: readonly A_CharacterName[]): {
    setCharAnimation: <T_Character extends A_CharacterName>(character: T_Character, animation: A_AnimationNameByModel[A_DollOptions[A_CharacterOptions[T_Character]["doll"]]["model"]]) => void;
    setCharPosition: (charName: A_CharacterName, newPosition: Vector3) => void;
    setCharRotationY: (charName: A_CharacterName, newRotationY: number) => void;
    springCharRotation: (charName: A_CharacterName, newRotationY: number) => void;
    springAddToCharRotationY: (charName: A_CharacterName, addedRotation: number) => void;
    lookAtOtherCharacter: (charA: A_CharacterName, charB?: A_CharacterName | undefined) => void;
    lookAtEachother: (characterA: A_CharacterName, characterB?: A_CharacterName) => void;
    moveCharacterAt2DAngle: (charName: A_CharacterName, angle: number) => void;
};
