// import React from "react";
import { AssetsManager, TargetCamera } from "@babylonjs/core";
import { makeGetCharDollStuff } from "../../../concepts/characters/utils";
import { makeSectionVidStoreUtils } from "../../../concepts/sectionVids/utils";
import { forEach } from "shutils/dist/loops";
import { vector3ToPoint3d } from "..";
import { makeGetSceneOrEngineUtils } from "../getSceneOrEngine";
export function testAppendVideo(theVideo, id, elementTag = "app") {
    var _a;
    theVideo.width = 160;
    theVideo.height = 90;
    theVideo.id = id;
    // theVideo.preload = "auto";
    (_a = document.getElementById(elementTag)) === null || _a === void 0 ? void 0 : _a.appendChild(theVideo);
}
export function makeUsePlaceUtils(concepFuncs, backdopArt) {
    const { getRefs, getState, setState } = concepFuncs;
    const { placeInfoByName } = backdopArt;
    const { doWhenSectionVidPlayingAsync, getSectionForPlace } = makeSectionVidStoreUtils(concepFuncs, backdopArt);
    const getCharDollStuff = makeGetCharDollStuff(concepFuncs);
    const { getScene } = makeGetSceneOrEngineUtils(concepFuncs);
    const placesRefs = getRefs().places;
    async function loadVideoBlob(filepath) {
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
    function setFirstCharacterPosition({ characterName, placeName, }) {
        var _a;
        const { nowPlaceName } = getState().global.main;
        const { dollRefs, dollName } = (_a = getCharDollStuff(characterName)) !== null && _a !== void 0 ? _a : {};
        if (!(dollRefs === null || dollRefs === void 0 ? void 0 : dollRefs.meshRef) || !dollName)
            return;
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
    async function loadNowVideosForPlace() {
        const { nowPlaceName, nowSegmentName, wantedSegmentName } = getState().global.main;
        const { nowCamName, wantedCamName } = getState().places[nowPlaceName];
        const wantedSection = getSectionForPlace(nowPlaceName, (wantedCamName !== null && wantedCamName !== void 0 ? wantedCamName : nowCamName), (wantedSegmentName !== null && wantedSegmentName !== void 0 ? wantedSegmentName : nowSegmentName));
        setState({
            sectionVids: {
                [nowPlaceName]: {
                    wantToLoad: true,
                    nowSection: wantedSection,
                },
            },
        });
        await doWhenSectionVidPlayingAsync(nowPlaceName);
        return true;
    }
    async function loadProbeImagesForPlace(placeName) {
        const placeInfo = placeInfoByName[placeName];
        const { cameraNames } = placeInfo;
        const { probesByCamera } = placeInfoByName[placeName];
        const scene = getScene();
        if (!scene)
            return;
        let assetsManager = new AssetsManager(scene);
        assetsManager.useDefaultLoadingScreen = false;
        forEach(cameraNames, (cameraName) => {
            let assetTask = assetsManager.addCubeTextureTask(`HDRProbeFor_${cameraName}_${placeName}`, probesByCamera[cameraName]);
            assetTask.onSuccess = (task) => {
                const camRef = placesRefs[placeName].camsRefs[cameraName];
                camRef.probeTexture = task.texture;
            };
        });
        return assetsManager.loadAsync();
    }
    function makeCameraFromModel(theCamera, scene) {
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
        setFirstCharacterPosition,
        testAppendVideo,
        loadNowVideosForPlace,
        loadProbeImagesForPlace,
        makeCameraFromModel,
    };
}
