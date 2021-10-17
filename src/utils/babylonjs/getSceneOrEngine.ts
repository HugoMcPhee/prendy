import { BackdopConcepFuncs } from "../../concepts/typedConcepFuncs";

export function makeGetSceneOrEngineUtils<
  ConcepFuncs extends BackdopConcepFuncs
>(concepFuncs: ConcepFuncs) {
  const { getRefs } = concepFuncs;

  function getScene(sceneType?: "backdrop" | "main") {
    const globalRefs = getRefs().global.main;
    if (sceneType === "backdrop") return globalRefs.scenes.backdrop;

    return globalRefs.scenes.main;
  }

  function getEngine() {
    const scene = getScene();
    const engine = scene ? scene.getEngine() : null;
    return engine;
  }

  return {
    getScene,
    getEngine,
  };
}
