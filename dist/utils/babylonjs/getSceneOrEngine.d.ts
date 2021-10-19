import { Engine, Scene } from "@babylonjs/core";
import { BackdopConcepFuncs } from "../../concepts/typedConcepFuncs";
export declare function makeGetSceneOrEngineUtils<ConcepFuncs extends BackdopConcepFuncs>(concepFuncs: ConcepFuncs): {
    getScene: (sceneType?: "main" | "backdrop" | undefined) => Scene | null;
    getEngine: () => Engine | null;
};
