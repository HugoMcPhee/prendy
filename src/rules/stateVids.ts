import { StoreHelperTypes } from "repond";
import { VidState } from "../stores/stateVids";
import { PrendyStoreHelpers } from "../stores/typedStoreHelpers";
import { makeVideoElementFromPath } from "../helpers/prendyUtils/stateVids";
// import { testAppendVideo } from "../../utils/babylonjs/usePlace/utils";

// NOTE may need to update the safeVidWantsToPlay rules to update on subscribe

export function get_safeVidRules<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers) {
  const { getState, makeRules, onNextTick, setState } = storeHelpers;

  type ItemType = keyof ReturnType<PrendyStoreHelpers["getState"]> & keyof ReturnType<PrendyStoreHelpers["getRefs"]>;
  type HelperType<T extends ItemType> = StoreHelperTypes<
    PrendyStoreHelpers["getState"],
    PrendyStoreHelpers["getRefs"],
    T
  >;
  type ItemState<T extends ItemType> = HelperType<T>["ItemState"];

  function setVid(itemName: string, newState: Partial<ItemState<"stateVids">>) {
    setState({ stateVids: { [itemName]: newState } });
  }

  return makeRules(({ itemEffect }) => ({
    whenVideoStateChanges: itemEffect({
      run({ newValue: vidState, itemState, itemRefs, itemName }) {
        const { wantedSeekTime, autoplay } = itemState;

        function setVidState(vidState: VidState) {
          setVid(itemName, { vidState });
        }

        // beforeLoad
        if (vidState === "beforeLoad") {
          setVidState("waitingForLoad");
          itemRefs.videoElement = makeVideoElementFromPath(itemState.videoSource);

          function onLoad() {
            itemRefs.videoElement?.removeEventListener("loadedmetadata", onLoad);
            // uncomment to test videos
            // itemRefs.videoElement &&
            // testAppendVideo(itemRefs.videoElement, itemName, itemName);
          }
          // NOTE canplay doesn't work on safari?
          itemRefs.videoElement.addEventListener("loadedmetadata", onLoad);
          // manual alternative for preload / autoplay, make sure the video is loaded and has played like 1 frame
          itemRefs.videoElement?.play().finally(() => {
            if (autoplay) {
              setVid(itemName, { vidState: "play", playType: "play" });
            } else {
              itemRefs.videoElement?.pause();
              setVid(itemName, { vidState: "pause", playType: "pause" });
            }
          });
        }
        // beforeSeek
        if (vidState === "beforeSeek") {
          if (itemRefs.videoElement && wantedSeekTime !== null) {
            setVid(itemName, { vidState: "waitingForSeek", wantedSeekTime: null });

            // note only works on safari is the video was already loaded / played one frame?
            function onSeeked() {
              const newState = getState().stateVids[itemName];
              setVidState(newState.playType);
              itemRefs.videoElement?.removeEventListener("seeked", onSeeked); // stop listening to when the video's seeked
            }
            itemRefs.videoElement.addEventListener("seeked", onSeeked); // start listening to when the video's seeked
            itemRefs.videoElement.currentTime = wantedSeekTime; // seek the video
          }
        }
        // beforePlay
        if (vidState === "beforePlay") {
          if (itemRefs.videoElement) {
            setVid(itemName, { vidState: "waitingForPlay", playType: "play" });

            itemRefs.videoElement
              .play()
              .then(() => {
                setVid(itemName, { vidState: "play", wantedSeekTime: null });
              })
              .catch((error) => {
                console.warn("Video play error");
                console.error(error);
                setVid(itemName, { vidState: "pause", playType: "pause" });
              });
          }
        }
        // beforePause
        if (vidState === "beforePause") {
          if (itemRefs.videoElement) {
            setVidState("waitingForPause");
            function onPaused() {
              setVid(itemName, { vidState: "pause", playType: "pause" });
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
      run({ itemName, itemState: { vidState } }) {
        if (vidState === "unloaded") {
          setVid(itemName, { vidState: "beforeLoad", wantToLoad: false });
        } else {
          console.warn("tried to load", itemName, " when it wasn't unloaded");
          setVid(itemName, { wantToLoad: false });
        }
      },
      check: { type: "stateVids", prop: "wantToLoad", becomes: true },
      step: "safeVidWantsToPlay",
    }),
    whenWantToUnload: itemEffect({
      run({ itemName, itemState: { vidState } }) {
        if (vidState !== "unloaded") {
          setVid(itemName, { vidState: "beforeUnload", wantToUnload: false });
        } else {
          console.warn("tried to unload", itemName, " when it was unloaded");
          setVid(itemName, { wantToUnload: false });
        }
      },
      check: { type: "stateVids", prop: "wantToUnload", becomes: true },
      step: "safeVidWantsToPlay",
    }),
    whenWantToSeek: itemEffect({
      run({ newValue: wantedSeekTime, itemName }) {
        if (wantedSeekTime !== null) setVid(itemName, { vidState: "beforeSeek" });
      },
      check: { type: "stateVids", prop: "wantedSeekTime" },
      step: "safeVidWantsToPlay",
    }),
    whenWantToPlay: itemEffect({
      run: ({ itemName }) => setVid(itemName, { vidState: "beforePlay", wantToPlay: false }),
      check: { type: "stateVids", prop: "wantToPlay", becomes: true },
      step: "safeVidWantsToPlay",
    }),
    whenWantToPause: itemEffect({
      run: ({ itemName }) => setVid(itemName, { vidState: "beforePause", wantToPause: false }),
      check: { type: "stateVids", prop: "wantToPause", becomes: true },
      step: "safeVidWantsToPlay",
    }),
  }));
}
