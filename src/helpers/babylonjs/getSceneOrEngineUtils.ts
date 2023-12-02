import { Engine, Scene } from "@babylonjs/core";
import { getRefs } from "repond";

export function getScene() {
  const globalRefs = getRefs().global.main;
  return globalRefs.scene as null | Scene;
}

export function getEngine() {
  const scene = getScene();
  const engine = scene ? scene.getEngine() : null;
  return engine as null | Engine;
}
