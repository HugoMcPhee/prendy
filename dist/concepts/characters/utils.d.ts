import { AbstractMesh } from "@babylonjs/core";
import { CharacterName } from "../../declarations";
import { PrendyStoreHelpers } from "../typedStoreHelpers";
export declare function makeGetCharDollStuff<StoreHelpers extends PrendyStoreHelpers, A_CharacterName extends CharacterName = CharacterName>(storeHelpers: StoreHelpers): <T_CharacterName extends A_CharacterName>(charName: T_CharacterName) => {
    dollName: keyof ReturnType<StoreHelpers["getState"]>["dolls"];
    meshRef: AbstractMesh | null;
    dollRefs: ReturnType<StoreHelpers["getRefs"]>["dolls"][keyof ReturnType<StoreHelpers["getRefs"]>["dolls"]];
    dollState: ReturnType<StoreHelpers["getState"]>["dolls"][keyof ReturnType<StoreHelpers["getState"]>["dolls"]];
};
