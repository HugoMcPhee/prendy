import { Sound } from "@babylonjs/core";
import { useEffect } from "react";
import { forEach } from "chootils/dist/loops";
import { makeTyped_globalUtils } from "../../prendyUtils/global";
import { makeTyped_useModelFile } from "../useModelFile";
import { getAbsoluteRotation } from "../getAbsoluteRotation";
import { makeTyped_getSceneOrEngineUtils } from "../getSceneOrEngineUtils";
import { makeTyped_usePlaceUtils } from "./utils";
export function makeTyped_usePlace(storeHelpers, prendyStartOptions, prendyAssets) {
    const { getRefs, getState, setState } = storeHelpers;
    const { placeInfoByName, soundFiles } = prendyAssets;
    const { setGlobalState } = makeTyped_globalUtils(storeHelpers);
    const { getScene } = makeTyped_getSceneOrEngineUtils(storeHelpers);
    const useModelFile = makeTyped_useModelFile(getScene);
    const { loadNowVideosForPlace, loadProbeImagesForPlace, makeCameraFromModel } = makeTyped_usePlaceUtils(storeHelpers, prendyAssets);
    const placesRefs = getRefs().places;
    return function usePlace(placeName) {
        const placeInfo = placeInfoByName[placeName];
        const placeRefs = placesRefs[placeName];
        const scene = getScene();
        const { modelFile, cameraNames, floorNames, triggerNames, spotNames, soundspotNames, wallNames } = placeInfo;
        const { container, meshes, cameras, transformNodes } = useModelFile(modelFile);
        useEffect(() => {
            // this runs after useModelFile finished
            if (!scene)
                return;
            forEach(cameraNames, (cameraName) => {
                const camRef = placeRefs.camsRefs[cameraName];
                camRef.camera = makeCameraFromModel(cameras[cameraName], scene);
            });
            const { modelNamesLoaded } = getState().global.main;
            forEach(prendyStartOptions.modelNamesByPlace[placeName], (modelName) => {
                if (!modelNamesLoaded.includes(modelName)) {
                    setState({ models: { [modelName]: { wantToLoad: true } } });
                }
            });
            // loadProbeImagesForPlace(placeName);
            Promise.all([loadNowVideosForPlace(), loadProbeImagesForPlace(placeName)])
                .then(() => {
                // When a new place is loading, only set newPlaceLoaded,
                // so 'whenAllVideosLoadedForPlace' can run when both the characters and place loaded
                setGlobalState({ newPlaceLoaded: true });
            })
                .catch((error) => {
                console.warn("something went wrong loading videos and probes");
                console.warn(error);
            });
            placeRefs.rootMesh = meshes["__root__"];
            forEach(floorNames, (name) => {
                meshes[name].checkCollisions = true;
                meshes[name].collisionGroup = 11;
                meshes[name].useOctreeForCollisions = true;
                meshes[name].isVisible = false;
                meshes[name].freezeWorldMatrix();
                meshes[name].doNotSyncBoundingInfo = true;
            });
            forEach(wallNames, (name) => {
                meshes[name].checkCollisions = true;
                meshes[name].collisionGroup = 11;
                meshes[name].useOctreeForCollisions = true;
                meshes[name].isVisible = false;
                meshes[name].freezeWorldMatrix();
                meshes[name].doNotSyncBoundingInfo = true;
                placeRefs.wallMeshes[name] = meshes[name];
            });
            forEach(triggerNames, (name) => {
                meshes[name].isVisible = false;
                meshes[name].freezeWorldMatrix();
                meshes[name].doNotSyncBoundingInfo = true;
                // const { material } = meshes[name];
                // if (material) material.alpha = 0.5;
                placeRefs.triggerMeshes[name] = meshes[name];
            });
            forEach(spotNames, (name) => {
                const spotNode = transformNodes[name];
                placeRefs.spotPositions[name] = spotNode.getAbsolutePosition();
                spotNode.computeWorldMatrix(true);
                placeRefs.spotRotations[name] = getAbsoluteRotation(spotNode);
                spotNode.freezeWorldMatrix();
            });
            forEach(soundspotNames, (name) => {
                const soundspotBaseName = name.split(".")[0];
                const newSound = new Sound(name, soundFiles[soundspotBaseName], // `${soundspotBaseName}.mp3`,
                scene, null, { loop: true, autoplay: true, spatialSound: true });
                newSound.setPosition(transformNodes[name].getAbsolutePosition());
                placeRefs.soundspotSounds[name] = newSound;
            });
            forEach(container.meshes, (loopedMesh) => {
                if (loopedMesh.name.includes("camBox_")) {
                    const loopedCamNameWithNumber = loopedMesh.name.replace("camBox_", "");
                    const cameraName = loopedCamNameWithNumber.split(".")[0];
                    loopedMesh.isVisible = false;
                    loopedMesh.freezeWorldMatrix();
                    loopedMesh.doNotSyncBoundingInfo = true;
                    const camRef = placeRefs.camsRefs[cameraName];
                    if (camRef)
                        camRef.camCubeMeshes.push(loopedMesh);
                }
            });
            return () => {
                forEach(soundspotNames, (loopedName) => {
                    var _a;
                    (_a = placeRefs.soundspotSounds[loopedName]) === null || _a === void 0 ? void 0 : _a.dispose();
                });
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [placeName]);
        return { container, meshes, cameras };
    };
}