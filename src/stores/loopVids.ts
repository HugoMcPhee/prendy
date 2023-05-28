import { PrendyAssets, PlaceName } from "../declarations";
import { forEach } from "chootils/dist/loops";

/*
A way to loop and change "sections" of videos seamlessly
it has two videos loaded at once, and switches between them when looping and seeking to avoid delays
it uses "stateVids" as the two videos it controls
*/

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

export default function loopVids<
  A_PrendyAssets extends PrendyAssets = PrendyAssets,
  A_PlaceName extends PlaceName = PlaceName
>(prendyAssets: A_PrendyAssets) {
  const { placeNames } = prendyAssets;

  const state = <T_ItemName extends string>(itemName: T_ItemName) => ({
    stateVidId_playing: `${itemName}_a` as string | null,
    stateVidId_waiting: `${itemName}_b` as string | null,
    //
    sectionVidState: "unloaded" as SectionVidState,
    //
    nowSection: { time: 0, duration: 1 },
    wantedSection: null as VidSection | null,
    wantToLoad: false,
    wantToUnload: false,
    wantToLoop: false,
    switchSection_keepProgress: true, // maybe always default to true
    //
    newPlayingVidStartedTime: 0, // timestamp when the video starts playing after vidLetter_play changes
    nowSectionSeekedTime: 0, // timestamp when the new section seeked (but not played yet)
    //
  });

  const refs = () => ({
    waitingForPlayToDoLoopRuleName: null as null | string,
    waitingForPlayToChangeSectionRuleName: null as null | string,
  });

  function makeStartStatesForPlaces() {
    // enable autocompleted names and properties , (when using name directly)
    const newStartStates = {} as Record<A_PlaceName, ReturnType<typeof state>>;
    // enable autocompleted properties when using a variable for name
    // const newStartStates = {} as InitialItemsState<typeof state>;

    forEach(placeNames, (placeName) => (newStartStates[placeName] = state(placeName)));
    return newStartStates;
  }

  const startStates = makeStartStatesForPlaces();

  return { state, refs, startStates };
}
