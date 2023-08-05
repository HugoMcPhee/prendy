// import React from "react";
import { AssetsManager, Camera, Scene, TargetCamera } from "@babylonjs/core";
import { forEach } from "chootils/dist/loops";
import {
  CameraNameByPlace,
  PlaceName,
  PrendyAssets,
  PrendyOptions,
  PrendyStoreHelpers,
  SegmentNameByPlace,
} from "../../../declarations";
import { get_sliceVidUtils } from "../../prendyUtils/sliceVids";
import { get_getSceneOrEngineUtils } from "../getSceneOrEngineUtils";

export function testAppendVideo(theVideo: HTMLVideoElement, id: string, elementTag = "app") {
  theVideo.width = 160;
  theVideo.height = 90;
  theVideo.id = id;
  // theVideo.preload = "auto";
  document.getElementById(elementTag)?.appendChild(theVideo);
}

export function get_usePlaceUtils(
  storeHelpers: PrendyStoreHelpers,
  prendyOptions: PrendyOptions,
  prendyAssets: PrendyAssets
) {
  const { getRefs, getState, setState } = storeHelpers;
  const { placeInfoByName } = prendyAssets;

  const { doWhenSliceVidPlayingAsync, getSliceForPlace } = get_sliceVidUtils(storeHelpers, prendyOptions, prendyAssets);

  const { getScene } = get_getSceneOrEngineUtils(storeHelpers);

  const placesRefs = getRefs().places;

  async function loadNowVideosForPlace() {
    const { nowPlaceName, nowSegmentName, goalSegmentName } = getState().global.main;
    const { nowCamName, goalCamName } = getState().global.main;

    const goalSlice = getSliceForPlace(
      nowPlaceName as PlaceName,
      (goalCamName ?? nowCamName) as CameraNameByPlace[PlaceName],
      (goalSegmentName ?? nowSegmentName) as SegmentNameByPlace[PlaceName]
    );

    setState({ sliceVids: { [nowPlaceName]: { wantToLoad: true, nowSlice: goalSlice } } });

    await doWhenSliceVidPlayingAsync(nowPlaceName as PlaceName);

    return true;
  }

  async function loadProbeImagesForPlace(placeName: PlaceName) {
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

  function makeCameraFromModel(theCamera: Camera, scene: Scene) {
    const newCamera = new TargetCamera(theCamera.name + "_made", theCamera.globalPosition, scene);
    newCamera.rotationQuaternion = theCamera.absoluteRotation;
    newCamera.fov = theCamera.fov;
    // should have a visual min maxZ and depth min max Z
    newCamera.minZ = theCamera.minZ;
    newCamera.maxZ = theCamera.maxZ;
    return newCamera;
  }

  return {
    testAppendVideo,
    loadNowVideosForPlace,
    loadProbeImagesForPlace,
    makeCameraFromModel,
  };
}
