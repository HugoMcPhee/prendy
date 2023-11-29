// import React from "react";
import { AssetsManager, TargetCamera } from "@babylonjs/core";
import { forEach } from "chootils/dist/loops";
import { getRefs, getState, setState } from "repond";
import { meta } from "../../../meta";
import { doWhenSliceVidPlayingAsync, getSliceForPlace } from "../../prendyUtils/sliceVids";
import { getScene } from "../getSceneOrEngineUtils";
export function testAppendVideo(theVideo, id, elementTag = "app") {
    var _a;
    theVideo.width = 160;
    theVideo.height = 90;
    theVideo.id = id;
    // theVideo.preload = "auto";
    (_a = document.getElementById(elementTag)) === null || _a === void 0 ? void 0 : _a.appendChild(theVideo);
}
export async function loadNowVideosForPlace() {
    const { nowPlaceName, nowSegmentName, goalSegmentName } = getState().global.main;
    const { nowCamName, goalCamName } = getState().global.main;
    const goalSlice = getSliceForPlace(nowPlaceName, (goalCamName !== null && goalCamName !== void 0 ? goalCamName : nowCamName), (goalSegmentName !== null && goalSegmentName !== void 0 ? goalSegmentName : nowSegmentName));
    setState({ sliceVids: { [nowPlaceName]: { wantToLoad: true, nowSlice: goalSlice } } });
    await doWhenSliceVidPlayingAsync(nowPlaceName);
    return true;
}
export async function loadProbeImagesForPlace(placeName) {
    const { placeInfoByName, prendyOptions } = meta.assets;
    const placesRefs = getRefs().places;
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
export function makeCameraFromModel(theCamera, scene) {
    const newCamera = new TargetCamera(theCamera.name + "_made", theCamera.globalPosition, scene);
    newCamera.rotationQuaternion = theCamera.absoluteRotation;
    newCamera.fov = theCamera.fov;
    // should have a visual min maxZ and depth min max Z
    newCamera.minZ = theCamera.minZ;
    newCamera.maxZ = theCamera.maxZ;
    return newCamera;
}
