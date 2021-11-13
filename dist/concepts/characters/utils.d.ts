import { AbstractMesh } from "@babylonjs/core";
import { BackdopConcepFuncs } from "../typedConcepFuncs";
export declare function makeGetCharDollStuff<ConcepFuncs extends BackdopConcepFuncs>(concepFuncs: ConcepFuncs): <T_CharacterName extends string>(charName: T_CharacterName) => {
    dollName: keyof ReturnType<ConcepFuncs["getState"]>["dolls"];
    meshRef: AbstractMesh | null;
    dollRefs: ReturnType<ConcepFuncs["getRefs"]>["dolls"][keyof ReturnType<ConcepFuncs["getRefs"]>["dolls"]];
    dollState: ReturnType<ConcepFuncs["getState"]>["dolls"][keyof ReturnType<ConcepFuncs["getState"]>["dolls"]];
};
