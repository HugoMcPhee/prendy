// import React from "react";
import { AssetsManager, Camera, Scene, TargetCamera } from "@babylonjs/core";
import { makeGetCharDollStuff } from "../../../concepts/characters/utils";
import { makeSectionVidStoreUtils } from "../../../concepts/sectionVids/utils";
import {
  GameyConceptoFuncs,
  PlaceInfoByNamePlaceholder,
} from "../../../concepts/typedConceptoFuncs";
import { forEach } from "shutils/dist/loops";
import { vector3ToPoint3d } from "..";
import { makeGetSceneOrEngineUtils } from "../getSceneOrEngine";

export function makeUsePlaceUtils<
  ConceptoFuncs extends GameyConceptoFuncs,
  PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>,
  PlaceName extends string,
  DollName extends string,
  CharacterName extends string,
  AnyCameraName extends string,
  CameraNameByPlace extends Record<PlaceName, string>,
  SegmentNameByPlace extends Record<PlaceName, string>
>(
  conceptoFuncs: ConceptoFuncs,
  placeInfoByName: PlaceInfoByName,
  dollNames: readonly DollName[]
) {
  const { getRefs, getState, setState } = conceptoFuncs;

  const {
    doWhenSectionVidPlayingAsync,
    getSectionForPlace,
  } = makeSectionVidStoreUtils<
    ConceptoFuncs,
    PlaceInfoByName,
    PlaceName,
    DollName,
    AnyCameraName,
    CameraNameByPlace,
    SegmentNameByPlace
  >(conceptoFuncs, placeInfoByName, dollNames);

  const getCharDollStuff = makeGetCharDollStuff<ConceptoFuncs, CharacterName>(
    conceptoFuncs
  );
  const { getScene } = makeGetSceneOrEngineUtils(conceptoFuncs);

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

  function setFirstCharacterPosition({
    characterName,
    placeName,
  }: {
    characterName: CharacterName;
    placeName: PlaceName;
  }) {
    const { nowPlaceName } = getState().global.main;
    const { dollRefs, dollName } = getCharDollStuff(characterName) ?? {};
    if (!dollRefs?.meshRef || !dollName) return;
    const placeInfo = placeInfoByName[placeName];
    const { spotNames } = placeInfo;
    const { nextSpotName } = getState().dolls[dollName];
    const nowPlaceRef = placesRefs[nowPlaceName];

    const newSpotName = nextSpotName || spotNames[0];

    const newSpotPosition = nowPlaceRef.spotPositions[newSpotName].clone();
    const newSpotPoint = vector3ToPoint3d(newSpotPosition);

    dollRefs.meshRef.position = newSpotPosition;
    setState({ dolls: { [dollName]: { position: newSpotPoint } } });
  }

  function testAppendVideo(
    theVideo: HTMLVideoElement,
    id: string,
    elementTag = "app"
  ) {
    theVideo.width = 160;
    theVideo.height = 90;
    theVideo.id = id;
    // theVideo.preload = "auto";
    document.getElementById(elementTag)?.appendChild(theVideo);
  }

  async function loadNowVideosForPlace() {
    const {
      nowPlaceName,
      nowSegmentName,
      wantedSegmentName,
    } = getState().global.main;
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
    const newCamera = new TargetCamera(
      "camera1",
      theCamera.globalPosition,
      scene
    );
    newCamera.rotationQuaternion = theCamera.absoluteRotation;
    newCamera.fov = theCamera.fov;
    // should have a visual min maxZ and depth min max Z
    newCamera.minZ = theCamera.minZ;
    newCamera.maxZ = theCamera.maxZ;
    return newCamera;
  }

  return {
    loadVideoBlob,
    setFirstCharacterPosition,
    testAppendVideo,
    loadNowVideosForPlace,
    loadProbeImagesForPlace,
    makeCameraFromModel,
  };
}
