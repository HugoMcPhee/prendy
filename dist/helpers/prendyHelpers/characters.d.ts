import { Vector3 } from "@babylonjs/core";
import { CharacterName, ModelInfoByName, PrendyOptions, PrendyStoreHelpers, PrendyStores } from "../../declarations";
export declare function get_characterStoryHelpers(storeHelpers: PrendyStoreHelpers, prendyStores: PrendyStores, prendyStartOptions: PrendyOptions, modelInfoByName: ModelInfoByName, characterNames: readonly CharacterName[]): {
    setCharAnimation: <T_Character extends string>(character: T_Character, animation: string) => void;
    setCharPosition: (charName: CharacterName, newPosition: Vector3) => void;
    setCharRotationY: (charName: CharacterName, newRotationY: number) => void;
    springCharRotation: (charName: CharacterName, newRotationY: number) => void;
    springAddToCharRotationY: (charName: CharacterName, addedRotation: number) => void;
    lookAtOtherCharacter: (charA: CharacterName, charB?: CharacterName) => void;
    lookAtEachother: (characterA: CharacterName, characterB?: CharacterName) => void;
    moveCharacterAt2DAngle: (charName: CharacterName, angle: number) => void;
};
