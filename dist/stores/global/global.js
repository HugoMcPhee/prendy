import { mover2dRefs, mover2dState, moverRefs, moverState } from "pietem-movers";
import { makeTyped_globalStoreUtils } from "./utils/globalStoreUtils";
export default function global(prendyStartOptions, prendyAssets) {
    const { musicNames, soundNames } = prendyAssets;
    const { makeAutomaticMusicStartRefs, makeAutomaticSoundStartRefs } = makeTyped_globalStoreUtils(musicNames, soundNames);
    console.log("characterOptions[prendyStartOptions.playerCharacter].dollName");
    console.log(prendyAssets.characterOptions[prendyStartOptions.playerCharacter].doll);
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
            frameTick: Date.now(),
            //
            debugMessage: "",
        });
    };
    // Refs
    const refs = () => ({
        backdropVideoTex: null,
        //
        scenes: {
            main: null,
            backdrop: null,
        },
        depthRenderer: null,
        //
        sceneRenderTarget: null,
        depthRenderTarget: null,
        scenePlane: null,
        scenePlaneMaterial: null,
        scenePlaneCamera: null,
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
        onPickupButtonClick: null,
        //
        hasAlreadyStartedRuningBeforeChangeSectionThisFrame: false,
    });
    // const startStates: InitialItemsState<typeof state> = {
    const startStates = {
        main: state(),
    };
    return { startStates, state, refs };
}
