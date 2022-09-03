import { makeTyped_cameraChangeUtils } from "../../stores/global/utils/cameraChange";
import { makeTyped_globalUtils } from "../global/utils/utils";
// const BEFORE_LOOP_PADDING = 0.001; // seconds before video end to do loop
export const BEFORE_LOOP_PADDING = 0.05; // seconds before video end to do loop (50ms)
export function makeTyped_getSectionVidVideo(storeHelpers) {
    const { getRefs, getState } = storeHelpers;
    return function getSectionVidVideo(itemName) {
        const sectionVidState = getState().sectionVids[itemName];
        const { safeVidId_playing } = sectionVidState;
        if (!safeVidId_playing)
            return;
        const backdropVidRefs = getRefs().safeVids[safeVidId_playing];
        return backdropVidRefs.videoElement;
    };
}
export function makeTyped_sectionVidUtils(storeHelpers, prendyAssets) {
    const { getState, startItemEffect, stopEffect } = storeHelpers;
    const { placeInfoByName } = prendyAssets;
    const { getGlobalState } = makeTyped_globalUtils(storeHelpers);
    const getSectionVidVideo = makeTyped_getSectionVidVideo(storeHelpers);
    const { getSafeCamName, getSafeSegmentName } = makeTyped_cameraChangeUtils(storeHelpers, prendyAssets);
    // __________________________
    // temporary rules
    async function doWhenSectionVidPlayingAsync(sectionVidId) {
        return new Promise((resolve, _reject) => {
            doWhenSectionVidPlaying(sectionVidId, resolve);
        });
    }
    function doWhenSectionVidStateChanges(sectionVidId, checkShouldRun, callback) {
        const initialVidState = getState().sectionVids[sectionVidId].sectionVidState;
        // console.log(" - - - doWhenSectionVidStateChanges initial", initialVidState);
        if (checkShouldRun(initialVidState)) {
            callback();
            return null;
        }
        const ruleName = "doWhenSectionVidStateChanges" + Math.random() + Math.random();
        startItemEffect({
            name: ruleName,
            run: ({ newValue: newVidState }) => {
                if (!checkShouldRun(newVidState))
                    return;
                stopEffect(ruleName);
                callback();
            },
            check: {
                type: "sectionVids",
                prop: "sectionVidState",
                name: sectionVidId,
            },
            step: "sectionVidStateUpdates",
            atStepEnd: true,
        });
        return ruleName;
    }
    function doWhenSectionVidPlaying(sectionVidId, callback) {
        return doWhenSectionVidStateChanges(sectionVidId, (newState) => newState === "play", callback);
    }
    function getSectionEndTime(section) {
        return section.time + section.duration - BEFORE_LOOP_PADDING;
    }
    function getSectionForPlace(place, camName, segment) {
        const { nowPlaceName: safePlace } = getGlobalState();
        const safeCam = getSafeCamName(camName);
        if (place !== safePlace) {
            console.warn("tried to getSectionForPlace with non current place", place);
        }
        const safeSegmentName = getSafeSegmentName({
            segment,
            cam: safeCam,
            place: safePlace,
        });
        // NOTE  might be a way to avoid using any but is internal so okay for now
        const placeSegmentTimesByCamera = placeInfoByName[safePlace].segmentTimesByCamera;
        const typedCamName = safeCam;
        const placeSegmentDurations = placeInfoByName[safePlace].segmentDurations;
        const newTime = placeSegmentTimesByCamera[typedCamName][safeSegmentName];
        const newDuration = placeSegmentDurations[safeSegmentName];
        return { time: newTime, duration: newDuration };
    }
    // runs on changes to tick, in the checkVideoLoop flow
    function checkForVideoLoop(itemName) {
        var _a;
        // maybe add a check, if the video loop has stayed on beforeDoLoop or beforeChangeSection for too many frames, then do something?
        const itemState = getState().sectionVids[itemName];
        const { nowSection, sectionVidState } = itemState;
        const backdropVid = getSectionVidVideo(itemName);
        /*
      !nextSegmentNameWhenVidPlays &&
      !nextCamNameWhenVidPlays
      */
        if (
        // sectionVidState === "play" // might've been getting skipped sometimes?
        sectionVidState !== "unloaded" &&
            sectionVidState !== "waitingForUnload") {
            const currentTime = (_a = backdropVid === null || backdropVid === void 0 ? void 0 : backdropVid.currentTime) !== null && _a !== void 0 ? _a : 0;
            const endTime = getSectionEndTime(nowSection);
            const isAtOrAfterEndOfLoop = currentTime >= endTime;
            const isBeforeStartOfLoop = currentTime < nowSection.time; // if the current time is before the video sections start time
            const isAlreadyLoopingOrChangingSection = sectionVidState === "beforeDoLoop" ||
                sectionVidState === "beforeChangeSection" ||
                sectionVidState === "waitingForDoLoop" ||
                sectionVidState === "waitingForChangeSection";
            // sectionVidState === "play"
            // !wantToLoop
            if (!isAlreadyLoopingOrChangingSection) {
                if (isAtOrAfterEndOfLoop || isBeforeStartOfLoop) {
                    // console.log("isAtOrAfterEndOfLoop", isAtOrAfterEndOfLoop);
                    // console.log("isBeforeStartOfLoop", isBeforeStartOfLoop);
                }
            }
            if ((isAtOrAfterEndOfLoop || isBeforeStartOfLoop) &&
                // isAtOrAfterEndOfLoop &&
                !isAlreadyLoopingOrChangingSection) {
                return true;
            }
        }
        return false;
    }
    return {
        getSectionVidVideo,
        doWhenSectionVidPlayingAsync,
        doWhenSectionVidStateChanges,
        doWhenSectionVidPlaying,
        getSectionEndTime,
        getSectionForPlace,
        checkForVideoLoop,
    };
}
