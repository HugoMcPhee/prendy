import { Engine, Scene } from "@babylonjs/core";
import { PrendyConcepFuncs } from "../../concepts/typedConcepFuncs";

export function makeGetSceneOrEngineUtils<
  ConcepFuncs extends PrendyConcepFuncs
>(concepFuncs: ConcepFuncs) {
  const { getRefs } = concepFuncs;

  function getScene(sceneType?: "backdrop" | "main") {
    const globalRefs = getRefs().global.main;
    if (sceneType === "backdrop")
      return globalRefs.scenes.backdrop as null | Scene;

    return globalRefs.scenes.main as null | Scene;
  }

  function getEngine() {
    const scene = getScene();
    const engine = scene ? scene.getEngine() : null;
    return engine as null | Engine;
  }

  return {
    getScene,
    getEngine,
  };
}
