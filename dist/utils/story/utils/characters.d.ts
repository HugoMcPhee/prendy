import { BackdopConcepFuncs } from "../../../concepts/typedConcepFuncs";
export declare function makeCharacterStoryUtils<ConcepFuncs extends BackdopConcepFuncs, PlaceName extends string, CharacterName extends string, SpotNameByPlace extends Record<PlaceName, string>>(concepFuncs: ConcepFuncs): {
    get2DAngleFromCharacterToSpot: <T_Place extends PlaceName>(character: CharacterName, place: T_Place, spot: SpotNameByPlace[T_Place]) => number;
    get2DAngleBetweenCharacters: (charA: CharacterName, charB: CharacterName) => number;
};
