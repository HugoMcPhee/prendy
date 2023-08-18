import { FxaaPostProcess, PBRMaterial, PostProcess, ShaderStore } from "@babylonjs/core";
import { chooseClosestBeforeItemInArray } from "chootils/dist/arrays";
import { forEach } from "chootils/dist/loops";
import shaders from "../shaders";
import { get_globalUtils } from "./global";
import { get_sceneStoryUtils } from "./scene";
import { get_getSliceVidVideo } from "./sliceVids";
export function get_cameraChangeUtils(prendyAssets, storeHelpers) {
    const { getRefs, getState, setState } = storeHelpers;
    const { placeInfoByName, dollNames } = prendyAssets;
    const globalRefs = getRefs().global.main;
    const placesRefs = getRefs().places;
    const { getGlobalState } = get_globalUtils(storeHelpers);
    const getSliceVidVideo = get_getSliceVidVideo(storeHelpers);
    const { getSegmentFromStoryRules } = get_sceneStoryUtils(storeHelpers);
    function getSafeCamName(cam) {
        if (cam === null)
            return null;
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
        const safeCam = getSafeCamName(cam);
        if (nowPlaceName !== place) {
            console.warn("tried to getSafeSegment name for not current place", place);
        }
        const camSegmentNames = Object.keys((_a = segmentTimesByCamera === null || segmentTimesByCamera === void 0 ? void 0 : segmentTimesByCamera[safeCam]) !== null && _a !== void 0 ? _a : {});
        // disabling for now to allow getSafeSegmentName to work in video.ts (looping stuff) when changing segment?
        const foundRuleSegmentName = useStorySegmentRules
            ? getSegmentFromStoryRules(safePlace, safeCam)
            : undefined;
        return chooseClosestBeforeItemInArray({
            fullArray: segmentNames,
            goalItem: foundRuleSegmentName !== null && foundRuleSegmentName !== void 0 ? foundRuleSegmentName : segment,
            smallArray: camSegmentNames,
        });
    }
    // Updates both video textures and probe textures for the new cameras
    function updateTexturesForNowCamera(newCameraName, didChangePlace = false) {
        var _a, _b, _c, _d;
        const { nowPlaceName } = getState().global.main;
        const scene = globalRefs.scene;
        const placeRef = placesRefs[nowPlaceName];
        const { camsRefs } = placeRef;
        const newCamRef = camsRefs[newCameraName];
        if (scene === null)
            return;
        if (!newCamRef.camera)
            return;
        // if (!scene.activeCamera) return;
        // Render target
        if (globalRefs.backdropPostProcess)
            (_a = scene.activeCamera) === null || _a === void 0 ? void 0 : _a.detachPostProcess(globalRefs.backdropPostProcess);
        if (globalRefs.fxaaPostProcess)
            (_b = scene.activeCamera) === null || _b === void 0 ? void 0 : _b.detachPostProcess(globalRefs.fxaaPostProcess);
        scene.activeCamera = newCamRef.camera;
        if (globalRefs.backdropPostProcess)
            (_c = scene.activeCamera) === null || _c === void 0 ? void 0 : _c.attachPostProcess(globalRefs.backdropPostProcess);
        if (globalRefs.fxaaPostProcess)
            (_d = scene.activeCamera) === null || _d === void 0 ? void 0 : _d.attachPostProcess(globalRefs.fxaaPostProcess);
        if (!globalRefs.depthRenderer)
            globalRefs.depthRenderer = scene.enableDepthRenderer(newCamRef.camera, false);
        // @ts-ignore
        globalRefs.depthRenderer._camera = newCamRef.camera;
        if (!globalRefs.depthRenderTarget)
            globalRefs.depthRenderTarget = globalRefs.depthRenderer.getDepthMap();
        globalRefs.depthRenderTarget.activeCamera = newCamRef.camera;
        if (!scene.customRenderTargets.length) {
            scene.customRenderTargets = [globalRefs.depthRenderTarget];
            addMeshesToRenderLists(newCamRef);
        }
        if (scene.activeCamera && !globalRefs.backdropPostProcess) {
            // const shaderStore = ShaderStore.GetShadersStore();
            // shaderStore["depthyPixelShader"] = shaders.backdropAndDepth.backdropFragment;
            // shaderStore["depthyVertexShader"] = shaders.backdropAndDepth.backdropVertex;
            // console.log("shaderStore", shaderStore);
            // console.log("ShaderStore.ShadersStore", ShaderStore.ShadersStore);
            ShaderStore.ShadersStore["depthyPixelShader"] = shaders.backdropAndDepth.backdropFragment;
            ShaderStore.ShadersStore["depthyVertexShader"] = shaders.backdropAndDepth.backdropVertex;
            // ShaderStore.ShadersStore["translatedFxaaPixelShader"] = shaders.translatedFxaa.translatedFxaaFragment;
            // ShaderStore.ShadersStore["translatedFxaaVertexShader"] = shaders.translatedFxaa.translatedFxaaVertex;
            globalRefs.backdropPostProcess = new PostProcess("backdropAndDepthShader", "depthy", ["slatePos", "stretchSceneAmount", "stretchVideoAmount"], ["textureSampler", "SceneDepthTexture", "BackdropTextureSample"], // textures
            1, scene.activeCamera, 
            // globalRefs.activeCamera
            // Texture.NEAREST_SAMPLINGMODE // sampling
            // globalRefs.scene.engine // engine,
            // Texture.BILINEAR_SAMPLINGMODE,
            undefined, undefined, undefined, undefined, undefined, "depthy");
            // setTimeout(() => {
            //   globalRefs.backdropPostProcess = new PostProcess(
            //     "backdropAndDepthShader",
            //     "translatedFxaa",
            //     null, // ["slatePos", "stretchSceneAmount", "stretchVideoAmount"],
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
                const { slatePos, slatePosGoal, slateZoom } = getState().global.main;
                if (!globalRefs.backdropPostProcessEffect) {
                    globalRefs.backdropPostProcessEffect = effect;
                    (_a = globalRefs === null || globalRefs === void 0 ? void 0 : globalRefs.backdropPostProcessEffect) === null || _a === void 0 ? void 0 : _a.setFloat2("slatePos", slatePosGoal.x, slatePosGoal.y);
                    (_b = globalRefs === null || globalRefs === void 0 ? void 0 : globalRefs.backdropPostProcessEffect) === null || _b === void 0 ? void 0 : _b.setFloat2("stretchSceneAmount", slateZoom, slateZoom);
                    (_c = globalRefs === null || globalRefs === void 0 ? void 0 : globalRefs.backdropPostProcessEffect) === null || _c === void 0 ? void 0 : _c.setFloat2("stretchVideoAmount", 1, 1);
                    // setState({ global: { main: { timeScreenResized: Date.now() } } });
                    setTimeout(() => {
                        setState({ global: { main: { timeScreenResized: Date.now() } } });
                    }, 10);
                    updateVideoTexturesForNewPlace(nowPlaceName);
                }
                (_d = globalRefs === null || globalRefs === void 0 ? void 0 : globalRefs.backdropPostProcessEffect) === null || _d === void 0 ? void 0 : _d.setFloat2("stretchVideoAmount", globalRefs.stretchVideoSize.x, globalRefs.stretchVideoSize.y);
                (_e = globalRefs === null || globalRefs === void 0 ? void 0 : globalRefs.backdropPostProcessEffect) === null || _e === void 0 ? void 0 : _e.setFloat2("stretchSceneAmount", globalRefs.stretchSceneSize.x, globalRefs.stretchSceneSize.y);
                // const positionChanged = diffInfo.propsChangedBool.global.main.slatePos;
                // const zoomChanged = diffInfo.propsChangedBool.global.main.slateZoom;
                const positionChanged = true;
                const zoomChanged = true;
                const engine = scene === null || scene === void 0 ? void 0 : scene.getEngine(); // engine
                if (engine && (positionChanged || zoomChanged)) {
                    const stretchVideoSize = globalRefs.stretchVideoSize;
                    (_f = globalRefs === null || globalRefs === void 0 ? void 0 : globalRefs.backdropPostProcessEffect) === null || _f === void 0 ? void 0 : _f.setFloat2("slatePos", slatePos.x * stretchVideoSize.x, slatePos.y * stretchVideoSize.y);
                }
                updateVideoTexture();
            };
        }
        if (scene.activeCamera && !globalRefs.fxaaPostProcess) {
            globalRefs.fxaaPostProcess = new FxaaPostProcess("fxaa", 1.0, scene.activeCamera);
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
        if (globalRefs.depthRenderTarget)
            globalRefs.depthRenderTarget.renderList = [];
        forEach(dollNames, (dollName) => {
            const dollMeshes = getRefs().dolls[dollName].otherMeshes;
            const dollMeshNames = Object.keys(dollMeshes);
            forEach(dollMeshNames, (meshName) => {
                var _a, _b;
                const dollMesh = dollMeshes[meshName];
                if (dollMesh) {
                    dollMesh.isInFrustum = () => true;
                    (_b = (_a = globalRefs.depthRenderTarget) === null || _a === void 0 ? void 0 : _a.renderList) === null || _b === void 0 ? void 0 : _b.push(dollMesh);
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
        // @ts-ignore
        scene._skipEvaluateActiveMeshesCompletely = true;
    }
    function updateVideoTexturesForNewPlace(nowPlaceName) {
        if (globalRefs.backdropVideoTex) {
            const backdropVidElement = getSliceVidVideo(nowPlaceName);
            if (backdropVidElement)
                globalRefs.backdropVideoTex.updateVid(backdropVidElement);
        }
        updateVideoTexture();
    }
    function updateVideoTexture() {
        var _a, _b;
        (_a = globalRefs === null || globalRefs === void 0 ? void 0 : globalRefs.backdropPostProcessEffect) === null || _a === void 0 ? void 0 : _a.setTexture("BackdropTextureSample", globalRefs.backdropVideoTex);
        (_b = globalRefs === null || globalRefs === void 0 ? void 0 : globalRefs.backdropPostProcessEffect) === null || _b === void 0 ? void 0 : _b.setTexture("SceneDepthTexture", globalRefs.depthRenderTarget);
    }
    function applyProbeToAllDollMaterials() {
        const { nowPlaceName, modelNamesLoaded } = getState().global.main;
        const { nowCamName } = getState().global.main;
        const { scene } = globalRefs;
        const placeRef = placesRefs[nowPlaceName];
        const { camsRefs } = placeRef;
        const newCamRef = camsRefs[nowCamName];
        if (scene === null)
            return;
        forEach(modelNamesLoaded, (modelName) => {
            const modelRefs = getRefs().models[modelName];
            if (modelRefs.materialRef && newCamRef.probeTexture) {
                modelRefs.materialRef.reflectionTexture = newCamRef.probeTexture;
            }
        });
        // // looks like the dolls material doesn't automatically update with the models material
        // // so setting it here works :)
        forEach(dollNames, (dollName) => {
            var _a;
            const dollRefs = getRefs().dolls[dollName];
            const { modelName } = getState().dolls[dollName];
            const modelRefs = getRefs().models[modelName];
            if (dollRefs.meshRef) {
                dollRefs.meshRef.material = modelRefs.materialRef;
                (_a = dollRefs.meshRef.material) === null || _a === void 0 ? void 0 : _a.freeze();
            }
        });
    }
    function applyProbeToAllParticleMaterials() {
        const { nowPlaceName } = getState().global.main;
        const { nowCamName } = getState().global.main;
        const { scene } = globalRefs;
        const placeRef = placesRefs[nowPlaceName];
        const { camsRefs } = placeRef;
        const newCamRef = camsRefs[nowCamName];
        if (scene === null)
            return;
        const particleSystemNames = Object.keys(globalRefs.solidParticleSystems);
        particleSystemNames.forEach((particleSystemName) => {
            var _a, _b;
            const particleSystem = globalRefs.solidParticleSystems[particleSystemName];
            const material = particleSystem.mesh.material;
            if (material && material instanceof PBRMaterial && newCamRef.probeTexture) {
                material.reflectionTexture = newCamRef.probeTexture;
            }
            (_b = (_a = globalRefs.depthRenderTarget) === null || _a === void 0 ? void 0 : _a.renderList) === null || _b === void 0 ? void 0 : _b.push(particleSystem.mesh);
        });
    }
    // note adding to slice vids cause its easier to follow for now? even though it's not seperated
    function updateNowStuffWhenSliceChanged() {
        // I think everything is a 'goal' state , and this function swaps them all to 'now' states at once
        const { nowPlaceName, goalSegmentNameWhenVidPlays, nowSegmentName } = getState().global.main;
        const { goalCamNameWhenVidPlays, nowCamName } = getState().global.main;
        const waitingForASliceToChange = goalSegmentNameWhenVidPlays || goalCamNameWhenVidPlays;
        // if no segment or camera was waiting for the sliceVid to change, return early
        if (!waitingForASliceToChange)
            return;
        const goalCamNameWhenVidPlaysSafe = goalCamNameWhenVidPlays
            ? getSafeCamName(goalCamNameWhenVidPlays)
            : null;
        const goalSegmentNameWhenVidPlaysSafe = goalSegmentNameWhenVidPlays
            ? getSafeSegmentName({
                cam: (goalCamNameWhenVidPlaysSafe !== null && goalCamNameWhenVidPlaysSafe !== void 0 ? goalCamNameWhenVidPlaysSafe : nowCamName),
                place: nowPlaceName,
                segment: goalSegmentNameWhenVidPlays,
                useStorySegmentRules: true,
            })
            : null;
        setState({
            global: {
                main: {
                    nowSegmentName: goalSegmentNameWhenVidPlaysSafe || nowSegmentName,
                    goalSegmentNameWhenVidPlays: null,
                    nowCamName: goalCamNameWhenVidPlaysSafe || nowCamName,
                    goalCamNameWhenVidPlays: null,
                },
            },
        });
        // }
    }
    return {
        getSafeCamName,
        getSafeSegmentName,
        updateTexturesForNowCamera,
        updateNowStuffWhenSliceChanged,
    };
}
