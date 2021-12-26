import { StoreHelperTypes } from "pietem";
import { VidState } from ".";
import { PrendyStoreHelpers } from "../typedStoreHelpers";
import { makeVideoElementFromPath } from "./utils";
// import { testAppendVideo } from "../../utils/babylonjs/usePlace/utils";

// NOTE may need to update the safeVidWantsToPlay rules to update on subscribe

export function makeSafeVidRules<StoreHelpers extends PrendyStoreHelpers>(
  storeHelpers: StoreHelpers
) {
  const { getState, makeRules, onNextTick, setState } = storeHelpers;

  type ItemType = keyof ReturnType<PrendyStoreHelpers["getState"]> &
    keyof ReturnType<PrendyStoreHelpers["getRefs"]>;
  type HelperType<T extends ItemType> = StoreHelperTypes<
    PrendyStoreHelpers["getState"],
    PrendyStoreHelpers["getRefs"],
    T
  >;
  type ItemState<T extends ItemType> = HelperType<T>["ItemState"];

  return makeRules(({ itemEffect }) => ({
    rulesForSettingNewVideoStates: itemEffect({
      run({ newValue: vidState, itemState, itemRefs, itemName }) {
        const { wantedSeekTime, autoplay } = itemState;
        function setItemState(newState: Partial<ItemState<"safeVids">>) {
          setState({ safeVids: { [itemName]: newState } });
        }
        function setVidState(vidState: VidState) {
          setItemState({ vidState });
        }

        // beforeLoad
        if (vidState === "beforeLoad") {
          setVidState("waitingForLoad");
          itemRefs.videoElement = makeVideoElementFromPath(
            itemState.videoSource
          );

          function onLoad() {
            itemRefs.videoElement?.removeEventListener(
              "loadedmetadata",
              onLoad
            );
            // uncomment to test videos
            // itemRefs.videoElement &&
            // testAppendVideo(itemRefs.videoElement, itemName, itemName);
          }
          // NOTE canplay doesn't work on safari?
          itemRefs.videoElement.addEventListener("loadedmetadata", onLoad);
          // manual alternative for preload / autoplay, make sure the video is loaded and has played like 1 frame
          itemRefs.videoElement?.play().finally(() => {
            // console.log("itemRefs.videoEleme nt");
            // console.log(itemRefs.videoElement);
            if (autoplay) {
              setItemState({ vidState: "play", playType: "play" });
            } else {
              itemRefs.videoElement?.pause();
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
              const newState = getState().safeVids[itemName];
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
              setItemState({ vidState: "pause", playType: "pause" });
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
      check: { type: "safeVids", prop: "vidState" },
      step: "safeVidWantsToPlay",
      atStepEnd: true,
    }),
    // wants
    whenWantToLoad: itemEffect({
      run({ itemName, itemState: { vidState } }) {
        // console.log("want to load");

        if (vidState === "unloaded") {
          setState({
            safeVids: {
              [itemName]: { vidState: "beforeLoad", wantToLoad: false },
            },
          });
        } else {
          console.warn("tried to load", itemName, " when it wasn't unloaded");
          setState({ safeVids: { [itemName]: { wantToLoad: false } } });
        }
      },
      check: { type: "safeVids", prop: "wantToLoad", becomes: true },
      step: "safeVidWantsToPlay",
    }),
    whenWantToUnload: itemEffect({
      run({ itemName, itemState: { vidState } }) {
        if (vidState !== "unloaded") {
          setState({
            safeVids: {
              [itemName]: { vidState: "beforeUnload", wantToUnload: false },
            },
          });
        } else {
          console.warn("tried to unload", itemName, " when it was unloaded");
          setState({ safeVids: { [itemName]: { wantToUnload: false } } });
        }
      },
      check: { type: "safeVids", prop: "wantToUnload", becomes: true },
      step: "safeVidWantsToPlay",
    }),
    whenWantToSeek: itemEffect({
      run({ newValue: wantedSeekTime, itemName }) {
        if (wantedSeekTime !== null) {
          setState({ safeVids: { [itemName]: { vidState: "beforeSeek" } } });
        }
      },
      check: { type: "safeVids", prop: "wantedSeekTime" },
      step: "safeVidWantsToPlay",
    }),
    whenWantToPlay: itemEffect({
      run({ itemName }) {
        setState({
          safeVids: {
            [itemName]: { vidState: "beforePlay", wantToPlay: false },
          },
        });
      },
      check: { type: "safeVids", prop: "wantToPlay", becomes: true },
      step: "safeVidWantsToPlay",
    }),
    whenWantToPause: itemEffect({
      run({ itemName }) {
        setState({
          safeVids: {
            [itemName]: { vidState: "beforePause", wantToPause: false },
          },
        });
      },
      check: { type: "safeVids", prop: "wantToPause", becomes: true },
      step: "safeVidWantsToPlay",
    }),
  }));
}
