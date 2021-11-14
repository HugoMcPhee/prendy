import { Vector3 } from "@babylonjs/core";
import { BackdopConcepFuncs, PlaceholderBackdopConcepts } from "../../../concepts/typedConcepFuncs";
import { AnimationNameByModel, BackdopOptions, CharacterName, CharacterOptions, DollName, DollOptions, ModelInfoByName } from "../../../declarations";
declare type DollNameFromCharacter<T_CharacterName extends CharacterName> = CharacterOptions[T_CharacterName]["doll"];
declare type ModelNameFromDoll<T_DollName extends DollName> = DollOptions[T_DollName]["model"];
declare type ModelNameFromCharacter<T_CharacterName extends CharacterName> = ModelNameFromDoll<DollNameFromCharacter<T_CharacterName>>;
declare type AnimationNameFromCharacter<T_CharacterName extends CharacterName> = AnimationNameByModel[ModelNameFromCharacter<T_CharacterName>];
export declare function makeCharacterStoryHelpers<ConcepFuncs extends BackdopConcepFuncs, BackdopConcepts extends PlaceholderBackdopConcepts>(concepFuncs: ConcepFuncs, backdopConcepts: BackdopConcepts, backdopStartOptions: BackdopOptions, modelInfoByName: ModelInfoByName, characterNames: readonly CharacterName[]): {
    setCharAnimation: <T_Character extends string>(character: T_Character, animation: string) => void;
    setCharPosition: (charName: CharacterName, newPosition: Vector3) => void;
    setCharRotationY: (charName: CharacterName, newRotationY: number) => void;
    springCharRotation: (charName: CharacterName, newRotationY: number) => void;
    springAddToCharRotationY: (charName: CharacterName, addedRotation: number) => void;
    lookAtOtherCharacter: (charA: CharacterName, charB?: string | undefined) => void;
    lookAtEachother: (characterA: CharacterName, characterB?: CharacterName) => void;
    moveCharacterAt2DAngle: (charName: CharacterName, angle: number) => void;
};
export {};
