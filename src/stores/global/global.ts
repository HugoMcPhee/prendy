import {
  DepthRenderer,
  Effect,
  PostProcess,
  RawTexture2DArray,
  RenderTargetTexture,
  Scene,
  SolidParticleSystem,
} from "@babylonjs/core";
import { Point3D } from "chootils/dist/points3d";
import { mover2dRefs, mover2dState, moverRefs, moverState } from "repond-movers";
import { MyTypes } from "../../declarations";
import { CustomVideoTexture } from "../../helpers/babylonjs/CustomVideoTexture";
import { InRangeForDoll } from "../../helpers/prendyUtils/dolls";
import { makeAutomaticMusicStartRefs, makeAutomaticSoundStartRefs } from "./globalStoreUtils";
import {
  AnyCameraName,
  AnySegmentName,
  CharacterName,
  DollName,
  ModelName,
  PickupName,
  PlaceInfoByName,
  PlaceName,
} from "../../types";

// save it to global
export type PrendySaveState = {
  global: {
    nowCamName: string;
    nowPlaceName: string;
    nowSegmentName: string;
    heldPickups: string[];
    storyOverlayToggled: boolean;
    alarmTextIsVisible: boolean;
    alarmText: string;
    aSpeechBubbleIsShowing: boolean;
    aConvoIsHappening: boolean;
  };
  dolls: Record<
    string,
    {
      position: Point3D;
      rotationY: number;
      isVisible: boolean;
      // collisionsEnabled: boolean; // setting isVisible also affects collisions
      toggledMeshes: Record<string, boolean>;
      inRange: Record<string, InRangeForDoll>;
      nowAnimation: string;
      // animWeightsGoal: Record<string, number>; // maybe not needed, since loading reacts to animation name
    }
  >;
  places: Record<
    string,
    {
      toggledWalls: Record<string, boolean>;
    }
  >;
  characters: Record<
    string,
    {
      hasLeftFirstTrigger: boolean;
    }
  >;
  player: {
    animationNames: {
      walking: string;
      idle: string;
    };
  };
  // (scraps) walkSpeed (move to state?)
  miniBubbles: Record<
    string,
    {
      isVisible: boolean;
      text: string;
      // forCharacter
    }
  >;
  speechBubbles: Record<
    string,
    {
      isVisible: boolean;
      goalText: string;
      // text?
      // visibleLetterAmount?
      nowVideoName: string;
      font: string;
      stylesBySpecialText: {
        [key: string]: {
          color: string;
          fontSize: string;
          fontWeight: string;
          fontStyle: string;
          textDecoration: string;
        };
      };
      forCharacter: string;
      typingFinished: boolean;
    }
  >;
  // (whole state)
  storyState: Record<any, any>;
};

export const timeStatePath = ["global", "main", "elapsedGameTime"] as const;

