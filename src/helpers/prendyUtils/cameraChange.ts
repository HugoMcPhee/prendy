import { AbstractMesh, Effect, FxaaPostProcess, PBRMaterial, PostProcess, Scene, ShaderStore } from "@babylonjs/core";
import { chooseClosestBeforeItemInArray } from "chootils/dist/arrays";
import { forEach } from "chootils/dist/loops";
import { getRefs, getState, setState } from "repond";
import { MyTypes } from "../../declarations";
import { meta } from "../../meta";
import { DefaultCameraRefs } from "../../stores/places";
import shaders from "../shaders";
import { getGlobalState } from "./global";
import { getSegmentFromSegmentRules } from "./scene";
import { getSliceVidVideo } from "./sliceVids";
import { AnyCameraName, PlaceName, AnySegmentName, CameraNameByPlace, SegmentNameByPlace } from "../../types";

/*
  T_CameraName extends CameraNameFromPlace<T_PlaceName>,
  T_SegmentName extends SegmentNameFromCameraAndPlace<T_PlaceName, T_CameraName>
  */

export function getSafeCamName(cam: AnyCameraName): AnyCameraName;
export function getSafeCamName(cam: null): null;
export function getSafeCamName(cam: any): any {
  if (cam === null) return null;

  const { placeInfoByName } = meta.assets!;

  const { nowPlaceName } = getGlobalState();

  const safePlace = nowPlaceName;
  const { segmentTimesByCamera, cameraNames } = placeInfoByName[safePlace];

  // if the camera isn't in the nowPlace, then use the first camera for the nowPlace
  const safeCam = segmentTimesByCamera?.[cam as keyof typeof segmentTimesByCamera] ? cam : cameraNames[0];

  return safeCam;
}

export function getSafeSegmentName<
  T_PlaceName extends PlaceName,
  T_CameraName extends AnyCameraName,
  T_SegmentName extends AnySegmentName
>({
  cam,
  place,
  segment,
  useStorySegmentRules,
}: {
  place: T_PlaceName;
  cam: T_CameraName;
  segment: T_SegmentName;
  useStorySegmentRules?: boolean;
}) {
  const { placeInfoByName, dollNames } = meta.assets!;

  const { nowPlaceName } = getGlobalState();

  const safePlace = nowPlaceName;
  const { segmentNames, segmentTimesByCamera } = placeInfoByName[safePlace];

  const safeCam = getSafeCamName(cam);

  if (nowPlaceName !== place) {
    console.warn("tried to getSafeSegment name for not current place", place);
  }

  const camSegmentNames = Object.keys(segmentTimesByCamera?.[safeCam as keyof typeof segmentTimesByCamera] ?? {});

  // disabling for now to allow getSafeSegmentName to work in video.ts (looping stuff) when changing segment?
  const foundRuleSegmentName = useStorySegmentRules
    ? getSegmentFromSegmentRules(safePlace, safeCam as CameraNameByPlace[typeof safePlace])
    : undefined;

  return chooseClosestBeforeItemInArray({
    fullArray: segmentNames,
    goalItem: foundRuleSegmentName ?? segment,
    smallArray: camSegmentNames,
  });
}

