import { DollName } from "../../../declarations";
import { BackdopConcepFuncs, PlaceholderBackdopConcepts } from "../../../concepts/typedConcepFuncs";
export declare function makeDollStoryUtils<ConcepFuncs extends BackdopConcepFuncs, BackdopConcepts extends PlaceholderBackdopConcepts, A_DollName extends DollName = DollName>(concepFuncs: ConcepFuncs, _backdopConcepts: BackdopConcepts): {
    getModelNameFromDoll: <T_DollName extends A_DollName>(dollName: T_DollName) => NonNullable<BackdopConcepts["dolls"]["startStates"]>[T_DollName]["modelName"];
};
