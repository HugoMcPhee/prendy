import { Camera, Matrix, Mesh, Sound, Vector3 } from "@babylonjs/core";
import { forEach } from "chootils/dist/loops";
import { useEffect } from "react";
import { getRefs, getState, setState } from "repond";
import { meta } from "../../../meta";
import { AnyCameraName, PlaceName, SoundName } from "../../../types";
import { setGlobalState } from "../../prendyUtils/global";
import { getAbsoluteRotation } from "../getAbsoluteRotation";
import { getScene } from "../getSceneOrEngineUtils";
import { useModelFile } from "../useModelFile";
import { loadNowVideosForPlace, loadProbeImagesForPlace, makeCameraFromModel } from "./utils";
import { Point3D } from "chootils/dist/points3d";
import { getProjectionMatrixCustomSize, slateSize } from "../../../helpers/babylonjs/slate";

function getPositionOnSlate(position: Vector3, camera: Camera) {
  const positionOnSlate = Vector3.Project(
    position,
    Matrix.Identity(),
    camera
      .getViewMatrix()
      // .multiply(currentCamera.getProjectionMatrix()),
      .multiply(getProjectionMatrixCustomSize(camera, slateSize)),
    camera.viewport.toGlobal(slateSize.x, slateSize.y)
  );

  return positionOnSlate;
}

export function usePlace<T_PlaceName extends PlaceName>(placeName: T_PlaceName) {
  const { placeInfoByName, soundFiles, prendyOptions } = meta.assets!;

  const placesRefs = getRefs().places;

  const placeInfo = placeInfoByName[placeName];
  const { modelFile, cameraNames, floorNames, triggerNames, spotNames, soundspotNames, wallNames } = placeInfo;
  const placeRefs = placesRefs[placeName];
  const scene = getScene();

  const { container, meshes, cameras, transformNodes } = useModelFile<any>(modelFile);

  // this runs after useModelFile finished
  useEffect(() => {
    setGlobalState({ newPlaceModelLoaded: true });

    if (!scene) return;

    forEach(cameraNames, (cameraName) => {
      const camRef = placeRefs.camsRefs[cameraName];
      camRef.camera = makeCameraFromModel(cameras[cameraName], scene);

      // Find the focus nodes
      const focusYNode = transformNodes[`${cameraName}_focus_y`];
      const focusXNode = transformNodes[`${cameraName}_focus_x`];
      const focusNode = transformNodes[`${cameraName}_focus`];
      const focusNodePosition = focusNode?.getAbsolutePosition();
      const focusXNodePosition = focusXNode?.getAbsolutePosition();
      const focusYNodePosition = focusYNode?.getAbsolutePosition();

      // find the position on the slate
      const focusPositionOnSlate = focusNodePosition && getPositionOnSlate(focusNodePosition, camRef.camera);
      const focusXPositionOnSlate = focusXNodePosition && getPositionOnSlate(focusXNodePosition, camRef.camera);
      const focusYPositionOnSlate = focusYNodePosition && getPositionOnSlate(focusYNodePosition, camRef.camera);

      const finalSlateFocusX = focusXPositionOnSlate?.x ?? focusPositionOnSlate?.x ?? null;
      const finalSlateFocusY = focusYPositionOnSlate?.y ?? focusPositionOnSlate?.y ?? null;

      camRef.focusPointOnSlate = { x: finalSlateFocusX, y: finalSlateFocusY };
    });

    // Load any models for this place that weren't already loaded
    const { modelNamesLoaded } = getState().global.main;
    forEach(prendyOptions.modelNamesByPlace[placeName], (modelName) => {
      if (!modelNamesLoaded.includes(modelName)) {
        setState({ models: { [modelName]: { wantToLoad: true } } });
      }
    });

    loadNowVideosForPlace()
      .then(() => setGlobalState({ newPlaceVideosLoaded: true }))
      .catch((error) => console.warn("error loading videos", error));

    loadProbeImagesForPlace(placeName)
      .then(() => setGlobalState({ newPlaceProbesLoaded: true }))
      .catch((error) => console.warn("error loading probes", error));

    placeRefs.rootMesh = meshes["__root__"];

    function setupWallOrFloor(mesh: Mesh) {
      mesh.checkCollisions = true;
      mesh.collisionGroup = 11;
      mesh.useOctreeForCollisions = true;
      mesh.isVisible = false;
      mesh.freezeWorldMatrix();
      mesh.doNotSyncBoundingInfo = true;
    }

    forEach(floorNames, (name) => setupWallOrFloor(meshes[name]));

    forEach(wallNames, (name) => {
      setupWallOrFloor(meshes[name]);
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
}
