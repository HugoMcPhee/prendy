import { Engine, Scene } from "@babylonjs/core";
import { PrendyConcepFuncs } from "../../concepts/typedConcepFuncs";
export declare function makeGetSceneOrEngineUtils<ConcepFuncs extends PrendyConcepFuncs>(concepFuncs: ConcepFuncs): {
    getScene: (sceneType?: "main" | "backdrop" | undefined) => Scene | null;
    getEngine: () => Engine | null;
};
