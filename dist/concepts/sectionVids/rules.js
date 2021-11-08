import { makeSafeVidStoreUtils } from "../../concepts/safeVids/utils";
import { minMaxRange } from "shutils/dist/numbers";
import { BEFORE_LOOP_PADDING, makeSectionVidStoreUtils } from "./utils";
export function makeSectionVidRules(concepFuncs, placeInfoByName, dollNames) {
    // safe Section Stack Vid Rules
    const { getState, makeRules, setState } = concepFuncs;
    const { doWhenSectionVidPlaying, getSectionEndTime, getSectionVidVideo } = makeSectionVidStoreUtils(concepFuncs, placeInfoByName, dollNames);
    const { doWhenSafeVidPlayOrPause, doWhenSafeVidStateReady } = makeSafeVidStoreUtils(concepFuncs);
    return makeRules((addItemEffect) => ({
        rulesForSettingNewVideoStates: addItemEffect({
            onItemEffect({ newValue: vidState, itemName, itemState }) {
                const setItemState = (newState) => setState({ sectionVids: { [itemName]: newState } });
                const setVidState = (sectionVidState) => setItemState({ sectionVidState });
                const { safeVidId_playing, safeVidId_waiting } = itemState;
                if (!safeVidId_playing || !safeVidId_waiting)
                    return;
                // before load
                if (vidState === "beforeLoad") {
                    setVidState("waitingForLoad");
                    const { nowSection } = itemState;
                    // set all child videos to wantToLoad, and set autoplay? only on the playing one, or no autoplay
                    setState({
                        safeVids: {
                            [safeVidId_playing]: {
                                wantToLoad: true,
                                autoplay: true,
                            },
                            [safeVidId_waiting]: {
                                wantToLoad: true,
                                autoplay: false,
                            },
                        },
                    });
                    doWhenSafeVidStateReady(safeVidId_playing, "play", () => {
                        var _a;
                        const wantedSeekTime = (_a = nowSection === null || nowSection === void 0 ? void 0 : nowSection.time) !== null && _a !== void 0 ? _a : 0;
                        setState({
                            sectionVids: {
                                [itemName]: {
                                    sectionVidState: "play",
                                    newplayingVidStartedTime: Date.now(),
                                },
                            },
                            safeVids: {
                                [safeVidId_playing]: { wantedSeekTime },
                                [safeVidId_waiting]: { wantedSeekTime },
                            },
                        });
                    }, false /*check inital */);
                }
                // before unload
                if (vidState === "beforeUnload") {
                    // set all child videos to wantToLoad, and set autoplay? only on the playing one, or no autoplay
                    setState({
                        sectionVids: {
                            [itemName]: { sectionVidState: "waitingForUnload" },
                        },
                        safeVids: {
                            [safeVidId_playing]: { wantToUnload: true },
                            [safeVidId_waiting]: { wantToUnload: true },
                        },
                    });
                    doWhenSafeVidStateReady(safeVidId_playing, "unloaded", () => {
                        setVidState("unloaded");
                    });
                }
                // before change section
                if (vidState === "beforeChangeSection") {
                    const { switchSection_keepProgress, wantedSection, nowSection } = itemState;
                    if (!wantedSection)
                        return;
                    let newSeekTime = wantedSection.time;
                    const newEndTime = getSectionEndTime(wantedSection);
                    if (switchSection_keepProgress) {
                        //    set it based on the playing vids current time and the previous nowSectionInfo
                        const backdropVidElement = getSectionVidVideo(itemName);
                        if (backdropVidElement) {
                            const nowSectionStartTime = nowSection.time;
                            let elapsedTime = backdropVidElement.currentTime - nowSectionStartTime;
                            const newStartTime = wantedSection.time; // + BEFORE_LOOP_PADDING; // maybe padding avoids flicker of the previous frame
                            newSeekTime = wantedSection.time + elapsedTime;
                            // make sure the new seek time isn't before or after the section time
                            newSeekTime = minMaxRange(newSeekTime, newStartTime, newEndTime);
                            // check if the new seek time is too close to the end so it would loop
                            // for example   newSeekTime: 2.017258  newEndTime: 2.0333300000000003  caused a big quick loop
                            if (newEndTime - newSeekTime < 0.15) {
                                console.warn("was close to looping while changing section");
                                newSeekTime = newStartTime;
                            }
                        }
                    }
                    setState({
                        sectionVids: {
                            [itemName]: {
                                sectionVidState: "waitingForChangeSection",
                                nowSection: wantedSection,
                                wantedSection: null,
                            },
                        },
                        safeVids: {
                            [safeVidId_waiting]: { wantedSeekTime: newSeekTime },
                        },
                    });
                    doWhenSafeVidPlayOrPause(safeVidId_waiting, () => {
                        // when the time seeked,
                        setState({
                            sectionVids: {
                                [itemName]: {
                                    nowSectionSeekedTime: Date.now(),
                                    safeVidId_playing: safeVidId_waiting,
                                    safeVidId_waiting: safeVidId_playing,
                                },
                            },
                        });
                    }, false /* checkInitial */);
                }
                // before do loop
                if (vidState === "beforeDoLoop") {
                    // swap the playing and nextLoop vids
                    setState({
                        sectionVids: {
                            [itemName]: {
                                sectionVidState: "waitingForDoLoop",
                                safeVidId_playing: safeVidId_waiting,
                                safeVidId_waiting: safeVidId_playing,
                            },
                        },
                    });
                }
            },
            check: { type: "sectionVids", prop: "sectionVidState" },
            flow: "sectionVidWantsToPlay",
            whenToRun: "subscribe",
        }),
        // wants
        whenWantedSectionChanges: addItemEffect({
            onItemEffect({ newValue: wantedSection, itemName, itemState }) {
                if (wantedSection === null || itemState.sectionVidState === "unloaded")
                    return; // don't react if wantedSection changed to null
                setState({
                    sectionVids: {
                        [itemName]: {
                            sectionVidState: "beforeChangeSection",
                        },
                    },
                });
            },
            check: { type: "sectionVids", prop: "wantedSection" },
            flow: "sectionVidWantsToPlay",
        }),
        whenWantToLoad: addItemEffect({
            onItemEffect({ itemName, itemState: { sectionVidState } }) {
                if (sectionVidState === "unloaded") {
                    setState({
                        sectionVids: {
                            [itemName]: {
                                sectionVidState: "beforeLoad",
                                wantToLoad: false,
                            },
                        },
                    });
                }
                else {
                    console.warn("tried to load", itemName, " when it was already loaded");
                    setState({
                        sectionVids: { [itemName]: { wantToLoad: false } },
                    });
                }
            },
            check: { type: "sectionVids", prop: "wantToLoad", becomes: "true" },
            flow: "sectionVidWantsToPlay",
        }),
        whenWantToUnload: addItemEffect({
            onItemEffect({ itemName, itemState: { sectionVidState } }) {
                if (sectionVidState !== "unloaded") {
                    doWhenSectionVidPlaying(itemName, () => {
                        setState({
                            sectionVids: {
                                [itemName]: {
                                    sectionVidState: "beforeUnload",
                                    wantToUnload: false,
                                },
                            },
                        });
                    });
                }
                else {
                    console.warn("tried to unload", itemName, " when it was unloaded");
                    setState({ safeVids: { [itemName]: { wantToUnload: false } } });
                }
            },
            check: { type: "sectionVids", prop: "wantToUnload", becomes: "true" },
            flow: "sectionVidWantsToPlay",
        }),
        whenWantToLoop: addItemEffect({
            onItemEffect({ itemName, itemState: { sectionVidState } }) {
                if (sectionVidState === "beforeLoad" || sectionVidState === "unloaded")
                    return;
                // get latest state just incase it changed
                setState({
                    sectionVids: {
                        [itemName]: {
                            sectionVidState: "beforeDoLoop",
                            wantToLoop: false,
                        },
                    },
                });
            },
            check: { type: "sectionVids", prop: "wantToLoop", becomes: "true" },
            flow: "sectionVidWantsToPlay",
        }),
        //
        // when the play and wait vids swap
        whenPlayVidChanges: addItemEffect({
            onItemEffect({ newValue: safeVidId_playing, itemName: sectionVidName }) {
                // const { nowPlaceName } = getGlobalState();
                // if (nowPlaceName !== sectionVidName) return;
                if (!safeVidId_playing)
                    return;
                setState({ safeVids: { [safeVidId_playing]: { wantToPlay: true } } });
                doWhenSafeVidStateReady(safeVidId_playing, "play", () => {
                    const { sectionVidState } = getState().sectionVids[sectionVidName];
                    if (sectionVidState === "waitingForChangeSection") {
                        // setState({
                        //   sectionVids: {
                        //     [itemName]: {
                        //       nowSection: wantedSection,
                        //       wantedSection: null,
                        //     },
                        //   },
                        // });
                        // update Now Stuff When Section Changed();
                    }
                    // this was where the sectionVid play state was set before
                    setState({
                        sectionVids: {
                            [sectionVidName]: {
                                sectionVidState: "play",
                                newplayingVidStartedTime: Date.now(),
                            },
                        },
                    });
                }, false /* check initital */);
            },
            check: { type: "sectionVids", prop: "safeVidId_playing" },
            flow: "sectionVidWantsToPlay2",
            whenToRun: "subscribe",
        }),
        whenWaitVidChanges: addItemEffect({
            onItemEffect({ newValue: safeVidId_waiting, itemState }) {
                // const { nowPlaceName } = getGlobalState();
                // if (nowPlaceName !== sectionVidName) return;
                if (!safeVidId_waiting)
                    return;
                const { nowSection } = itemState;
                // set the video to paused
                setState({
                    safeVids: { [safeVidId_waiting]: { wantToPause: true } },
                });
                // when it finished pausing, set the time to the correct time
                // (it might already be paused, and pause might not be needed)
                doWhenSafeVidStateReady(safeVidId_waiting, "pause", () => {
                    setState({
                        safeVids: {
                            [safeVidId_waiting]: {
                                wantedSeekTime: nowSection.time + BEFORE_LOOP_PADDING,
                            },
                        },
                    });
                }
                //  false /*  check initial */
                );
            },
            check: { type: "sectionVids", prop: "safeVidId_waiting" },
            flow: "sectionVidWantsToPlay2",
            whenToRun: "subscribe",
        }),
    }));
}
