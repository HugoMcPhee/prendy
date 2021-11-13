import { makeSectionVidStoreUtils } from "../../../concepts/sectionVids/utils";
import { makeCameraChangeUtils } from "../utils/cameraChange";
export function makeGlobalVideoRules(concepFuncs, _backdopConcepts, _backdopStartOptions, backdopArt) {
    const { getRefs, getState, makeRules, setState } = concepFuncs;
    const { getSectionForPlace, getSectionVidVideo, checkForVideoLoop } = makeSectionVidStoreUtils(concepFuncs, backdopArt);
    const { getSafeSegmentName, updateTexturesForNowCamera, updateNowStuffWhenSectionChanged, } = makeCameraChangeUtils(concepFuncs, backdopArt);
    return makeRules((addItemEffect, addEffect) => ({
        whenWantToChooseVideoSection: addEffect({
            onEffect() {
                const { nowPlaceName, nowSegmentName, wantedSegmentName, wantedSegmentNameAtLoop, nextSegmentNameWhenVidPlays, nextPlaceName, // checking this as a very early way to know if its loading a new place, goToNewPlace , which sets wantedSegmentName and wantedCamName also sets nextPlaceName
                isLoadingBetweenPlaces, } = getState().global.main;
                const { nextCamNameWhenVidPlays, wantedCamNameAtLoop, wantedCamName, nowCamName, } = getState().places[nowPlaceName];
                const { sectionVidState } = getState().sectionVids[nowPlaceName];
                const videoIsOutsideOfCurrentLoop = checkForVideoLoop(nowPlaceName);
                // do all the deciding section logic in here!
                // all other wanted valeus get cleared each time
                let new_wantedSegmentNameAtLoop = wantedSegmentNameAtLoop;
                let new_wantedCamNameAtLoop = wantedCamNameAtLoop;
                let decided_wantedCamName = wantedCamName;
                let decided_wantedSegmentName = wantedSegmentName;
                let decided_wantToLoop = videoIsOutsideOfCurrentLoop;
                let decided_shouldKeepTime = true;
                let decided_wantedSection = null;
                const alreadyWaitingForASectionToChange = nextSegmentNameWhenVidPlays || nextCamNameWhenVidPlays;
                // if (videoIsOutsideOfCurrentLoop) {
                //   console.log(
                //     "alreadyWaitingForASectionToChange",
                //     alreadyWaitingForASectionToChange
                //   );
                // }
                // if there's a nextPlaceName, so its starting to load the next-place
                if (nextPlaceName) {
                    // NOTE , might still want to loop the videos when it's loading a new place ?
                    // but it should fade out so hopefully don't need to, it might just show a little bit of the next part of the video while fading , but it can be fixed here if wanted
                    if (alreadyWaitingForASectionToChange) {
                        setState({
                            global: {
                                main: {
                                    // wantedSegmentName: null,
                                    wantedSegmentNameAtLoop: null,
                                    // wantToLoop: false,
                                    nextSegmentNameWhenVidPlays: null,
                                },
                            },
                            places: {
                                [nowPlaceName]: {
                                    // wantedCamName: null,
                                    wantedCamNameAtLoop: null,
                                    nextCamNameWhenVidPlays: null,
                                },
                            },
                            sectionVids: {
                                [nowPlaceName]: {
                                    wantedSection: null,
                                    wantToLoop: false,
                                    // switchSection_keepProgress: decided_shouldKeepTime,
                                },
                            },
                        });
                    }
                    return;
                }
                if (sectionVidState === "waitingForLoad" || isLoadingBetweenPlaces) {
                    // console.warn("was loading");
                    // setState({
                    //   sectionVids: {
                    //     [nowPlaceName]: {
                    //       wantToLoop: decided_wantToLoop,
                    //       switchSection_keepProgress: false,
                    //     },
                    //   },
                    // });
                    return;
                }
                if (alreadyWaitingForASectionToChange) {
                    // console.log(nextSegmentNameWhenVidPlays, nextCamNameWhenVidPlays);
                    // if (nextPlaceName) {
                    // console.warn("alreadyWaitingForASectionToChange");
                    // console.warn("nextSegmentNameWhenVidPlays  nextCamNameWhenVidPlays");
                    // console.warn(nextSegmentNameWhenVidPlays, nextCamNameWhenVidPlays);
                    // }
                    // NOTE may need to handle this weird situation
                    // console.error("already waiting for a video to play");
                    // right now it skips this if its waiting for a section change
                    // OH , okay this wanted stuff should be checked every frame,
                    // then it will update when it's ready!
                    return;
                }
                // console.log("here");
                if (videoIsOutsideOfCurrentLoop &&
                    (wantedCamNameAtLoop || wantedSegmentNameAtLoop)) {
                    // it should now go to a new section from thw wanted segment or cam at loop
                    decided_wantedCamName = wantedCamName || wantedCamNameAtLoop;
                    decided_wantedSegmentName =
                        wantedSegmentName || wantedSegmentNameAtLoop;
                    new_wantedCamNameAtLoop = null;
                    new_wantedSegmentNameAtLoop = null;
                }
                if (decided_wantedSegmentName || decided_wantedCamName) {
                    // it'll definately be a wantedSection next
                    // set the other value if its undefined
                    decided_wantedCamName = decided_wantedCamName || nowCamName;
                    decided_wantedSegmentName =
                        decided_wantedSegmentName || nowSegmentName;
                    // make sure its a safe segment
                    // TODO retye intital state to have segments as strings
                    decided_wantedSegmentName = getSafeSegmentName({
                        cam: decided_wantedCamName,
                        place: nowPlaceName,
                        segment: decided_wantedSegmentName,
                        useStorySegmentRules: true, // NOTE this could mess with things when manually chaning segment
                    });
                    // if either the decided segment or camera is different to the now segment and camera
                    if (!(decided_wantedCamName === nowCamName &&
                        decided_wantedSegmentName === nowSegmentName)) {
                        decided_wantedSection = getSectionForPlace(nowPlaceName, decided_wantedCamName, decided_wantedSegmentName // decided_wantedSegmentName should always be decided here
                        );
                        decided_wantToLoop = false;
                    }
                }
                // if changing segments, don't keep the duration of the currently playing section (which is good for changing cameras and keeping the same loop at different angles)
                if (decided_wantedSegmentName !== nowSegmentName) {
                    decided_shouldKeepTime = false;
                }
                if (videoIsOutsideOfCurrentLoop &&
                    !decided_wantedCamName &&
                    !decided_wantedSegmentName) {
                    // it'll definately be a wantToLoop
                    decided_wantToLoop = true;
                    decided_wantedSection = null;
                }
                // set State for the global and place state, and also the sectionState
                setState({
                    global: {
                        main: {
                            wantedSegmentName: null,
                            wantedSegmentNameAtLoop: new_wantedSegmentNameAtLoop,
                            // wantToLoop: false,
                            nextSegmentNameWhenVidPlays: decided_wantedSegmentName,
                        },
                    },
                    places: {
                        [nowPlaceName]: {
                            wantedCamName: null,
                            wantedCamNameAtLoop: new_wantedCamNameAtLoop,
                            nextCamNameWhenVidPlays: decided_wantedCamName,
                        },
                    },
                    sectionVids: {
                        [nowPlaceName]: {
                            wantedSection: decided_wantedSection,
                            wantToLoop: decided_wantToLoop,
                            switchSection_keepProgress: decided_shouldKeepTime,
                        },
                    },
                });
            },
            // check every frame so it can handle wanted things that didnt get set yet because there was already a waiting section vid!
            check: { type: ["global"], name: ["main"], prop: ["frameTick"] },
            // don't only check when these properties changed anymore
            // check: [
            //   {
            //     type: ["global"],
            //     name: ["main"],
            //     prop: ["wantedSegmentName", "wantedSegmentNameAtLoop", "wantToLoop"],
            //   },
            //   {
            //     type: ["places"],
            //     prop: ["wantedCamName", "wantedCamNameAtLoop"],
            //   },
            // ],
            flow: "chooseVideoSection",
            // whenToRun: "subscribe",
        }),
        whenSectionVidChangedAndWantToUpdateNowCamAndSegment: addItemEffect({
            onItemEffect() {
                updateNowStuffWhenSectionChanged();
            },
            // check every frame for now, just incase, but this could work with listening to sectionVidState
            // check: { type: ["global"], name: ["main"], prop: ["frameTick"] },
            // check: { type: ["sectionVids"],  prop: ["sectionVidState"] },
            check: { type: "sectionVids", prop: ["newplayingVidStartedTime"] },
            flow: "sectionVidStateUpdates",
            whenToRun: "subscribe",
        }),
        //
        // previous stuff
        // note no setState's done in here so its running on subscribe
        whenNowCameraChanges: addEffect({
            onEffect(diffInfo) {
                const globalState = getState().global.main;
                const { nowPlaceName, nextPlaceName } = globalState;
                if (nextPlaceName !== null)
                    return;
                const { nowCamName } = getState().places[nowPlaceName];
                const globalChangedBools = diffInfo.propsChangedBool.global.main;
                const placeChangedBools = diffInfo.propsChangedBool.places[nowPlaceName];
                const placeChanged = globalChangedBools === null || globalChangedBools === void 0 ? void 0 : globalChangedBools.nowPlaceName;
                const cameraChanged = placeChangedBools === null || placeChangedBools === void 0 ? void 0 : placeChangedBools.nowCamName;
                if (!cameraChanged && !placeChanged)
                    return;
                // if the place or camera changed
                updateTexturesForNowCamera(nowCamName);
            },
            check: { prop: ["nowCamName"], type: ["places"] },
            flow: "cameraChange",
            whenToRun: "subscribe",
        }),
        // __________________
        // Changing segments
        // NOTE FIXME TODO WARNING - this might not be still okay to use
        // it might be okay to run when nowCamName changed (since it always swaps the video between a-b vid_wait to vid_play
        whenPlayingVidElementsChanged: addItemEffect({
            onItemEffect({ itemName: videoPlaceName }) {
                var _a;
                // so video texture updates for looping vids (and when section changes)
                const { nowPlaceName } = getState().global.main;
                const globalRefs = getRefs().global.main;
                if (videoPlaceName !== nowPlaceName)
                    return;
                const backdropVidElement = getSectionVidVideo(nowPlaceName);
                if (!backdropVidElement)
                    return;
                (_a = globalRefs.backdropVideoTex) === null || _a === void 0 ? void 0 : _a.updateVid(backdropVidElement);
            },
            check: { type: "sectionVids", prop: "newplayingVidStartedTime" },
            flow: "cameraChange",
            whenToRun: "subscribe",
        }),
    }));
}
