// import React, { useEffect } from "react";
import { Sound, Vector3 } from "@babylonjs/core";
import { makeGlobalStoreUtils } from "../../../concepts/global/utils";
import {
  BackdopConcepFuncs,
  BackdopOptionsUntyped,
  PlaceholderBackdopConcepts,
  PlaceInfoByNamePlaceholder,
} from "../../../concepts/typedConcepFuncs";
import { forEach } from "shutils/dist/loops";
import { useEffect } from "react";
import { getAbsoluteRotation } from "../getAbsoluteRotation";
import { makeGetSceneOrEngineUtils } from "../getSceneOrEngine";
import { makeUsePlaceUtils } from "./utils";
import { makeUseModelFile } from "../../../utils/babylonjs/useModelFile";

export function makeUsePlace<
  ConcepFuncs extends BackdopConcepFuncs,
  BackdopOptions extends BackdopOptionsUntyped,
  PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>,
  PlaceName extends string,
  DollName extends string,
  AnyCameraName extends string,
  CharacterName extends string,
  SoundName extends string,
  SoundFiles extends Record<SoundName, string>,
  CameraNameByPlace extends Record<PlaceName, string>,
  SegmentNameByPlace extends Record<PlaceName, string>
>(
  concepFuncs: ConcepFuncs,
  backdopStartOptions: BackdopOptions,
  placeInfoByName: PlaceInfoByName,
  dollNames: readonly DollName[],
  soundFiles: SoundFiles
) {
  const { getRefs, getState, setState } = concepFuncs;

  const { setGlobalState } = makeGlobalStoreUtils(concepFuncs);
  const { getScene } = makeGetSceneOrEngineUtils(concepFuncs);
  const useModelFile = makeUseModelFile(concepFuncs);

  const {
    loadNowVideosForPlace,
    loadProbeImagesForPlace,
    makeCameraFromModel,
  } = makeUsePlaceUtils<
    ConcepFuncs,
    PlaceInfoByName,
    PlaceName,
    DollName,
    CharacterName,
    AnyCameraName,
    CameraNameByPlace,
    SegmentNameByPlace
  >(concepFuncs, placeInfoByName, dollNames);

  const placesRefs = getRefs().places;

  const addToHelpFixRotationVector = new Vector3(0, Math.PI, Math.PI); // Math.PI same as toRadians(180)?
  const multiplyToHelpFixRotationVector = new Vector3(-1, 1, -1);

  return function usePlace<T_PlaceName extends PlaceName>(
    placeName: T_PlaceName
  ) {
    const placeInfo = placeInfoByName[placeName];
    const placeRefs = placesRefs[placeName];
    const scene = getScene();

    const {
      modelFile,
      cameraNames,
      floorNames,
      triggerNames,
      spotNames,
      soundspotNames,
      wallNames,
    } = placeInfo;

    const { container, meshes, cameras, transformNodes } = useModelFile<any>(
      modelFile
    );

    useEffect(() => {
      // this runs after useModelFile finished
      if (!scene) return;

      forEach(cameraNames, (cameraName) => {
        const camRef = placeRefs.camsRefs[cameraName];
        camRef.camera = makeCameraFromModel(cameras[cameraName], scene);
      });

      const { modelNamesLoaded } = getState().global.main;
      forEach(backdopStartOptions.modelNamesByPlace[placeName], (modelName) => {
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
        meshes[loopedName].freezeWorldMatrix();
        meshes[loopedName].doNotSyncBoundingInfo = true;
      });

      forEach(wallNames, (loopedName) => {
        meshes[loopedName].checkCollisions = true;
        meshes[loopedName].collisionGroup = 11;
        meshes[loopedName].useOctreeForCollisions = true;
        meshes[loopedName].isVisible = false;
        meshes[loopedName].freezeWorldMatrix();
        meshes[loopedName].doNotSyncBoundingInfo = true;
        placeRefs.wallMeshes[loopedName] = meshes[loopedName];
      });

      forEach(triggerNames, (loopedName) => {
        meshes[loopedName].isVisible = false;

        meshes[loopedName].freezeWorldMatrix();
        meshes[loopedName].doNotSyncBoundingInfo = true;
        // const { material } = meshes[loopedName];
        // if (material) material.alpha = 0.5;
        placeRefs.triggerMeshes[loopedName] = meshes[loopedName];
      });

      forEach(spotNames, (spotName) => {
        const spotNode = transformNodes[spotName];
        placeRefs.spotPositions[spotName] = spotNode.getAbsolutePosition();
        spotNode.computeWorldMatrix(true);
        placeRefs.spotRotations[spotName] = getAbsoluteRotation(spotNode);

        spotNode.freezeWorldMatrix();
      });

      forEach(soundspotNames, (loopedName) => {
        const soundspotBaseName = loopedName.split(".")[0] as SoundName;

        const newSound = new Sound(
          loopedName,
          soundFiles[soundspotBaseName], // `${soundspotBaseName}.mp3`,
          scene,
          null,
          { loop: true, autoplay: true, spatialSound: true }
        );
        newSound.setPosition(transformNodes[loopedName].getAbsolutePosition());

        placeRefs.soundspotSounds[loopedName] = newSound;
      });

      forEach(container.meshes, (loopedMesh) => {
        if (loopedMesh.name.includes("camBox_")) {
          const loopedCamNameWithNumber = loopedMesh.name.replace(
            "camBox_",
            ""
          );
          const cameraName = loopedCamNameWithNumber.split(
            "."
          )[0] as AnyCameraName;
          loopedMesh.isVisible = false;

          loopedMesh.freezeWorldMatrix();
          loopedMesh.doNotSyncBoundingInfo = true;

          const camRef = placeRefs.camsRefs[cameraName];
          if (camRef) camRef.camCubeMeshes.push(loopedMesh);
        }
      });

      // const { characterNamesLoaded } = getState().global.main;
      // forEach(characterNamesLoaded, (charName) => {
      //   setFirstCharacterPosition({ characterName: charName, placeName });
      // });

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
