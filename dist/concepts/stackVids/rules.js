import { makeStackVidStoreUtils } from "./utils";
export function makeStackVidRules(concepFuncs) {
    const { getRefs, getState, makeRules, onNextTick, setState } = concepFuncs;
    const { doWhenBothSafeVidsForStackPlayOrPause, doWhenBothSafeVidsReady, doWhenStackVidPlay, setBothSafeVidsState, } = makeStackVidStoreUtils(concepFuncs);
    const safeVidRefs = getRefs().safeVids;
    return makeRules((addItemEffect) => ({
        // rulesForRespondingToUpdatedVideoStates: addItemEffect({
        //   onItemEffect({ newValue: vidState, itemState, itemName }) {
        //     const { wantedSeekTime, vidAId, vidBId } = itemState;
        //
        //     if (vidAId === null || vidBId === null) return;
        //   },
        //   check: { type: "stackVids", prop: "vidState" },
        //   flow: "stackVidStateUpdates",
        // }),
        rulesForSettingNewVideoStates: addItemEffect({
            onItemEffect({ newValue: vidState, itemState, itemName }) {
                const { wantedSeekTime, vidAId, vidBId } = itemState;
                function setItemState(newState) {
                    setState({ stackVids: { [itemName]: newState } });
                }
                function setVidState(vidState) {
                    setItemState({ vidState });
                }
                if (vidAId === null || vidBId === null)
                    return;
                // beforeLoad
                if (vidState === "beforeLoad") {
                    setBothSafeVidsState(itemName, { wantToLoad: true });
                    setVidState("waitingForLoad");
                    doWhenBothSafeVidsReady(itemName, "pause", () => {
                        // for some reason this only works (both videos playing at the same time)
                        // if in a timeout (like next frame etc)
                        // but still sometimes doesn't work :shrug
                        // I think it's related to the play() working at different times for each video
                        //
                        setState({
                            stackVids: {
                                [itemName]: { vidState: "pause", playType: "pause" },
                            },
                        }, () => {
                            onNextTick(() => {
                                const newState = getState().stackVids[itemName];
                                setItemState({ wantToPlay: newState.autoplay });
                                if (newState.autoplay) {
                                    doWhenStackVidPlay(itemName, () => {
                                        var _a, _b;
                                        const { vidAId, vidBId } = getState().stackVids[itemName];
                                        if (vidAId === null || vidBId === null)
                                            return;
                                        const vidATime = (_a = safeVidRefs[vidAId].videoElement) === null || _a === void 0 ? void 0 : _a.currentTime;
                                        const vidBTime = (_b = safeVidRefs[vidBId].videoElement) === null || _b === void 0 ? void 0 : _b.currentTime;
                                        if (vidATime !== undefined &&
                                            vidBTime !== undefined) {
                                            const vidTimeDifference = vidATime - vidBTime;
                                            if (vidTimeDifference > 0.002) {
                                                console.log("Vid time too different", vidTimeDifference);
                                                setItemState({ wantedSeekTime: vidATime });
                                            }
                                        }
                                    }
                                    // false
                                    );
                                }
                            });
                        });
                        // setTimeout(() => {
                        //   const newState = getState().stackVids[itemName];
                        //   setItemState({ vidState: "pause", wantToPlay: newState.autoplay });
                        // }, 0);
                    }
                    // false /* check initial */
                    );
                }
                // beforeSeek
                if (vidState === "beforeSeek") {
                    if (wantedSeekTime !== null) {
                        setItemState({ vidState: "waitingForSeek", wantedSeekTime: null });
                        doWhenBothSafeVidsForStackPlayOrPause(itemName, () => {
                            const { playType } = getState().stackVids[itemName];
                            setItemState({ vidState: playType });
                        }, false /* dont check initial */);
                        setBothSafeVidsState(itemName, { wantedSeekTime });
                        // console.log("WAITING to SEEK");
                    }
                    else {
                        console.warn("wanted seek time was null");
                    }
                }
                // beforePlay
                if (vidState === "beforePlay") {
                    setVidState("waitingForPlay");
                    setBothSafeVidsState(itemName, { wantToPlay: true });
                    doWhenBothSafeVidsReady(itemName, "play", () => setItemState({ vidState: "play", playType: "play" }), false /* check initial */);
                }
                // beforePause
                if (vidState === "beforePause") {
                    setVidState("waitingForPause");
                    setBothSafeVidsState(itemName, { wantToPause: true });
                    doWhenBothSafeVidsReady(itemName, "pause", () => {
                        setItemState({ vidState: "pause", playType: "pause" });
                    }, false /* check initial */);
                }
                // beforeUnload
                if (vidState === "beforeUnload") {
                    setVidState("waitingForUnload");
                    setBothSafeVidsState(itemName, { wantToUnload: true });
                    doWhenBothSafeVidsReady(itemName, "unloaded", () => setVidState("unloaded"), false /* check initial */);
                }
            },
            check: { type: "stackVids", prop: "vidState" },
            flow: "stackVidWantsToPlay",
            whenToRun: "subscribe",
        }),
        // wants
        whenWantToLoad: addItemEffect({
            onItemEffect({ itemName }) {
                const { vidState } = getState().stackVids[itemName];
                if (vidState === "unloaded") {
                    setState({
                        stackVids: {
                            [itemName]: { vidState: "beforeLoad", wantToLoad: false },
                        },
                    });
                }
                else {
                    console.warn("treid to load", itemName, " when it wasn't unloaded");
                    setState({ stackVids: { [itemName]: { wantToLoad: false } } });
                }
            },
            check: { type: "stackVids", prop: "wantToLoad", becomes: "true" },
            flow: "stackVidWantsToPlay",
        }),
        whenWantToUnload: addItemEffect({
            onItemEffect({ itemName }) {
                const { vidState } = getState().stackVids[itemName];
                if (vidState !== "unloaded") {
                    setState({
                        stackVids: {
                            [itemName]: { vidState: "beforeUnload", wantToUnload: false },
                        },
                    });
                }
                else {
                    console.warn("treid to unload", itemName, " when it was unloaded");
                    setState({ stackVids: { [itemName]: { wantToUnload: false } } });
                }
            },
            check: { type: "stackVids", prop: "wantToUnload", becomes: "true" },
            flow: "stackVidWantsToPlay",
        }),
        whenWantToSeek: addItemEffect({
            onItemEffect({ newValue: wantedSeekTime, itemName }) {
                if (wantedSeekTime !== null) {
                    setState({ stackVids: { [itemName]: { vidState: "beforeSeek" } } });
                }
            },
            check: { type: "stackVids", prop: "wantedSeekTime" },
            flow: "stackVidWantsToPlay",
        }),
        whenWantToPlay: addItemEffect({
            onItemEffect({ itemName }) {
                setState({
                    stackVids: {
                        [itemName]: { vidState: "beforePlay", wantToPlay: false },
                    },
                });
            },
            check: { type: "stackVids", prop: "wantToPlay", becomes: "true" },
            flow: "stackVidWantsToPlay",
        }),
        whenWantToPause: addItemEffect({
            onItemEffect({ itemName }) {
                setState({
                    stackVids: {
                        [itemName]: { vidState: "beforePause", wantToPause: false },
                    },
                });
            },
            check: { type: "stackVids", prop: "wantToPause", becomes: "true" },
            flow: "stackVidWantsToPlay",
        }),
        // whenPlayTypeChanges: addItemEffect({
        //   onItemEffect({ itemName, newValue: playType }) {
        //     setBothVidState(itemName, { playType });
        //     // setState({
        //     //   stackVids: {
        //     //     [itemName]: { vidState: "beforePause", wantToPause: false },
        //     //   },
        //     // });
        //   },
        //   check: { type: "stackVids", prop: "playType" },
        // }),
    }));
}
