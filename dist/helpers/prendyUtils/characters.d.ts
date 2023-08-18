import { AbstractMesh } from "@babylonjs/core";
import { CharacterName, MyTypes, PrendyStoreHelpers } from "../../declarations";
export declare function get_characterStoryUtils<T_MyTypes extends MyTypes = MyTypes>(storeHelpers: T_MyTypes["StoreHelpers"]): {
    get2DAngleFromCharacterToSpot: <T_Place extends T_MyTypes["Main"]["PlaceName"]>(character: T_MyTypes["Main"]["CharacterName"], place: T_Place, spot: T_MyTypes["Main"]["SpotNameByPlace"][T_Place]) => number;
    get2DAngleBetweenCharacters: (charA: T_MyTypes["Main"]["CharacterName"], charB: T_MyTypes["Main"]["CharacterName"]) => number;
};
export declare function get_getCharDollStuff<A_CharacterName extends CharacterName = CharacterName, A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers>(storeHelpers: A_PrendyStoreHelpers): <T_CharacterName extends A_CharacterName>(charName: T_CharacterName) => {
    dollName: keyof ReturnType<A_PrendyStoreHelpers["getState"]>["dolls"];
    meshRef: AbstractMesh | null;
    dollRefs: ReturnType<A_PrendyStoreHelpers["getRefs"]>["dolls"][keyof ReturnType<A_PrendyStoreHelpers["getRefs"]>["dolls"]];
    dollState: ReturnType<A_PrendyStoreHelpers["getState"]>["dolls"][keyof ReturnType<A_PrendyStoreHelpers["getState"]>["dolls"]];
};
