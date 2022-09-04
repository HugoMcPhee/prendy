import { Constants, Engine, PBRMaterial, RenderTargetTexture, ShaderMaterial, Texture, } from "@babylonjs/core";
import { chooseClosestBeforeItemInArray } from "chootils/dist/arrays";
import { forEach } from "chootils/dist/loops";
import { makeTyped_sceneStoryUtils } from "./scene";
import shaders from "../shaders";
import { makeTyped_getSectionVidVideo } from "./sectionVids";
import { enableCustomDepthRenderer } from "../babylonjs/enableCustomDepthRenderer/enableCustomDepthRenderer";
import { makeTyped_globalUtils } from "./global";
export function makeTyped_cameraChangeUtils(storeHelpers, prendyAssets) {
    const { getRefs, getState, setState } = storeHelpers;
    const { placeInfoByName, dollNames } = prendyAssets;
    const globalRefs = getRefs().global.main;
    const placesRefs = getRefs().places;
    const { getGlobalState } = makeTyped_globalUtils(storeHelpers);
    const getSectionVidVideo = makeTyped_getSectionVidVideo(storeHelpers);
    const { getSegmentFromStoryRules } = makeTyped_sceneStoryUtils(storeHelpers);
    function getSafeCamName(cam) {
        if (cam === null) {
            return null;
        }
        const { nowPlaceName } = getGlobalState();
        const safePlace = nowPlaceName;
        const { segmentTimesByCamera, cameraNames } = placeInfoByName[safePlace];
        // if the camera isn't in the nowPlace, then use the first camera for the nowPlace
        const safeCam = (segmentTimesByCamera === null || segmentTimesByCamera === void 0 ? void 0 : segmentTimesByCamera[cam]) ? cam : cameraNames[0];
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
            console.warn("tried to getSafeSegment name for not current place", place);
        }
        // if (segmentTimesByCamera[cam]) {
        // segmentTimesByCamera[cam]
        // }
        const camSegmentNames = Object.keys((_a = segmentTimesByCamera === null || segmentTimesByCamera === void 0 ? void 0 : segmentTimesByCamera[safeCam]) !== null && _a !== void 0 ? _a : {});
        // const camSegmentNames = [] as any;
        // disabling for now to allow getSafeSegmentName to work in video.ts (looping stuff) when changing segment?
        const foundRuleSegmentName = useStorySegmentRules ? getSegmentFromStoryRules(safePlace, safeCam) : undefined;
        // const foundRuleSegmentName = undefined;
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
        const scene = globalRefs.scene;
        const placeRef = placesRefs[nowPlaceName];
        const { camsRefs } = placeRef;
        const newCamRef = camsRefs[newCameraName];
        if (scene === null)
            return;
        if (!newCamRef.camera)
            return;
        if (!globalRefs.scenePlane)
            return;
        // Render target
        if (!globalRefs.sceneRenderTarget) {
            globalRefs.sceneRenderTarget = new RenderTargetTexture("screenShot", backdropRenderSize, scene, false, false, Constants.TEXTURETYPE_UNSIGNED_INT, false, Texture.NEAREST_SAMPLINGMODE, undefined, undefined, undefined, Engine.TEXTUREFORMAT_RGBA);
        }
        globalRefs.sceneRenderTarget.activeCamera = newCamRef.camera;
        if (!globalRefs.depthRenderer) {
            globalRefs.depthRenderer = enableCustomDepthRenderer(scene, getRefs().global.main.depthRenderSize, newCamRef.camera, false);
        }
        globalRefs.depthRenderer._camera = newCamRef.camera;
        if (!globalRefs.depthRenderTarget) {
            globalRefs.depthRenderTarget = globalRefs.depthRenderer.getDepthMap();
        }
        globalRefs.depthRenderTarget.activeCamera = newCamRef.camera;
        if (!scene.customRenderTargets.length) {
            scene.customRenderTargets = [globalRefs.sceneRenderTarget, globalRefs.depthRenderTarget];
            addMeshesToRenderLists(newCamRef);
        }
        // Plane material
        if (!globalRefs.scenePlaneMaterial) {
            globalRefs.scenePlaneMaterial = new ShaderMaterial("backdropAndDepthShader", scene, shaders.backdropAndDepth, {
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
        const scene = globalRefs.scene;
        // scene.freeActiveMeshes(); // hm? different to freezeActiveMeshes , maybe unintentional
        globalRefs.sceneRenderTarget.renderList = [];
        globalRefs.depthRenderTarget.renderList = [];
        forEach(dollNames, (dollName) => {
            const dollMeshes = getRefs().dolls[dollName].otherMeshes;
            const dollMeshNames = Object.keys(dollMeshes);
            forEach(dollMeshNames, (meshName) => {
                var _a, _b, _c, _d;
                const loopedMesh = dollMeshes[meshName];
                if (loopedMesh) {
                    loopedMesh.isInFrustum = () => true;
                    // loopedMesh.alwaysSelectAsActiveMesh = true;
                    (_b = (_a = globalRefs.sceneRenderTarget) === null || _a === void 0 ? void 0 : _a.renderList) === null || _b === void 0 ? void 0 : _b.push(loopedMesh);
                    (_d = (_c = globalRefs.depthRenderTarget) === null || _c === void 0 ? void 0 : _c.renderList) === null || _d === void 0 ? void 0 : _d.push(loopedMesh);
                }
            });
        });
        const particleSystemNames = Object.keys(globalRefs.solidParticleSystems);
        forEach(particleSystemNames, (particleSystemName) => {
            var _a, _b, _c, _d;
            const particleSystem = globalRefs.solidParticleSystems[particleSystemName];
            (_b = (_a = globalRefs.sceneRenderTarget) === null || _a === void 0 ? void 0 : _a.renderList) === null || _b === void 0 ? void 0 : _b.push(particleSystem.mesh);
            (_d = (_c = globalRefs.depthRenderTarget) === null || _c === void 0 ? void 0 : _c.renderList) === null || _d === void 0 ? void 0 : _d.push(particleSystem.mesh);
            particleSystem._camera = newCamRef.camera;
        });
        scene._skipEvaluateActiveMeshesCompletely = true;
    }
    function updateVideoTexturesForNewPlace(nowPlaceName) {
        var _a;
        if (globalRefs.backdropVideoTex) {
            const backdropVidElement = getSectionVidVideo(nowPlaceName);
            if (backdropVidElement) {
                globalRefs.backdropVideoTex.updateVid(backdropVidElement);
            }
        }
        (_a = globalRefs === null || globalRefs === void 0 ? void 0 : globalRefs.scenePlaneMaterial) === null || _a === void 0 ? void 0 : _a.setTexture("BackdropTextureSample", globalRefs.backdropVideoTex);
    }
    function applyProbeToAllDollMaterials() {
        const { nowPlaceName, modelNamesLoaded } = getState().global.main;
        const placeState = getState().places[nowPlaceName];
        const { scene } = globalRefs;
        const placeRef = placesRefs[nowPlaceName];
        const { camsRefs } = placeRef;
        // const newCamRef = camsRefs[placeState.nowCamName];
        if (scene === null)
            return;
        // if (!newCamRef.camera) return;
        if (!globalRefs.scenePlane)
            return;
        forEach(modelNamesLoaded, (modelName) => {
            const modelRefs = getRefs().models[modelName];
            // console.log("camsRefs[placeState.nowCamName].probeTexture");
            // console.log(camsRefs[placeState.nowCamName].probeTexture);
            if (modelRefs.materialRef && camsRefs[placeState.nowCamName].probeTexture) {
                modelRefs.materialRef.reflectionTexture = camsRefs[placeState.nowCamName].probeTexture;
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
                // (modelRefs.materialRef as PBRMaterial).isReadyForSubMesh = () => false;
                dollRefs.meshRef.material = modelRefs.materialRef;
                dollRefs.meshRef.material.freeze();
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
        const { scene } = globalRefs;
        const placeRef = placesRefs[nowPlaceName];
        const { camsRefs } = placeRef;
        // const newCamRef = camsRefs[placeState.nowCamName];
        if (scene === null)
            return;
        // if (!newCamRef.camera) return;
        if (!globalRefs.scenePlane)
            return;
        const particleSystemNames = Object.keys(globalRefs.solidParticleSystems);
        particleSystemNames.forEach((particleSystemName) => {
            var _a, _b, _c, _d;
            const particleSystem = globalRefs.solidParticleSystems[particleSystemName];
            const material = particleSystem.mesh.material;
            if (material && material instanceof PBRMaterial && camsRefs[placeState.nowCamName].probeTexture) {
                material.reflectionTexture = camsRefs[placeState.nowCamName].probeTexture;
            }
            (_b = (_a = globalRefs.sceneRenderTarget) === null || _a === void 0 ? void 0 : _a.renderList) === null || _b === void 0 ? void 0 : _b.push(particleSystem.mesh);
            (_d = (_c = globalRefs.depthRenderTarget) === null || _c === void 0 ? void 0 : _c.renderList) === null || _d === void 0 ? void 0 : _d.push(particleSystem.mesh);
        });
    }
    // note adding to section vids cause its easier to follow for now? even though its not seperated
    function updateNowStuffWhenSectionChanged() {
        const { nowPlaceName, nextSegmentNameWhenVidPlays, nowSegmentName } = getState().global.main;
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
