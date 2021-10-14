import {
  Mesh,
  RenderTargetTexture,
  Scene,
  ShaderMaterial,
  SolidParticleSystem,
  TargetCamera,
} from "@babylonjs/core";
import { mover2dRefs, mover2dState, moverRefs, moverState } from "movers";
import { CustomVideoTexture } from "../../utils/babylonjs/CustomVideoTexture/CustomVideoTexture";
import { DepthRendererWithSize } from "../../utils/babylonjs/enableCustomDepthRenderer/DepthRendererWithSize";
//
import {
  GameyStartOptionsUntyped,
  PlaceInfoByNamePlaceholder,
} from "../typedConceptoFuncs";
import { makerGlobalStoreIndexUtils } from "./utils/indexUtils";

export default function global<
  GameyStartOptions extends GameyStartOptionsUntyped,
  AnySegmentName extends string,
  PlaceName extends string,
  ModelName extends string,
  DollName extends string,
  PickupName extends string,
  CharacterName extends string,
  MusicName extends string,
  SoundName extends string,
  PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>
>(
  gameyStartOptions: GameyStartOptions,
  musicNames: readonly MusicName[],
  soundNames: readonly SoundName[]
) {
  type MaybeSegment = null | AnySegmentName;

  type SegmentNameFromCameraAndPlace<
    T_Place extends keyof PlaceInfoByName,
    T_Cam extends keyof PlaceInfoByName[T_Place]["segmentTimesByCamera"]
  > = keyof PlaceInfoByName[T_Place]["segmentTimesByCamera"][T_Cam];

  type CameraNameFromPlace<
    T_Place extends keyof PlaceInfoByName
  > = keyof PlaceInfoByName[T_Place]["segmentTimesByCamera"];

  type CamSegmentRulesOptionsUntyped = Partial<
    {
      [P_PlaceName in PlaceName]: Partial<
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
    nowSegmentName: gameyStartOptions.segment as AnySegmentName,
    wantToLoop: false, // this gets set by story stuff and game logic, then global rules figure out what to send to sectionVids
    // TODO? move nowCamName etc to here, since never change cam for non-now place
    //
    // changing places
    modelNamesLoaded: [] as ModelName[],
    newPlaceLoaded: false,
    isLoadingBetweenPlaces: true,
    nowPlaceName: gameyStartOptions.place as PlaceName,
    readyToSwapPlace: false,
    nextPlaceName: null as null | PlaceName,
    loadingOverlayToggled: true,
    loadingOverlayFullyShowing: true,
    //
    // player
    playerCharacter: gameyStartOptions.playerCharacter as CharacterName, // TODO Move to players ?
    gravityValue: 5, // currently only  while walking (not every frame, could update to every frame when not touching a flatish ground)
    playerMovingPaused: false, // to be able to prevent moving while theres a cutscene for example
    focusedDoll: "walker" as DollName,
    //
    // scene plane
    ...mover2dState("planePos"),
    ...moverState("planeZoom", {
      value: gameyStartOptions.zoomLevels.default,
      valueGoal: gameyStartOptions.zoomLevels.default,
    }), // (like scale)
    planePosMoveConfigName: "default", // todo move to mover2dState()
    //
    // interacting
    timeScreenResized: Date.now(),
    interactButtonPressTime: 0,
    // story
    heldPickups: gameyStartOptions.heldPickups as PickupName[],
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
    depthVideoTex: null as null | CustomVideoTexture,
    colorVideoTex: null as null | CustomVideoTexture,
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