// Updates both video textures and probe textures for the new cameras
export function updateTexturesForNowCamera(newCameraName: AnyCameraName, didChangePlace = false) {
  const globalRefs = getRefs().global.main;
  const placesRefs = getRefs().places;

  const { nowPlaceName } = getState().global.main;
  const scene = globalRefs.scene as Scene;

  const placeRef = placesRefs[nowPlaceName];
  const { camsRefs } = placeRef;
  const newCamRef = camsRefs[newCameraName];

  if (scene === null) return;
  if (!newCamRef.camera) return;
  // if (!scene.activeCamera) return;

  // Render target
  if (globalRefs.backdropPostProcess) scene.activeCamera?.detachPostProcess(globalRefs.backdropPostProcess);
  if (globalRefs.fxaaPostProcess) scene.activeCamera?.detachPostProcess(globalRefs.fxaaPostProcess);

  scene.activeCamera = newCamRef.camera;

  if (globalRefs.backdropPostProcess) scene.activeCamera?.attachPostProcess(globalRefs.backdropPostProcess);
  if (globalRefs.fxaaPostProcess) scene.activeCamera?.attachPostProcess(globalRefs.fxaaPostProcess);

  if (!globalRefs.depthRenderer) globalRefs.depthRenderer = scene.enableDepthRenderer(newCamRef.camera, false);

  // @ts-ignore
  globalRefs.depthRenderer._camera = newCamRef.camera;

  if (!globalRefs.depthRenderTarget) globalRefs.depthRenderTarget = globalRefs.depthRenderer.getDepthMap();

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

    globalRefs.backdropPostProcess = new PostProcess(
      "backdropAndDepthShader",
      "depthy",
      ["slatePos", "stretchSceneAmount", "stretchVideoAmount"],
      ["textureSampler", "SceneDepthTexture", "BackdropTextureSample"], // textures
      1,
      scene.activeCamera,
      // globalRefs.activeCamera
      // Texture.NEAREST_SAMPLINGMODE // sampling
      // globalRefs.scene.engine // engine,
      // Texture.BILINEAR_SAMPLINGMODE,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      "depthy"
    );
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
      const { slatePos, slatePosGoal, slateZoom } = getState().global.main;
      if (!globalRefs.backdropPostProcessEffect) {
        globalRefs.backdropPostProcessEffect = effect;

        (globalRefs?.backdropPostProcessEffect as Effect | null)?.setFloat2("slatePos", slatePosGoal.x, slatePosGoal.y);
        (globalRefs?.backdropPostProcessEffect as Effect | null)?.setFloat2("stretchSceneAmount", slateZoom, slateZoom);
        (globalRefs?.backdropPostProcessEffect as Effect | null)?.setFloat2("stretchVideoAmount", 1, 1);

        // setState({ global: { main: { timeScreenResized: Date.now() } } });
        setTimeout(() => {
          setState({ global: { main: { timeScreenResized: Date.now() } } });
        }, 10);

        updateVideoTexturesForNewPlace(nowPlaceName);
      }

      (globalRefs?.backdropPostProcessEffect as Effect | null)?.setFloat2(
        "stretchVideoAmount",
        globalRefs.stretchVideoSize.x,
        globalRefs.stretchVideoSize.y
      );
      (globalRefs?.backdropPostProcessEffect as Effect | null)?.setFloat2(
        "stretchSceneAmount",
        globalRefs.stretchSceneSize.x,
        globalRefs.stretchSceneSize.y
      );

      // const positionChanged = diffInfo.propsChangedBool.global.main.slatePos;
      // const zoomChanged = diffInfo.propsChangedBool.global.main.slateZoom;
      const positionChanged = true;
      const zoomChanged = true;

      const engine = scene?.getEngine(); // engine
      if (engine && (positionChanged || zoomChanged)) {
        const stretchVideoSize = globalRefs.stretchVideoSize;

        (globalRefs?.backdropPostProcessEffect as Effect | null)?.setFloat2(
          "slatePos",
          slatePos.x * stretchVideoSize.x,
          slatePos.y * stretchVideoSize.y
        );
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

export function addMeshesToRenderLists(newCamRef: DefaultCameraRefs) {
  const { dollNames } = meta.assets!;
  const globalRefs = getRefs().global.main;

  const scene = globalRefs.scene as Scene;

  // scene.freeActiveMeshes(); // hm? different to freezeActiveMeshes , maybe unintentional

  if (globalRefs.depthRenderTarget) globalRefs.depthRenderTarget.renderList = [];

  forEach(dollNames, (dollName) => {
    const dollMeshes = getRefs().dolls[dollName].otherMeshes;

    const dollMeshNames = Object.keys(dollMeshes);

    forEach(dollMeshNames, (meshName) => {
      const dollMesh = dollMeshes[meshName] as AbstractMesh;
      if (dollMesh) {
        dollMesh.isInFrustum = () => true;
        globalRefs.depthRenderTarget?.renderList?.push(dollMesh);
      }
    });
  });

  const particleSystemNames = Object.keys(globalRefs.solidParticleSystems);
  forEach(particleSystemNames, (particleSystemName) => {
    const particleSystem = globalRefs.solidParticleSystems[particleSystemName];
    globalRefs.depthRenderTarget?.renderList?.push(particleSystem.mesh);
    (particleSystem as any)._camera = newCamRef.camera;
  });

  // @ts-ignore
  scene._skipEvaluateActiveMeshesCompletely = true;
}

export function updateVideoTexturesForNewPlace(nowPlaceName: PlaceName) {
  const globalRefs = getRefs().global.main;

  if (globalRefs.backdropVideoTex) {
    const backdropVidElement = getSliceVidVideo(nowPlaceName as PlaceName);
    if (backdropVidElement) globalRefs.backdropVideoTex.updateVid(backdropVidElement);
  }

  updateVideoTexture();
}

export function updateVideoTexture() {
  const globalRefs = getRefs().global.main;

  globalRefs?.backdropPostProcessEffect?.setTexture("BackdropTextureSample", globalRefs.backdropVideoTex);
  globalRefs?.backdropPostProcessEffect?.setTexture("SceneDepthTexture", globalRefs.depthRenderTarget);
}

export function applyProbeToAllDollMaterials() {
  const { dollNames } = meta.assets!;
  const globalRefs = getRefs().global.main;
  const placesRefs = getRefs().places;

  const { nowPlaceName, modelNamesLoaded } = getState().global.main;
  const { nowCamName } = getState().global.main;

  const { scene } = globalRefs;
  const placeRef = placesRefs[nowPlaceName];
  const { camsRefs } = placeRef;
  const newCamRef = camsRefs[nowCamName];

  if (scene === null) return;

  forEach(modelNamesLoaded, (modelName: any & string) => {
    const modelRefs = getRefs().models[modelName];

    if (modelRefs.materialRef && newCamRef.probeTexture) {
      modelRefs.materialRef.reflectionTexture = newCamRef.probeTexture;
    }
  });

  // // looks like the dolls material doesn't automatically update with the models material
  // // so setting it here works :)
  forEach(dollNames, (dollName) => {
    const dollRefs = getRefs().dolls[dollName];
    const { modelName } = getState().dolls[dollName];
    const modelRefs = getRefs().models[modelName];

    if (dollRefs.meshRef) {
      dollRefs.meshRef.material = modelRefs.materialRef;
      dollRefs.meshRef.material?.freeze();
    }
  });
}

export function applyProbeToAllParticleMaterials() {
  const globalRefs = getRefs().global.main;
  const placesRefs = getRefs().places;

  const { nowPlaceName } = getState().global.main;
  const { nowCamName } = getState().global.main;
  const { scene } = globalRefs;
  const placeRef = placesRefs[nowPlaceName];
  const { camsRefs } = placeRef;
  const newCamRef = camsRefs[nowCamName];
  if (scene === null) return;

  const particleSystemNames = Object.keys(globalRefs.solidParticleSystems);
  particleSystemNames.forEach((particleSystemName) => {
    const particleSystem = globalRefs.solidParticleSystems[particleSystemName];
    const material = particleSystem.mesh.material;
    if (material && material instanceof PBRMaterial && newCamRef.probeTexture) {
      material.reflectionTexture = newCamRef.probeTexture;
    }

    globalRefs.depthRenderTarget?.renderList?.push(particleSystem.mesh);
  });
}

// note adding to slice vids cause its easier to follow for now? even though it's not seperated
export function updateNowStuffWhenSliceChanged() {
  // I think everything is a 'goal' state , and this function swaps them all to 'now' states at once

  const { nowPlaceName, goalSegmentNameWhenVidPlays, nowSegmentName } = getState().global.main;
  const { goalCamNameWhenVidPlays, nowCamName } = getState().global.main;

  const waitingForASliceToChange = goalSegmentNameWhenVidPlays || goalCamNameWhenVidPlays;

  // if no segment or camera was waiting for the sliceVid to change, return early
  if (!waitingForASliceToChange) return;

  const goalCamNameWhenVidPlaysSafe = goalCamNameWhenVidPlays
    ? getSafeCamName(goalCamNameWhenVidPlays as AnyCameraName)
    : null;
  const goalSegmentNameWhenVidPlaysSafe = goalSegmentNameWhenVidPlays
    ? getSafeSegmentName({
        cam: (goalCamNameWhenVidPlaysSafe ?? nowCamName) as CameraNameByPlace[PlaceName] & AnyCameraName,
        place: nowPlaceName as PlaceName,
        segment: goalSegmentNameWhenVidPlays as SegmentNameByPlace[PlaceName],
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
