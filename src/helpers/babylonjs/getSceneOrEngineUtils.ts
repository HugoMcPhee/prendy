import { Engine, Scene } from "@babylonjs/core";
import { PrendyStoreHelpers } from "../../declarations";

export function get_getSceneOrEngineUtils<A_PrendyStoreHelpers extends PrendyStoreHelpers = PrendyStoreHelpers>(
  storeHelpers: A_PrendyStoreHelpers
) {
  const { getRefs } = storeHelpers;

  function getScene() {
    const globalRefs = getRefs().global.main;
    return globalRefs.scene as null | Scene;
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
