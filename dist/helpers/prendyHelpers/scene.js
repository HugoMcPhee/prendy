import delay from "delay";
import { makeTyped_getCharDollStuff } from "../../helpers/prendyUtils/characters";
import { makeTyped_globalUtils } from "../../helpers/prendyUtils/global";
import { makeTyped_characterStoryUtils } from "../../helpers/prendyUtils/characters";
import { makeTyped_sceneStoryUtils } from "../../helpers/prendyUtils/scene";
export function makeTyped_sceneStoryHelpers(storeHelpers, placeInfoByName, characterNames) {
    const { getRefs, getState, onNextTick, setState } = storeHelpers;
    const { setGlobalState } = makeTyped_globalUtils(storeHelpers);
    const getCharDollStuff = makeTyped_getCharDollStuff(storeHelpers);
    const { get2DAngleFromCharacterToSpot } = makeTyped_characterStoryUtils(storeHelpers);
    const { doWhenNowCamChanges, doWhenNowSegmentChanges, getSegmentFromStoryRules } = makeTyped_sceneStoryUtils(storeHelpers);
    async function changeSegmentAtLoop(_place, newSegmentName) {
        // NOTE WARNING This will probably break if wantedSegmentNameAtLoop changes from somewhere else!!!
        // to fix: could listen to changes to wantedSegmentNameAtLoop
        // might be fixed now that doWhenNowSegmentChanges listens to any change, instead of waiting for the expected segment name
        // FIXME this can not work? (the async resolve part)
        return new Promise((resolve, _reject) => {
            onNextTick(() => {
                setGlobalState((state) => {
                    const { wantedSegmentNameAtLoop } = state;
                    if (wantedSegmentNameAtLoop) {
                        // TEMP resolve straight away if there's already a wantedSegmentNameAtLoop
                        console.error("there was already a wantedSegmentNameAtLoop when running changeSegmentAtLoopAsync");
                        resolve();
                        return {};
                    }
                    doWhenNowSegmentChanges(newSegmentName, () => resolve());
                    return { wantedSegmentNameAtLoop: newSegmentName };
                });
            });
        });
    }
    async function changeCameraAtLoop(_place, newCamName) {
        return new Promise((resolve, _reject) => {
            setState((state) => {
                const { nowPlaceName } = state.global.main;
                const { wantedCamNameAtLoop } = state.places[nowPlaceName];
                if (wantedCamNameAtLoop) {
                    // TEMP resolve straight away if there's already a wantedCamNameAtLoop
                    console.error("there was already a wantedSegmentNameAtLoop when running changeSegmentAtLoopAsync");
                    resolve();
                    return {};
                }
                doWhenNowCamChanges(newCamName, () => resolve());
                return {
                    places: {
                        [nowPlaceName]: {
                            wantedCamNameAtLoop: newCamName,
                        }, // AnyCameraName needed if there's only 1 place
                    },
                };
            });
        });
    }
    function lookAtSpot(place, spot, character) {
        const { playerCharacter } = getState().global.main;
        const editedCharacter = character !== null && character !== void 0 ? character : playerCharacter;
        const charDollStuff = getCharDollStuff(editedCharacter);
        const { dollName } = charDollStuff;
        const angle = get2DAngleFromCharacterToSpot(editedCharacter, place, spot);
        setState({ dolls: { [dollName]: { rotationYGoal: angle } } });
    }
    function hideWallIf(placeName, wallName, isDisabled) {
        const placeRefs = getRefs().places[placeName];
        const wallMesh = placeRefs.wallMeshes[wallName];
        if (wallMesh)
            wallMesh.checkCollisions = !isDisabled;
    }
    async function showStoryView(isVisible = true) {
        const GUESSED_FADE_TIME = 1000; // note could listen to something like isFullyFaded and return here, but maybe a set time is okay
        setGlobalState({ storyOverlayToggled: !isVisible });
        await delay(GUESSED_FADE_TIME);
    }
    function setSegment(_placeName, segmentName
    // whenToRun: "now" | "at loop" = "at loop"
    ) {
        return new Promise((resolve, _reject) => {
            // always sets segment at loop sicne it probably shouldn't change halfway through
            // if (whenToRun === "now") {
            //   const { nowSegmentName } = getState().global.main;
            //   if (nowSegmentName === segmentName) {
            //     console.warn("already on that segment");
            //     resolve();
            //     return;
            //   }
            //   setGlobalState({ wantedSegmentName: segmentName }, () => resolve());
            // } else if (whenToRun === "at loop") {
            changeSegmentAtLoop(_placeName, segmentName).finally(() => resolve());
            // }
        });
    }
    function setCamera(_placeName, cameraName, whenToRun = "now") {
        return new Promise((resolve, _reject) => {
            if (whenToRun === "now") {
                const { nowPlaceName } = getState().global.main;
                const { nowCamName } = getState().places[nowPlaceName];
                // already on that camera
                if (nowCamName === cameraName) {
                    resolve();
                    return;
                }
                setState({
                    places: {
                        [nowPlaceName]: { wantedCamName: cameraName }, // AnyCameraName needed if there's only 1 place
                    },
                }, () => resolve());
            }
            else if (whenToRun === "at loop") {
                changeCameraAtLoop(_placeName, cameraName).finally(() => resolve());
            }
        });
    }
    function goToNewPlace(toOption, charName = characterNames[0]) {
        var _a;
        let { toSpot, toPlace, toCam, toSegment } = toOption;
        const { dollName } = (_a = getCharDollStuff(charName)) !== null && _a !== void 0 ? _a : {};
        if (!dollName)
            return;
        onNextTick(() => {
            setState((state) => {
                const newPlaceNowCamName = state.places[toPlace].nowCamName;
                const nowSegmentName = state.global.main.nowSegmentName;
                const placeInfo = placeInfoByName[toPlace];
                toSpot = toSpot !== null && toSpot !== void 0 ? toSpot : placeInfo.spotNames[0];
                toCam = toCam !== null && toCam !== void 0 ? toCam : placeInfo.cameraNames[0]; // types as a cam for the chosen place
                toSegment = toSegment !== null && toSegment !== void 0 ? toSegment : placeInfo.segmentNames[0];
                const foundRuleSegmentName = getSegmentFromStoryRules(toPlace, toCam);
                if (foundRuleSegmentName) {
                    toSegment = foundRuleSegmentName;
                }
                return {
                    global: {
                        main: {
                            nextPlaceName: toPlace,
                            wantedSegmentWhenNextPlaceLoads: toSegment || nowSegmentName,
                        },
                    },
                    // Note might need to check , if the place rules reacts to nowCamName changing, but maybe shouldnt while changing place
                    places: {
                        [toPlace]: {
                            wantedCamWhenNextPlaceLoads: toCam || newPlaceNowCamName,
                        },
                    },
                    dolls: { [dollName]: { nextSpotName: toSpot } },
                };
            });
        });
    }
    // ideas
    // disable/enable camCubes ?
    // start/stop characterFollowinglayer ?
    return {
        // changeSegmentAtLoop,
        // changeCameraAtLoop,
        lookAtSpot,
        hideWallIf,
        showStoryView,
        setSegment,
        setCamera,
        goToNewPlace,
    };
}
