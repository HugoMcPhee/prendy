import { BackdopConcepFuncs } from "../typedConcepFuncs";
export declare function makeGetCharDollStuff<ConcepFuncs extends BackdopConcepFuncs, CharacterName extends string>(concepFuncs: ConcepFuncs): <T_CharacterName extends CharacterName>(charName: T_CharacterName) => {
    dollName: any;
    meshRef: any;
    dollRefs: Record<any, any>;
    dollState: Record<any, any>;
};
