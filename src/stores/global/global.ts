import { DepthRenderer, Effect, PostProcess, RenderTargetTexture, Scene, SolidParticleSystem } from "@babylonjs/core";
import { mover2dRefs, mover2dState, moverRefs, moverState } from "repond-movers";
import {
  AnyCameraName,
  AnySegmentName,
  CharacterName,
  DollName,
  ModelName,
  PickupName,
  PlaceInfoByName,
  PlaceName,
  PrendyAssets,
  PrendyOptions,
} from "../../declarations";
import { CustomVideoTexture } from "../../helpers/babylonjs/CustomVideoTexture";
import get_globalStoreUtils from "./globalStoreUtils";

export default function global<
  A_PrendyAssets extends PrendyAssets = PrendyAssets,
  A_PrendyOptions extends PrendyOptions = PrendyOptions,
  A_AnySegmentName extends AnySegmentName = AnySegmentName,
  A_AnyCameraName extends AnyCameraName = AnyCameraName,
  A_CharacterName extends CharacterName = CharacterName,
  A_DollName extends DollName = DollName,
  A_ModelName extends ModelName = ModelName,
  A_PickupName extends PickupName = PickupName,
  A_PlaceInfoByName extends PlaceInfoByName = PlaceInfoByName,
  A_PlaceName extends PlaceName = PlaceName
>(prendyStartOptions: A_PrendyOptions, prendyAssets: A_PrendyAssets) {
  const { musicNames, soundNames, placeInfoByName } = prendyAssets;

  type MaybeSegmentName = null | A_AnySegmentName;
  type MaybeCam = null | A_PlaceName;

  type SegmentNameFromCameraAndPlace<
    T_Place extends keyof A_PlaceInfoByName,
    T_Cam extends keyof A_PlaceInfoByName[T_Place]["segmentTimesByCamera"]
  > = keyof A_PlaceInfoByName[T_Place]["segmentTimesByCamera"][T_Cam];

  type CameraNameFromPlace<T_Place extends keyof A_PlaceInfoByName> =
    keyof A_PlaceInfoByName[T_Place]["segmentTimesByCamera"];

  type CamSegmentRulesOptionsUntyped = Partial<{
    [P_PlaceName in A_PlaceName]: Partial<{
      [P_CamName in CameraNameFromPlace<P_PlaceName>]: (
        usefulStuff: Record<any, any> // usefulStoryStuff, but before the types for global state exist
      ) => SegmentNameFromCameraAndPlace<P_PlaceName, P_CamName>;
    }>;
  }>;

  const { makeAutomaticMusicStartRefs, makeAutomaticSoundStartRefs } = get_globalStoreUtils(musicNames, soundNames);

  const placeName = prendyStartOptions.place;

  // State
  const state = () => ({
    // place
    nowPlaceName: placeName as A_PlaceName,
    goalPlaceName: null as null | A_PlaceName,
    readyToSwapPlace: false,
    isLoadingBetweenPlaces: true,
    loadingOverlayToggled: true,
    loadingOverlayFullyShowing: true,
    // cameras
    goalCamWhenNextPlaceLoads: null as MaybeCam,
    goalCamNameWhenVidPlays: null as MaybeCam, // near the start of a frame, when the slice vid has finished changing, this is used as the new nowCamName
    goalCamNameAtLoop: null as MaybeCam,
    goalCamName: null as MaybeCam, // NOTE always set goalCamName? and never nowCamName? to prepare everything first?
    nowCamName:
      ((prendyStartOptions.place === placeName ? prendyStartOptions.camera : "") ||
        ((placeInfoByName as any)?.[placeName as any]?.cameraNames?.[0] as unknown as A_AnyCameraName)) ??
      ("testItemCamName" as A_AnyCameraName), // if state() is called with a random itemName
    // segments and slice video
    nowSegmentName: prendyStartOptions.segment as A_AnySegmentName,
    goalSegmentName: null as MaybeSegmentName,
    goalSegmentNameAtLoop: null as MaybeSegmentName,
    goalSegmentNameWhenVidPlays: null as MaybeSegmentName, // near the start of a frame, when the slice vid has finished changing, this is used as the new nowSegmentName
    goalSegmentWhenGoalPlaceLoads: null as MaybeSegmentName,
    // changing places
    modelNamesLoaded: [] as A_ModelName[],
    newPlaceModelLoaded: false,
    newPlaceVideosLoaded: false,
    newPlaceProbesLoaded: false,

    //
    // player
    playerCharacter: prendyStartOptions.playerCharacter as A_CharacterName, // TODO Move to players ?
    gravityValue: 5,
    playerMovingPaused: false, // to be able to prevent moving while theres a cutscene for example
    focusedDoll: prendyAssets.characterOptions[prendyStartOptions.playerCharacter].doll ?? ("walker" as A_DollName),
    focusedDollIsInView: false,
    //
    // slate
    ...mover2dState("slatePos"),
    ...moverState("slateZoom", {
      value: prendyStartOptions.zoomLevels.default,
      valueGoal: prendyStartOptions.zoomLevels.default,
      // springStopSpeed: 0.001, // NOTE not used in mover yet
    }), // (like scale)
    slatePosMoveConfigName: "default", // todo move to mover2dState()
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
    frameTick: 0,
    //
    debugMessage: "",
  });
  // Refs
  const refs = () => ({
    scene: null as null | Scene,
    backdropVideoTex: null as null | CustomVideoTexture,
    depthRenderer: null as DepthRenderer | null,
    depthRenderTarget: null as null | RenderTargetTexture,
    backdropPostProcess: null as null | PostProcess,
    backdropPostProcessEffect: null as null | Effect,
    fxaaPostProcess: null as null | PostProcess,
    //
    backdropSize: { width: 1280, height: 720 },
    stretchVideoSize: { x: 1, y: 1 },
    stretchVideoGoalSize: { x: 1, y: 1 },
    stretchSceneSize: { x: 1, y: 1 },
    //
    ...mover2dRefs("slatePos", { mass: 41.5, stiffness: 50, damping: 10, friction: 0.35, stopSpeed: 0.003 }),
    ...moverRefs("slateZoom", { mass: 41.5, stiffness: 25, damping: 10, friction: 0.35 }), // NOTE stopSpeed not on 1dMover
    //
    sounds: makeAutomaticSoundStartRefs(),
    music: makeAutomaticMusicStartRefs(),
    musicEffects: {
      lowPass: null as null | BiquadFilterNode,
      compress: null as null | DynamicsCompressorNode,
      extraGain: null as null | GainNode,
    },
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
  });

  // const startStates: InitialItemsState<typeof state> = {
  const startStates = {
    main: state(),
  };

  return { startStates, state, refs };
}
