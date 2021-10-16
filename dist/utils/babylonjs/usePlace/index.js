// import React, { useEffect } from "react";
import { Sound, Vector3 } from "@babylonjs/core";
import { makeGlobalStoreUtils } from "../../../concepts/global/utils";
import { forEach } from "shutils/dist/loops";
import { useEffect } from "react";
import { getAbsoluteRotation } from "../getAbsoluteRotation";
import { makeGetSceneOrEngineUtils } from "../getSceneOrEngine";
import { makeUsePlaceUtils } from "./utils";
import { makeUseModelFile } from "../../../utils/babylonjs/useModelFile";
export function makeUsePlace(conceptoFuncs, gameyStartOptions, placeInfoByName, dollNames, soundFiles) {
    const { getRefs, getState, setState } = conceptoFuncs;
    const { setGlobalState } = makeGlobalStoreUtils(conceptoFuncs);
    const { getScene } = makeGetSceneOrEngineUtils(conceptoFuncs);
    const useModelFile = makeUseModelFile(conceptoFuncs);
    const { loadNowVideosForPlace, loadProbeImagesForPlace, makeCameraFromModel, } = makeUsePlaceUtils(conceptoFuncs, placeInfoByName, dollNames);
    const placesRefs = getRefs().places;
    const addToHelpFixRotationVector = new Vector3(0, Math.PI, Math.PI); // Math.PI same as toRadians(180)?
    const multiplyToHelpFixRotationVector = new Vector3(-1, 1, -1);
    return function usePlace(placeName) {
        const placeInfo = placeInfoByName[placeName];
        const placeRefs = placesRefs[placeName];
        const scene = getScene();
        const { modelFile, cameraNames, floorNames, triggerNames, spotNames, soundspotNames, wallNames, } = placeInfo;
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
            forEach(gameyStartOptions.modelNamesByPlace[placeName], (modelName) => {
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
            // loadVideosForPlace(placeName)
            //   .then(() => {
            //     // When a new place is loading, only set newPlaceLoaded,
            //     // so 'whenAllVideosLoadedForPlace' can run when both the characters and place loaded
            //     setState({ global: { main: { newPlaceLoaded: true } } });
            //   })
            //   .catch((error) => {
            //     console.warn("Error videos");
            //     console.warn(error);
            //   });
            placeRefs.rootMesh = meshes["__root__"];
            forEach(floorNames, (loopedName) => {
                meshes[loopedName].checkCollisions = true;
                meshes[loopedName].collisionGroup = 11;
                meshes[loopedName].useOctreeForCollisions = true;
                meshes[loopedName].isVisible = false;
            });
            forEach(wallNames, (loopedName) => {
                meshes[loopedName].checkCollisions = true;
                meshes[loopedName].collisionGroup = 11;
                meshes[loopedName].useOctreeForCollisions = true;
                meshes[loopedName].isVisible = false;
                placeRefs.wallMeshes[loopedName] = meshes[loopedName];
            });
            forEach(triggerNames, (loopedName) => {
                meshes[loopedName].isVisible = false;
                // const { material } = meshes[loopedName];
                // if (material) material.alpha = 0.5;
                placeRefs.triggerMeshes[loopedName] = meshes[loopedName];
            });
            forEach(spotNames, (spotName) => {
                const spotNode = transformNodes[spotName];
                placeRefs.spotPositions[spotName] = spotNode.getAbsolutePosition();
                spotNode.computeWorldMatrix(true);
                placeRefs.spotRotations[spotName] = getAbsoluteRotation(spotNode);
            });
            forEach(soundspotNames, (loopedName) => {
                const soundspotBaseName = loopedName.split(".")[0];
                const newSound = new Sound(loopedName, soundFiles[soundspotBaseName], // `${soundspotBaseName}.mp3`,
                scene, null, { loop: true, autoplay: true, spatialSound: true });
                newSound.setPosition(transformNodes[loopedName].getAbsolutePosition());
                placeRefs.soundspotSounds[loopedName] = newSound;
            });
            forEach(container.meshes, (loopedMesh) => {
                if (loopedMesh.name.includes("camBox_")) {
                    const loopedCamNameWithNumber = loopedMesh.name.replace("camBox_", "");
                    const cameraName = loopedCamNameWithNumber.split(".")[0];
                    loopedMesh.isVisible = false;
                    const camRef = placeRefs.camsRefs[cameraName];
                    if (camRef)
                        camRef.camCubeMeshes.push(loopedMesh);
                }
            });
            // const { characterNamesLoaded } = getState().global.main;
            // forEach(characterNamesLoaded, (charName) => {
            //   setFirstCharacterPosition({ characterName: charName, placeName });
            // });
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
