import {
  AbstractMesh,
  Camera,
  Constants,
  Effect,
  Engine,
  FxaaPostProcess,
  PBRMaterial,
  PostProcess,
  RenderTargetTexture,
  Scene,
  ShaderMaterial,
  ShaderStore,
  Texture,
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
import { get_globalScenePlaneRules } from "../../rules/global/scenePlane";
import { DefaultCameraRefs } from "../../stores/places";
import { PrendyOptionsUntyped, PrendyStoreHelpers } from "../../stores/typedStoreHelpers";
import { enableCustomDepthRenderer } from "../babylonjs/enableCustomDepthRenderer/enableCustomDepthRenderer";
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

  function updateTexturesForNowCamera(newCameraName: AnyCameraName, didChangePlace = false) {
    console.log("updateTexturesForNowCamera");

    const { nowPlaceName } = getState().global.main;
    // const { scene, backdropRenderSize } = globalRefs;
    const { backdropRenderSize } = globalRefs;
    const scene = globalRefs.scene as Scene;
    const placeRef = placesRefs[nowPlaceName];
    const { camsRefs } = placeRef;
    const newCamRef = camsRefs[newCameraName];

    if (scene === null) return;
    if (!newCamRef.camera) return;
    // if (!globalRefs.scenePlane) return;

    // Render target
    if (globalRefs.backdropPostProcess) {
      (globalRefs.scene.activeCamera as Camera).detachPostProcess(globalRefs.backdropPostProcess);
    }

    globalRefs.scene.activeCamera = newCamRef.camera;

    if (globalRefs.backdropPostProcess) {
      (globalRefs.scene.activeCamera as Camera).attachPostProcess(globalRefs.backdropPostProcess);
    }

    // console.log("newCamRef.camera");
    // newCamRef.camera.maxZ = 1000;
    // console.log(newCamRef.camera.maxZ);

    if (!globalRefs.depthRenderer) {
      console.log("making new depth renderer");

      globalRefs.depthRenderer = enableCustomDepthRenderer(
        scene,
        // getRefs().global.main.depthRenderSize,
        getState().global.main.zoomLevel,
        newCamRef.camera,
        false
      );
    }

    (globalRefs.depthRenderer as any)._camera = newCamRef.camera;

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
      ShaderStore.ShadersStore["depthyPixelShader"] = shaders.backdropAndDepth.postProcess;

      globalRefs.backdropPostProcess = new PostProcess(
        "backdropAndDepthShader",
        "depthy",
        ["planePos", "stretchSceneAmount", "stretchVideoAmount"],
        ["textureSampler", "SceneDepthTexture", "BackdropTextureSample"], // textures
        1,
        globalRefs.scene.activeCamera
        // globalRefs.activeCamera
        // Texture.NEAREST_SAMPLINGMODE // sampling
        // globalRefs.scene.engine // engine
      );

      // const fxaaPP = new FxaaPostProcess("fxaa", 1.0, globalRefs.scene.activeCamera);

      // fxaaPP.

      // // const appliedProcess = postProcess.apply();

      globalRefs.backdropPostProcess.onApply = (effect) => {
        if (!globalRefs.backdropPostProcessEffect) {
          globalRefs.backdropPostProcessEffect = effect;
          console.log("reapplying");

          const { planePos, planePosGoal, planeZoom } = getState().global.main;

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
            setState({ global: { main: { timeScreenResized: Date.now() } } });
          }, 10);

          updateVideoTexturesForNewPlace(nowPlaceName);
        }
        updateVideoTexture();
      };
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

    globalRefs.depthRenderTarget.renderList = [];

    forEach(dollNames, (dollName) => {
      const dollMeshes = getRefs().dolls[dollName].otherMeshes;

      const dollMeshNames = Object.keys(dollMeshes);

      forEach(dollMeshNames, (meshName) => {
        const loopedMesh = dollMeshes[meshName] as AbstractMesh;

        if (loopedMesh) {
          loopedMesh.isInFrustum = () => true;
          // loopedMesh.alwaysSelectAsActiveMesh = true;
          globalRefs.depthRenderTarget?.renderList?.push(loopedMesh);
        }
      });
    });

    const particleSystemNames = Object.keys(globalRefs.solidParticleSystems);
    forEach(particleSystemNames, (particleSystemName) => {
      const particleSystem = globalRefs.solidParticleSystems[particleSystemName];
      globalRefs.depthRenderTarget?.renderList?.push(particleSystem.mesh);
      (particleSystem as any)._camera = newCamRef.camera;
    });

    (scene as any)._skipEvaluateActiveMeshesCompletely = true;
  }

  function updateVideoTexturesForNewPlace(nowPlaceName: PlaceName) {
    if (globalRefs.backdropVideoTex) {
      const backdropVidElement = getSectionVidVideo(nowPlaceName as PlaceName);
      if (backdropVidElement) globalRefs.backdropVideoTex.updateVid(backdropVidElement);
    }

    updateVideoTexture();
  }

  function updateVideoTexture() {
    // if (Math.random() > 0.7) {
    globalRefs?.backdropPostProcessEffect?.setTexture("BackdropTextureSample", globalRefs.backdropVideoTex);
    // }
    globalRefs?.backdropPostProcessEffect?.setTexture("SceneDepthTexture", globalRefs.depthRenderTarget);
  }

  function applyProbeToAllDollMaterials() {
    const { nowPlaceName, modelNamesLoaded } = getState().global.main;

    const placeState = getState().places[nowPlaceName];

    const { scene } = globalRefs;
    const placeRef = placesRefs[nowPlaceName];
    const { camsRefs } = placeRef;
    // const newCamRef = camsRefs[placeState.nowCamName];

    if (scene === null) return;
    // if (!newCamRef.camera) return;
    // if (!globalRefs.scenePlane) return;

    forEach(modelNamesLoaded, (modelName: any & string) => {
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

    if (scene === null) return;
    // if (!newCamRef.camera) return;
    // if (!globalRefs.scenePlane) return;

    const particleSystemNames = Object.keys(globalRefs.solidParticleSystems);
    particleSystemNames.forEach((particleSystemName) => {
      const particleSystem = globalRefs.solidParticleSystems[particleSystemName];
      const material = particleSystem.mesh.material;
      if (material && material instanceof PBRMaterial && camsRefs[placeState.nowCamName].probeTexture) {
        material.reflectionTexture = camsRefs[placeState.nowCamName].probeTexture;
      }

      globalRefs.depthRenderTarget?.renderList?.push(particleSystem.mesh);
    });
  }

  // note adding to section vids cause its easier to follow for now? even though its not seperated
  function updateNowStuffWhenSectionChanged() {
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
