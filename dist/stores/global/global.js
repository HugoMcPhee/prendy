import { mover2dRefs, mover2dState, moverRefs, moverState } from "repond-movers";
import get_globalStoreUtils from "./globalStoreUtils";
export default function global(prendyStartOptions, prendyAssets) {
    const { musicNames, soundNames } = prendyAssets;
    const { makeAutomaticMusicStartRefs, makeAutomaticSoundStartRefs } = get_globalStoreUtils(musicNames, soundNames);
    // State
    const state = () => {
        var _a;
        return ({
            // segments and section video
            wantedSegmentWhenNextPlaceLoads: null,
            nextSegmentNameWhenVidPlays: null,
            wantedSegmentNameAtLoop: null,
            wantedSegmentName: null,
            nowSegmentName: prendyStartOptions.segment,
            wantToLoop: false,
            // TODO? move nowCamName etc to here, since never change cam for non-now place
            //
            // changing places
            modelNamesLoaded: [],
            newPlaceLoaded: false,
            isLoadingBetweenPlaces: true,
            nowPlaceName: prendyStartOptions.place,
            readyToSwapPlace: false,
            nextPlaceName: null,
            loadingOverlayToggled: true,
            loadingOverlayFullyShowing: true,
            //
            // player
            playerCharacter: prendyStartOptions.playerCharacter,
            gravityValue: 5,
            playerMovingPaused: false,
            focusedDoll: (_a = prendyAssets.characterOptions[prendyStartOptions.playerCharacter].doll) !== null && _a !== void 0 ? _a : "walker",
            focusedDollIsInView: false,
            //
            // scene plane
            ...mover2dState("planePos"),
            ...moverState("planeZoom", {
                value: prendyStartOptions.zoomLevels.default,
                valueGoal: prendyStartOptions.zoomLevels.default,
                // springStopSpeed: 0.001, // NOTE not used in mover yet
            }),
            planePosMoveConfigName: "default",
            //
            // interacting
            timeScreenResized: Date.now(),
            interactButtonPressTime: 0,
            // story
            heldPickups: prendyStartOptions.heldPickups,
            storyOverlayToggled: false,
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
    };
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
        backdropSize: { width: 1280, height: 720 },
        stretchVideoSize: { x: 1, y: 1 },
        stretchVideoGoalSize: { x: 1, y: 1 },
        stretchSceneSize: { x: 1, y: 1 },
        //
        ...mover2dRefs("planePos", { mass: 41.5, stiffness: 50, damping: 10, friction: 0.35, stopSpeed: 0.003 }),
        ...moverRefs("planeZoom", { mass: 41.5, stiffness: 25, damping: 10, friction: 0.35 }),
        //
        sounds: makeAutomaticSoundStartRefs(),
        music: makeAutomaticMusicStartRefs(),
        musicEffects: {
            lowPass: null,
            compress: null,
            extraGain: null,
        },
        //
        isHoveringPickupButton: false,
        isHoveringVirtualStickArea: true,
        //
        solidParticleSystems: {},
        //
        // Temporary
        timerSpeed: 1,
        //
        aConvoIsHappening_timeout: null,
        //
        camSegmentRulesOptions: null,
        // onPickupButtonClick: null as null | ((pickupName: PickupName) => void), // what to do when pressing the pickup button
        onPickupButtonClick: null, // what to do when pressing the pickup button
    });
    // const startStates: InitialItemsState<typeof state> = {
    const startStates = {
        main: state(),
    };
    return { startStates, state, refs };
}
