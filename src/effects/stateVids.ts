import { AllState, getState, makeEffects, onNextTick, setState } from "repond";
import { makeVideoElementFromPath } from "../helpers/prendyUtils/stateVids";
import { VidState } from "../stores/stateVids";
// import { testAppendVideo } from "../helpers/babylonjs/usePlace/utils";

// NOTE may need to update the safeVidWantsToPlay rules to update on subscribe

function setVid(itemId: string, newState: Partial<AllState["stateVids"][string]>) {
  setState({ stateVids: { [itemId]: newState } });
}

export const safeVidEffects = makeEffects(({ itemEffect }) => ({
  whenVideoStateChanges: itemEffect({
    run({ newValue: vidState, itemState, itemRefs, itemId }) {
      const { goalSeekTime, autoplay } = itemState;

      function setVidState(vidState: VidState) {
        setVid(itemId, { vidState });
      }

      // beforeLoad
      if (vidState === "beforeLoad") {
        setVidState("waitingForLoad");
        itemRefs.videoElement = makeVideoElementFromPath(itemState.videoSource);

        function onLoad() {
          itemRefs.videoElement?.removeEventListener("loadedmetadata", onLoad);
          // uncomment to test videos
          // itemRefs.videoElement && testAppendVideo(itemRefs.videoElement, itemId, itemId);
        }

        itemRefs.videoElement.addEventListener("loadedmetadata", onLoad);

        // manual alternative for preload / autoplay, make sure the video is loaded and has played like 1 frame
        itemRefs.videoElement?.play().finally(() => {
          if (autoplay) {
            setVid(itemId, { vidState: "play", playType: "play" });
          } else {
            itemRefs.videoElement?.pause();
            setVid(itemId, { vidState: "pause", playType: "pause" });
          }
        });
      }
      // beforeSeek
      if (vidState === "beforeSeek") {
        if (itemRefs.videoElement && goalSeekTime !== null) {
          setVid(itemId, { vidState: "waitingForSeek", goalSeekTime: null });

          // note only works on safari is the video was already loaded / played one frame?
          function onSeeked() {
            const newState = getState().stateVids[itemId];
            setState({ stateVids: { [itemId]: { vidState: newState.playType, doneSeekingTime: Date.now() } } });
            itemRefs.videoElement?.removeEventListener("seeked", onSeeked); // stop listening to when the video's seeked
          }
          itemRefs.videoElement.addEventListener("seeked", onSeeked); // start listening to when the video's seeked
          itemRefs.videoElement.currentTime = goalSeekTime; // seek the video
        }
      }
      // beforePlay
      if (vidState === "beforePlay") {
        if (itemRefs.videoElement) {
          setVid(itemId, { vidState: "waitingForPlay", playType: "play" });

          itemRefs.videoElement
            .play()
            .then(() => {
              setVid(itemId, { vidState: "play", goalSeekTime: null });
            })
            .catch((error) => {
              console.warn("Video play error");
              console.error(error);
              // setVid(itemId, { vidState: "pause", playType: "pause" });
            });
        }
      }
      // beforePause
      if (vidState === "beforePause") {
        if (itemRefs.videoElement) {
          setVidState("waitingForPause");
          function onPaused() {
            setVid(itemId, { vidState: "pause", playType: "pause" });
            itemRefs.videoElement?.removeEventListener("pause", onPaused);
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
    check: { type: "stateVids", prop: "vidState" },
    step: "safeVidWantsToPlay",
    atStepEnd: true,
  }),
  // wants
  whenWantToLoad: itemEffect({
    run({ itemId, itemState: { vidState } }) {
      if (vidState === "unloaded") {
        setVid(itemId, { vidState: "beforeLoad", wantToLoad: false });
      } else {
        console.warn("tried to load", itemId, " when it wasn't unloaded");
        setVid(itemId, { wantToLoad: false });
      }
    },
    check: { type: "stateVids", prop: "wantToLoad", becomes: true },
    step: "safeVidWantsToPlay",
  }),
  whenWantToUnload: itemEffect({
    run({ itemId, itemState: { vidState } }) {
      if (vidState !== "unloaded") {
        setVid(itemId, { vidState: "beforeUnload", wantToUnload: false });
      } else {
        console.warn("tried to unload", itemId, " when it was unloaded");
        setVid(itemId, { wantToUnload: false });
      }
    },
    check: { type: "stateVids", prop: "wantToUnload", becomes: true },
    step: "safeVidWantsToPlay",
  }),
  whenWantToSeek: itemEffect({
    run({ newValue: goalSeekTime, itemId }) {
      if (goalSeekTime !== null) setVid(itemId, { vidState: "beforeSeek" });
    },
    check: { type: "stateVids", prop: "goalSeekTime" },
    step: "safeVidWantsToPlay",
  }),
  whenWantToPlay: itemEffect({
    run: ({ itemId }) => setVid(itemId, { vidState: "beforePlay", wantToPlay: false }),
    check: { type: "stateVids", prop: "wantToPlay", becomes: true },
    step: "safeVidWantsToPlay",
  }),
  whenWantToPause: itemEffect({
    run: ({ itemId }) => setVid(itemId, { vidState: "beforePause", wantToPause: false }),
    check: { type: "stateVids", prop: "wantToPause", becomes: true },
    step: "safeVidWantsToPlay",
  }),
}));
