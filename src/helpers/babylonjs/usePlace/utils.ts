// import React from "react";
import { AssetsManager, Camera, Scene, TargetCamera } from "@babylonjs/core";
import { forEach } from "chootils/dist/loops";
import { get_sectionVidUtils } from "../../prendyUtils/sectionVids";
import { PrendyOptionsUntyped, PrendyStoreHelpers } from "../../../stores/typedStoreHelpers";
import { PrendyAssets, CameraNameByPlace, PlaceName, SegmentNameByPlace } from "../../../declarations";
import { get_getSceneOrEngineUtils } from "../getSceneOrEngineUtils";

export function testAppendVideo(theVideo: HTMLVideoElement, id: string, elementTag = "app") {
  theVideo.width = 160;
  theVideo.height = 90;
  theVideo.id = id;
  // theVideo.preload = "auto";
  document.getElementById(elementTag)?.appendChild(theVideo);
}

export function get_usePlaceUtils<StoreHelpers extends PrendyStoreHelpers, PrendyOptions extends PrendyOptionsUntyped>(
  storeHelpers: StoreHelpers,
  prendyOptions: PrendyOptions,
  prendyAssets: PrendyAssets
) {
  const { getRefs, getState, setState } = storeHelpers;
  const { placeInfoByName } = prendyAssets;

  const { doWhenSectionVidPlayingAsync, getSectionForPlace } = get_sectionVidUtils(
    storeHelpers,
    prendyOptions,
    prendyAssets
  );

  const { getScene } = get_getSceneOrEngineUtils(storeHelpers);

  const placesRefs = getRefs().places;

  async function loadVideoBlob(filepath: string) {
    const result = await fetch(filepath);
    const videoBlob = await result.blob();

    return videoBlob;
  }

  // async function makeVideoElementFromBlob(videoBlob: Blob) {
  //   const arrayBufferResult = await videoBlob.arrayBuffer();
  //   const saferVideoBlob = new Blob([arrayBufferResult]);
  //
  //   const videoElement = document.createElement("video");
  //   videoElement.controls = false;
  //   videoElement.src = window.URL.createObjectURL(saferVideoBlob); // videoElement.src = filepath;
  //   videoElement.muted = true; // allow playing without interaction
  //   videoElement.preload = "auto"; // prevent first frame blank when playing
  //   return videoElement;
  // }

  async function loadNowVideosForPlace() {
    const { nowPlaceName, nowSegmentName, wantedSegmentName } = getState().global.main;
    const { nowCamName, wantedCamName } = getState().places[nowPlaceName];

    const wantedSection = getSectionForPlace(
      nowPlaceName as PlaceName,
      (wantedCamName ?? nowCamName) as CameraNameByPlace[PlaceName],
      (wantedSegmentName ?? nowSegmentName) as SegmentNameByPlace[PlaceName]
    );

    setState({
      sectionVids: {
        [nowPlaceName]: {
          wantToLoad: true,
          nowSection: wantedSection,
        },
      },
    });

    await doWhenSectionVidPlayingAsync(nowPlaceName as PlaceName);

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
    const newCamera = new TargetCamera("camera1", theCamera.globalPosition, scene);
    newCamera.rotationQuaternion = theCamera.absoluteRotation;
    newCamera.fov = theCamera.fov;
    // should have a visual min maxZ and depth min max Z
    newCamera.minZ = theCamera.minZ;
    newCamera.maxZ = theCamera.maxZ;
    return newCamera;
  }

  return {
    loadVideoBlob,
    testAppendVideo,
    loadNowVideosForPlace,
    loadProbeImagesForPlace,
    makeCameraFromModel,
  };
}
