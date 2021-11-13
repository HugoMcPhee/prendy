import { BackdopArt, PlaceName } from "../../declarations";
import { forEach } from "shutils/dist/loops";

// making PlaceName generic didn't seem to work with autocomplete?
// export type InitialItemsStateWithNames<
//   T_defaultStateFunctionType extends (...args: any) => any
// > = {
//   [K_ItemName in PlaceName]: ReturnType<T_defaultStateFunctionType>;
// };

export type SectionVidState =
  | "beforeDoLoop"
  | "waitingForDoLoop" // while seeking and swapping videos
  | "beforeChangeSection"
  | "waitingForChangeSection" // while seeking and swapping videos
  | "play"
  | "pause" // ? (the visible video should never really be paused, unless maybe for the first loading stuff?)
  | "beforeUnload"
  | "waitingForUnload"
  | "unloaded"
  | "beforeLoad"
  | "waitingForLoad";

export type VidLetter = "a" | "b";

export type VidSection = { time: number; duration: number };

export default function sectionVids(backdopArt: BackdopArt) {
  const { placeNames } = backdopArt;

  const state = <T_ItemName extends string>(itemName: T_ItemName) => ({
    safeVidId_playing: `${itemName}_a` as string | null,
    safeVidId_waiting: `${itemName}_b` as string | null,
    //
    sectionVidState: "unloaded" as SectionVidState,
    //
    nowSection: { time: 0, duration: 1 },
    wantedSection: null as VidSection | null,
    wantToLoad: false,
    wantToUnload: false,
    wantToLoop: false,
    switchSection_keepProgress: true, // maybe always default to truw
    // wantedSectionInstant: null as VidSection | null,
    // wantedSectionAtLoop: null as VidSection | null,
    //
    newplayingVidStartedTime: 0, // timestamp when the video starts playing after vidLetter_play changes
    nowSectionSeekedTime: 0, // timestamp when the new section seeked (but not played yet)
    //
  });

  const refs = () => ({
    waitingForPlayToDoLoopRuleName: null as null | string,
    waitingForPlayToChangeSectionRuleName: null as null | string,
    //
    // waitingForWhenPlayingVidChangesRuleName: null as null | string,
    // waitingForWhenLoopingVidChangesRuleName: null as null | string,
  });

  function makeStartStatesForPlaces() {
    // enable autocompleted names and properties , (when using name directly)
    const newStartStates = {} as Record<PlaceName, ReturnType<typeof state>>;
    // enable autocompleted properties when using a variable for name
    // const newStartStates = {} as InitialItemsState<typeof state>;

    forEach(placeNames, (placeName) => {
      newStartStates[placeName] = state(placeName);
    });
    return newStartStates;
  }

  const startStates = makeStartStatesForPlaces();

  return { state, refs, startStates };
}
