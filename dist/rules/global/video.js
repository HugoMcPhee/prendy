import { get_speechStoryHelpers } from "../../helpers/prendyHelpers/speech";
import { get_cameraChangeUtils } from "../../helpers/prendyUtils/cameraChange";
import { get_sliceVidUtils } from "../../helpers/prendyUtils/sliceVids";
export function get_globalVideoRules(prendyAssets, prendyStores, storeHelpers) {
    const { getRefs, getState, makeRules, setState, onNextTick } = storeHelpers;
    const { getSliceForPlace, getSliceVidVideo, getSliceVidWaitingVideo, checkForVideoLoop, checkIfVideoAlreadyChanging, } = get_sliceVidUtils(prendyAssets, storeHelpers);
    const { getSafeSegmentName, updateTexturesForNowCamera, updateNowStuffWhenSliceChanged } = get_cameraChangeUtils(prendyAssets, storeHelpers);
    return makeRules(({ itemEffect, effect }) => ({
        whenWantToChooseVideoSlice: effect({
            run() {
                const { nowPlaceName, nowSegmentName, goalSegmentName, goalSegmentNameAtLoop, goalSegmentNameWhenVidPlays, goalPlaceName, // checking this as a very early way to know if its loading a new place, goToNewPlace , which sets goalSegmentName and goalCamName also sets goalPlaceName
                isLoadingBetweenPlaces, } = getState().global.main;
                const { goalCamNameWhenVidPlays, goalCamNameAtLoop, goalCamName, nowCamName } = getState().global.main;
                const { sliceVidState, goalSlice, wantToLoop, switchSlice_keepProgress } = getState().sliceVids[nowPlaceName];
                const videoIsOutsideOfCurrentLoop = checkForVideoLoop(nowPlaceName);
                const videoIsAlreadyChanging = checkIfVideoAlreadyChanging(nowPlaceName);
                // do all the deciding slice logic in here!
                // all other goal values get cleared each time
                let new_goalSegmentNameAtLoop = goalSegmentNameAtLoop;
                let new_goalCamNameAtLoop = goalCamNameAtLoop;
                let new_goalCamName = goalCamName;
                let new_goalSegmentName = goalSegmentName;
                let new_wantToLoop = videoIsOutsideOfCurrentLoop && !videoIsAlreadyChanging;
                let new_shouldKeepTime = true;
                let new_goalSlice = null;
                const alreadyWaitingForASliceToChange = goalSegmentNameWhenVidPlays || goalCamNameWhenVidPlays;
                // if there's a goalPlaceName, so its starting to load the next-place
                if (goalPlaceName) {
                    // NOTE , might still want to loop the videos when it's loading a new place ?
                    // but it should fade out so hopefully don't need to, it might just show a little bit of the next part of the video while fading , but it can be fixed here if wanted
                    if (alreadyWaitingForASliceToChange) {
                        setState({
                            global: {
                                main: {
                                    goalSegmentNameAtLoop: null,
                                    goalSegmentNameWhenVidPlays: null,
                                    goalCamNameAtLoop: null,
                                    goalCamNameWhenVidPlays: null,
                                },
                            },
                            sliceVids: { [nowPlaceName]: { goalSlice: null, wantToLoop: false } },
                        });
                    }
                    return;
                }
                if (sliceVidState === "waitingForLoad" || isLoadingBetweenPlaces)
                    return;
                // right now it skips this if its waiting for a slice change
                // this goal stuff should be checked every frame, then it will update when it's ready!
                if (alreadyWaitingForASliceToChange)
                    return;
                if (videoIsOutsideOfCurrentLoop && (goalCamNameAtLoop || goalSegmentNameAtLoop)) {
                    // it should now go to a new slice from the goal segment or cam at loop
                    new_goalCamName = goalCamName || goalCamNameAtLoop;
                    new_goalSegmentName = goalSegmentName || goalSegmentNameAtLoop;
                    new_goalCamNameAtLoop = null;
                    new_goalSegmentNameAtLoop = null;
                }
                if (new_goalSegmentName || new_goalCamName) {
                    // it'll definately be a goalSlice next
                    // set the other value if its undefined
                    new_goalCamName = new_goalCamName || nowCamName;
                    new_goalSegmentName = new_goalSegmentName || nowSegmentName;
                    // make sure its a safe segment
                    // TODO retype intital state to have segments as strings
                    new_goalSegmentName = getSafeSegmentName({
                        cam: new_goalCamName,
                        place: nowPlaceName,
                        segment: new_goalSegmentName,
                        useStorySegmentRules: true, // NOTE this could mess with things when manually chaning segment
                    });
                    // if either the decided segment or camera is different to the now segment and camera
                    if (!(new_goalCamName === nowCamName && new_goalSegmentName === nowSegmentName)) {
                        new_goalSlice = getSliceForPlace(nowPlaceName, new_goalCamName, new_goalSegmentName // new_goalSegmentName should always be decided here
                        );
                        new_wantToLoop = false;
                    }
                }
                // if changing segments, don't keep the duration of the currently playing slice (which is good for changing cameras and keeping the same loop at different angles)
                if (new_goalSegmentName !== nowSegmentName) {
                    new_shouldKeepTime = false;
                }
                if (videoIsOutsideOfCurrentLoop && !new_goalCamName && !new_goalSegmentName) {
                    // it'll definately be a wantToLoop
                    new_wantToLoop = true;
                    new_goalSlice = null;
                }
                // set State for global and sliceVids
                const somethingChanged = goalSegmentName !== null ||
                    new_goalSegmentNameAtLoop !== goalSegmentNameAtLoop ||
                    new_goalSegmentName !== goalSegmentNameWhenVidPlays ||
                    goalCamName !== null ||
                    new_goalCamNameAtLoop !== goalCamNameAtLoop ||
                    new_goalCamName !== goalCamNameWhenVidPlays ||
                    new_goalSlice !== goalSlice ||
                    new_wantToLoop !== wantToLoop ||
                    new_shouldKeepTime !== switchSlice_keepProgress;
                if (!somethingChanged)
                    return;
                setState({
                    global: {
                        main: {
                            goalSegmentName: null,
                            goalSegmentNameAtLoop: new_goalSegmentNameAtLoop,
                            goalSegmentNameWhenVidPlays: new_goalSegmentName,
                            goalCamName: null,
                            goalCamNameAtLoop: new_goalCamNameAtLoop,
                            goalCamNameWhenVidPlays: new_goalCamName,
                        },
                    },
                    sliceVids: {
                        [nowPlaceName]: {
                            goalSlice: new_goalSlice,
                            wantToLoop: new_wantToLoop,
                            switchSlice_keepProgress: new_shouldKeepTime,
                        },
                    },
                });
            },
            // check every frame so it can handle goal things that didnt get set yet because there was already a waiting slice vid!
            check: { type: ["global"], name: ["main"], prop: ["frameTick"] },
            step: "chooseVideoSlice",
            // atStepEnd: true, // NOTE changed this recently
        }),
        whenSliceVidChangedAndWantToUpdateNowCamAndSegment: itemEffect({
            run: () => updateNowStuffWhenSliceChanged(),
            check: { type: "sliceVids", prop: ["newPlayingVidStartedTime"] },
            step: "sliceVidStateUpdates",
            atStepEnd: true,
        }),
        // note no setState's done in here so its running on subscribe
        whenNowCameraChanges: effect({
            run(diffInfo) {
                const globalState = getState().global.main;
                const { goalPlaceName } = globalState;
                if (goalPlaceName !== null)
                    return;
                const { nowCamName } = getState().global.main;
                const globalChangedBools = diffInfo.propsChangedBool.global.main;
                const placeChanged = globalChangedBools === null || globalChangedBools === void 0 ? void 0 : globalChangedBools.nowPlaceName;
                const cameraChanged = globalChangedBools === null || globalChangedBools === void 0 ? void 0 : globalChangedBools.nowCamName;
                if (!cameraChanged && !placeChanged)
                    return;
                // if the place or camera changed
                updateTexturesForNowCamera(nowCamName);
            },
            check: { prop: ["nowCamName"], type: ["global"] },
            step: "cameraChange",
            atStepEnd: true,
        }),
        // __________________
        // Changing segments
        // NOTE FIXME TODO WARNING - this might not be still okay to use
        // it might be okay to run when nowCamName changed (since it always swaps the video between a-b vid_wait to vid_play
        whenPlayingVidElementsChanged: itemEffect({
            run({ itemName: videoPlaceName }) {
                var _a;
                // so video texture updates for looping vids (and when slice changes)
                const { nowPlaceName } = getState().global.main;
                const globalRefs = getRefs().global.main;
                if (videoPlaceName !== nowPlaceName)
                    return;
                const backdropVidElement = getSliceVidVideo(nowPlaceName);
                if (!backdropVidElement)
                    return;
                (_a = globalRefs.backdropVideoTex) === null || _a === void 0 ? void 0 : _a.updateVid(backdropVidElement);
            },
            check: { type: "sliceVids", prop: "newPlayingVidStartedTime" },
            step: "cameraChange",
            atStepEnd: true,
        }),
        whenReturnedFromBackground: itemEffect({
            run({ newValue: appBecameVisibleTime }) {
                console.log("appBecameVisibleTime", appBecameVisibleTime);
                // if any state vids should be playing (in state) then play the video
                const { nowPlaceName } = getState().global.main;
                const globalRefs = getRefs().global.main;
                const backdropVidElement = getSliceVidVideo(nowPlaceName);
                const backdropVidElementWaiting = getSliceVidWaitingVideo(nowPlaceName);
                if (!backdropVidElement || !backdropVidElementWaiting)
                    return;
                // check the vidState of the now playing slice vid
                const sliceVidState = getState().sliceVids[nowPlaceName];
                const { stateVidId_playing } = sliceVidState;
                if (!stateVidId_playing)
                    return;
                // check if the state video for stateVidId_playing should be playing
                const stateVidState = getState().stateVids[stateVidId_playing];
                // check if the video element is currently playing
                const isPlaying = !backdropVidElement.paused;
                const isPlayingWait = !backdropVidElementWaiting.paused;
                const logText = ["isPlaying", isPlaying, "isPlayingWait", isPlayingWait, sliceVidState.sliceVidState].join(" ");
                const { showAlarmText } = get_speechStoryHelpers(prendyAssets, prendyStores, storeHelpers);
                // (stateVidState.vidState === "play" || stateVidState.vidState === "beforePlay")
                if (!isPlaying) {
                    // TODO handle returning from sleep on iOS
                    // showAlarmText(logText, 2000);
                    // setState({ stateVids: { [stateVidId_playing]: { wantToPause: true } } });
                    // backdropVidElement.play();
                    // backdropVidElementWaiting.play();
                    // const { doWhenStateVidPlayOrPause, doWhenStateVidStateReady, doWhenStateVidStateSeeked } =
                    //   get_safeVidUtils(storeHelpers);
                    // doWhenStateVidStateReady(
                    //   stateVidId_playing,
                    //   "pause",
                    //   () => {
                    //     setState({ stateVids: { [stateVidId_playing]: { wantToPlay: true } } });
                    //   }
                    //   //  false /*  check initial */
                    // );
                }
                // if the state vid should be playing, play the video
                if (stateVidState.vidState === "play") {
                    // globalRefs.backdropVideoTex?.updateVid(backdropVidElement);
                    // backdropVidElement.play();
                    // setState({ stateVids: { [stateVidId_playing]: { wantToPlay: true } } });
                }
                // const { nowPlaceName } = getState().global.main;
                // const globalRefs = getRefs().global.main;
                // const backdropVidElement = getSliceVidVideo(nowPlaceName as PlaceName);
                // if (!backdropVidElement) return;
                // globalRefs.backdropVideoTex?.updateVid(backdropVidElement);
            },
            check: { type: "global", prop: "appBecameVisibleTime" },
            // step: "cameraChange",
            // atStepEnd: true,
        }),
    }));
}
