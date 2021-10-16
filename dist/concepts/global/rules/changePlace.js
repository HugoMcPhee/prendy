import { Texture } from "@babylonjs/core";
import { CustomVideoTexture } from "../../../utils/babylonjs/CustomVideoTexture/CustomVideoTexture";
import { makeScenePlaneUtils } from "../../../utils/babylonjs/scenePlane";
import { forEach } from "shutils/dist/loops";
import { makeSectionVidStoreUtils } from "../../sectionVids/utils";
import { makeGlobalStoreUtils } from "../utils";
import { makeCameraChangeUtils } from "../utils/cameraChange";
export function makeGlobalChangePlaceRules(conceptoFuncs, gameyConcepts, gameyStartOptions, dollNames, placeInfoByName) {
    const { getRefs, getState, makeRules, setState, onNextTick } = conceptoFuncs;
    const globalRefs = getRefs().global.main;
    const { getSectionVidVideo } = makeSectionVidStoreUtils(conceptoFuncs, placeInfoByName, dollNames);
    const { updateTexturesForNowCamera } = makeCameraChangeUtils(conceptoFuncs, placeInfoByName, dollNames);
    const { focusScenePlaneOnFocusedDoll } = makeScenePlaneUtils(conceptoFuncs, gameyStartOptions);
    const { setGlobalState } = makeGlobalStoreUtils(conceptoFuncs);
    function whenAllVideosLoadedForPlace() {
        var _a, _b;
        const { nowPlaceName } = getState().global.main;
        const { nowCamName } = getState().places[nowPlaceName];
        (_a = globalRefs.colorVideoTex) === null || _a === void 0 ? void 0 : _a.dispose();
        (_b = globalRefs.depthVideoTex) === null || _b === void 0 ? void 0 : _b.dispose();
        const colorVidElement = getSectionVidVideo(nowPlaceName);
        const depthVidElement = getSectionVidVideo(nowPlaceName, "depth");
        if (colorVidElement) {
            globalRefs.colorVideoTex = new CustomVideoTexture("colorVideoTex", colorVidElement, globalRefs.scenes.backdrop, false, false, Texture.TRILINEAR_SAMPLINGMODE, { autoPlay: false, loop: false, autoUpdateTexture: true });
        }
        if (depthVidElement) {
            globalRefs.depthVideoTex = new CustomVideoTexture("depthVideoTex", depthVidElement, globalRefs.scenes.backdrop, false, false, Texture.NEAREST_SAMPLINGMODE, { autoPlay: false, loop: false, autoUpdateTexture: true });
        }
        // focus on the player
        focusScenePlaneOnFocusedDoll();
        // fix for chrome video texture being black / not ready when the video is?
        // (setion vidElement.autoplay or preload true also fixed it, but those can make things less predictable without videos appended on the page )
        updateTexturesForNowCamera(nowCamName); // sometimes it still starts blank
        setState({
            global: {
                main: {
                    loadingOverlayToggled: false,
                    loadingOverlayFullyShowing: false,
                },
            },
        });
    }
    return makeRules((addItemEffect) => ({
        whenPlaceNameChanges: addItemEffect({
            onItemEffect({ newValue: nextPlaceName, itemState: globalState }) {
                if (nextPlaceName === null || globalState.loadingOverlayFullyShowing)
                    return;
                setState({ global: { main: { loadingOverlayToggled: true } } });
            },
            check: { type: "global", prop: "nextPlaceName" },
            flow: "loadNewPlace",
        }),
        whenOverlayFadedOut: addItemEffect({
            onItemEffect({ itemState }) {
                if (!itemState.nextPlaceName)
                    return;
                setState({ global: { main: { readyToSwapPlace: true } } });
            },
            check: {
                type: "global",
                prop: "loadingOverlayFullyShowing",
                becomes: "true",
            },
            flow: "loadNewPlace",
        }),
        whenOverlayToggledOff: addItemEffect({
            onItemEffect() {
                setGlobalState({ loadingOverlayFullyShowing: false });
            },
            check: {
                type: "global",
                prop: "loadingOverlayToggled",
                becomes: "false",
            },
            flow: "loadNewPlace",
        }),
        whenReadyToSwapPlace: addItemEffect({
            onItemEffect({ itemState: globalState }) {
                // run on the start of the next concepto frame, so all the flows can run again
                setState({}, () => {
                    const { nowPlaceName, nextPlaceName } = globalState;
                    const { cameraNames } = placeInfoByName[nowPlaceName];
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
            check: { type: "global", prop: "readyToSwapPlace", becomes: "true" },
            whenToRun: "subscribe",
            flow: "loadNewPlace",
        }),
        whenEverythingsLoaded: addItemEffect({
            onItemEffect({ itemState: globalState }) {
                const { nowPlaceName, newPlaceLoaded, modelNamesLoaded, wantedSegmentWhenNextPlaceLoads, } = globalState;
                const { wantedCamWhenNextPlaceLoads } = getState().places[nowPlaceName];
                const wantedModelsForPlace = gameyStartOptions.modelNamesByPlace[nowPlaceName].sort();
                const loadedModelNames = modelNamesLoaded.sort();
                let allModelsAreLoaded = true;
                forEach(wantedModelsForPlace, (loopedCharacterName) => {
                    if (!loadedModelNames.includes(loopedCharacterName)) {
                        allModelsAreLoaded = false;
                    }
                });
                if (newPlaceLoaded && allModelsAreLoaded) {
                    onNextTick(() => {
                        // onNextTick because sometimes the character position was starting incorrect
                        // (maybe because the place-load story-rules werent reacting because it was the wrong flow)
                        setGlobalState({ isLoadingBetweenPlaces: false });
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
                        onNextTick(() => {
                            whenAllVideosLoadedForPlace();
                        });
                    });
                }
            },
            check: {
                type: "global",
                prop: ["newPlaceLoaded", "modelNamesLoaded"],
            },
            whenToRun: "subscribe",
            flow: "loadNewPlace",
        }),
    }));
}
