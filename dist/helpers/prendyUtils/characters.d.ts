import { AbstractMesh } from "@babylonjs/core";
import { CharacterName, DollName, PlaceName, PrendyStoreHelpers, PrendyStores, SpotNameByPlace } from "../../declarations";
export declare function get_characterStoryUtils<A_CharacterName extends CharacterName = CharacterName, A_DollName extends DollName = DollName, A_PlaceName extends PlaceName = PlaceName, A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers, A_PrendyStores extends PrendyStores = PrendyStores, A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace>(storeHelpers: A_PrendyStoreHelpers): {
    get2DAngleFromCharacterToSpot: <T_Place extends A_PlaceName>(character: A_CharacterName, place: T_Place, spot: A_SpotNameByPlace[T_Place]) => number;
    get2DAngleBetweenCharacters: (charA: A_CharacterName, charB: A_CharacterName) => number;
};
export declare function get_getCharDollStuff<A_CharacterName extends CharacterName = CharacterName, A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers>(storeHelpers: A_PrendyStoreHelpers): <T_CharacterName extends A_CharacterName>(charName: T_CharacterName) => {
    dollName: keyof ReturnType<A_PrendyStoreHelpers["getState"]>["dolls"];
    meshRef: AbstractMesh | null;
    dollRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["dolls"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["dolls"]];
    dollState: ReturnType<A_PrendyStoreHelpers["getState"]>["dolls"][keyof ReturnType<A_PrendyStoreHelpers["getState"]>["dolls"]];
};
