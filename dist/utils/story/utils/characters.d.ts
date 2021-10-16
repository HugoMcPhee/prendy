import { GameyConceptoFuncs } from "../../../concepts/typedConceptoFuncs";
export declare function makeCharacterStoryUtils<ConceptoFuncs extends GameyConceptoFuncs, PlaceName extends string, CharacterName extends string, SpotNameByPlace extends Record<PlaceName, string>>(conceptoFuncs: ConceptoFuncs): {
    get2DAngleFromCharacterToSpot: <T_Place extends PlaceName>(character: CharacterName, place: T_Place, spot: SpotNameByPlace[T_Place]) => number;
    get2DAngleBetweenCharacters: (charA: CharacterName, charB: CharacterName) => number;
};
