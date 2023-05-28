import { StoreHelperTypes } from "repond";
import { minMaxRange } from "chootils/dist/numbers";
import { SectionVidState } from "../stores/loopVids";
import { get_safeVidUtils } from "../helpers/prendyUtils/stateVids";
import { PrendyAssets, PlaceName } from "../declarations";
import { PrendyOptionsUntyped, PrendyStoreHelpers } from "../stores/typedStoreHelpers";
import { BEFORE_LOOP_PADDING, get_sectionVidUtils } from "../helpers/prendyUtils/loopVids";

export function get_sectionVidRules<
  StoreHelpers extends PrendyStoreHelpers,
  PrendyOptions extends PrendyOptionsUntyped
>(storeHelpers: StoreHelpers, prendyOptions: PrendyOptions, prendyAssets: PrendyAssets) {
  // safe Section Stack Vid Rules

  const { getState, makeRules, setState } = storeHelpers;

  type ItemType = keyof ReturnType<PrendyStoreHelpers["getState"]> & keyof ReturnType<PrendyStoreHelpers["getRefs"]>;
  type HelperType<T extends ItemType> = StoreHelperTypes<
    PrendyStoreHelpers["getState"],
    PrendyStoreHelpers["getRefs"],
    T
  >;
  type ItemState<T extends ItemType> = HelperType<T>["ItemState"];

  const { doWhenSectionVidPlaying, getSectionEndTime, getSectionVidVideo } = get_sectionVidUtils(
    storeHelpers,
    prendyOptions,
    prendyAssets
  );

  const { doWhenSafeVidPlayOrPause, doWhenSafeVidStateReady } = get_safeVidUtils(storeHelpers);

  return makeRules(({ itemEffect }) => ({
    rulesForSettingNewVideoStates: itemEffect({
      run({ newValue: vidState, itemName, itemState }) {
        const setItemState = (newState: Partial<ItemState<"loopVids">>) =>
          setState({ loopVids: { [itemName]: newState } });
        const setVidState = (sectionVidState: SectionVidState) => setItemState({ sectionVidState });

        const { stateVidId_playing, stateVidId_waiting } = itemState;
        if (!stateVidId_playing || !stateVidId_waiting) return;

        // before load
        if (vidState === "beforeLoad") {
          setVidState("waitingForLoad");
          const { nowSection } = itemState;

          // set all child videos to wantToLoad, and set autoplay? only on the playing one, or no autoplay
          setState({
            stateVids: {
              [stateVidId_playing]: { wantToLoad: true, autoplay: true },
              [stateVidId_waiting]: { wantToLoad: true, autoplay: false },
            },
          });

          doWhenSafeVidStateReady(
            stateVidId_playing,
            "play",
            () => {
              const wantedSeekTime = nowSection?.time ?? 0;

              setState({
                loopVids: { [itemName]: { sectionVidState: "play", newPlayingVidStartedTime: Date.now() } },
                stateVids: {
                  [stateVidId_playing]: { wantedSeekTime },
                  [stateVidId_waiting]: { wantedSeekTime },
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
            loopVids: { [itemName]: { sectionVidState: "waitingForUnload" } },
            stateVids: {
              [stateVidId_playing]: { wantToUnload: true },
              [stateVidId_waiting]: { wantToUnload: true },
            },
          });

          doWhenSafeVidStateReady(stateVidId_playing, "unloaded", () => setVidState("unloaded"));
        }

        // before change section
        if (vidState === "beforeChangeSection") {
          const { switchSection_keepProgress, wantedSection, nowSection } = itemState;

          if (!wantedSection) return;

          let newSeekTime = wantedSection.time;
          const newEndTime = getSectionEndTime(wantedSection);

          if (switchSection_keepProgress) {
            //    set it based on the playing vids current time and the previous nowSectionInfo

            const backdropVidElement = getSectionVidVideo(itemName as PlaceName);
            if (backdropVidElement) {
              const nowSectionStartTime = nowSection.time;
              let elapsedTime = backdropVidElement.currentTime - nowSectionStartTime;

              const newStartTime = wantedSection.time; // + BEFORE_LOOP_PADDING; // maybe padding avoids flicker of the previous frame

              newSeekTime = wantedSection.time + elapsedTime;
              // make sure the new seek time isn't before or after the section time
              newSeekTime = minMaxRange(newSeekTime, newStartTime, newEndTime);

              // check if the new seek time is too close to the end so it would loop
              // for example   newSeekTime: 2.017258  newEndTime: 2.0333300000000003  caused a big quick loop
              if (newEndTime - newSeekTime < 0.2) {
                console.warn("was close to looping while changing section");
                newSeekTime = newStartTime;
              }
            }
          }

          setState({
            loopVids: {
              [itemName]: {
                sectionVidState: "waitingForChangeSection",
                nowSection: wantedSection,
                wantedSection: null,
              },
            },
            stateVids: { [stateVidId_waiting]: { wantedSeekTime: newSeekTime } },
          });

          doWhenSafeVidPlayOrPause(
            stateVidId_waiting,
            () => {
              // when the time seeked,
              setState({
                loopVids: {
                  [itemName]: {
                    nowSectionSeekedTime: Date.now(),
                    stateVidId_playing: stateVidId_waiting,
                    stateVidId_waiting: stateVidId_playing,
                  },
                },
              });
            },
            false /* checkInitial */
          );
        }

        // before do loop
        if (vidState === "beforeDoLoop") {
          // swap the playing and nextLoop vids
          setState({
            loopVids: {
              [itemName]: {
                sectionVidState: "waitingForDoLoop",
                stateVidId_playing: stateVidId_waiting,
                stateVidId_waiting: stateVidId_playing,
              },
            },
          });
        }
      },
      check: { type: "loopVids", prop: "sectionVidState" },
      step: "sectionVidWantsToPlay",
      atStepEnd: true,
    }),

    // Wjhen goals change
    whenGoalSectionChanges: itemEffect({
      run({ newValue: wantedSection, itemName, itemState }) {
        if (wantedSection === null || itemState.sectionVidState === "unloaded") return; // don't react if wantedSection changed to null
        setState({ loopVids: { [itemName]: { sectionVidState: "beforeChangeSection" } } });
      },
      check: { type: "loopVids", prop: "wantedSection" },
      step: "sectionVidWantsToPlay",
    }),
    whenWantToLoad: itemEffect({
      run({ itemName, itemState: { sectionVidState } }) {
        if (sectionVidState === "unloaded") {
          setState({ loopVids: { [itemName]: { sectionVidState: "beforeLoad", wantToLoad: false } } });
        } else {
          console.warn("tried to load", itemName, " when it was already loaded");
          setState({ loopVids: { [itemName]: { wantToLoad: false } } });
        }
      },
      check: { type: "loopVids", prop: "wantToLoad", becomes: true },
      step: "sectionVidWantsToPlay",
    }),
    whenWantToUnload: itemEffect({
      run({ itemName, itemState: { sectionVidState } }) {
        if (sectionVidState !== "unloaded") {
          doWhenSectionVidPlaying(itemName as PlaceName, () => {
            setState({ loopVids: { [itemName]: { sectionVidState: "beforeUnload", wantToUnload: false } } });
          });
        } else {
          console.warn("tried to unload", itemName, " when it was unloaded");
          setState({ stateVids: { [itemName]: { wantToUnload: false } } });
        }
      },
      check: { type: "loopVids", prop: "wantToUnload", becomes: true },
      step: "sectionVidWantsToPlay",
    }),
    whenWantToLoop: itemEffect({
      run({ itemName, itemState: { sectionVidState } }) {
        if (sectionVidState === "beforeLoad" || sectionVidState === "unloaded") return;
        setState({ loopVids: { [itemName]: { sectionVidState: "beforeDoLoop", wantToLoop: false } } });
      },
      check: { type: "loopVids", prop: "wantToLoop", becomes: true },
      step: "sectionVidWantsToPlay",
    }),
    // When the play and wait vids swap (loop a and b vids)
    whenPlayVidChanges: itemEffect({
      run({ newValue: stateVidId_playing, itemName: sectionVidName }) {
        if (!stateVidId_playing) return;
        setState({ stateVids: { [stateVidId_playing]: { wantToPlay: true } } });

        doWhenSafeVidStateReady(
          stateVidId_playing,
          "play",
          () => {
            // NOTE could be pause if wanted pausing
            setState({
              loopVids: { [sectionVidName]: { sectionVidState: "play", newPlayingVidStartedTime: Date.now() } },
            });
          },
          false /* check initital */
        );
      },
      check: { type: "loopVids", prop: "stateVidId_playing" },
      step: "sectionVidWantsToPlay2",
      atStepEnd: true,
    }),

    whenWaitVidChanges: itemEffect({
      run({ newValue: stateVidId_waiting, itemState }) {
        if (!stateVidId_waiting) return;
        const { nowSection } = itemState;
        // set the video to paused
        setState({ stateVids: { [stateVidId_waiting]: { wantToPause: true } } });

        // when it finished pausing, set the time to the correct time
        // (it might already be paused, and pause might not be needed)
        doWhenSafeVidStateReady(
          stateVidId_waiting,
          "pause",
          () => {
            setState({
              stateVids: { [stateVidId_waiting]: { wantedSeekTime: nowSection.time + BEFORE_LOOP_PADDING } },
            });
          }
          //  false /*  check initial */
        );
      },
      check: { type: "loopVids", prop: "stateVidId_waiting" },
      step: "sectionVidWantsToPlay2",
      atStepEnd: true,
    }),
  }));
}
