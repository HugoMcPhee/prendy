import { BackdopConcepFuncs } from "../../../concepts/typedConcepFuncs";
import { CharacterName, PlaceName, SpotNameByPlace } from "../../../declarations";
export declare function makeCharacterStoryUtils<ConcepFuncs extends BackdopConcepFuncs, A_CharacterName extends CharacterName = CharacterName, A_PlaceName extends PlaceName = PlaceName, A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace>(concepFuncs: ConcepFuncs): {
    get2DAngleFromCharacterToSpot: <T_Place extends A_PlaceName>(character: A_CharacterName, place: T_Place, spot: A_SpotNameByPlace[T_Place]) => number;
    get2DAngleBetweenCharacters: (charA: A_CharacterName, charB: A_CharacterName) => number;
};
