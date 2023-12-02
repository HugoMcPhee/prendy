import { getRefs } from "repond";
export function getScene() {
    const globalRefs = getRefs().global.main;
    return globalRefs.scene;
}
export function getEngine() {
    const scene = getScene();
    const engine = scene ? scene.getEngine() : null;
    return engine;
}
