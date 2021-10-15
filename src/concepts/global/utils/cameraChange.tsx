import {
  Constants,
  Engine,
  PBRMaterial,
  RenderTargetTexture,
  ShaderMaterial,
  Texture,
} from "@babylonjs/core";
import { forEach } from "shutils/dist/loops";
import { makeGlobalStoreUtils } from "./";
import { chooseClosestBeforeItemInArray } from "shutils/dist/arrays";
import { enableCustomDepthRenderer } from "../../../utils/babylonjs/enableCustomDepthRenderer";
import {
  makeGetSectionVidVideo,
  makeSectionVidStoreUtils,
} from "../../../concepts/sectionVids/utils";
import {
  GameyConceptoFuncs,
  GameyStartOptionsUntyped,
  PlaceholderGameyConcepts,
  PlaceInfoByNamePlaceholder,
} from "../../typedConceptoFuncs";

export function makeCameraChangeUtils<
  ConceptoFuncs extends GameyConceptoFuncs,
  PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>,
  AnyCameraName extends string,
  PlaceName extends string,
  DollName extends string,
  CameraNameByPlace extends Record<PlaceName, string>,
  SegmentNameByPlace extends Record<PlaceName, string>
>(
  conceptoFuncs: ConceptoFuncs,
  placeInfoByName: PlaceInfoByName,
  dollNames: readonly DollName[]
) {
  const { getRefs, getState, setState } = conceptoFuncs;

  const globalRefs = getRefs().global.main;
  const placesRefs = getRefs().places;

  const { getGlobalState } = makeGlobalStoreUtils(conceptoFuncs);
  const getSectionVidVideo = makeGetSectionVidVideo<ConceptoFuncs, PlaceName>(
    conceptoFuncs
  );

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
    const safeCam = segmentTimesByCamera?.[
      cam as keyof typeof segmentTimesByCamera
    ]
      ? cam
      : cameraNames[0];

    return safeCam;
  }

  function getSafeSegmentName<
    T_PlaceName extends PlaceName,
    T_CameraName extends CameraNameByPlace[T_PlaceName] & AnyCameraName,
    T_SegmentName extends SegmentNameByPlace[T_PlaceName]
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
      console.warn("tried to gtSafeSegment name for not current place", place);
    }
    // if (segmentTimesByCamera[cam]) {
    // segmentTimesByCamera[cam]
    // }

    const camSegmentNames = Object.keys(
      segmentTimesByCamera?.[safeCam as keyof typeof segmentTimesByCamera] ?? {}
    );

    // const camSegmentNames = [] as any;

    // disabling for now to allow getSafeSegmentName to work in video.ts (looping stuff) when changing segment?
    // const foundRuleSegmentName = useStorySegmentRules
    //   ? getSegmentFromStoryRules(safePlace, safeCam)
    //   : undefined;
    const foundRuleSegmentName = undefined;

    return chooseClosestBeforeItemInArray({
      fullArray: segmentNames,
      goalItem: foundRuleSegmentName ?? segment,
      smallArray: camSegmentNames,
    });
  }

  function updateTexturesForNowCamera(newCameraName: AnyCameraName) {
    const { nowPlaceName } = getState().global.main;
    const { scenes, backdropRenderSize } = globalRefs;
    const placeRef = placesRefs[nowPlaceName];
    const { camsRefs } = placeRef;
    const newCamRef = camsRefs[newCameraName];

    if (scenes.main === null) return;
    if (scenes.backdrop === null) return;
    if (!newCamRef.camera) return;
    if (!globalRefs.scenePlane) return;

    scenes.main.activeCamera = newCamRef.camera;
    // playerCharRefs.cameraRef = scenes.main.activeCamera as TargetCamera;

    // Render target
    globalRefs.sceneRenderTarget?.dispose();
    globalRefs.sceneRenderTarget = new RenderTargetTexture(
      "screenShot",
      backdropRenderSize,
      scenes.main,
      false,
      false,
      Constants.TEXTURETYPE_UNSIGNED_INT,
      false,
      Texture.NEAREST_SAMPLINGMODE,
      undefined,
      undefined,
      undefined,
      Engine.TEXTUREFORMAT_RGBA
    );

    globalRefs.depthRenderer?.dispose();
    globalRefs.depthRenderer = enableCustomDepthRenderer(
      scenes.main,
      getRefs().global.main.depthRenderSize,
      newCamRef.camera,
      false
    );

    globalRefs.depthRenderTarget?.dispose();
    globalRefs.depthRenderTarget = globalRefs.depthRenderer.getDepthMap();

    scenes.main.customRenderTargets = [
      globalRefs.sceneRenderTarget,
      globalRefs.depthRenderTarget,
    ];

    scenes.main.meshes.forEach((loopedMesh) => {
      globalRefs.sceneRenderTarget?.renderList?.push(loopedMesh);
      globalRefs.depthRenderTarget?.renderList?.push(loopedMesh);
    });

    const particleSystemNames = Object.keys(globalRefs.solidParticleSystems);
    particleSystemNames.forEach((particleSystemName) => {
      const particleSystem =
        globalRefs.solidParticleSystems[particleSystemName];
      globalRefs.sceneRenderTarget?.renderList?.push(particleSystem.mesh);
      globalRefs.depthRenderTarget?.renderList?.push(particleSystem.mesh);
      (particleSystem as any)._camera = newCamRef.camera;
    });

    // Plane material
    if (!globalRefs.scenePlaneMaterial) {
      globalRefs.scenePlaneMaterial = new ShaderMaterial(
        "backdropAndDepthShader",
        scenes.backdrop,
        "./backdropAndDepth",
        {
          attributes: ["position", "uv"],
          uniforms: ["worldViewProjection"],
        }
      );
      globalRefs.scenePlane.material = globalRefs.scenePlaneMaterial;
    }

    if (globalRefs.colorVideoTex && globalRefs.depthVideoTex) {
      const colorVidElement = getSectionVidVideo(nowPlaceName as PlaceName);
      const depthVidElement = getSectionVidVideo(
        nowPlaceName as PlaceName,
        "depth"
      );
      if (colorVidElement && depthVidElement) {
        // console.log("UPDATING TEXTURE HERE 1");
        globalRefs.colorVideoTex.updateVid(colorVidElement);
        globalRefs.depthVideoTex.updateVid(depthVidElement);
      }

      globalRefs?.scenePlaneMaterial?.setTexture(
        "BackdropTextureSample",
        globalRefs.colorVideoTex
      );
      globalRefs?.scenePlaneMaterial?.setTexture(
        "DepthTextureSample",
        globalRefs.depthVideoTex
      );
    }

    globalRefs.scenePlaneMaterial.setTexture(
      "textureSampler",
      globalRefs.sceneRenderTarget
    );

    globalRefs.scenePlaneMaterial.setTexture(
      "SceneDepthTexture",
      globalRefs.depthRenderTarget
    );

    applyProbeToAllDollMaterials();
    applyProbeToAllParticleMaterials();
  }

  function applyProbeToAllDollMaterials() {
    const { nowPlaceName, modelNamesLoaded } = getState().global.main;

    const placeState = getState().places[nowPlaceName];

    const { scenes } = globalRefs;
    const placeRef = placesRefs[nowPlaceName];
    const { camsRefs } = placeRef;
    // const newCamRef = camsRefs[placeState.nowCamName];

    if (scenes.main === null) return;
    if (scenes.backdrop === null) return;
    // if (!newCamRef.camera) return;
    if (!globalRefs.scenePlane) return;

    forEach(modelNamesLoaded, (modelName: any & string) => {
      const modelRefs = getRefs().models[modelName];

      // console.log("camsRefs[placeState.nowCamName].probeTexture");
      // console.log(camsRefs[placeState.nowCamName].probeTexture);

      if (
        modelRefs.materialRef &&
        camsRefs[placeState.nowCamName].probeTexture
      ) {
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

    if (scenes.main === null) return;
    if (scenes.backdrop === null) return;
    // if (!newCamRef.camera) return;
    if (!globalRefs.scenePlane) return;

    const particleSystemNames = Object.keys(globalRefs.solidParticleSystems);
    particleSystemNames.forEach((particleSystemName) => {
      const particleSystem =
        globalRefs.solidParticleSystems[particleSystemName];
      const material = particleSystem.mesh.material;
      if (
        material &&
        material instanceof PBRMaterial &&
        camsRefs[placeState.nowCamName].probeTexture
      ) {
        material.reflectionTexture =
          camsRefs[placeState.nowCamName].probeTexture;
      }

      globalRefs.sceneRenderTarget?.renderList?.push(particleSystem.mesh);
      globalRefs.depthRenderTarget?.renderList?.push(particleSystem.mesh);
    });
  }

  // note adding to section vids cause its easier to follow for now? even though its not seperated
  function updateNowStuffWhenSectionChanged() {
    const {
      nowPlaceName,
      nextSegmentNameWhenVidPlays,
      nowSegmentName,
    } = getState().global.main;
    const { nextCamNameWhenVidPlays, nowCamName } = getState().places[
      nowPlaceName
    ];

    const waitingForASectionToChange =
      nextSegmentNameWhenVidPlays || nextCamNameWhenVidPlays;

    // if no segment or camera was waiting for the sectionVid to change, return early
    if (!waitingForASectionToChange) return;

    const nextCamNameWhenVidPlaysSafe = nextCamNameWhenVidPlays
      ? getSafeCamName(nextCamNameWhenVidPlays as AnyCameraName)
      : null;
    const nextSegmentNameWhenVidPlaysSafe = nextSegmentNameWhenVidPlays
      ? getSafeSegmentName({
          cam: (nextCamNameWhenVidPlaysSafe ??
            nowCamName) as CameraNameByPlace[PlaceName] & AnyCameraName,
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
