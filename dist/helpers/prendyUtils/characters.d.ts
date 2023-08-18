import { AbstractMesh } from "@babylonjs/core";
import { MyTypes } from "../../declarations";
export declare function get_characterStoryUtils<T_MyTypes extends MyTypes = MyTypes>(storeHelpers: T_MyTypes["StoreHelpers"]): {
    get2DAngleFromCharacterToSpot: <T_Place extends T_MyTypes["Main"]["PlaceName"]>(character: T_MyTypes["Main"]["CharacterName"], place: T_Place, spot: T_MyTypes["Main"]["SpotNameByPlace"][T_Place]) => number;
    get2DAngleBetweenCharacters: (charA: T_MyTypes["Main"]["CharacterName"], charB: T_MyTypes["Main"]["CharacterName"]) => number;
};
export declare function get_getCharDollStuff<T_MyTypes extends MyTypes = MyTypes>(storeHelpers: T_MyTypes["StoreHelpers"]): <T_CharacterName extends T_MyTypes["Main"]["CharacterName"]>(charName: T_CharacterName) => {
    dollName: keyof ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["dolls"];
    meshRef: AbstractMesh | null;
    dollRefs: ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["dolls"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getRefs"]>["dolls"]];
    dollState: ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["dolls"][keyof ReturnType<T_MyTypes["StoreHelpers"]["getState"]>["dolls"]];
};
