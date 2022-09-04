export function makeTyped_getSceneOrEngineUtils(storeHelpers) {
    const { getRefs } = storeHelpers;
    function getScene() {
        const globalRefs = getRefs().global.main;
        return globalRefs.scene;
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
