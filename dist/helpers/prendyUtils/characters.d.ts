import { PrendyStoreHelpers } from "../../stores/typedStoreHelpers";
import { CharacterName, PlaceName, SpotNameByPlace } from "../../declarations";
import { AbstractMesh } from "@babylonjs/core";
export declare function makeTyped_characterStoryUtils<StoreHelpers extends PrendyStoreHelpers, A_CharacterName extends CharacterName = CharacterName, A_PlaceName extends PlaceName = PlaceName, A_SpotNameByPlace extends SpotNameByPlace = SpotNameByPlace>(storeHelpers: StoreHelpers): {
    get2DAngleFromCharacterToSpot: <T_Place extends A_PlaceName>(character: A_CharacterName, place: T_Place, spot: A_SpotNameByPlace[T_Place]) => number;
    get2DAngleBetweenCharacters: (charA: A_CharacterName, charB: A_CharacterName) => number;
};
export declare function makeTyped_getCharDollStuff<StoreHelpers extends PrendyStoreHelpers, A_CharacterName extends CharacterName = CharacterName>(storeHelpers: StoreHelpers): <T_CharacterName extends A_CharacterName>(charName: T_CharacterName) => {
    dollName: keyof ReturnType<StoreHelpers["getState"]>["dolls"];
    meshRef: AbstractMesh | null;
    dollRefs: ReturnType<StoreHelpers["getRefs"]>["dolls"][keyof ReturnType<StoreHelpers["getRefs"]>["dolls"]];
    dollState: ReturnType<StoreHelpers["getState"]>["dolls"][keyof ReturnType<StoreHelpers["getState"]>["dolls"]];
};
