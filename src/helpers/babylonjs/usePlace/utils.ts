import { AssetsManager, Camera, Scene, TargetCamera, Texture } from "@babylonjs/core";
import { forEach } from "chootils/dist/loops";
import { getRefs, getState, setState } from "repond";
import { MyTypes } from "../../../declarations";
import { meta } from "../../../meta";
import { getScene } from "../getSceneOrEngineUtils";
import { PlaceName, CameraNameByPlace, SegmentNameByPlace } from "../../../types";

export async function loadBackdropTexturesForPlace(placeName: PlaceName) {
  const { placeInfoByName, prendyOptions } = meta.assets!;
  const placesRefs = getRefs().places;

  const placeInfo = placeInfoByName[placeName];
  const { cameraNames, segmentTimesByCamera, probesByCamera, backdropsByCamera } = placeInfo;
  const scene = getScene();

  if (!scene) return;

  let assetsManager = new AssetsManager(scene);
  assetsManager.useDefaultLoadingScreen = false;

  forEach(cameraNames, (cameraName) => {
    const segmentNamesForCamera = Object.keys(segmentTimesByCamera[cameraName as keyof typeof segmentTimesByCamera]);

    forEach(segmentNamesForCamera, (segmentName) => {
      const colorTexturePath = backdropsByCamera[cameraName][segmentName].color;
      const depthTexturePath = backdropsByCamera[cameraName][segmentName].depth;

      let colorAssetTask = assetsManager.addTextureTask(
        `ColorBackdropFor_${cameraName}_${segmentName}_${placeName}`,
        colorTexturePath,
        true,
        true,
        Texture.NEAREST_SAMPLINGMODE
      );

      colorAssetTask.onSuccess = (task) => {
        const camRef = placesRefs[placeName].camsRefs[cameraName];
        if (!camRef.backdropTexturesBySegment[segmentName]) camRef.backdropTexturesBySegment[segmentName] = {};
        camRef.backdropTexturesBySegment[segmentName].color = task.texture;
      };

      let depthAssetTask = assetsManager.addTextureTask(
        `DepthBackdropFor_${cameraName}_${segmentName}_${placeName}`,
        depthTexturePath,
        true,
        true,
        Texture.NEAREST_SAMPLINGMODE
      );

      depthAssetTask.onSuccess = (task) => {
        const camRef = placesRefs[placeName].camsRefs[cameraName];
        if (!camRef.backdropTexturesBySegment[segmentName]) camRef.backdropTexturesBySegment[segmentName] = {};
        camRef.backdropTexturesBySegment[segmentName].depth = task.texture;
      };
    });
  });

  return assetsManager.loadAsync();
}

export async function unloadBackdropTexturesForPlace(placeName: PlaceName) {
  const placesRefs = getRefs().places;

  const placeRefs = placesRefs[placeName];
  const { cameraNames } = placeRefs;

  forEach(cameraNames, (cameraName) => {
    const camRef = placeRefs.camsRefs[cameraName as keyof typeof placeRefs.camsRefs];

    const segmentNamesForCamera = Object.keys(camRef.backdropTexturesBySegment);

    forEach(segmentNamesForCamera, (segmentName) => {
      const textures = camRef.backdropTexturesBySegment[segmentName];
      if (textures.color) {
        textures.color.dispose();
        delete textures.color;
      }

      if (textures.depth) {
        textures.depth.dispose();
        delete textures.depth;
      }
    });
  });
}

export async function loadProbeImagesForPlace(placeName: PlaceName) {
  const { placeInfoByName, prendyOptions } = meta.assets!;
  const placesRefs = getRefs().places;

  const placeInfo = placeInfoByName[placeName];
  const { cameraNames } = placeInfo;
  const { probesByCamera } = placeInfoByName[placeName];
  const scene = getScene();

  if (!scene) return;

  let assetsManager = new AssetsManager(scene);
  assetsManager.useDefaultLoadingScreen = false;

  forEach(cameraNames, (cameraName) => {
    let assetTask = assetsManager.addCubeTextureTask(
      `HDRProbeFor_${cameraName}_${placeName}`,
      probesByCamera[cameraName as keyof typeof probesByCamera]
    );

    assetTask.onSuccess = (task) => {
      const camRef = placesRefs[placeName].camsRefs[cameraName];
      camRef.probeTexture = task.texture;
    };
  });

  return assetsManager.loadAsync();
}

export function makeCameraFromModel(theCamera: Camera, scene: Scene) {
  const newCamera = new TargetCamera(theCamera.name + "_made", theCamera.globalPosition, scene);
  newCamera.rotationQuaternion = theCamera.absoluteRotation;
  newCamera.fov = theCamera.fov;
  // should have a visual min maxZ and depth min max Z
  newCamera.minZ = theCamera.minZ;
  newCamera.maxZ = theCamera.maxZ;
  return newCamera;
}
