import {
  AbstractMesh,
  Camera,
  Effect,
  FxaaPostProcess,
  PBRMaterial,
  PostProcess,
  Scene,
  ShaderStore,
} from "@babylonjs/core";
import { chooseClosestBeforeItemInArray } from "chootils/dist/arrays";
import { forEach } from "chootils/dist/loops";
import {
  AnyCameraName,
  AnySegmentName,
  CameraNameByPlace,
  PlaceName,
  PrendyAssets,
  SegmentNameByPlace,
} from "../../declarations";
import { DefaultCameraRefs } from "../../stores/places";
import { PrendyOptionsUntyped, PrendyStoreHelpers } from "../../stores/typedStoreHelpers";
import { get_scenePlaneUtils } from "../babylonjs/scenePlane";
import shaders from "../shaders";
import { get_globalUtils } from "./global";
import { get_sceneStoryUtils } from "./scene";
import { get_getSectionVidVideo } from "./sectionVids";

export function get_cameraChangeUtils<
  StoreHelpers extends PrendyStoreHelpers,
  PrendyOptions extends PrendyOptionsUntyped
>(storeHelpers: StoreHelpers, prendyOptions: PrendyOptions, prendyAssets: PrendyAssets) {
  const { getRefs, getState, setState } = storeHelpers;
  const { placeInfoByName, dollNames } = prendyAssets;

  const globalRefs = getRefs().global.main;
  const placesRefs = getRefs().places;

  const { getGlobalState } = get_globalUtils(storeHelpers);
  const getSectionVidVideo = get_getSectionVidVideo<StoreHelpers, PlaceName>(storeHelpers);
  const { getSegmentFromStoryRules } = get_sceneStoryUtils(storeHelpers);

  /*
  T_CameraName extends CameraNameFromPlace<T_PlaceName>,
  T_SegmentName extends SegmentNameFromCameraAndPlace<T_PlaceName, T_CameraName>
  */

  function getSafeCamName(cam: AnyCameraName): AnyCameraName;
  function getSafeCamName(cam: null): null;
  function getSafeCamName(cam: any): any {
    if (cam === null) {
      return null;
    }

    const { nowPlaceName } = getGlobalState();

    const safePlace = nowPlaceName;
    const { segmentTimesByCamera, cameraNames } = placeInfoByName[safePlace];

    // if the camera isn't in the nowPlace, then use the first camera for the nowPlace
    const safeCam = segmentTimesByCamera?.[cam as keyof typeof segmentTimesByCamera] ? cam : cameraNames[0];

    return safeCam;
  }

  function getSafeSegmentName<
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

    const camSegmentNames = Object.keys(segmentTimesByCamera?.[safeCam as keyof typeof segmentTimesByCamera] ?? {});

    // const camSegmentNames = [] as any;

    // disabling for now to allow getSafeSegmentName to work in video.ts (looping stuff) when changing segment?
    const foundRuleSegmentName = useStorySegmentRules ? getSegmentFromStoryRules(safePlace, safeCam) : undefined;
    // const foundRuleSegmentName = undefined;

    return chooseClosestBeforeItemInArray({
      fullArray: segmentNames,
      goalItem: foundRuleSegmentName ?? segment,
      smallArray: camSegmentNames,
    });
  }

  // Updates both video textures and probe textures for the new cameras
  function updateTexturesForNowCamera(newCameraName: AnyCameraName, didChangePlace = false) {
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

    if (globalRefs.backdropPostProcess) scene.activeCamera.attachPostProcess(globalRefs.backdropPostProcess);
    if (globalRefs.fxaaPostProcess) scene.activeCamera.attachPostProcess(globalRefs.fxaaPostProcess);

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
      ShaderStore.ShadersStore["depthyPixelShader"] = shaders.backdropAndDepth.backdropFragment;
      ShaderStore.ShadersStore["depthyVertexShader"] = shaders.backdropAndDepth.backdropVertex;

      // ShaderStore.ShadersStore["translatedFxaaPixelShader"] = shaders.translatedFxaa.translatedFxaaFragment;
      // ShaderStore.ShadersStore["translatedFxaaVertexShader"] = shaders.translatedFxaa.translatedFxaaVertex;

      globalRefs.backdropPostProcess = new PostProcess(
        "backdropAndDepthShader",
        "depthy",
        ["planePos", "stretchSceneAmount", "stretchVideoAmount"],
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
        const { planePos, planePosGoal, planeZoom } = getState().global.main;
        if (!globalRefs.backdropPostProcessEffect) {
          globalRefs.backdropPostProcessEffect = effect;
          console.log("reapplying");

          (globalRefs?.backdropPostProcessEffect as Effect | null)?.setFloat2(
            "planePos",
            planePosGoal.x,
            planePosGoal.y
          );
          (globalRefs?.backdropPostProcessEffect as Effect | null)?.setFloat2(
            "stretchSceneAmount",
            planeZoom,
            planeZoom
          );
          (globalRefs?.backdropPostProcessEffect as Effect | null)?.setFloat2("stretchVideoAmount", 1, 1);

          // setState({ global: { main: { timeScreenResized: Date.now() } } });
          setTimeout(() => {
            console.log("resizing");

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

        // const positionChanged = diffInfo.propsChangedBool.global.main.planePos;
        // const zoomChanged = diffInfo.propsChangedBool.global.main.planeZoom;
        const positionChanged = true;
        const zoomChanged = true;

        const engine = scene?.getEngine(); // engine
        if (engine && (positionChanged || zoomChanged)) {
          const stretchVideoSize = globalRefs.stretchVideoSize;

          (globalRefs?.backdropPostProcessEffect as Effect | null)?.setFloat2(
            "planePos",
            planePos.x * stretchVideoSize.x,
            planePos.y * stretchVideoSize.y
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

  function addMeshesToRenderLists(newCamRef: DefaultCameraRefs) {
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

  function updateVideoTexturesForNewPlace(nowPlaceName: PlaceName) {
    if (globalRefs.backdropVideoTex) {
      const backdropVidElement = getSectionVidVideo(nowPlaceName as PlaceName);
      if (backdropVidElement) globalRefs.backdropVideoTex.updateVid(backdropVidElement);
    }

    updateVideoTexture();
  }

  function updateVideoTexture() {
    globalRefs?.backdropPostProcessEffect?.setTexture("BackdropTextureSample", globalRefs.backdropVideoTex);
    globalRefs?.backdropPostProcessEffect?.setTexture("SceneDepthTexture", globalRefs.depthRenderTarget);
  }

  function applyProbeToAllDollMaterials() {
    const { nowPlaceName, modelNamesLoaded } = getState().global.main;

    const placeState = getState().places[nowPlaceName];

    const { scene } = globalRefs;
    const placeRef = placesRefs[nowPlaceName];
    const { camsRefs } = placeRef;
    const newCamRef = camsRefs[placeState.nowCamName];

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

  function applyProbeToAllParticleMaterials() {
    const { nowPlaceName } = getState().global.main;
    const placeState = getState().places[nowPlaceName];
    const { scene } = globalRefs;
    const placeRef = placesRefs[nowPlaceName];
    const { camsRefs } = placeRef;
    const newCamRef = camsRefs[placeState.nowCamName];
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

  // note adding to section vids cause its easier to follow for now? even though its not seperated
  function updateNowStuffWhenSectionChanged() {
    // I think everything is a 'wanted' state , and this function swaps them all to 'now' states at once

    const { nowPlaceName, nextSegmentNameWhenVidPlays, nowSegmentName } = getState().global.main;
    const { nextCamNameWhenVidPlays, nowCamName } = getState().places[nowPlaceName];

    const waitingForASectionToChange = nextSegmentNameWhenVidPlays || nextCamNameWhenVidPlays;

    // if no segment or camera was waiting for the sectionVid to change, return early
    if (!waitingForASectionToChange) return;

    const nextCamNameWhenVidPlaysSafe = nextCamNameWhenVidPlays
      ? getSafeCamName(nextCamNameWhenVidPlays as AnyCameraName)
      : null;
    const nextSegmentNameWhenVidPlaysSafe = nextSegmentNameWhenVidPlays
      ? getSafeSegmentName({
          cam: (nextCamNameWhenVidPlaysSafe ?? nowCamName) as CameraNameByPlace[PlaceName] & AnyCameraName,
          place: nowPlaceName as PlaceName,
          segment: nextSegmentNameWhenVidPlays as SegmentNameByPlace[PlaceName],
          useStorySegmentRules: true,
        })
      : null;

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
