import { AbstractMesh } from "@babylonjs/core";
import { MyTypes } from "../../declarations";
type CharacterName = MyTypes["Types"]["CharacterName"];
type PlaceName = MyTypes["Types"]["PlaceName"];
type SpotNameByPlace = MyTypes["Types"]["SpotNameByPlace"];
export declare function get2DAngleFromCharacterToSpot<T_Place extends PlaceName>(character: CharacterName, place: T_Place, spot: SpotNameByPlace[T_Place]): number;
export declare function get2DAngleBetweenCharacters(charA: CharacterName, charB: CharacterName): number;
export declare function getCharDollStuff<T_CharacterName extends CharacterName>(charName: T_CharacterName): {
    dollName: string;
    meshRef: AbstractMesh | null;
    dollRefs: any;
    dollState: any;
};
export {};
