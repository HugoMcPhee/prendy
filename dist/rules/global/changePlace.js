import { Texture } from "@babylonjs/core";
import { forEach } from "chootils/dist/loops";
import { CustomVideoTexture } from "../../helpers/babylonjs/CustomVideoTexture";
import { makeTyped_scenePlaneUtils } from "../../helpers/babylonjs/scenePlane";
import { makeTyped_dollStoryHelpers } from "../../helpers/prendyHelpers/dolls";
import { makeTyped_getCharDollStuff } from "../../helpers/prendyUtils/characters";
import { makeTyped_sectionVidUtils } from "../../helpers/prendyUtils/sectionVids";
import { makeTyped_globalUtils } from "../../helpers/prendyUtils/global";
import { makeTyped_cameraChangeUtils } from "../../helpers/prendyUtils/cameraChange";
export function makeTyped_globalChangePlaceRules(storeHelpers, _prendyStores, prendyStartOptions, prendyAssets) {
    const { getRefs, getState, makeRules, setState, onNextTick } = storeHelpers;
    const { placeInfoByName } = prendyAssets;
    const globalRefs = getRefs().global.main;
    const { getSectionVidVideo } = makeTyped_sectionVidUtils(storeHelpers, prendyAssets);
    const { updateTexturesForNowCamera, updateNowStuffWhenSectionChanged } = makeTyped_cameraChangeUtils(storeHelpers, prendyAssets);
    const { focusScenePlaneOnFocusedDoll } = makeTyped_scenePlaneUtils(storeHelpers, prendyStartOptions);
    const { setGlobalState } = makeTyped_globalUtils(storeHelpers);
    const getCharDollStuff = makeTyped_getCharDollStuff(storeHelpers);
    const { setDollToSpot } = makeTyped_dollStoryHelpers(storeHelpers, prendyStartOptions, prendyAssets.modelInfoByName);
    function setPlayerPositionForNewPlace() {
        const { nowPlaceName, playerCharacter } = getState().global.main;
        const { dollName } = getCharDollStuff(playerCharacter);
        const placeInfo = placeInfoByName[nowPlaceName];
        const { spotNames } = placeInfo;
        const { nextSpotName } = getState().dolls[dollName];
        const newSpotName = nextSpotName || spotNames[0];
        setDollToSpot({
            doll: dollName,
            place: nowPlaceName,
            spot: newSpotName,
        });
    }
    function whenAllVideosLoadedForPlace() {
        var _a;
        const { nowPlaceName } = getState().global.main;
        const { nowCamName } = getState().places[nowPlaceName];
        (_a = globalRefs.backdropVideoTex) === null || _a === void 0 ? void 0 : _a.dispose(); // NOTE maybe don't dispose it?
        const backdropVidElement = getSectionVidVideo(nowPlaceName);
        if (backdropVidElement) {
            globalRefs.backdropVideoTex = new CustomVideoTexture("backdropVideoTex", backdropVidElement, globalRefs.scene, false, false, Texture.TRILINEAR_SAMPLINGMODE, // Texture.NEAREST_SAMPLINGMODE, might be better for depth
            { autoPlay: false, loop: false, autoUpdateTexture: true });
        }
        // focus on the player
        focusScenePlaneOnFocusedDoll();
        // fix for chrome video texture being black / not ready when the video is?
        // (setion vidElement.autoplay or preload true also fixed it, but those can make things less predictable without videos appended on the page )
        updateTexturesForNowCamera(nowCamName, true);
        setState({
            global: {
                main: {
                    loadingOverlayToggled: false,
                    loadingOverlayFullyShowing: false,
                },
            },
        });
    }
    return makeRules(({ itemEffect }) => ({
        whenPlaceNameChanges: itemEffect({
            run({ newValue: nextPlaceName, itemState: globalState }) {
                if (nextPlaceName === null || globalState.loadingOverlayFullyShowing)
                    return;
                setState({ global: { main: { loadingOverlayToggled: true } } });
            },
            check: { type: "global", prop: "nextPlaceName" },
            step: "loadNewPlace",
        }),
        whenOverlayFadedOut: itemEffect({
            run({ itemState }) {
                if (!itemState.nextPlaceName)
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
                // run on the start of the next pietem frame, so all the flows can run again
                setState({}, () => {
                    const { nowPlaceName, nextPlaceName } = globalState;
                    const cameraNames = placeInfoByName[nowPlaceName].cameraNames;
                    const placeRefs = getRefs().places[nowPlaceName];
                    setState({ sectionVids: { [nowPlaceName]: { wantToUnload: true } } });
                    forEach(cameraNames, (camName) => {
                        var _a;
                        const camRef = placeRefs.camsRefs[camName];
                        (_a = camRef.probeTexture) === null || _a === void 0 ? void 0 : _a.dispose();
                        camRef.probeTexture = null;
                    });
                    if (!nextPlaceName)
                        return;
                    setGlobalState({
                        nowPlaceName: nextPlaceName,
                        isLoadingBetweenPlaces: true,
                        newPlaceLoaded: false,
                        nextPlaceName: null,
                        readyToSwapPlace: false,
                    });
                });
            },
            check: { type: "global", prop: "readyToSwapPlace", becomes: true },
            atStepEnd: true,
            step: "loadNewPlace",
        }),
        whenEverythingsLoaded: itemEffect({
            run({ itemState: globalState }) {
                const { nowPlaceName, newPlaceLoaded, modelNamesLoaded, wantedSegmentWhenNextPlaceLoads } = globalState;
                const { wantedCamWhenNextPlaceLoads } = getState().places[nowPlaceName];
                const wantedModelsForPlace = prendyStartOptions.modelNamesByPlace[nowPlaceName].sort();
                const loadedModelNames = modelNamesLoaded.sort();
                let allModelsAreLoaded = true;
                forEach(wantedModelsForPlace, (loopedCharacterName) => {
                    if (!loadedModelNames.includes(loopedCharacterName)) {
                        allModelsAreLoaded = false;
                    }
                });
                if (newPlaceLoaded && allModelsAreLoaded) {
                    onNextTick(() => {
                        if (wantedSegmentWhenNextPlaceLoads) {
                            setGlobalState({
                                wantedSegmentWhenNextPlaceLoads: null,
                                wantedSegmentName: wantedSegmentWhenNextPlaceLoads,
                            });
                        }
                        if (wantedCamWhenNextPlaceLoads) {
                            setState({
                                places: {
                                    [nowPlaceName]: {
                                        wantedCamWhenNextPlaceLoads: null,
                                        wantedCamName: wantedCamWhenNextPlaceLoads,
                                    },
                                },
                            });
                        }
                        setPlayerPositionForNewPlace();
                        // onNextTick because sometimes the character position was starting incorrect
                        // (maybe because the place-load story-rules werent reacting because it was the wrong flow)
                        setGlobalState({ isLoadingBetweenPlaces: false });
                        onNextTick(() => {
                            // when a new place loads it handles checking and clearing nextSegmentNameWhenVidPlays  nextCamNameWhenVidPlays
                            // otheriwse the video wont loop because it thinks its waiting for a section to change
                            // its set to run when a vid starts playing, but its missing it , maybe because the new vid playing property is updating before theres a wanted next cam etc,
                            //or maybe to do with the flow order
                            updateNowStuffWhenSectionChanged();
                            whenAllVideosLoadedForPlace();
                        });
                    });
                }
            },
            check: {
                type: "global",
                prop: ["newPlaceLoaded", "modelNamesLoaded"],
            },
            atStepEnd: true,
            step: "loadNewPlace",
        }),
    }));
}