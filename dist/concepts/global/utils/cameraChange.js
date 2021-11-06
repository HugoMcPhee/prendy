import { Constants, Engine, PBRMaterial, RenderTargetTexture, ShaderMaterial, Texture, } from "@babylonjs/core";
import { forEach } from "shutils/dist/loops";
import { makeGlobalStoreUtils } from "./";
import { chooseClosestBeforeItemInArray } from "shutils/dist/arrays";
import { enableCustomDepthRenderer } from "../../../utils/babylonjs/enableCustomDepthRenderer";
import { makeGetSectionVidVideo, } from "../../../concepts/sectionVids/utils";
export function makeCameraChangeUtils(concepFuncs, placeInfoByName, dollNames) {
    const { getRefs, getState, setState } = concepFuncs;
    const globalRefs = getRefs().global.main;
    const placesRefs = getRefs().places;
    const { getGlobalState } = makeGlobalStoreUtils(concepFuncs);
    const getSectionVidVideo = makeGetSectionVidVideo(concepFuncs);
    function getSafeCamName(cam) {
        if (cam === null) {
            return null;
        }
        const { nowPlaceName } = getGlobalState();
        const safePlace = nowPlaceName;
        const { segmentTimesByCamera, cameraNames } = placeInfoByName[safePlace];
        // if the camera isn't in the nowPlace, then use the first camera for the nowPlace
        const safeCam = (segmentTimesByCamera === null || segmentTimesByCamera === void 0 ? void 0 : segmentTimesByCamera[cam])
            ? cam
            : cameraNames[0];
        return safeCam;
    }
    function getSafeSegmentName({ cam, place, segment, useStorySegmentRules, }) {
        var _a;
        const { nowPlaceName } = getGlobalState();
        const safePlace = nowPlaceName;
        const { segmentNames, segmentTimesByCamera } = placeInfoByName[safePlace];
        // if the camera isn't in the nowPlace, then use the first camera for the nowPlace
        const safeCam = getSafeCamName(cam);
        if (nowPlaceName !== place) {
            console.warn("tried to gtSafeSegment name for not current place", place);
        }
        // if (segmentTimesByCamera[cam]) {
        // segmentTimesByCamera[cam]
        // }
        const camSegmentNames = Object.keys((_a = segmentTimesByCamera === null || segmentTimesByCamera === void 0 ? void 0 : segmentTimesByCamera[safeCam]) !== null && _a !== void 0 ? _a : {});
        // const camSegmentNames = [] as any;
        // disabling for now to allow getSafeSegmentName to work in video.ts (looping stuff) when changing segment?
        // const foundRuleSegmentName = useStorySegmentRules
        //   ? getSegmentFromStoryRules(safePlace, safeCam)
        //   : undefined;
        const foundRuleSegmentName = undefined;
        return chooseClosestBeforeItemInArray({
            fullArray: segmentNames,
            goalItem: foundRuleSegmentName !== null && foundRuleSegmentName !== void 0 ? foundRuleSegmentName : segment,
            smallArray: camSegmentNames,
        });
    }
    function updateTexturesForNowCamera(newCameraName, didChangePlace = false) {
        const { nowPlaceName } = getState().global.main;
        // const { scenes, backdropRenderSize } = globalRefs;
        const { backdropRenderSize } = globalRefs;
        const scenes = globalRefs.scenes;
        const placeRef = placesRefs[nowPlaceName];
        const { camsRefs } = placeRef;
        const newCamRef = camsRefs[newCameraName];
        if (scenes.main === null)
            return;
        if (scenes.backdrop === null)
            return;
        if (!newCamRef.camera)
            return;
        if (!globalRefs.scenePlane)
            return;
        // if (!globalRefs.sceneRenderTarget) return;
        // scenes.main.activeCamera = newCamRef.camera;
        // scenes.main.activeCamera = newCamRef.camera;
        // playerCharRefs.cameraRef = scenes.main.activeCamera as TargetCamera;
        // Render target
        // globalRefs.sceneRenderTarget?.dispose();
        if (!globalRefs.sceneRenderTarget) {
            globalRefs.sceneRenderTarget = new RenderTargetTexture("screenShot", backdropRenderSize, scenes.main, false, false, Constants.TEXTURETYPE_UNSIGNED_INT, false, Texture.NEAREST_SAMPLINGMODE, undefined, undefined, undefined, Engine.TEXTUREFORMAT_RGBA);
        }
        globalRefs.sceneRenderTarget.activeCamera = newCamRef.camera;
        // globalRefs.depthRenderer?.dispose();
        if (!globalRefs.depthRenderer) {
            globalRefs.depthRenderer = enableCustomDepthRenderer(scenes.main, getRefs().global.main.depthRenderSize, newCamRef.camera, false);
        }
        // const depthRenderer = globalRefs.depthRenderer as DepthRendererWithSize;
        // depthRenderer.useOnlyInActiveCamera = true;
        // globalRefs.depthRenderTarget?.dispose();
        if (!globalRefs.depthRenderTarget) {
            globalRefs.depthRenderTarget = globalRefs.depthRenderer.getDepthMap();
        }
        globalRefs.depthRenderTarget.activeCamera = newCamRef.camera;
        // scenes.main._depthRenderer = globalRefs.depthRenderer;
        // scenes.main.enableDepthRenderer();
        // newCamRef.camera.customRenderTargets = [
        //   globalRefs.sceneRenderTarget,
        //   globalRefs.depthRenderTarget,
        // ];
        if (!scenes.main.customRenderTargets.length) {
            scenes.main.customRenderTargets = [
                globalRefs.sceneRenderTarget,
                globalRefs.depthRenderTarget,
            ];
            // scenes.main.cameras.forEach((camera) => {
            // camera.outputRenderTarget = globalRefs.sceneRenderTarget;
            // camera.customRenderTargets = [globalRefs.depthRenderTarget];
            // camera.cuso
            // });
            // newCamRef.camera.unfreezeProjectionMatrix();
            // scenes.main.cameras.forEach((camera) => {
            //   if (camera !== newCamRef.camera) {
            //     camera.freezeProjectionMatrix();
            //     camera.setEnabled(false);
            //     // camera.;
            //   }
            // });
            // setTimeout(() => {
            // }, 2000);
            addMeshesToRenderLists(newCamRef);
        }
        // Plane material
        if (!globalRefs.scenePlaneMaterial) {
            globalRefs.scenePlaneMaterial = new ShaderMaterial("backdropAndDepthShader", scenes.backdrop, "./backdropAndDepth", {
                attributes: ["position", "uv"],
                uniforms: ["worldViewProjection"],
            });
            globalRefs.scenePlane.material = globalRefs.scenePlaneMaterial;
            globalRefs.scenePlaneMaterial.setTexture("textureSampler", globalRefs.sceneRenderTarget);
            globalRefs.scenePlaneMaterial.setTexture("SceneDepthTexture", globalRefs.depthRenderTarget);
            updateVideoTexturesForNewPlace(nowPlaceName);
            globalRefs.scenePlane.material.freeze();
        }
        if (didChangePlace) {
            addMeshesToRenderLists(newCamRef);
            updateVideoTexturesForNewPlace(nowPlaceName);
        }
        applyProbeToAllDollMaterials();
        applyProbeToAllParticleMaterials();
    }
    function addMeshesToRenderLists(newCamRef) {
        const scenes = globalRefs.scenes;
        scenes.main.freezeActiveMeshes();
        globalRefs.sceneRenderTarget.renderList = [];
        globalRefs.depthRenderTarget.renderList = [];
        forEach(dollNames, (dollName) => {
            const dollMeshes = getRefs().dolls[dollName].otherMeshes;
            const dollMeshNames = Object.keys(dollMeshes);
            forEach(dollMeshNames, (meshName) => {
                var _a, _b, _c, _d;
                const loopedMesh = dollMeshes[meshName];
                loopedMesh.alwaysSelectAsActiveMesh = true;
                (_b = (_a = globalRefs.sceneRenderTarget) === null || _a === void 0 ? void 0 : _a.renderList) === null || _b === void 0 ? void 0 : _b.push(loopedMesh);
                (_d = (_c = globalRefs.depthRenderTarget) === null || _c === void 0 ? void 0 : _c.renderList) === null || _d === void 0 ? void 0 : _d.push(loopedMesh);
            });
        });
        scenes.main.freeActiveMeshes(); // hm? different to freezeActiveMeshes , maybe unintentional
        const particleSystemNames = Object.keys(globalRefs.solidParticleSystems);
        forEach(particleSystemNames, (particleSystemName) => {
            var _a, _b, _c, _d;
            const particleSystem = globalRefs.solidParticleSystems[particleSystemName];
            (_b = (_a = globalRefs.sceneRenderTarget) === null || _a === void 0 ? void 0 : _a.renderList) === null || _b === void 0 ? void 0 : _b.push(particleSystem.mesh);
            (_d = (_c = globalRefs.depthRenderTarget) === null || _c === void 0 ? void 0 : _c.renderList) === null || _d === void 0 ? void 0 : _d.push(particleSystem.mesh);
            particleSystem._camera = newCamRef.camera;
        });
    }
    function updateVideoTexturesForNewPlace(nowPlaceName) {
        var _a, _b;
        if (globalRefs.colorVideoTex && globalRefs.depthVideoTex) {
            const colorVidElement = getSectionVidVideo(nowPlaceName);
            const depthVidElement = getSectionVidVideo(nowPlaceName, "depth");
            if (colorVidElement && depthVidElement) {
                // console.log("UPDATING TEXTURE HERE 1");
                globalRefs.colorVideoTex.updateVid(colorVidElement);
                globalRefs.depthVideoTex.updateVid(depthVidElement);
            }
        }
        (_a = globalRefs === null || globalRefs === void 0 ? void 0 : globalRefs.scenePlaneMaterial) === null || _a === void 0 ? void 0 : _a.setTexture("BackdropTextureSample", globalRefs.colorVideoTex);
        (_b = globalRefs === null || globalRefs === void 0 ? void 0 : globalRefs.scenePlaneMaterial) === null || _b === void 0 ? void 0 : _b.setTexture("DepthTextureSample", globalRefs.depthVideoTex);
    }
    function applyProbeToAllDollMaterials() {
        const { nowPlaceName, modelNamesLoaded } = getState().global.main;
        const placeState = getState().places[nowPlaceName];
        const { scenes } = globalRefs;
        const placeRef = placesRefs[nowPlaceName];
        const { camsRefs } = placeRef;
        // const newCamRef = camsRefs[placeState.nowCamName];
        if (scenes.main === null)
            return;
        if (scenes.backdrop === null)
            return;
        // if (!newCamRef.camera) return;
        if (!globalRefs.scenePlane)
            return;
        forEach(modelNamesLoaded, (modelName) => {
            const modelRefs = getRefs().models[modelName];
            // console.log("camsRefs[placeState.nowCamName].probeTexture");
            // console.log(camsRefs[placeState.nowCamName].probeTexture);
            if (modelRefs.materialRef &&
                camsRefs[placeState.nowCamName].probeTexture) {
                modelRefs.materialRef.reflectionTexture =
                    camsRefs[placeState.nowCamName].probeTexture;
            }
            // const scene = getScene();
            // if (scene) {
            //   dollRefs.materialRef = new StandardMaterial("redMat", scene) as any;
            //   (dollRefs.materialRef as any).ambientColor = new Color3(0, 1, 0);
            // }
        });
        //
        // // looks like the dolls material doesn't automatically update with the models material
        // // so setting it here works :)
        forEach(dollNames, (dollName) => {
            const dollRefs = getRefs().dolls[dollName];
            const { modelName } = getState().dolls[dollName];
            const modelRefs = getRefs().models[modelName];
            // console.log("alreaddy", dollRefs.materialRef === modelRefs.materialRef);
            // dollRefs.materialRef = modelRefs.materialRef;
            // dollRefs.materialRef = modelRefs.materialRef;
            if (dollRefs.meshRef) {
                dollRefs.meshRef.material = modelRefs.materialRef;
            }
        });
        // forEach(dollNames, (dollName) => {
        //   const dollRefs = getRefs().dolls[dollName];
        //   if (dollRefs.materialRef && camsRefs[placeState.nowCamName].probeTexture) {
        //     dollRefs.materialRef.reflectionTexture =
        //       camsRefs[placeState.nowCamName].probeTexture;
        //   }
        // });
    }
    function applyProbeToAllParticleMaterials() {
        const { nowPlaceName, modelNamesLoaded } = getState().global.main;
        const placeState = getState().places[nowPlaceName];
        const { scenes } = globalRefs;
        const placeRef = placesRefs[nowPlaceName];
        const { camsRefs } = placeRef;
        // const newCamRef = camsRefs[placeState.nowCamName];
        if (scenes.main === null)
            return;
        if (scenes.backdrop === null)
            return;
        // if (!newCamRef.camera) return;
        if (!globalRefs.scenePlane)
            return;
        const particleSystemNames = Object.keys(globalRefs.solidParticleSystems);
        particleSystemNames.forEach((particleSystemName) => {
            var _a, _b, _c, _d;
            const particleSystem = globalRefs.solidParticleSystems[particleSystemName];
            const material = particleSystem.mesh.material;
            if (material &&
                material instanceof PBRMaterial &&
                camsRefs[placeState.nowCamName].probeTexture) {
                material.reflectionTexture =
                    camsRefs[placeState.nowCamName].probeTexture;
            }
            (_b = (_a = globalRefs.sceneRenderTarget) === null || _a === void 0 ? void 0 : _a.renderList) === null || _b === void 0 ? void 0 : _b.push(particleSystem.mesh);
            (_d = (_c = globalRefs.depthRenderTarget) === null || _c === void 0 ? void 0 : _c.renderList) === null || _d === void 0 ? void 0 : _d.push(particleSystem.mesh);
        });
    }
    // note adding to section vids cause its easier to follow for now? even though its not seperated
    function updateNowStuffWhenSectionChanged() {
        const { nowPlaceName, nextSegmentNameWhenVidPlays, nowSegmentName, } = getState().global.main;
        const { nextCamNameWhenVidPlays, nowCamName } = getState().places[nowPlaceName];
        const waitingForASectionToChange = nextSegmentNameWhenVidPlays || nextCamNameWhenVidPlays;
        // if no segment or camera was waiting for the sectionVid to change, return early
        if (!waitingForASectionToChange)
            return;
        const nextCamNameWhenVidPlaysSafe = nextCamNameWhenVidPlays
            ? getSafeCamName(nextCamNameWhenVidPlays)
            : null;
        const nextSegmentNameWhenVidPlaysSafe = nextSegmentNameWhenVidPlays
            ? getSafeSegmentName({
                cam: (nextCamNameWhenVidPlaysSafe !== null && nextCamNameWhenVidPlaysSafe !== void 0 ? nextCamNameWhenVidPlaysSafe : nowCamName),
                place: nowPlaceName,
                segment: nextSegmentNameWhenVidPlays,
                useStorySegmentRules: true,
            })
            : null;
        // if (sectionVidState === "play") {
        setState({
            global: {
                main: {
                    nowSegmentName: nextSegmentNameWhenVidPlaysSafe || nowSegmentName,
                    nextSegmentNameWhenVidPlays: null,
                },
            },
            places: {
                [nowPlaceName]: {
                    nowCamName: nextCamNameWhenVidPlaysSafe || nowCamName,
                    nextCamNameWhenVidPlays: null,
                },
            },
        });
        // }
    }
    return {
        getSafeCamName,
        getSafeSegmentName,
        updateTexturesForNowCamera,
        updateNowStuffWhenSectionChanged,
    };
}
