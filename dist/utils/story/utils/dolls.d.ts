import { BackdopConcepFuncs, PlaceholderBackdopConcepts } from "../../../concepts/typedConcepFuncs";
export declare function makeDollStoryUtils<ConcepFuncs extends BackdopConcepFuncs, BackdopConcepts extends PlaceholderBackdopConcepts>(concepFuncs: ConcepFuncs, _backdopConcepts: BackdopConcepts): {
    getModelNameFromDoll: <T_DollName extends string>(dollName: T_DollName) => NonNullable<BackdopConcepts["dolls"]["startStates"]>[T_DollName]["modelName"];
};
