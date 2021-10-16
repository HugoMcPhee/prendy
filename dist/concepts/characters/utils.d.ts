import { GameyConceptoFuncs } from "../typedConceptoFuncs";
export declare function makeGetCharDollStuff<ConceptoFuncs extends GameyConceptoFuncs, CharacterName extends string>(conceptoFuncs: ConceptoFuncs): <T_CharacterName extends CharacterName>(charName: T_CharacterName) => {
    dollName: any;
    meshRef: any;
    dollRefs: Record<any, any>;
    dollState: Record<any, any>;
};
