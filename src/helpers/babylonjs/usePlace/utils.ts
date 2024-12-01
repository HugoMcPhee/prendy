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
  const { cameraNames, segmentNamesByCamera, probesByCamera, backdropsByCamera } = placeInfo;
  const scene = getScene();

  if (!scene) return;

  let assetsManager = new AssetsManager(scene);
  assetsManager.useDefaultLoadingScreen = false;

  forEach(cameraNames, (cameraName) => {
    const segmentNamesForCamera = segmentNamesByCamera[cameraName as keyof typeof segmentNamesByCamera];

    forEach(segmentNamesForCamera, (segmentName) => {
      const textureItemsToLoad = backdropsByCamera[cameraName][segmentName].textures;
      const camRef = placesRefs[placeName].camsRefs[cameraName];
      if (!camRef.backdropTexturesBySegment[segmentName]) camRef.backdropTexturesBySegment[segmentName] = [];

      forEach(textureItemsToLoad, (texurePathsItem, textureIndex) => {
        const colorTexturePath = texurePathsItem.color;
        const depthTexturePath = texurePathsItem.depth;

        let colorAssetTask = assetsManager.addTextureTask(
          `ColorBackdropFor_${cameraName}_${segmentName}_${placeName}_${textureIndex}`,
          colorTexturePath,
          true,
          true,
          Texture.TRILINEAR_SAMPLINGMODE
        );

        colorAssetTask.onSuccess = (task) => {
          const camRef = placesRefs[placeName].camsRefs[cameraName];
          if (!camRef.backdropTexturesBySegment[segmentName][textureIndex]) {
            camRef.backdropTexturesBySegment[segmentName][textureIndex] = {};
          }
          camRef.backdropTexturesBySegment[segmentName][textureIndex].color = task.texture;
        };

        let depthAssetTask = assetsManager.addTextureTask(
          `DepthBackdropFor_${cameraName}_${segmentName}_${placeName}_${textureIndex}`,
          depthTexturePath,
          true,
          true,
          Texture.TRILINEAR_SAMPLINGMODE
        );

        depthAssetTask.onSuccess = (task) => {
          const camRef = placesRefs[placeName].camsRefs[cameraName];
          if (!camRef.backdropTexturesBySegment[segmentName][textureIndex]) {
            camRef.backdropTexturesBySegment[segmentName][textureIndex] = {};
          }
          camRef.backdropTexturesBySegment[segmentName][textureIndex].depth = task.texture;
        };
      });
    });
  });

  return assetsManager.loadAsync();
}

export async function unloadBackdropTexturesForPlace(placeName: PlaceName) {
  const placesRefs = getRefs().places;

  const placeRefs = placesRefs[placeName];
  const placeInfo = meta.assets!.placeInfoByName[placeName];
  const { cameraNames } = placeInfo;

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
