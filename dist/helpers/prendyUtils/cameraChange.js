import { FxaaPostProcess, PBRMaterial, PostProcess, ShaderStore, } from "@babylonjs/core";
import { chooseClosestBeforeItemInArray } from "chootils/dist/arrays";
import { forEach } from "chootils/dist/loops";
import shaders from "../shaders";
import { get_globalUtils } from "./global";
import { get_sceneStoryUtils } from "./scene";
import { get_getSectionVidVideo } from "./sectionVids";
export function get_cameraChangeUtils(storeHelpers, prendyOptions, prendyAssets) {
    const { getRefs, getState, setState } = storeHelpers;
    const { placeInfoByName, dollNames } = prendyAssets;
    const globalRefs = getRefs().global.main;
    const placesRefs = getRefs().places;
    const { getGlobalState } = get_globalUtils(storeHelpers);
    const getSectionVidVideo = get_getSectionVidVideo(storeHelpers);
    const { getSegmentFromStoryRules } = get_sceneStoryUtils(storeHelpers);
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
        console.log("updateTexturesForNowCamera");
        const { nowPlaceName } = getState().global.main;
        const scene = globalRefs.scene;
        const placeRef = placesRefs[nowPlaceName];
        const { camsRefs } = placeRef;
        const newCamRef = camsRefs[newCameraName];
        if (scene === null)
            return;
        if (!newCamRef.camera)
            return;
        // Render target
        if (globalRefs.backdropPostProcess) {
            globalRefs.scene.activeCamera.detachPostProcess(globalRefs.backdropPostProcess);
        }
        if (globalRefs.fxaaPostProcess) {
            globalRefs.scene.activeCamera.detachPostProcess(globalRefs.fxaaPostProcess);
        }
        globalRefs.scene.activeCamera = newCamRef.camera;
        if (globalRefs.backdropPostProcess) {
            globalRefs.scene.activeCamera.attachPostProcess(globalRefs.backdropPostProcess);
        }
        if (globalRefs.fxaaPostProcess) {
            globalRefs.scene.activeCamera.attachPostProcess(globalRefs.fxaaPostProcess);
        }
        // console.log("newCamRef.camera");
        // newCamRef.camera.maxZ = 1000;
        // console.log(newCamRef.camera.maxZ);
        if (!globalRefs.depthRenderer) {
            console.log("making new depth renderer");
            globalRefs.depthRenderer = scene.enableDepthRenderer(newCamRef.camera, false);
        }
        globalRefs.depthRenderer._camera = newCamRef.camera;
        if (!globalRefs.depthRenderTarget) {
            globalRefs.depthRenderTarget = globalRefs.depthRenderer.getDepthMap();
            // globalRefs.depthRenderTarget?.resize({ width: 1280, height: 720 });
        }
        globalRefs.depthRenderTarget.activeCamera = newCamRef.camera;
        if (!scene.customRenderTargets.length) {
            scene.customRenderTargets = [globalRefs.depthRenderTarget];
            addMeshesToRenderLists(newCamRef);
        }
        if (globalRefs.scene.activeCamera && !globalRefs.backdropPostProcess) {
            ShaderStore.ShadersStore["depthyPixelShader"] = shaders.backdropAndDepth.backdropFragment;
            ShaderStore.ShadersStore["depthyVertexShader"] = shaders.backdropAndDepth.backdropVertex;
            // ShaderStore.ShadersStore["translatedFxaaPixelShader"] = shaders.translatedFxaa.translatedFxaaFragment;
            // ShaderStore.ShadersStore["translatedFxaaVertexShader"] = shaders.translatedFxaa.translatedFxaaVertex;
            globalRefs.backdropPostProcess = new PostProcess("backdropAndDepthShader", "depthy", ["planePos", "stretchSceneAmount", "stretchVideoAmount"], ["textureSampler", "SceneDepthTexture", "BackdropTextureSample"], // textures
            1, globalRefs.scene.activeCamera, 
            // globalRefs.activeCamera
            // Texture.NEAREST_SAMPLINGMODE // sampling
            // globalRefs.scene.engine // engine,
            // Texture.BILINEAR_SAMPLINGMODE,
            undefined, undefined, undefined, undefined, undefined, "depthy");
            // setTimeout(() => {
            //   globalRefs.backdropPostProcess = new PostProcess(
            //     "backdropAndDepthShader",
            //     "translatedFxaa",
            //     null, // ["planePos", "stretchSceneAmount", "stretchVideoAmount"],
            //     null, //["textureSampler", "SceneDepthTexture", "BackdropTextureSample"], // textures
            //     1,
            //     globalRefs.scene.activeCamera,
            //     // globalRefs.activeCamera
            //     // Texture.NEAREST_SAMPLINGMODE // sampling
            //     // globalRefs.scene.engine // engine,
            //     undefined,
            //     undefined,
            //     undefined,
            //     undefined,
            //     undefined,
            //     "translatedFxaa"
            //   );
            // }, 4000);
            // const fxaaPP = new FxaaPostProcess("fxaa", 1.0, globalRefs.scene.activeCamera);
            // fxaaPP.
            // // const appliedProcess = postProcess.apply();
            globalRefs.backdropPostProcess.onApply = (effect) => {
                var _a, _b, _c, _d, _e, _f;
                const { planePos, planePosGoal, planeZoom } = getState().global.main;
                if (!globalRefs.backdropPostProcessEffect) {
                    globalRefs.backdropPostProcessEffect = effect;
                    console.log("reapplying");
                    (_a = globalRefs === null || globalRefs === void 0 ? void 0 : globalRefs.backdropPostProcessEffect) === null || _a === void 0 ? void 0 : _a.setFloat2("planePos", planePosGoal.x, planePosGoal.y);
                    (_b = globalRefs === null || globalRefs === void 0 ? void 0 : globalRefs.backdropPostProcessEffect) === null || _b === void 0 ? void 0 : _b.setFloat2("stretchSceneAmount", planeZoom, planeZoom);
                    (_c = globalRefs === null || globalRefs === void 0 ? void 0 : globalRefs.backdropPostProcessEffect) === null || _c === void 0 ? void 0 : _c.setFloat2("stretchVideoAmount", 1, 1);
                    // setState({ global: { main: { timeScreenResized: Date.now() } } });
                    setTimeout(() => {
                        console.log("resizing");
                        setState({ global: { main: { timeScreenResized: Date.now() } } });
                    }, 10);
                    updateVideoTexturesForNewPlace(nowPlaceName);
                }
                (_d = globalRefs === null || globalRefs === void 0 ? void 0 : globalRefs.backdropPostProcessEffect) === null || _d === void 0 ? void 0 : _d.setFloat2("stretchVideoAmount", globalRefs.stretchVideoSize.x, globalRefs.stretchVideoSize.y);
                (_e = globalRefs === null || globalRefs === void 0 ? void 0 : globalRefs.backdropPostProcessEffect) === null || _e === void 0 ? void 0 : _e.setFloat2("stretchSceneAmount", globalRefs.stretchSceneSize.x, globalRefs.stretchSceneSize.y);
                // const positionChanged = diffInfo.propsChangedBool.global.main.planePos;
                // const zoomChanged = diffInfo.propsChangedBool.global.main.planeZoom;
                const positionChanged = true;
                const zoomChanged = true;
                const engine = scene === null || scene === void 0 ? void 0 : scene.getEngine(); // engine
                if (engine && (positionChanged || zoomChanged)) {
                    const stretchVideoSize = globalRefs.stretchVideoSize;
                    (_f = globalRefs === null || globalRefs === void 0 ? void 0 : globalRefs.backdropPostProcessEffect) === null || _f === void 0 ? void 0 : _f.setFloat2("planePos", planePos.x * stretchVideoSize.x, planePos.y * stretchVideoSize.y);
                }
                updateVideoTexture();
            };
        }
        if (globalRefs.scene.activeCamera && !globalRefs.fxaaPostProcess) {
            globalRefs.fxaaPostProcess = new FxaaPostProcess("fxaa", 1.0, globalRefs.scene.activeCamera);
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
        globalRefs.depthRenderTarget.renderList = [];
        forEach(dollNames, (dollName) => {
            const dollMeshes = getRefs().dolls[dollName].otherMeshes;
            const dollMeshNames = Object.keys(dollMeshes);
            forEach(dollMeshNames, (meshName) => {
                var _a, _b;
                const loopedMesh = dollMeshes[meshName];
                if (loopedMesh) {
                    loopedMesh.isInFrustum = () => true;
                    // loopedMesh.alwaysSelectAsActiveMesh = true;
                    (_b = (_a = globalRefs.depthRenderTarget) === null || _a === void 0 ? void 0 : _a.renderList) === null || _b === void 0 ? void 0 : _b.push(loopedMesh);
                }
            });
        });
        const particleSystemNames = Object.keys(globalRefs.solidParticleSystems);
        forEach(particleSystemNames, (particleSystemName) => {
            var _a, _b;
            const particleSystem = globalRefs.solidParticleSystems[particleSystemName];
            (_b = (_a = globalRefs.depthRenderTarget) === null || _a === void 0 ? void 0 : _a.renderList) === null || _b === void 0 ? void 0 : _b.push(particleSystem.mesh);
            particleSystem._camera = newCamRef.camera;
        });
        scene._skipEvaluateActiveMeshesCompletely = true;
    }
    function updateVideoTexturesForNewPlace(nowPlaceName) {
        if (globalRefs.backdropVideoTex) {
            const backdropVidElement = getSectionVidVideo(nowPlaceName);
            if (backdropVidElement)
                globalRefs.backdropVideoTex.updateVid(backdropVidElement);
        }
        updateVideoTexture();
    }
    function updateVideoTexture() {
        var _a, _b;
        // if (Math.random() > 0.7) {
        (_a = globalRefs === null || globalRefs === void 0 ? void 0 : globalRefs.backdropPostProcessEffect) === null || _a === void 0 ? void 0 : _a.setTexture("BackdropTextureSample", globalRefs.backdropVideoTex);
        // }
        (_b = globalRefs === null || globalRefs === void 0 ? void 0 : globalRefs.backdropPostProcessEffect) === null || _b === void 0 ? void 0 : _b.setTexture("SceneDepthTexture", globalRefs.depthRenderTarget);
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
        forEach(modelNamesLoaded, (modelName) => {
            const modelRefs = getRefs().models[modelName];
            if (modelRefs.materialRef && camsRefs[placeState.nowCamName].probeTexture) {
                modelRefs.materialRef.reflectionTexture = camsRefs[placeState.nowCamName].probeTexture;
            }
        });
        //
        // // looks like the dolls material doesn't automatically update with the models material
        // // so setting it here works :)
        forEach(dollNames, (dollName) => {
            const dollRefs = getRefs().dolls[dollName];
            const { modelName } = getState().dolls[dollName];
            const modelRefs = getRefs().models[modelName];
            if (dollRefs.meshRef) {
                // (modelRefs.materialRef as PBRMaterial).isReadyForSubMesh = () => false;
                dollRefs.meshRef.material = modelRefs.materialRef;
                dollRefs.meshRef.material.freeze();
            }
        });
    }
    function applyProbeToAllParticleMaterials() {
        const { nowPlaceName } = getState().global.main;
        const placeState = getState().places[nowPlaceName];
        const { scene } = globalRefs;
        const placeRef = placesRefs[nowPlaceName];
        const { camsRefs } = placeRef;
        // const newCamRef = camsRefs[placeState.nowCamName];
        if (scene === null)
            return;
        const particleSystemNames = Object.keys(globalRefs.solidParticleSystems);
        particleSystemNames.forEach((particleSystemName) => {
            var _a, _b;
            const particleSystem = globalRefs.solidParticleSystems[particleSystemName];
            const material = particleSystem.mesh.material;
            if (material && material instanceof PBRMaterial && camsRefs[placeState.nowCamName].probeTexture) {
                material.reflectionTexture = camsRefs[placeState.nowCamName].probeTexture;
            }
            (_b = (_a = globalRefs.depthRenderTarget) === null || _a === void 0 ? void 0 : _a.renderList) === null || _b === void 0 ? void 0 : _b.push(particleSystem.mesh);
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
