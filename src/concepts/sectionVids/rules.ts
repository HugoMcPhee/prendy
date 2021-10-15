import { ConceptsHelperTypes } from "concep";
import { makeStackVidStoreUtils } from "../../concepts/stackVids/utils";
import { minMaxRange } from "shutils/dist/numbers";
import { SectionVidState } from ".";
import {
  GameyConceptoFuncs,
  GameyStartOptionsUntyped,
  PlaceholderGameyConcepts,
  PlaceInfoByNamePlaceholder,
} from "../typedConceptoFuncs";
import { BEFORE_LOOP_PADDING, makeSectionVidStoreUtils } from "./utils";

export function makeSectionVidRules<
  ConceptoFuncs extends GameyConceptoFuncs,
  PlaceInfoByName extends PlaceInfoByNamePlaceholder<string>,
  PlaceName extends string,
  DollName extends string,
  AnyCameraName extends string,
  CameraNameByPlace extends Record<PlaceName, string>,
  SegmentNameByPlace extends Record<PlaceName, string>
>(
  conceptoFuncs: ConceptoFuncs,
  placeInfoByName: PlaceInfoByName,
  dollNames: readonly DollName[]
) {
  // safe Section Stack Vid Rules

  const { getState, makeRules, setState } = conceptoFuncs;

  type ItemType = keyof ReturnType<GameyConceptoFuncs["getState"]> &
    keyof ReturnType<GameyConceptoFuncs["getRefs"]>;
  type HelperType<T extends ItemType> = ConceptsHelperTypes<
    GameyConceptoFuncs["getState"],
    GameyConceptoFuncs["getRefs"],
    T
  >;
  type ItemState<T extends ItemType> = HelperType<T>["ItemState"];

  const {
    doWhenSectionVidPlaying,
    getSectionEndTime,
    getSectionVidVideo,
  } = makeSectionVidStoreUtils<
    ConceptoFuncs,
    PlaceInfoByName,
    PlaceName,
    DollName,
    AnyCameraName,
    CameraNameByPlace,
    SegmentNameByPlace
  >(conceptoFuncs, placeInfoByName, dollNames);

  const {
    doWhenStackVidPlayOrPause,
    doWhenStackVidStateReady,
  } = makeStackVidStoreUtils(conceptoFuncs);

  return makeRules((addItemEffect) => ({
    rulesForSettingNewVideoStates: addItemEffect({
      onItemEffect({ newValue: vidState, itemName, itemState }) {
        const setItemState = (newState: Partial<ItemState<"sectionVids">>) =>
          setState({ sectionVids: { [itemName]: newState } });
        const setVidState = (sectionVidState: SectionVidState) =>
          setItemState({ sectionVidState });

        const { stackVidId_playing, stackVidId_waiting } = itemState;
        if (!stackVidId_playing || !stackVidId_waiting) return;

        // before load
        if (vidState === "beforeLoad") {
          setVidState("waitingForLoad");
          const { nowSection } = itemState;

          // set all child videos to wantToLoad, and set autoplay? only on the playing one, or no autoplay

          setState({
            stackVids: {
              [stackVidId_playing]: {
                wantToLoad: true,
                autoplay: true,
              },
              [stackVidId_waiting]: {
                wantToLoad: true,
                autoplay: false,
              },
            },
          });

          doWhenStackVidStateReady(
            stackVidId_playing,
            "play",
            () => {
              const wantedSeekTime = nowSection?.time ?? 0;
              setState({
                sectionVids: {
                  [itemName]: {
                    sectionVidState: "play",
                    newplayingVidStartedTime: Date.now(),
                  },
                },
                stackVids: {
                  [stackVidId_playing]: { wantedSeekTime },
                  [stackVidId_waiting]: { wantedSeekTime },
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
            sectionVids: {
              [itemName]: { sectionVidState: "waitingForUnload" },
            },
            stackVids: {
              [stackVidId_playing]: { wantToUnload: true },
              [stackVidId_waiting]: { wantToUnload: true },
            },
          });

          doWhenStackVidStateReady(stackVidId_playing, "unloaded", () => {
            setVidState("unloaded");
          });
        }

        // before change section
        if (vidState === "beforeChangeSection") {
          const {
            switchSection_keepProgress,
            wantedSection,
            nowSection,
          } = itemState;

          if (!wantedSection) return;

          let newSeekTime = wantedSection.time;
          const newEndTime = getSectionEndTime(wantedSection);

          if (switchSection_keepProgress) {
            //    set it based on the playing vids current time and the previous nowSectionInfo

            const colorVidElement = getSectionVidVideo(itemName as PlaceName);
            if (colorVidElement) {
              const nowSectionStartTime = nowSection.time;
              let elapsedTime =
                colorVidElement.currentTime - nowSectionStartTime;

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
            stackVids: {
              [stackVidId_waiting]: { wantedSeekTime: newSeekTime },
            },
          });

          doWhenStackVidPlayOrPause(
            stackVidId_waiting,
            () => {
              // when the time seeked,
              setState({
                sectionVids: {
                  [itemName]: {
                    nowSectionSeekedTime: Date.now(),
                    stackVidId_playing: stackVidId_waiting,
                    stackVidId_waiting: stackVidId_playing,
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
            sectionVids: {
              [itemName]: {
                sectionVidState: "waitingForDoLoop",
                stackVidId_playing: stackVidId_waiting,
                stackVidId_waiting: stackVidId_playing,
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
        } else {
          console.warn(
            "tried to load",
            itemName,
            " when it was already loaded"
          );
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
          doWhenSectionVidPlaying(itemName as PlaceName, () => {
            setState({
              sectionVids: {
                [itemName]: {
                  sectionVidState: "beforeUnload",
                  wantToUnload: false,
                },
              },
            });
          });
        } else {
          console.warn("tried to unload", itemName, " when it was unloaded");
          setState({ stackVids: { [itemName]: { wantToUnload: false } } });
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
      onItemEffect({ newValue: stackVidId_playing, itemName: sectionVidName }) {
        // const { nowPlaceName } = getGlobalState();
        // if (nowPlaceName !== sectionVidName) return;

        if (!stackVidId_playing) return;

        setState({ stackVids: { [stackVidId_playing]: { wantToPlay: true } } });

        doWhenStackVidStateReady(
          stackVidId_playing,
          "play",
          () => {
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
                  sectionVidState: "play", // NOTE could be pause if wanted pausing
                  newplayingVidStartedTime: Date.now(),
                },
              },
            });
          },
          false /* check initital */
        );
      },
      check: { type: "sectionVids", prop: "stackVidId_playing" },
      flow: "sectionVidWantsToPlay2",
      whenToRun: "subscribe",
    }),

    whenWaitVidChanges: addItemEffect({
      onItemEffect({ newValue: stackVidId_waiting, itemState }) {
        // const { nowPlaceName } = getGlobalState();
        // if (nowPlaceName !== sectionVidName) return;
        if (!stackVidId_waiting) return;
        const { nowSection } = itemState;
        // set the video to paused
        setState({
          stackVids: { [stackVidId_waiting]: { wantToPause: true } },
        });

        // when it finished pausing, set the time to the correct time
        // (it might already be paused, and pause might not be needed)
        doWhenStackVidStateReady(
          stackVidId_waiting,
          "pause",
          () => {
            setState({
              stackVids: {
                [stackVidId_waiting]: {
                  wantedSeekTime: nowSection.time + BEFORE_LOOP_PADDING,
                },
              },
            });
          }
          //  false /*  check initial */
        );
      },
      check: { type: "sectionVids", prop: "stackVidId_waiting" },
      flow: "sectionVidWantsToPlay2",
      whenToRun: "subscribe",
    }),
  }));
}
