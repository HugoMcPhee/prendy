import { mover2dRefs, mover2dState, moverRefs, moverState } from "repond-movers";
import get_globalStoreUtils from "./globalStoreUtils";
export const timeStatePath = ["global", "main", "elapsedGameTime"];
export default function global(prendyAssets) {
    const { musicNames, soundNames, placeInfoByName, prendyOptions } = prendyAssets;
    const { makeAutomaticMusicStartRefs, makeAutomaticSoundStartRefs } = get_globalStoreUtils(musicNames, soundNames);
    const placeName = prendyOptions.place;
    // State
    const state = () => ({
        // place
        nowPlaceName: placeName,
        goalPlaceName: null,
        readyToSwapPlace: false,
        isLoadingBetweenPlaces: true,
        loadingOverlayToggled: true,
        loadingOverlayFullyShowing: true,
        // cameras
        goalCamWhenNextPlaceLoads: null,
        goalCamNameWhenVidPlays: null, // near the start of a frame, when the slice vid has finished changing, this is used as the new nowCamName
        goalCamNameAtLoop: null,
        goalCamName: null, // NOTE always set goalCamName? and never nowCamName? to prepare everything first?
        nowCamName: ((prendyOptions.place === placeName ? prendyOptions.camera : "") ||
            placeInfoByName?.[placeName]?.cameraNames?.[0]) ??
            "testItemCamName", // if state() is called with a random itemName
        // segments and slice video
        nowSegmentName: prendyOptions.segment,
        goalSegmentName: null,
        goalSegmentNameAtLoop: null,
        goalSegmentNameWhenVidPlays: null, // near the start of a frame, when the slice vid has finished changing, this is used as the new nowSegmentName
        goalSegmentWhenGoalPlaceLoads: null,
        // changing places
        modelNamesLoaded: [],
        newPlaceModelLoaded: false,
        newPlaceVideosLoaded: false,
        newPlaceProbesLoaded: false,
        //
        // player
        playerCharacter: prendyOptions.playerCharacter, // TODO Move to players ?
        gravityValue: 5,
        playerMovingPaused: false, // to be able to prevent moving while theres a cutscene for example
        focusedDoll: prendyAssets.characterOptions[prendyOptions.playerCharacter].doll ?? "walker",
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
        heldPickups: prendyOptions.heldPickups,
        storyOverlayToggled: false, // so the screen can fade out without affecting loading a new place
        alarmTextIsVisible: false,
        alarmText: "⚠ wobble detected ⚠",
        //
        // meta
        aSpeechBubbleIsShowing: false,
        aConvoIsHappening: false,
        //
        frameTick: 0,
        timeMode: "game",
        elapsedGameTime: 0,
        elapsedPauseTime: 0,
        elapsedMiniGameTime: 0, // when not in the pause menu or the main game
        isGamePaused: false,
        gameTimeSpeed: prendyOptions.gameTimeSpeed,
        gameIsInBackground: false,
        //
        debugMessage: "",
        //
        latestSave: null,
        latestLoadTime: 0, // so things can be initialed after loading state, like isVisible
        //
    });
    // Refs
    const refs = () => ({
        scene: null,
        backdropVideoTex: null,
        depthRenderer: null,
        depthRenderTarget: null,
        backdropPostProcess: null,
        backdropPostProcessEffect: null,
        fxaaPostProcess: null,
        //
        backdropSize: { width: 1920, height: 1080 },
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
            lowPass: null,
            compress: null,
            extraGain: null,
        },
        //
        solidParticleSystems: {},
        //
        // Temporary
        timerSpeed: 1,
        //
        aConvoIsHappening_timeout: null,
        //
        camSegmentRulesOptions: null, // NOTE if using the typed version,  might need to define it in consts to remove cyclic dependancy
        // onPickupButtonClick: null as null | ((pickupName: PickupName) => void), // what to do when pressing the pickup button
        onPickupButtonClick: null, // what to do when pressing the pickup button
    });
    // const startStates: InitialItemsState<typeof state> = {
    const startStates = {
        main: state(),
    };
    return { startStates, state, refs };
}
