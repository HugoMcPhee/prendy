import { BackdopConcepFuncs } from "../../concepts/typedConcepFuncs";
export declare function makeGetSceneOrEngineUtils<ConcepFuncs extends BackdopConcepFuncs>(concepFuncs: ConcepFuncs): {
    getScene: (sceneType?: "backdrop" | "main") => any;
    getEngine: () => any;
};
