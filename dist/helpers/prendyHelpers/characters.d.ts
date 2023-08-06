import { Vector3 } from "@babylonjs/core";
import { AnimationNameByModel, CharacterName, CharacterOptions, DollName, DollOptions, ModelInfoByName, PlaceName, PrendyOptions, PrendyStoreHelpers, PrendyStores, SpotNameByPlace } from "../../declarations";
export declare function get_characterStoryHelpers<A_AnimationNameByModel extends AnimationNameByModel = AnimationNameByModel, A_CharacterName extends CharacterName = CharacterName, A_CharacterOptions extends CharacterOptions = CharacterOptions, A_DollName extends DollName = DollName, A_DollOptions extends DollOptions = DollOptions, A_ModelInfoByName extends ModelInfoByName = ModelInfoByName, A_PlaceName extends PlaceName = PlaceName, A_PrendyOptions extends PrendyOptions = PrendyOptions, A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers, A_PrendyStores extends PrendyStores = PrendyStores, A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace>(storeHelpers: A_PrendyStoreHelpers, prendyStores: A_PrendyStores, prendyStartOptions: A_PrendyOptions, modelInfoByName: A_ModelInfoByName, characterNames: readonly A_CharacterName[]): {
    setCharAnimation: <T_Character extends A_CharacterName>(character: T_Character, animation: A_AnimationNameByModel[A_DollOptions[A_CharacterOptions[T_Character]["doll"]]["model"]]) => void;
    setCharPosition: (charName: A_CharacterName, newPosition: Vector3) => void;
    setCharRotationY: (charName: A_CharacterName, newRotationY: number) => void;
    springCharRotation: (charName: A_CharacterName, newRotationY: number) => void;
    springAddToCharRotationY: (charName: A_CharacterName, addedRotation: number) => void;
    lookAtOtherCharacter: (charA: A_CharacterName, charB?: A_CharacterName) => void;
    lookAtEachother: (characterA: A_CharacterName, characterB?: A_CharacterName) => void;
    moveCharacterAt2DAngle: (charName: A_CharacterName, angle: number) => void;
};
