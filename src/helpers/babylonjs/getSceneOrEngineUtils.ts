import { Engine, Scene } from "@babylonjs/core";
import { RepondHelpers } from "../../declarations";
import { meta } from "../../meta";

export function getScene() {
  const { getRefs } = meta.repond!;

  const globalRefs = getRefs().global.main;
  return globalRefs.scene as null | Scene;
}

export function getEngine() {
  const scene = getScene();
  const engine = scene ? scene.getEngine() : null;
  return engine as null | Engine;
}
