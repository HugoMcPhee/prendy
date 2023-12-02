import { minMaxRange } from "chootils/dist/numbers";
import { AllRefs, AllState, StoreHelperTypes, getRefs, getState, makeRules, setState } from "repond";
import { MyTypes } from "../declarations";
import {
  BEFORE_LOOP_PADDING,
  doWhenSliceVidPlaying,
  getSliceEndTime,
  getSliceVidVideo,
  getSliceVidWaitingVideo,
} from "../helpers/prendyUtils/sliceVids";
import { SliceVidState } from "../stores/sliceVids";
import { doWhenStateVidStateReady, doWhenStateVidStateSeeked } from "../helpers/prendyUtils/stateVids";

function numbersAreClose(a: number, b: number, range: number) {
  return Math.abs(a - b) < range;
}

type PlaceName = MyTypes["Types"]["PlaceName"];

// safe Slice Stack Vid Rules

type ItemType = keyof AllState & keyof AllRefs;
type HelperType<T extends ItemType> = StoreHelperTypes<typeof getState, typeof getRefs, T>;
type ItemState<T extends ItemType> = HelperType<T>["ItemState"];

export const sliceVidRules = makeRules(({ itemEffect }) => ({
  rulesForSettingNewVideoStates: itemEffect({
    run({ newValue: vidState, itemName, itemState }) {
      const setItemState = (newState: Partial<ItemState<"sliceVids">>) =>
        setState({ sliceVids: { [itemName]: newState } });
      // NOTE TODO FIXME? any type while no stores are connected
      const setVidState = (sliceVidState: SliceVidState) => setItemState({ sliceVidState } as any);

      const { stateVidId_playing, stateVidId_waiting, nowSlice } = itemState;
      if (!stateVidId_playing || !stateVidId_waiting) return;

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

        doWhenStateVidStateReady(
          stateVidId_playing,
          "play",
          () => {
            const goalSeekTime = nowSlice?.time ?? 0;

            setState({
              sliceVids: { [itemName]: { sliceVidState: "play", newPlayingVidStartedTime: Date.now() } },
              stateVids: {
                [stateVidId_playing]: { goalSeekTime },
                [stateVidId_waiting]: { goalSeekTime },
              },
            });
          },
          false /*check inital */
        );
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

        doWhenStateVidStateReady(stateVidId_playing, "unloaded", () => setVidState("unloaded"));
      }

      // before change slice
      if (vidState === "beforeChangeSlice") {
        const { switchSlice_keepProgress, goalSlice, nowSlice } = itemState;

        if (!goalSlice) return;

        let newSeekTime = goalSlice.time + BEFORE_LOOP_PADDING; // BEFORE_LOOP_PADDING needed to prevent showing part of the previous frame on ios
        const newEndTime = getSliceEndTime(goalSlice);

        if (switchSlice_keepProgress) {
          //    set it based on the playing vids current time and the previous nowSliceInfo

          const backdropVidElement = getSliceVidVideo(itemName as PlaceName);
          if (backdropVidElement) {
            const nowSliceStartTime = nowSlice.time;
            let elapsedTime = backdropVidElement.currentTime - nowSliceStartTime;

            const newStartTime = goalSlice.time + BEFORE_LOOP_PADDING; // maybe padding avoids flicker of the previous frame

            newSeekTime = goalSlice.time + elapsedTime;
            // make sure the new seek time isn't before or after the slice time
            newSeekTime = minMaxRange(newSeekTime, newStartTime, newEndTime);

            // check if the new seek time is too close to the end so it would loop
            // for example   newSeekTime: 2.017258  newEndTime: 2.0333300000000003  caused a big quick loop
            if (newEndTime - newSeekTime < 0.05) {
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
          // set the goal seek time for the waiting background vid
          stateVids: { [stateVidId_waiting]: { goalSeekTime: newSeekTime } },
        });

        // once the seek for the background waiting vid is finished, then swap to show the background wwaiting vid
        doWhenStateVidStateSeeked(stateVidId_waiting, () => {
          setState({
            sliceVids: {
              [itemName]: {
                nowSliceSeekedTime: Date.now(),
                stateVidId_playing: stateVidId_waiting,
                stateVidId_waiting: stateVidId_playing,
              },
            },
          });
        });
      }

      // before do loop
      if (vidState === "beforeDoLoop") {
        // swap the playing and nextLoop vids

        // FIXME try to make sure the aiting vid is at the start of the looping slice before changing!

        // it assumes the waiting vid is at the start of the looping slice

        // cehck the current seek time of the waiting vid
        const waitingVidElement = getSliceVidWaitingVideo(itemName as PlaceName);
        // if (!waitingVidElement) return;
        // console.log("waitingVid time", waitingVidElement?.currentTime);
        // console.log("nowSlice time", nowSlice.time);

        function swapPlayingAndWaitingVids() {
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

        const waitingVidIsAtStartOfSlice = numbersAreClose(
          waitingVidElement?.currentTime ?? 0,
          nowSlice.time,
          BEFORE_LOOP_PADDING * 1.5
        );

        if (waitingVidIsAtStartOfSlice) {
          // if the waiting vid is at the start of the slice, then swap the playing and waiting vids
          swapPlayingAndWaitingVids();
        } else {
          console.log("waiting vid is not at start of slice, seeking to start of slice");
          console.log(waitingVidElement?.currentTime, nowSlice.time);

          // otherwise, seek the waiting vid to the start of the slice, then swap the playing and waiting vids
          setState({ stateVids: { [stateVidId_waiting]: { goalSeekTime: nowSlice.time + BEFORE_LOOP_PADDING } } }); // BEFORE_LOOP_PADDING needed to prevent showing part of the previous frame on ios
          doWhenStateVidStateSeeked(stateVidId_waiting, swapPlayingAndWaitingVids);
        }
      }
    },
    check: { type: "sliceVids", prop: "sliceVidState" },
    step: "sliceVidWantsToPlay",
    // atStepEnd: true,
  }),

  // Wjhen goals change
  whenGoalSliceChanges: itemEffect({
    run({ newValue: goalSlice, itemName, itemState }) {
      if (goalSlice === null || itemState.sliceVidState === "unloaded") return; // don't react if goalSlice changed to null
      setState({ sliceVids: { [itemName]: { sliceVidState: "beforeChangeSlice" } } });
    },
    check: { type: "sliceVids", prop: "goalSlice" },
    step: "sliceVidWantsToPlay",
  }),
  whenWantToLoad: itemEffect({
    run({ itemName, itemState: { sliceVidState } }) {
      if (sliceVidState === "unloaded") {
        setState({ sliceVids: { [itemName]: { sliceVidState: "beforeLoad", wantToLoad: false } } });
      } else {
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
        doWhenSliceVidPlaying(itemName as PlaceName, () => {
          setState({ sliceVids: { [itemName]: { sliceVidState: "beforeUnload", wantToUnload: false } } });
        });
      } else {
        console.warn("tried to unload", itemName, " when it was unloaded");
        setState({ stateVids: { [itemName]: { wantToUnload: false } } });
      }
    },
    check: { type: "sliceVids", prop: "wantToUnload", becomes: true },
    step: "sliceVidWantsToPlay",
  }),
  whenWantToLoop: itemEffect({
    run({ itemName, itemState: { sliceVidState }, frameDuration }) {
      if (sliceVidState === "beforeLoad" || sliceVidState === "unloaded") return;
      setState({ sliceVids: { [itemName]: { sliceVidState: "beforeDoLoop", wantToLoop: false } } });
    },
    check: { type: "sliceVids", prop: "wantToLoop", becomes: true },
    step: "sliceVidWantsToPlay",
  }),
  // When the play and wait vids swap (loop a and b vids)
  whenPlayVidChanges: itemEffect({
    run({ newValue: stateVidId_playing, itemName: sliceVidName }) {
      if (!stateVidId_playing) return;
      setState({ stateVids: { [stateVidId_playing]: { wantToPlay: true } } });

      // it doesn't seek here, just sets the video to play

      doWhenStateVidStateReady(
        stateVidId_playing,
        "play",
        () => {
          // NOTE could be pause if wanted pausing
          setState({
            sliceVids: { [sliceVidName]: { sliceVidState: "play", newPlayingVidStartedTime: Date.now() } },
          });
        },
        false /* check initital */
      );
    },
    check: { type: "sliceVids", prop: "stateVidId_playing" },
    step: "sliceVidWantsToPlay2",
    // atStepEnd: true,
  }),

  whenWaitVidChanges: itemEffect({
    run({ newValue: stateVidId_waiting, itemState }) {
      if (!stateVidId_waiting) return;
      const { nowSlice } = itemState;
      // set the video to paused
      setState({ stateVids: { [stateVidId_waiting]: { wantToPause: true } } });

      // when it finished pausing, set the time to the correct time
      // (it might already be paused, and pause might not be needed)

      // This sets the new background video to be at the start of the looping slice

      // check it's not already at the correct time

      doWhenStateVidStateReady(
        stateVidId_waiting,
        "pause",
        () => {
          setState({
            stateVids: { [stateVidId_waiting]: { goalSeekTime: nowSlice.time + BEFORE_LOOP_PADDING } }, // BEFORE_LOOP_PADDING needed to prevent showing part of the previous frame on ios
          });
        }
        //  false /*  check initial */
      );
    },
    check: { type: "sliceVids", prop: "stateVidId_waiting" },
    step: "sliceVidWantsToPlay2",
    // atStepEnd: true,
  }),
}));
