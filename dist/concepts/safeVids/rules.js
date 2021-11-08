import { makeVideoElementFromPath } from "./utils";
import { testAppendVideo } from "../../utils/babylonjs/usePlace/utils";
// NOTE may need to update the safeVidWantsToPlay rules to update on subscribe
export function makeSafeVidRules(concepFuncs) {
    const { getState, makeRules, onNextTick, setState } = concepFuncs;
    return makeRules((addItemEffect) => ({
        rulesForSettingNewVideoStates: addItemEffect({
            onItemEffect({ newValue: vidState, itemState, itemRefs, itemName }) {
                var _a;
                const { wantedSeekTime, autoplay } = itemState;
                function setItemState(newState) {
                    setState({ safeVids: { [itemName]: newState } });
                }
                function setVidState(vidState) {
                    setItemState({ vidState });
                }
                // beforeLoad
                if (vidState === "beforeLoad") {
                    setVidState("waitingForLoad");
                    itemRefs.videoElement = makeVideoElementFromPath(itemState.videoSource);
                    function onLoad() {
                        var _a;
                        (_a = itemRefs.videoElement) === null || _a === void 0 ? void 0 : _a.removeEventListener("loadedmetadata", onLoad);
                        // uncomment to test videos
                        // itemRefs.videoElement &&
                        testAppendVideo(itemRefs.videoElement, itemName, itemName);
                    }
                    // NOTE canplay doesn't work on safari?
                    itemRefs.videoElement.addEventListener("loadedmetadata", onLoad);
                    // manual alternative for preload / autoplay, make sure the video is loaded and has played like 1 frame
                    (_a = itemRefs.videoElement) === null || _a === void 0 ? void 0 : _a.play().finally(() => {
                        var _a;
                        // console.log("itemRefs.videoEleme nt");
                        // console.log(itemRefs.videoElement);
                        if (autoplay) {
                            setItemState({ vidState: "play", playType: "play" });
                        }
                        else {
                            (_a = itemRefs.videoElement) === null || _a === void 0 ? void 0 : _a.pause();
                            setItemState({ vidState: "pause", playType: "pause" });
                        }
                    });
                }
                // beforeSeek
                if (vidState === "beforeSeek") {
                    if (itemRefs.videoElement && wantedSeekTime !== null) {
                        setItemState({ vidState: "waitingForSeek", wantedSeekTime: null });
                        // note only works on safari is the video was already loaded / played one frame?
                        function onSeeked() {
                            var _a;
                            const newState = getState().safeVids[itemName];
                            setVidState(newState.playType);
                            (_a = itemRefs.videoElement) === null || _a === void 0 ? void 0 : _a.removeEventListener("seeked", onSeeked); // stop listening to when the video's seeked
                        }
                        itemRefs.videoElement.addEventListener("seeked", onSeeked); // start listening to when the video's seeked
                        itemRefs.videoElement.currentTime = wantedSeekTime; // seek the video
                    }
                }
                // beforePlay
                if (vidState === "beforePlay") {
                    if (itemRefs.videoElement) {
                        setItemState({ vidState: "waitingForPlay", playType: "play" });
                        itemRefs.videoElement
                            .play()
                            .then(() => {
                            setItemState({ vidState: "play", wantedSeekTime: null });
                        })
                            .catch((error) => {
                            console.warn("Video play error");
                            console.error(error);
                            setItemState({ vidState: "pause", playType: "pause" });
                        });
                    }
                }
                // beforePause
                if (vidState === "beforePause") {
                    if (itemRefs.videoElement) {
                        setVidState("waitingForPause");
                        function onPaused() {
                            var _a;
                            setItemState({ vidState: "pause", playType: "pause" });
                            (_a = itemRefs.videoElement) === null || _a === void 0 ? void 0 : _a.removeEventListener("pause", onPaused);
                        }
                        itemRefs.videoElement.addEventListener("pause", onPaused);
                        itemRefs.videoElement.pause();
                    }
                }
                // beforePause
                if (vidState === "beforeUnload") {
                    if (itemRefs.videoElement) {
                        setVidState("waitingForUnload");
                        // itemRefs.videoElement.currentTime = 0.1;
                        itemRefs.videoElement.pause();
                        itemRefs.videoElement.removeAttribute("src"); // empty source
                        itemRefs.videoElement.src = ""; // empty source
                        itemRefs.videoElement.load();
                        itemRefs.videoElement = null;
                        // run on next tick?
                        onNextTick(() => setVidState("unloaded")); // onNextTick so it can be seen in the next frame
                    }
                }
            },
            check: { type: "safeVids", prop: "vidState" },
            flow: "safeVidWantsToPlay",
            whenToRun: "subscribe",
        }),
        // wants
        whenWantToLoad: addItemEffect({
            onItemEffect({ itemName, itemState: { vidState } }) {
                console.log("want to load");
                if (vidState === "unloaded") {
                    setState({
                        safeVids: {
                            [itemName]: { vidState: "beforeLoad", wantToLoad: false },
                        },
                    });
                }
                else {
                    console.warn("tried to load", itemName, " when it wasn't unloaded");
                    setState({ safeVids: { [itemName]: { wantToLoad: false } } });
                }
            },
            check: { type: "safeVids", prop: "wantToLoad", becomes: "true" },
            flow: "safeVidWantsToPlay",
        }),
        whenWantToUnload: addItemEffect({
            onItemEffect({ itemName, itemState: { vidState } }) {
                if (vidState !== "unloaded") {
                    setState({
                        safeVids: {
                            [itemName]: { vidState: "beforeUnload", wantToUnload: false },
                        },
                    });
                }
                else {
                    console.warn("tried to unload", itemName, " when it was unloaded");
                    setState({ safeVids: { [itemName]: { wantToUnload: false } } });
                }
            },
            check: { type: "safeVids", prop: "wantToUnload", becomes: "true" },
            flow: "safeVidWantsToPlay",
        }),
        whenWantToSeek: addItemEffect({
            onItemEffect({ newValue: wantedSeekTime, itemName }) {
                if (wantedSeekTime !== null) {
                    setState({ safeVids: { [itemName]: { vidState: "beforeSeek" } } });
                }
            },
            check: { type: "safeVids", prop: "wantedSeekTime" },
            flow: "safeVidWantsToPlay",
        }),
        whenWantToPlay: addItemEffect({
            onItemEffect({ itemName }) {
                setState({
                    safeVids: {
                        [itemName]: { vidState: "beforePlay", wantToPlay: false },
                    },
                });
            },
            check: { type: "safeVids", prop: "wantToPlay", becomes: "true" },
            flow: "safeVidWantsToPlay",
        }),
        whenWantToPause: addItemEffect({
            onItemEffect({ itemName }) {
                setState({
                    safeVids: {
                        [itemName]: { vidState: "beforePause", wantToPause: false },
                    },
                });
            },
            check: { type: "safeVids", prop: "wantToPause", becomes: "true" },
            flow: "safeVidWantsToPlay",
        }),
    }));
}
