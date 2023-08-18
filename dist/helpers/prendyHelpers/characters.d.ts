import { Vector3 } from "@babylonjs/core";
import { MyTypes } from "../../declarations";
export declare function get_characterStoryHelpers<T_MyTypes extends MyTypes = MyTypes>(storeHelpers: T_MyTypes["StoreHelpers"], prendyStores: T_MyTypes["Stores"], prendyOptions: T_MyTypes["Main"]["PrendyOptions"], modelInfoByName: T_MyTypes["Main"]["ModelInfoByName"], characterNames: readonly T_MyTypes["Main"]["CharacterName"][]): {
    setCharAnimation: <T_Character extends T_MyTypes["Main"]["CharacterName"]>(character: T_Character, animation: T_MyTypes["Main"]["AnimationNameByModel"][T_MyTypes["Main"]["DollOptions"][T_MyTypes["Main"]["CharacterOptions"][T_Character]["doll"]]["model"]]) => void;
    setCharPosition: (charName: T_MyTypes["Main"]["CharacterName"], newPosition: Vector3) => void;
    setCharRotationY: (charName: T_MyTypes["Main"]["CharacterName"], newRotationY: number) => void;
    springCharRotation: (charName: T_MyTypes["Main"]["CharacterName"], newRotationY: number) => void;
    springAddToCharRotationY: (charName: T_MyTypes["Main"]["CharacterName"], addedRotation: number) => void;
    lookAtOtherCharacter: (charA: T_MyTypes["Main"]["CharacterName"], charB?: T_MyTypes["Main"]["CharacterName"] | undefined) => void;
    lookAtEachother: (characterA: T_MyTypes["Main"]["CharacterName"], characterB?: T_MyTypes["Main"]["CharacterName"]) => void;
    moveCharacterAt2DAngle: (charName: T_MyTypes["Main"]["CharacterName"], angle: number) => void;
};
