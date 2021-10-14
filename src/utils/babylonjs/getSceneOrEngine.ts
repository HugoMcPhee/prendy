import { GameyConceptoFuncs } from "../../concepts/typedConceptoFuncs";

export function makeGetSceneOrEngineUtils<
  ConceptoFuncs extends GameyConceptoFuncs
>(conceptoFuncs: ConceptoFuncs) {
  const { getRefs } = conceptoFuncs;

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
