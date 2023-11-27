import { meta } from "../../meta";
export function getScene() {
    const { getRefs } = meta.repond;
    const globalRefs = getRefs().global.main;
    return globalRefs.scene;
}
export function getEngine() {
    const scene = getScene();
    const engine = scene ? scene.getEngine() : null;
    return engine;
}
