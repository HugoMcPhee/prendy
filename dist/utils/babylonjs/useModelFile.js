import { SceneLoader, } from "@babylonjs/core";
import "@babylonjs/loaders/glTF";
import { keyBy } from "chootils/dist/arrays";
import { useEffect } from "react";
import usePromise from "react-promise-suspense";
import { makeGetSceneOrEngineUtils } from "./getSceneOrEngine";
export function makeUseModelFile(storeHelpers) {
    const { getScene } = makeGetSceneOrEngineUtils(storeHelpers);
    return function useModelFile(modelFile) {
        const scene = getScene();
        const container = usePromise(SceneLoader.LoadAssetContainerAsync, [modelFile, undefined, scene]);
        useEffect(() => {
            // trying to get this more declarative
            container.addAllToScene();
            return () => container.removeAllFromScene();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
        const meshes = keyBy(container.meshes);
        const materials = keyBy(container.materials);
        const textures = keyBy(container.textures);
        const transformNodes = keyBy(container.transformNodes);
        const animationGroups = keyBy(container.animationGroups);
        const skeletons = keyBy(container.skeletons);
        const cameras = keyBy(container.cameras);
        return {
            meshes,
            materials,
            textures,
            transformNodes,
            animationGroups,
            skeletons,
            cameras,
            container,
        };
    };
}
