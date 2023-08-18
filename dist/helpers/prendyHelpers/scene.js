import delay from "delay";
import { get_characterStoryUtils, get_getCharDollStuff } from "../../helpers/prendyUtils/characters";
import { get_globalUtils } from "../../helpers/prendyUtils/global";
import { get_sceneStoryUtils } from "../../helpers/prendyUtils/scene";
import { get_spotStoryUtils } from "../prendyUtils/spots";
export function get_sceneStoryHelpers(prendyAssets, storeHelpers) {
    const { getRefs, getState, onNextTick, setState } = storeHelpers;
    const { placeInfoByName, characterNames } = prendyAssets;
    const { setGlobalState } = get_globalUtils(storeHelpers);
    const getCharDollStuff = get_getCharDollStuff(storeHelpers);
    const { get2DAngleFromCharacterToSpot } = get_characterStoryUtils(storeHelpers);
    const { doWhenNowCamChanges, doWhenNowSegmentChanges, getSegmentFromStoryRules } = get_sceneStoryUtils(storeHelpers);
    const { getSpotPosition, getSpotRotation } = get_spotStoryUtils(storeHelpers);
    async function changeSegmentAtLoop(_place, newSegmentName) {
        // NOTE WARNING This will probably break if goalSegmentNameAtLoop changes from somewhere else!!!
        // to fix: could listen to changes to goalSegmentNameAtLoop
        // might be fixed now that doWhenNowSegmentChanges listens to any change, instead of waiting for the expected segment name
        // FIXME this can not work? (the async resolve part)
        return new Promise((resolve, _reject) => {
            onNextTick(() => {
                setGlobalState((state) => {
                    const { goalSegmentNameAtLoop } = state;
                    if (goalSegmentNameAtLoop) {
                        // TEMP resolve straight away if there's already a goalSegmentNameAtLoop
                        console.error("there was already a goalSegmentNameAtLoop when running changeSegmentAtLoopAsync");
                        resolve();
                        return {};
                    }
                    doWhenNowSegmentChanges(newSegmentName, () => resolve());
                    return { goalSegmentNameAtLoop: newSegmentName };
                });
            });
        });
    }
    async function changeCameraAtLoop(_place, newCamName) {
        return new Promise((resolve, _reject) => {
            setState((state) => {
                const { goalCamNameAtLoop } = state.global.main;
                if (goalCamNameAtLoop) {
                    // TEMP resolve straight away if there's already a goalCamNameAtLoop
                    console.error("there was already a goalSegmentNameAtLoop when running changeSegmentAtLoopAsync");
                    resolve();
                    return {};
                }
                doWhenNowCamChanges(newCamName, () => resolve());
                return {
                    // AnyCameraName needed if there's only 1 place
                    global: { main: { goalCamNameAtLoop: newCamName } },
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
        // NOTE could update to set properties in a loop to avoid spreading
        setState((state) => ({
            places: {
                [placeName]: { toggledWalls: { ...state.places[placeName].toggledWalls, [wallName]: !isDisabled } },
            },
        }));
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
            //   setGlobalState({ goalSegmentName: segmentName }, () => resolve());
            // } else if (whenToRun === "at loop") {
            changeSegmentAtLoop(_placeName, segmentName).finally(() => resolve());
            // }
        });
    }
    function setCamera(_placeName, cameraName, whenToRun = "now") {
        return new Promise((resolve, _reject) => {
            if (whenToRun === "now") {
                const { nowPlaceName } = getState().global.main;
                const { nowCamName } = getState().global.main;
                // already on that camera
                if (nowCamName === cameraName) {
                    resolve();
                    return;
                }
                // AnyCameraName needed if there's only 1 place
                setState({ global: { main: { goalCamName: cameraName } } }, () => resolve());
            }
            else if (whenToRun === "at loop") {
                changeCameraAtLoop(_placeName, cameraName).finally(() => resolve());
            }
        });
    }
    function goToNewPlace(toOption, charName = characterNames[0]) {
        var _a;
        // NOTE could include waitForPlaceFullyLoaded here so it can be awaited
        let { toSpot, toPlace, toPositon, toCam, toSegment } = toOption;
        const { dollName } = (_a = getCharDollStuff(charName)) !== null && _a !== void 0 ? _a : {};
        console.log("toOption");
        console.log(toOption);
        if (!dollName)
            return;
        onNextTick(() => {
            setState((state) => {
                const newPlaceDefaultCamName = placeInfoByName[toPlace].cameraNames[0];
                const nowSegmentName = state.global.main.nowSegmentName;
                const placeInfo = placeInfoByName[toPlace];
                // toSpot = toSpot ?? (placeInfo.spotNames[0] as SpotNameByPlace[T_PlaceName]);
                toSpot = toSpot; // ?? (placeInfo.spotNames[0] as SpotNameByPlace[T_PlaceName]);
                toPositon = toPositon;
                toCam = toCam !== null && toCam !== void 0 ? toCam : placeInfo.cameraNames[0]; // types as a cam for the chosen place
                toSegment = toSegment !== null && toSegment !== void 0 ? toSegment : placeInfo.segmentNames[0];
                const foundRuleSegmentName = getSegmentFromStoryRules(toPlace, toCam);
                if (foundRuleSegmentName)
                    toSegment = foundRuleSegmentName;
                return {
                    global: {
                        main: {
                            goalPlaceName: toPlace,
                            goalSegmentWhenGoalPlaceLoads: toSegment || nowSegmentName,
                            goalCamWhenNextPlaceLoads: toCam || newPlaceDefaultCamName,
                        },
                    },
                    dolls: { [dollName]: { goalPositionAtNewPlace: toPositon, goalSpotNameAtNewPlace: toSpot } },
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
