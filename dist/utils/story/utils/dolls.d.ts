import { DollName } from "../../../declarations";
import { PrendyConcepFuncs, PlaceholderPrendyConcepts } from "../../../concepts/typedConcepFuncs";
export declare function makeDollStoryUtils<ConcepFuncs extends PrendyConcepFuncs, PrendyConcepts extends PlaceholderPrendyConcepts, A_DollName extends DollName = DollName>(concepFuncs: ConcepFuncs): {
    getModelNameFromDoll: <T_DollName extends A_DollName>(dollName: T_DollName) => NonNullable<PrendyConcepts["dolls"]["startStates"]>[T_DollName]["modelName"];
};
