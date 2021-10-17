import { makeGlobalStoreUtils } from "../global/utils";
import { makeCameraChangeUtils } from "../../concepts/global/utils/cameraChange";
// const BEFORE_LOOP_PADDING = 0.001; // seconds before video end to do loop
export const BEFORE_LOOP_PADDING = 0.05; // seconds before video end to do loop (50ms)
export function makeGetSectionVidVideo(concepFuncs) {
    const { getRefs, getState } = concepFuncs;
    return function getSectionVidVideo(itemName, vidType = "color") {
        const sectionVidState = getState().sectionVids[itemName];
        const { stackVidId_playing } = sectionVidState;
        if (!stackVidId_playing)
            return;
        const stackVidState = getState().stackVids[stackVidId_playing];
        const { vidAId, vidBId } = stackVidState;
        if (!vidAId || !vidBId)
            return;
        const isDepth = vidType === "depth";
        const colorVidRefs = getRefs().safeVids[isDepth ? vidBId : vidAId];
        return colorVidRefs.videoElement;
    };
}
export function makeSectionVidStoreUtils(concepFuncs, placeInfoByName, dollNames) {
    const { getState, startItemEffect, stopEffect } = concepFuncs;
    const { getGlobalState } = makeGlobalStoreUtils(concepFuncs);
    const getSectionVidVideo = makeGetSectionVidVideo(concepFuncs);
    const { getSafeCamName, getSafeSegmentName } = makeCameraChangeUtils(concepFuncs, placeInfoByName, dollNames);
    // __________________________
    // temporary rules
    async function doWhenSectionVidPlayingAsync(sectionVidId) {
        return new Promise((resolve, _reject) => {
            doWhenSectionVidPlaying(sectionVidId, resolve);
        });
    }
    function doWhenSectionVidStateChanges(sectionVidId, checkShouldRun, callback) {
        const initialVidState = getState().sectionVids[sectionVidId]
            .sectionVidState;
        // console.log(" - - - doWhenSectionVidStateChanges initial", initialVidState);
        if (checkShouldRun(initialVidState)) {
            callback();
            return null;
        }
        const ruleName = "doWhenSectionVidStateChanges" + Math.random() + Math.random();
        startItemEffect({
            name: ruleName,
            onItemEffect: ({ newValue: newVidState }) => {
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
            flow: "sectionVidStateUpdates",
            whenToRun: "subscribe",
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
        const placeSegmentTimesByCamera = placeInfoByName[safePlace]
            .segmentTimesByCamera;
        const typedCamName = safeCam;
        const placeSegmentDurations = placeInfoByName[safePlace].segmentDurations;
        const newTime = placeSegmentTimesByCamera[typedCamName][safeSegmentName];
        const newDuration = placeSegmentDurations[safeSegmentName];
        return {
            time: newTime,
            duration: newDuration,
        };
    }
    // runs on changes to tick, in the checkVideoLoop flow
    function checkForVideoLoop(itemName) {
        var _a, _b;
        // maybe add a check, if the video loop has stayed on beforeDoLoop or beforeChangeSection for too many frames, then do something?
        const itemState = getState().sectionVids[itemName];
        const { nowSection, sectionVidState } = itemState;
        const colorVid = getSectionVidVideo(itemName);
        const depthVid = getSectionVidVideo(itemName, "depth");
        // if (sectionVidState !== "play") {
        //   console.log(sectionVidState);
        // }
        // console.log(colorVid?.currentTime, endTime);
        /*
    
      !nextSegmentNameWhenVidPlays &&
      !nextCamNameWhenVidPlays
      */
        if (
        // sectionVidState === "play" // might've been getting skipped sometimes?
        sectionVidState !== "unloaded" &&
            sectionVidState !== "waitingForUnload") {
            // console.log(sectionVidState);
            const currentTime = (_b = (_a = colorVid === null || colorVid === void 0 ? void 0 : colorVid.currentTime) !== null && _a !== void 0 ? _a : depthVid === null || depthVid === void 0 ? void 0 : depthVid.currentTime) !== null && _b !== void 0 ? _b : 0;
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
                // setState({ sectionVids: { [itemName]: { wantToLoop: true } } }); // global handles setting wantToLoop for sectionVids now :)
                // setState({ global: { main: { wantToLoop: true } } });
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
