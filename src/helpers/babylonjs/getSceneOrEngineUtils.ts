import { Engine, Scene } from "@babylonjs/core";
import { PrendyStoreHelpers } from "../../stores/typedStoreHelpers";

export function makeTyped_getSceneOrEngineUtils<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers) {
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
