import { Sound, Vector3 } from "@babylonjs/core";
import { useEffect } from "react";
import { forEach } from "chootils/dist/loops";
import {
  AnyCameraName,
  PrendyAssets,
  PrendyOptions,
  ModelInfoByName,
  PlaceName,
  SoundName,
} from "../../../declarations";
import { get_globalUtils } from "../../prendyUtils/global";
import { PrendyStoreHelpers, PlaceholderPrendyStores } from "../../../stores/typedStoreHelpers";
import { get_useModelFile } from "../useModelFile";
import { getAbsoluteRotation } from "../getAbsoluteRotation";
import { get_getSceneOrEngineUtils } from "../getSceneOrEngineUtils";
import { get_usePlaceUtils } from "./utils";

export function get_usePlace<
  StoreHelpers extends PrendyStoreHelpers,
  PrendyStores extends PlaceholderPrendyStores,
  A_PrendyOptions extends PrendyOptions = PrendyOptions,
  A_ModelInfoByName extends ModelInfoByName = ModelInfoByName
>(storeHelpers: StoreHelpers, prendyStartOptions: A_PrendyOptions, prendyAssets: PrendyAssets) {
  const { getRefs, getState, setState } = storeHelpers;
  const { placeInfoByName, soundFiles } = prendyAssets;

  const { setGlobalState } = get_globalUtils(storeHelpers);
  const { getScene } = get_getSceneOrEngineUtils(storeHelpers);
  const useModelFile = get_useModelFile(getScene);

  const { loadNowVideosForPlace, loadProbeImagesForPlace, makeCameraFromModel } = get_usePlaceUtils(
    storeHelpers,
    prendyStartOptions,
    prendyAssets
  );

  const placesRefs = getRefs().places;

  return function usePlace<T_PlaceName extends PlaceName>(placeName: T_PlaceName) {
    const placeInfo = placeInfoByName[placeName];
    const placeRefs = placesRefs[placeName];
    const scene = getScene();

    const { modelFile, cameraNames, floorNames, triggerNames, spotNames, soundspotNames, wallNames } = placeInfo;

    const { container, meshes, cameras, transformNodes } = useModelFile<any>(modelFile);

    useEffect(() => {
      // this runs after useModelFile finished
      if (!scene) return;

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
        const soundspotBaseName = name.split(".")[0] as SoundName;

        const newSound = new Sound(
          name,
          soundFiles[soundspotBaseName], // `${soundspotBaseName}.mp3`,
          scene,
          null,
          { loop: true, autoplay: true, spatialSound: true }
        );
        newSound.setPosition(transformNodes[name].getAbsolutePosition());

        placeRefs.soundspotSounds[name] = newSound;
      });

      forEach(container.meshes, (loopedMesh) => {
        if (loopedMesh.name.includes("camBox_")) {
          const loopedCamNameWithNumber = loopedMesh.name.replace("camBox_", "");
          const cameraName = loopedCamNameWithNumber.split(".")[0] as AnyCameraName;
          loopedMesh.isVisible = false;

          loopedMesh.freezeWorldMatrix();
          loopedMesh.doNotSyncBoundingInfo = true;

          const camRef = placeRefs.camsRefs[cameraName];
          if (camRef) camRef.camCubeMeshes.push(loopedMesh);
        }
      });

      return () => {
        forEach(soundspotNames, (loopedName) => {
          placeRefs.soundspotSounds[loopedName]?.dispose();
        });
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [placeName]);

    return { container, meshes, cameras };
  };
}
