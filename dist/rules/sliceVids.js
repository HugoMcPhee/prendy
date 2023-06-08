import { minMaxRange } from "chootils/dist/numbers";
import { BEFORE_LOOP_PADDING, get_sliceVidUtils } from "../helpers/prendyUtils/sliceVids";
import { get_safeVidUtils } from "../helpers/prendyUtils/stateVids";
export function get_sliceVidRules(storeHelpers, prendyOptions, prendyAssets) {
    // safe Slice Stack Vid Rules
    const { getState, makeRules, setState } = storeHelpers;
    const { doWhenSliceVidPlaying: doWhenSliceVidPlaying, getSliceEndTime: getSliceEndTime, getSliceVidVideo: getSliceVidVideo, } = get_sliceVidUtils(storeHelpers, prendyOptions, prendyAssets);
    const { doWhenSafeVidPlayOrPause, doWhenSafeVidStateReady } = get_safeVidUtils(storeHelpers);
    return makeRules(({ itemEffect }) => ({
        rulesForSettingNewVideoStates: itemEffect({
            run({ newValue: vidState, itemName, itemState }) {
                const setItemState = (newState) => setState({ sliceVids: { [itemName]: newState } });
                const setVidState = (sliceVidState) => setItemState({ sliceVidState });
                const { stateVidId_playing, stateVidId_waiting } = itemState;
                if (!stateVidId_playing || !stateVidId_waiting)
                    return;
                // before load
                if (vidState === "beforeLoad") {
                    setVidState("waitingForLoad");
                    const { nowSlice } = itemState;
                    // set all child videos to wantToLoad, and set autoplay? only on the playing one, or no autoplay
                    setState({
                        stateVids: {
                            [stateVidId_playing]: { wantToLoad: true, autoplay: true },
                            [stateVidId_waiting]: { wantToLoad: true, autoplay: false },
                        },
                    });
                    doWhenSafeVidStateReady(stateVidId_playing, "play", () => {
                        var _a;
                        const goalSeekTime = (_a = nowSlice === null || nowSlice === void 0 ? void 0 : nowSlice.time) !== null && _a !== void 0 ? _a : 0;
                        setState({
                            sliceVids: { [itemName]: { sliceVidState: "play", newPlayingVidStartedTime: Date.now() } },
                            stateVids: {
                                [stateVidId_playing]: { goalSeekTime },
                                [stateVidId_waiting]: { goalSeekTime },
                            },
                        });
                    }, false /*check inital */);
                }
                // before unload
                if (vidState === "beforeUnload") {
                    // set all child videos to wantToLoad, and set autoplay? only on the playing one, or no autoplay
                    setState({
                        sliceVids: { [itemName]: { sliceVidState: "waitingForUnload" } },
                        stateVids: {
                            [stateVidId_playing]: { wantToUnload: true },
                            [stateVidId_waiting]: { wantToUnload: true },
                        },
                    });
                    doWhenSafeVidStateReady(stateVidId_playing, "unloaded", () => setVidState("unloaded"));
                }
                // before change slice
                if (vidState === "beforeChangeSlice") {
                    const { switchSlice_keepProgress, goalSlice, nowSlice } = itemState;
                    if (!goalSlice)
                        return;
                    let newSeekTime = goalSlice.time;
                    const newEndTime = getSliceEndTime(goalSlice);
                    if (switchSlice_keepProgress) {
                        //    set it based on the playing vids current time and the previous nowSliceInfo
                        const backdropVidElement = getSliceVidVideo(itemName);
                        if (backdropVidElement) {
                            const nowSliceStartTime = nowSlice.time;
                            let elapsedTime = backdropVidElement.currentTime - nowSliceStartTime;
                            const newStartTime = goalSlice.time; // + BEFORE_LOOP_PADDING; // maybe padding avoids flicker of the previous frame
                            newSeekTime = goalSlice.time + elapsedTime;
                            // make sure the new seek time isn't before or after the slice time
                            newSeekTime = minMaxRange(newSeekTime, newStartTime, newEndTime);
                            // check if the new seek time is too close to the end so it would loop
                            // for example   newSeekTime: 2.017258  newEndTime: 2.0333300000000003  caused a big quick loop
                            if (newEndTime - newSeekTime < 0.2) {
                                console.warn("was close to looping while changing slice");
                                newSeekTime = newStartTime;
                            }
                        }
                    }
                    setState({
                        sliceVids: {
                            [itemName]: {
                                sliceVidState: "waitingForChangeSlice",
                                nowSlice: goalSlice,
                                goalSlice: null,
                            },
                        },
                        stateVids: { [stateVidId_waiting]: { goalSeekTime: newSeekTime } },
                    });
                    doWhenSafeVidPlayOrPause(stateVidId_waiting, () => {
                        // when the time seeked,
                        setState({
                            sliceVids: {
                                [itemName]: {
                                    nowSliceSeekedTime: Date.now(),
                                    stateVidId_playing: stateVidId_waiting,
                                    stateVidId_waiting: stateVidId_playing,
                                },
                            },
                        });
                    }, false /* checkInitial */);
                }
                // before do loop
                if (vidState === "beforeDoLoop") {
                    // swap the playing and nextLoop vids
                    setState({
                        sliceVids: {
                            [itemName]: {
                                sliceVidState: "waitingForDoLoop",
                                stateVidId_playing: stateVidId_waiting,
                                stateVidId_waiting: stateVidId_playing,
                            },
                        },
                    });
                }
            },
            check: { type: "sliceVids", prop: "sliceVidState" },
            step: "sliceVidWantsToPlay",
            atStepEnd: true,
        }),
        // Wjhen goals change
        whenGoalSliceChanges: itemEffect({
            run({ newValue: goalSlice, itemName, itemState }) {
                if (goalSlice === null || itemState.sliceVidState === "unloaded")
                    return; // don't react if goalSlice changed to null
                setState({ sliceVids: { [itemName]: { sliceVidState: "beforeChangeSlice" } } });
            },
            check: { type: "sliceVids", prop: "goalSlice" },
            step: "sliceVidWantsToPlay",
        }),
        whenWantToLoad: itemEffect({
            run({ itemName, itemState: { sliceVidState } }) {
                if (sliceVidState === "unloaded") {
                    setState({ sliceVids: { [itemName]: { sliceVidState: "beforeLoad", wantToLoad: false } } });
                }
                else {
                    console.warn("tried to load", itemName, " when it was already loaded");
                    setState({ sliceVids: { [itemName]: { wantToLoad: false } } });
                }
            },
            check: { type: "sliceVids", prop: "wantToLoad", becomes: true },
            step: "sliceVidWantsToPlay",
        }),
        whenWantToUnload: itemEffect({
            run({ itemName, itemState: { sliceVidState } }) {
                if (sliceVidState !== "unloaded") {
                    doWhenSliceVidPlaying(itemName, () => {
                        setState({ sliceVids: { [itemName]: { sliceVidState: "beforeUnload", wantToUnload: false } } });
                    });
                }
                else {
                    console.warn("tried to unload", itemName, " when it was unloaded");
                    setState({ stateVids: { [itemName]: { wantToUnload: false } } });
                }
            },
            check: { type: "sliceVids", prop: "wantToUnload", becomes: true },
            step: "sliceVidWantsToPlay",
        }),
        whenWantToLoop: itemEffect({
            run({ itemName, itemState: { sliceVidState } }) {
                if (sliceVidState === "beforeLoad" || sliceVidState === "unloaded")
                    return;
                setState({ sliceVids: { [itemName]: { sliceVidState: "beforeDoLoop", wantToLoop: false } } });
            },
            check: { type: "sliceVids", prop: "wantToLoop", becomes: true },
            step: "sliceVidWantsToPlay",
        }),
        // When the play and wait vids swap (loop a and b vids)
        whenPlayVidChanges: itemEffect({
            run({ newValue: stateVidId_playing, itemName: sliceVidName }) {
                if (!stateVidId_playing)
                    return;
                setState({ stateVids: { [stateVidId_playing]: { wantToPlay: true } } });
                doWhenSafeVidStateReady(stateVidId_playing, "play", () => {
                    // NOTE could be pause if wanted pausing
                    setState({
                        sliceVids: { [sliceVidName]: { sliceVidState: "play", newPlayingVidStartedTime: Date.now() } },
                    });
                }, false /* check initital */);
            },
            check: { type: "sliceVids", prop: "stateVidId_playing" },
            step: "sliceVidWantsToPlay2",
            atStepEnd: true,
        }),
        whenWaitVidChanges: itemEffect({
            run({ newValue: stateVidId_waiting, itemState }) {
                if (!stateVidId_waiting)
                    return;
                const { nowSlice } = itemState;
                // set the video to paused
                setState({ stateVids: { [stateVidId_waiting]: { wantToPause: true } } });
                // when it finished pausing, set the time to the correct time
                // (it might already be paused, and pause might not be needed)
                doWhenSafeVidStateReady(stateVidId_waiting, "pause", () => {
                    setState({
                        stateVids: { [stateVidId_waiting]: { goalSeekTime: nowSlice.time + BEFORE_LOOP_PADDING } },
                    });
                }
                //  false /*  check initial */
                );
            },
            check: { type: "sliceVids", prop: "stateVidId_waiting" },
            step: "sliceVidWantsToPlay2",
            atStepEnd: true,
        }),
    }));
}
