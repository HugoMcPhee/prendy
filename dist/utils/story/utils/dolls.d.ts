import { GameyConceptoFuncs, PlaceholderGameyConcepts } from "../../../concepts/typedConceptoFuncs";
export declare function makeDollStoryUtils<ConceptoFuncs extends GameyConceptoFuncs, GameyConcepts extends PlaceholderGameyConcepts, DollName extends string>(conceptoFuncs: ConceptoFuncs, gameyConcepts: GameyConcepts): {
    getModelNameFromDoll: <T_DollName extends DollName>(dollName: T_DollName) => any;
};
