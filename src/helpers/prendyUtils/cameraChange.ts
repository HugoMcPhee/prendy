import { AbstractMesh, Effect, FxaaPostProcess, PBRMaterial, PostProcess, Scene, ShaderStore } from "@babylonjs/core";
import { chooseClosestBeforeItemInArray } from "chootils/dist/arrays";
import { forEach } from "chootils/dist/loops";
import { getRefs, getState, onNextTick, setState } from "repond";
import { MyTypes } from "../../declarations";
import { meta } from "../../meta";
import { DefaultCameraRefs } from "../../stores/places";
import shaders from "../shaders";
import { getGlobalState } from "./global";
import { getSegmentFromSegmentRules } from "./scene";
import { AnyCameraName, PlaceName, AnySegmentName, CameraNameByPlace, SegmentNameByPlace } from "../../types";
import { focusSlateOnFocusedDoll } from "../../helpers/babylonjs/slate";
import { getNowBackdropFrameInfo } from "../../helpers/prendyUtils/backdrops";

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
  const { segmentNamesByCamera, cameraNames } = placeInfoByName[safePlace];

  // if the camera isn't in the nowPlace, then use the first camera for the nowPlace
  const safeCam = segmentNamesByCamera?.[cam as keyof typeof segmentNamesByCamera] ? cam : cameraNames[0];

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
  const { segmentNames, segmentNamesByCamera } = placeInfoByName[safePlace];

  const safeCam = getSafeCamName(cam);

  if (nowPlaceName !== place) {
    console.warn("tried to getSafeSegment name for not current place", place);
  }

  const camSegmentNames = segmentNamesByCamera?.[safeCam as keyof typeof segmentNamesByCamera] ?? {};

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

// Updates both backdrop textures and probe textures for the new cameras
export function updateTexturesForNowCamera(newCameraName: AnyCameraName, didChangePlace = false) {
  focusSlateOnFocusedDoll("instant");

  const globalRefs = getRefs().global.main;
  const placesRefs = getRefs().places;

  const { nowPlaceName, nowSegmentName } = getState().global.main;
  const scene = globalRefs.scene as Scene;

  const placeRef = placesRefs[nowPlaceName];
  const { camsRefs } = placeRef;
  const newCamRef = camsRefs[newCameraName];

  if (scene === null) return;
  if (!newCamRef.camera) return;

  // Render target
  if (globalRefs.backdropPostProcess) scene.activeCamera?.detachPostProcess(globalRefs.backdropPostProcess);
  if (globalRefs.fxaaPostProcess) scene.activeCamera?.detachPostProcess(globalRefs.fxaaPostProcess);

  scene.activeCamera = newCamRef.camera;

  if (globalRefs.backdropPostProcess) scene.activeCamera?.attachPostProcess(globalRefs.backdropPostProcess);
  if (globalRefs.fxaaPostProcess) scene.activeCamera?.attachPostProcess(globalRefs.fxaaPostProcess);

  // Create the depth renderer
  if (!globalRefs.depthRenderer) globalRefs.depthRenderer = scene.enableDepthRenderer(newCamRef.camera, false);
  // Update the depth renderer camera, without disposing it
  // @ts-ignore
  globalRefs.depthRenderer._camera = newCamRef.camera;

  // Create the depth render target
  if (!globalRefs.depthRenderTarget) globalRefs.depthRenderTarget = globalRefs.depthRenderer.getDepthMap();
  // Update the depth render target camera
  globalRefs.depthRenderTarget.activeCamera = newCamRef.camera;

  if (!scene.customRenderTargets.length) {
    scene.customRenderTargets = [globalRefs.depthRenderTarget];
    addMeshesToRenderLists(newCamRef);
  }

  if (scene.activeCamera && !globalRefs.backdropPostProcess) {
    ShaderStore.ShadersStore["depthyPixelShader"] = shaders.backdropAndDepth.backdropFragment;
    ShaderStore.ShadersStore["depthyVertexShader"] = shaders.backdropAndDepth.backdropVertex;

    globalRefs.backdropPostProcess = new PostProcess(
      "backdropAndDepthShader",
      "depthy",
      [
        "slatePos",
        "stretchSceneAmount",
        "stretchVideoAmount",
        "currentFrameIndex",
        "framesPerRow",
        "framesPerColumn",
        "frameSize",
      ],
      [
        "textureSampler",
        "SceneDepthTexture",
        "BackdropTextureSample",
        "BackdropColorTextureSample",
        "BackdropDepthTextureSample",
      ], // textures
      1,
      scene.activeCamera,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      "depthy"
    );

    updateVideoTexture();
    // focusSlateOnFocusedDoll("instant");

    // NOTE this is only needed for the first time the camera loads, it should probably be somewhere else
    setTimeout(() => {
      setState({ global: { main: { timeScreenResized: Date.now() } } });
    }, 10);
  }

  // Set the onApply for the post process
  if (!globalRefs.backdropPostProcess.onApply) {
    globalRefs.backdropPostProcess.onApply = (effect) => {
      let newCamera = getState().global.main.nowCamName;
      let camRef = placesRefs[nowPlaceName].camsRefs[newCamera];

      // TODO move this to calcuate once when changing camera/segment, and save it in global refs or state

      const { frameSize, framesPerColumn, framesPerRow, nowTextureIndex, backdropFrameForNowTexture } =
        getNowBackdropFrameInfo(newCamera);

      updateVideoTexture();

      const { slatePos, slatePosGoal, slateZoom } = getState().global.main;

      // There can be multiple atlas textures, so we need to calculate the correct frame for the current texture
      // And also which texture should be used, based on the current frame and the max frames per texture

      // update the active texture

      if (!globalRefs.backdropPostProcessEffect) {
        globalRefs.backdropPostProcessEffect = effect;

        effect.setFloat2("slatePos", slatePosGoal.x, slatePosGoal.y);
        effect.setFloat2("stretchSceneAmount", slateZoom, slateZoom);
        effect.setFloat2("stretchVideoAmount", 1, 1);
      }
      effect.setFloat("currentFrameIndex", backdropFrameForNowTexture);
      effect.setFloat("framesPerRow", framesPerRow);
      effect.setFloat("framesPerColumn", framesPerColumn);
      effect.setVector2("frameSize", frameSize);

      globalRefs.backdropTex = camRef.backdropTexturesBySegment[nowSegmentName][nowTextureIndex].color;
      globalRefs.backdropTexDepth = camRef.backdropTexturesBySegment[nowSegmentName][nowTextureIndex].depth;
      globalRefs?.backdropPostProcessEffect?.setTexture("BackdropColorTextureSample", globalRefs.backdropTex);
      globalRefs?.backdropPostProcessEffect?.setTexture("BackdropDepthTextureSample", globalRefs.backdropTexDepth);

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
    };
  }

  // Make the FXAA post process
  if (scene.activeCamera && !globalRefs.fxaaPostProcess) {
    globalRefs.fxaaPostProcess = new FxaaPostProcess("fxaa", 1.0, scene.activeCamera);
  }

  if (didChangePlace) {
    addMeshesToRenderLists(newCamRef);
    updateVideoTexture();
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

export function updateVideoTexture() {
  const globalRefs = getRefs().global.main;

  globalRefs?.backdropPostProcessEffect?.setTexture("BackdropColorTextureSample", globalRefs.backdropTex);
  globalRefs?.backdropPostProcessEffect?.setTexture("BackdropDepthTextureSample", globalRefs.backdropTexDepth);
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
