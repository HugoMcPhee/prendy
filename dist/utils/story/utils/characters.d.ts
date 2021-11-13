import { BackdopConcepFuncs } from "../../../concepts/typedConcepFuncs";
import { CharacterName, SpotNameByPlace } from "../../../declarations";
export declare function makeCharacterStoryUtils<ConcepFuncs extends BackdopConcepFuncs>(concepFuncs: ConcepFuncs): {
    get2DAngleFromCharacterToSpot: <T_Place extends string>(character: CharacterName, place: T_Place, spot: any) => number;
    get2DAngleBetweenCharacters: (charA: CharacterName, charB: CharacterName) => number;
};
