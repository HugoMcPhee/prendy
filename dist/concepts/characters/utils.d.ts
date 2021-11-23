import { AbstractMesh } from "@babylonjs/core";
import { CharacterName } from "../../declarations";
import { PrendyConcepFuncs } from "../typedConcepFuncs";
export declare function makeGetCharDollStuff<ConcepFuncs extends PrendyConcepFuncs, A_CharacterName extends CharacterName = CharacterName>(concepFuncs: ConcepFuncs): <T_CharacterName extends A_CharacterName>(charName: T_CharacterName) => {
    dollName: keyof ReturnType<ConcepFuncs["getState"]>["dolls"];
    meshRef: AbstractMesh | null;
    dollRefs: ReturnType<ConcepFuncs["getRefs"]>["dolls"][keyof ReturnType<ConcepFuncs["getRefs"]>["dolls"]];
    dollState: ReturnType<ConcepFuncs["getState"]>["dolls"][keyof ReturnType<ConcepFuncs["getState"]>["dolls"]];
};
