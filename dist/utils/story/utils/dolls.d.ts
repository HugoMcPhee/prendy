import { BackdopConcepFuncs, PlaceholderBackdopConcepts } from "../../../concepts/typedConcepFuncs";
export declare function makeDollStoryUtils<ConcepFuncs extends BackdopConcepFuncs, BackdopConcepts extends PlaceholderBackdopConcepts, DollName extends string>(concepFuncs: ConcepFuncs, backdopConcepts: BackdopConcepts): {
    getModelNameFromDoll: <T_DollName extends DollName>(dollName: T_DollName) => NonNullable<BackdopConcepts["dolls"]["startStates"]>[T_DollName]["modelName"];
};
