import {
  Mesh,
  RenderTargetTexture,
  Scene,
  ShaderMaterial,
  SolidParticleSystem,
  TargetCamera,
} from "@babylonjs/core";
import {
  AnySegmentName,
  PrendyArt,
  PrendyOptions,
  CharacterName,
  DollName,
  ModelName,
  PickupName,
  PlaceInfoByName,
  PlaceName,
} from "../../declarations";
import {
  mover2dRefs,
  mover2dState,
  moverRefs,
  moverState,
} from "pietem-movers";
import { CustomVideoTexture } from "../../utils/babylonjs/CustomVideoTexture/CustomVideoTexture";
import { DepthRendererWithSize } from "../../utils/babylonjs/enableCustomDepthRenderer/DepthRendererWithSize";
import { makerGlobalStoreIndexUtils } from "./utils/indexUtils";

export default function global<
  A_AnySegmentName extends AnySegmentName = AnySegmentName,
  A_PrendyArt extends PrendyArt = PrendyArt,
  A_PrendyOptions extends PrendyOptions = PrendyOptions,
  A_CharacterName extends CharacterName = CharacterName,
  A_DollName extends DollName = DollName,
  A_ModelName extends ModelName = ModelName,
  A_PickupName extends PickupName = PickupName,
  A_PlaceInfoByName extends PlaceInfoByName = PlaceInfoByName,
  A_PlaceName extends PlaceName = PlaceName
>(prendyStartOptions: A_PrendyOptions, prendyArt: A_PrendyArt) {
  const { musicNames, soundNames } = prendyArt;

  type MaybeSegment = null | A_AnySegmentName;

  type SegmentNameFromCameraAndPlace<
    T_Place extends keyof A_PlaceInfoByName,
    T_Cam extends keyof A_PlaceInfoByName[T_Place]["segmentTimesByCamera"]
  > = keyof A_PlaceInfoByName[T_Place]["segmentTimesByCamera"][T_Cam];

  type CameraNameFromPlace<
    T_Place extends keyof A_PlaceInfoByName
  > = keyof A_PlaceInfoByName[T_Place]["segmentTimesByCamera"];

  type CamSegmentRulesOptionsUntyped = Partial<
    {
      [P_PlaceName in A_PlaceName]: Partial<
        {
          [P_CamName in CameraNameFromPlace<P_PlaceName>]: (
            usefulStuff: Record<any, any> // usefulStoryStuff, but before the types for global state exist
          ) => SegmentNameFromCameraAndPlace<P_PlaceName, P_CamName>;
        }
      >;
    }
  >;

  const {
    makeAutomaticMusicStartRefs,
    makeAutomaticSoundStartRefs,
  } = makerGlobalStoreIndexUtils(musicNames, soundNames);

  // State
  const state = () => ({
    // segments and section video
    wantedSegmentWhenNextPlaceLoads: null as MaybeSegment,
    nextSegmentNameWhenVidPlays: null as MaybeSegment, // near the start of a frame, when the section vid has finished changing, this is used as the new nowSegmentName
    wantedSegmentNameAtLoop: null as MaybeSegment,
    wantedSegmentName: null as MaybeSegment,
    nowSegmentName: prendyStartOptions.segment as A_AnySegmentName,
    wantToLoop: false, // this gets set by story stuff and game logic, then global rules figure out what to send to sectionVids
    // TODO? move nowCamName etc to here, since never change cam for non-now place
    //
    // changing places
    modelNamesLoaded: [] as A_ModelName[],
    newPlaceLoaded: false,
    isLoadingBetweenPlaces: true,
    nowPlaceName: prendyStartOptions.place as A_PlaceName,
    readyToSwapPlace: false,
    nextPlaceName: null as null | A_PlaceName,
    loadingOverlayToggled: true,
    loadingOverlayFullyShowing: true,
    //
    // player
    playerCharacter: prendyStartOptions.playerCharacter as A_CharacterName, // TODO Move to players ?
    gravityValue: 5,
    playerMovingPaused: false, // to be able to prevent moving while theres a cutscene for example
    focusedDoll: "walker" as A_DollName,
    focusedDollIsInView: false,
    //
    // scene plane
    ...mover2dState("planePos"),
    ...moverState("planeZoom", {
      value: prendyStartOptions.zoomLevels.default,
      valueGoal: prendyStartOptions.zoomLevels.default,
    }), // (like scale)
    planePosMoveConfigName: "default", // todo move to mover2dState()
    //
    // interacting
    timeScreenResized: Date.now(),
    interactButtonPressTime: 0,
    // story
    heldPickups: prendyStartOptions.heldPickups as A_PickupName[],
    storyOverlayToggled: false, // so the screen can fade out without affecting loading a new place
    alarmTextIsVisible: false,
    alarmText: "⚠ wobble detected ⚠",
    //
    // meta
    aSpeechBubbleIsShowing: false,
    aConvoIsHappening: false,
    //
    frameTick: Date.now(),
    //
    debugMessage: "",
  });

  // Refs
  const refs = () => ({
    backdropVideoTex: null as null | CustomVideoTexture,
    //
    scenes: {
      main: null as null | Scene,
      backdrop: null as null | Scene,
    },
    depthRenderer: null as DepthRendererWithSize | null,
    //
    sceneRenderTarget: null as null | RenderTargetTexture,
    depthRenderTarget: null as null | RenderTargetTexture,
    scenePlane: null as null | Mesh,
    scenePlaneMaterial: null as null | ShaderMaterial,
    scenePlaneCamera: null as null | TargetCamera,
    //
    backdropImageSize: { width: 1280, height: 720 },
    backdropRenderSize: { width: 1280, height: 720 },
    depthRenderSize: { width: 1280, height: 720 },
    //
    ...mover2dRefs("planePos", {
      mass: 41.5,
      stiffness: 50,
      damping: 10,
      friction: 0.35, // for sliding
    }),
    ...moverRefs("planeZoom", {
      mass: 41.5,
      stiffness: 25,
      damping: 10,
      friction: 0.35, // for sliding
    }),

    //
    sounds: makeAutomaticSoundStartRefs(),
    music: makeAutomaticMusicStartRefs(),
    musicEffects: {
      lowPass: null as null | BiquadFilterNode,
      compress: null as null | DynamicsCompressorNode,
      extraGain: null as null | GainNode,
    },
    //
    isHoveringPickupButton: false,
    //
    solidParticleSystems: {} as Record<string, SolidParticleSystem>,
    //
    // Temporary
    timerSpeed: 1,
    //
    aConvoIsHappening_timeout: null as null | ReturnType<typeof setTimeout>,
    //
    camSegmentRulesOptions: null as null | CamSegmentRulesOptionsUntyped, // NOTE if using the typed version,  might need to define it in consts to remove cyclic dependancy
    // onPickupButtonClick: null as null | ((pickupName: PickupName) => void), // what to do when pressing the pickup button
    onPickupButtonClick: null as null | ((pickupName: any) => void), // what to do when pressing the pickup button
    //
    hasAlreadyStartedRuningBeforeChangeSectionThisFrame: false,
  });

  // const startStates: InitialItemsState<typeof state> = {
  const startStates = {
    main: state(),
  };

  return { startStates, state, refs };
}
