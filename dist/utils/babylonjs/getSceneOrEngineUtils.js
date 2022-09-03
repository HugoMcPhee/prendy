export function makeTyped_getSceneOrEngineUtils(storeHelpers) {
    const { getRefs } = storeHelpers;
    function getScene(sceneType) {
        const globalRefs = getRefs().global.main;
        if (sceneType === "backdrop")
            return globalRefs.scenes.backdrop;
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
