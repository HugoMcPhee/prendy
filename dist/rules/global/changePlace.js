import { Texture } from "@babylonjs/core";
import { forEach } from "chootils/dist/loops";
import { CustomVideoTexture } from "../../helpers/babylonjs/CustomVideoTexture";
import { get_slateUtils } from "../../helpers/babylonjs/slate";
import { get_dollStoryHelpers } from "../../helpers/prendyHelpers/dolls";
import { get_cameraChangeUtils } from "../../helpers/prendyUtils/cameraChange";
import { get_getCharDollStuff } from "../../helpers/prendyUtils/characters";
import { get_globalUtils } from "../../helpers/prendyUtils/global";
import { get_sliceVidUtils } from "../../helpers/prendyUtils/sliceVids";
export function get_globalChangePlaceRules(storeHelpers, _prendyStores, prendyStartOptions, prendyAssets) {
    const { getRefs, getState, makeRules, setState, onNextTick } = storeHelpers;
    const { placeInfoByName } = prendyAssets;
    const globalRefs = getRefs().global.main;
    const { getSliceVidVideo: getSliceVidVideo } = get_sliceVidUtils(storeHelpers, prendyStartOptions, prendyAssets);
    const { updateTexturesForNowCamera, updateNowStuffWhenSliceChanged } = get_cameraChangeUtils(storeHelpers, prendyStartOptions, prendyAssets);
    const { focusSlateOnFocusedDoll } = get_slateUtils(storeHelpers, prendyStartOptions);
    const { setGlobalState } = get_globalUtils(storeHelpers);
    const getCharDollStuff = get_getCharDollStuff(storeHelpers);
    const { setDollToSpot } = get_dollStoryHelpers(storeHelpers, prendyStartOptions, prendyAssets.modelInfoByName);
    function setPlayerPositionForNewPlace() {
        const { nowPlaceName, playerCharacter } = getState().global.main;
        const { dollName } = getCharDollStuff(playerCharacter);
        const placeInfo = placeInfoByName[nowPlaceName];
        const { spotNames } = placeInfo;
        const { goalSpotName } = getState().dolls[dollName];
        const newSpotName = goalSpotName || spotNames[0];
        setDollToSpot({ doll: dollName, place: nowPlaceName, spot: newSpotName });
    }
    function whenAllVideosLoadedForPlace() {
        var _a;
        const { nowPlaceName } = getState().global.main;
        (_a = globalRefs.backdropVideoTex) === null || _a === void 0 ? void 0 : _a.dispose(); // NOTE maybe don't dispose it?
        const backdropVidElement = getSliceVidVideo(nowPlaceName);
        if (backdropVidElement) {
            globalRefs.backdropVideoTex = new CustomVideoTexture("backdropVideoTex", backdropVidElement, globalRefs.scene, false, false, Texture.TRILINEAR_SAMPLINGMODE, // Texture.NEAREST_SAMPLINGMODE, might be better for depth
            { autoPlay: false, loop: false, autoUpdateTexture: true });
        }
    }
    return makeRules(({ itemEffect }) => ({
        whenPlaceNameChanges: itemEffect({
            run({ newValue: goalPlaceName, itemState: globalState }) {
                if (goalPlaceName === null || globalState.loadingOverlayFullyShowing)
                    return;
                setState({ global: { main: { loadingOverlayToggled: true } } });
            },
            check: { type: "global", prop: "goalPlaceName" },
            step: "loadNewPlace",
        }),
        whenOverlayFadedOut: itemEffect({
            run({ itemState }) {
                if (!itemState.goalPlaceName)
                    return;
                setState({ global: { main: { readyToSwapPlace: true } } });
            },
            check: {
                type: "global",
                prop: "loadingOverlayFullyShowing",
                becomes: true,
            },
            step: "loadNewPlace",
        }),
        whenOverlayToggledOff: itemEffect({
            run() {
                setGlobalState({ loadingOverlayFullyShowing: false });
            },
            check: {
                type: "global",
                prop: "loadingOverlayToggled",
                becomes: false,
            },
            step: "loadNewPlace",
        }),
        whenReadyToSwapPlace: itemEffect({
            run({ itemState: globalState }) {
                // run on the start of the next repond frame, so all the flows can run again
                setState({}, () => {
                    const { nowPlaceName, goalPlaceName } = globalState;
                    const cameraNames = placeInfoByName[nowPlaceName].cameraNames;
                    const placeRefs = getRefs().places[nowPlaceName];
                    setState({ sliceVids: { [nowPlaceName]: { wantToUnload: true } } });
                    forEach(cameraNames, (camName) => {
                        var _a;
                        const camRef = placeRefs.camsRefs[camName];
                        (_a = camRef.probeTexture) === null || _a === void 0 ? void 0 : _a.dispose();
                        camRef.probeTexture = null;
                    });
                    if (!goalPlaceName)
                        return;
                    setGlobalState({
                        nowPlaceName: goalPlaceName,
                        isLoadingBetweenPlaces: true,
                        newPlaceVideosLoaded: false,
                        newPlaceProbesLoaded: false,
                        newPlaceModelLoaded: false,
                        goalPlaceName: null,
                        readyToSwapPlace: false,
                    });
                    const { nowCamName, goalCamWhenNextPlaceLoads } = getState().global.main;
                    setState({
                        global: { main: { nowCamName: goalCamWhenNextPlaceLoads !== null && goalCamWhenNextPlaceLoads !== void 0 ? goalCamWhenNextPlaceLoads : nowCamName } },
                    });
                });
            },
            check: { type: "global", prop: "readyToSwapPlace", becomes: true },
            atStepEnd: true,
            step: "loadNewPlace",
        }),
        whenEverythingsLoaded: itemEffect({
            run({ itemState: globalState }) {
                const { nowPlaceName, newPlaceVideosLoaded, newPlaceProbesLoaded, modelNamesLoaded, goalSegmentWhenGoalPlaceLoads, } = globalState;
                const { goalCamWhenNextPlaceLoads } = getState().global.main;
                const wantedModelsForPlace = prendyStartOptions.modelNamesByPlace[nowPlaceName].sort();
                const loadedModelNames = modelNamesLoaded.sort();
                let allModelsAreLoaded = true;
                forEach(wantedModelsForPlace, (loopedCharacterName) => {
                    if (!loadedModelNames.includes(loopedCharacterName))
                        allModelsAreLoaded = false;
                });
                // when a new place loads it handles checking and clearing
                // goalSegmentNameWhenVidPlays & goalCamNameWhenVidPlays
                // otheriwse the video wont loop because it thinks its waiting for a slice to change
                if (newPlaceVideosLoaded) {
                    if (goalSegmentWhenGoalPlaceLoads) {
                        setGlobalState({
                            goalSegmentWhenGoalPlaceLoads: null,
                            goalSegmentName: goalSegmentWhenGoalPlaceLoads,
                        });
                    }
                    if (goalCamWhenNextPlaceLoads) {
                        setState({
                            global: {
                                main: {
                                    goalCamWhenNextPlaceLoads: null,
                                    goalCamName: goalCamWhenNextPlaceLoads,
                                },
                            },
                        });
                    }
                    onNextTick(() => {
                        if (newPlaceVideosLoaded && newPlaceProbesLoaded && allModelsAreLoaded) {
                            setPlayerPositionForNewPlace();
                            // onNextTick because sometimes the character position was starting incorrect
                            // (maybe because the place-load story-rules werent reacting because it was the wrong flow)
                            setGlobalState({ isLoadingBetweenPlaces: false });
                            onNextTick(() => {
                                const { nowCamName } = getState().global.main;
                                updateNowStuffWhenSliceChanged();
                                whenAllVideosLoadedForPlace();
                                updateTexturesForNowCamera(nowCamName, true);
                                focusSlateOnFocusedDoll(); // focus on the player
                                // Start fading in the scene
                                setState({ global: { main: { loadingOverlayToggled: false, loadingOverlayFullyShowing: false } } });
                            });
                        }
                    });
                }
            },
            check: {
                type: "global",
                prop: ["newPlaceVideosLoaded", "newPlaceProbesLoaded", "modelNamesLoaded"],
            },
            atStepEnd: true,
            step: "loadNewPlace",
        }),
    }));
}