export default function global<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"]) {
  const { musicNames, soundNames, placeInfoByName, prendyOptions } = prendyAssets;

  type MaybeSegmentName = null | AnySegmentName;
  type MaybeCam = null | AnyCameraName;

  type SegmentNameFromCameraAndPlace<
    T_Place extends keyof PlaceInfoByName,
    T_Cam extends keyof PlaceInfoByName[T_Place]["segmentTimesByCamera"]
  > = keyof PlaceInfoByName[T_Place]["segmentTimesByCamera"][T_Cam];

  type CameraNameFromPlace<T_Place extends keyof PlaceInfoByName> =
    keyof PlaceInfoByName[T_Place]["segmentTimesByCamera"];

  type CamSegmentRulesOptionsUntyped = Partial<{
    [P_PlaceName in PlaceName]: Partial<{
      [P_CamName in CameraNameFromPlace<P_PlaceName>]: (
        usefulStuff: Record<any, any> // usefulStoryStuff, but before the types for global state exist
      ) => SegmentNameFromCameraAndPlace<P_PlaceName, P_CamName>;
    }>;
  }>;

  const placeName = prendyOptions.place;

  // State
  const getDefaultState = () => ({
    // place
    nowPlaceName: placeName as PlaceName,
    goalPlaceName: null as null | PlaceName,
    readyToSwapPlace: false,
    isLoadingBetweenPlaces: true,
    loadingOverlayToggled: true,
    loadingOverlayFullyShowing: true,
    // cameras
    goalCamWhenNextPlaceLoads: null as MaybeCam,
    goalCamNameAtLoop: null as MaybeCam,
    goalCamName: null as MaybeCam, // NOTE always set goalCamName? and never nowCamName? to prepare everything first?
    nowCamName:
      ((prendyOptions.place === placeName ? prendyOptions.camera : "") ||
        ((placeInfoByName as any)?.[placeName as any]?.cameraNames?.[0] as unknown as AnyCameraName)) ??
      ("testItemCamName" as AnyCameraName), // if state() is called with a random itemId
    // segments and slice video
    nowSegmentName: prendyOptions.segment as AnySegmentName,
    goalSegmentName: null as MaybeSegmentName,
    goalSegmentNameAtLoop: null as MaybeSegmentName,
    goalSegmentWhenGoalPlaceLoads: null as MaybeSegmentName,
    // changing places
    modelNamesLoaded: [] as ModelName[],
    newPlaceModelLoaded: false,
    newPlaceVideosLoaded: false,
    newPlaceProbesLoaded: false,

    //
    // player
    playerCharacter: prendyOptions.playerCharacter as CharacterName, // TODO Move to players ?
    gravityValue: 5,
    playerMovingPaused: false, // to be able to prevent moving while theres a cutscene for example
    focusedDoll: prendyAssets.characterOptions[prendyOptions.playerCharacter].doll ?? ("walker" as DollName),
    focusedDollIsInView: false,
    //
    // slate
    ...mover2dState("slatePos"),
    ...moverState("slateZoom", {
      value: prendyOptions.zoomLevels.default,
      valueGoal: prendyOptions.zoomLevels.default,
      // springStopSpeed: 0.001, // NOTE not used in mover yet
    }), // (like scale)
    slatePosMoveConfigName: "default", // todo move to mover2dState()
    isOnVerticalScreen: false,
    zoomMultiplier: 1, // for vertical screens, zoom out a bit
    //
    // interacting
    timeScreenResized: Date.now(),
    interactButtonPressTime: 0,
    // story
    heldPickups: prendyOptions.heldPickups as PickupName[],
    storyOverlayToggled: false, // so the screen can fade out without affecting loading a new place
    alarmTextIsVisible: false, // TODO rename to title text?
    alarmText: "⚠ wobble detected ⚠", // TODO rename to title text?
    //
    // meta
    aSpeechBubbleIsShowing: false,
    aConvoIsHappening: false,
    //
    // backdrop times
    backdropTime: 0, // this is how far into the backdrop animation it is, it gets reset when reaching the end of a segment, and updated in the frame ticks
    backdropFrame: 0, // this is the current frame of the backdrop animation, based on the time and frame rate
    //
    frameTick: 0,
    timeMode: "game" as "game" | "pause" | "miniGame",
    elapsedGameTime: 0,
    elapsedPauseTime: 0,
    elapsedMiniGameTime: 0, // when not in the pause menu or the main game
    isGamePaused: false,
    gameTimeSpeed: prendyOptions.gameTimeSpeed,
    gameIsInBackground: false,
    //
    debugMessage: "",
    //
    latestSave: null as null | PrendySaveState,
    latestLoadTime: 0, // so things can be initialed after loading state, like isVisible
  });

  console.log("=============================");
  console.log("=============================");
  console.log("=============================");
  console.log("=============================");
  console.log("=============================");
  console.log("getDefaultState nowCamName");
  console.log(getDefaultState().nowCamName);

  // Refs
  const getDefaultRefs = () => ({
    scene: null as null | Scene,
    backdropVideoTex: null as null | CustomVideoTexture,
    backdropFramesTex: null as null | RawTexture2DArray,
    backdropFramesDepthTex: null as null | RawTexture2DArray,
    depthRenderer: null as DepthRenderer | null,
    depthRenderTarget: null as null | RenderTargetTexture,
    backdropPostProcess: null as null | PostProcess,
    backdropPostProcessEffect: null as null | Effect,
    fxaaPostProcess: null as null | PostProcess,
    // Video shader stuff
    stretchVideoSize: { x: 1, y: 1 },
    stretchVideoGoalSize: { x: 1, y: 1 },
    stretchSceneSize: { x: 1, y: 1 },
    //
    ...mover2dRefs("slatePos", { mass: 41.5, stiffness: 50, damping: 10, friction: 0.35, stopSpeed: 0.003 }),
    ...moverRefs("slateZoom", { mass: 41.5, stiffness: 25, damping: 10, friction: 0.35 }), // NOTE stopSpeed not on 1dMover
    //
    sounds: makeAutomaticSoundStartRefs(soundNames),
    music: makeAutomaticMusicStartRefs(musicNames),
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
    main: getDefaultState(),
  };

  return { startStates, getDefaultState, getDefaultRefs };
}
