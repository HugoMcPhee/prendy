import { AbstractMesh } from "@babylonjs/core";
import { CharacterName, PrendyStoreHelpers, SpotNameByPlace } from "../../declarations";
export declare function get_characterStoryUtils(storeHelpers: PrendyStoreHelpers): {
    get2DAngleFromCharacterToSpot: <T_Place extends string>(character: CharacterName, place: T_Place, spot: string) => number;
    get2DAngleBetweenCharacters: (charA: CharacterName, charB: CharacterName) => number;
};
export declare function get_getCharDollStuff(storeHelpers: PrendyStoreHelpers): <T_CharacterName extends string>(charName: T_CharacterName) => {
    dollName: any;
    meshRef: AbstractMesh | null;
    dollRefs: Record<any, any>;
    dollState: Record<any, any>;
};
