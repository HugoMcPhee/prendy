import { mover2dRefs, mover2dState, moverRefs, moverState } from "repond-movers";
import get_globalStoreUtils from "./globalStoreUtils";
export default function global(prendyAssets) {
    const { musicNames, soundNames, placeInfoByName, prendyOptions } = prendyAssets;
    const { makeAutomaticMusicStartRefs, makeAutomaticSoundStartRefs } = get_globalStoreUtils(musicNames, soundNames);
    const placeName = prendyOptions.place;
    // State
    const state = () => {
        var _a, _b, _c, _d;
        return ({
            // place
            nowPlaceName: placeName,
            goalPlaceName: null,
            readyToSwapPlace: false,
            isLoadingBetweenPlaces: true,
            loadingOverlayToggled: true,
            loadingOverlayFullyShowing: true,
            // cameras
            goalCamWhenNextPlaceLoads: null,
            goalCamNameWhenVidPlays: null,
            goalCamNameAtLoop: null,
            goalCamName: null,
            nowCamName: (_c = ((prendyOptions.place === placeName ? prendyOptions.camera : "") ||
                ((_b = (_a = placeInfoByName === null || placeInfoByName === void 0 ? void 0 : placeInfoByName[placeName]) === null || _a === void 0 ? void 0 : _a.cameraNames) === null || _b === void 0 ? void 0 : _b[0]))) !== null && _c !== void 0 ? _c : "testItemCamName",
            // segments and slice video
            nowSegmentName: prendyOptions.segment,
            goalSegmentName: null,
            goalSegmentNameAtLoop: null,
            goalSegmentNameWhenVidPlays: null,
            goalSegmentWhenGoalPlaceLoads: null,
            // changing places
            modelNamesLoaded: [],
            newPlaceModelLoaded: false,
            newPlaceVideosLoaded: false,
            newPlaceProbesLoaded: false,
            //
            // player
            playerCharacter: prendyOptions.playerCharacter,
            gravityValue: 5,
            playerMovingPaused: false,
            focusedDoll: (_d = prendyAssets.characterOptions[prendyOptions.playerCharacter].doll) !== null && _d !== void 0 ? _d : "walker",
            focusedDollIsInView: false,
            //
            // slate
            ...mover2dState("slatePos"),
            ...moverState("slateZoom", {
                value: prendyOptions.zoomLevels.default,
                valueGoal: prendyOptions.zoomLevels.default,
                // springStopSpeed: 0.001, // NOTE not used in mover yet
            }),
            slatePosMoveConfigName: "default",
            //
            // interacting
            timeScreenResized: Date.now(),
            interactButtonPressTime: 0,
            // story
            heldPickups: prendyOptions.heldPickups,
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
            //
            latestSave: null,
            latestLoadTime: 0,
            //
            appBecameVisibleTime: Date.now(),
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
        ...mover2dRefs("slatePos", { mass: 41.5, stiffness: 50, damping: 10, friction: 0.35, stopSpeed: 0.003 }),
        ...moverRefs("slateZoom", { mass: 41.5, stiffness: 25, damping: 10, friction: 0.35 }),
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
