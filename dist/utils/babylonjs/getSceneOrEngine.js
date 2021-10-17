export function makeGetSceneOrEngineUtils(concepFuncs) {
    const { getRefs } = concepFuncs;
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
