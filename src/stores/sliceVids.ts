import { forEach } from "chootils/dist/loops";
import { MyTypes } from "../declarations";

/*
A way to loop and change "slices" of videos seamlessly 
It's like seamless A-B looping for parts of a video

it has two duplicate video files loaded at once, and switches between them when looping and seeking to avoid delays
it uses "stateVids" for the two videos it controls 
(stateVids are a way to control web videos through repond state)
*/

// making PlaceName generic didn't seem to work with autocomplete?
// export type InitialItemsStateWithNames<
//   T_defaultStateFunctionType extends (...args: any) => any
// > = {
//   [K_ItemName in PlaceName]: ReturnType<T_defaultStateFunctionType>;
// };

export type SliceVidState =
  | "beforeDoLoop"
  | "waitingForDoLoop" // while seeking and swapping videos
  | "beforeChangeSlice"
  | "waitingForChangeSlice" // while seeking and swapping videos
  | "play"
  | "pause" // ? (the visible video should never really be paused, unless maybe for the first loading stuff?)
  | "beforeUnload"
  | "waitingForUnload"
  | "unloaded"
  | "beforeLoad"
  | "waitingForLoad";

export type VidLetter = "a" | "b";

export type VidSlice = { time: number; duration: number };

export default function sliceVids<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"]) {
  type PlaceName = T_MyTypes["Main"]["PlaceName"];

  const { placeNames } = prendyAssets;

  const state = <T_ItemName extends string>(itemName: T_ItemName) => ({
    stateVidId_playing: `${itemName}_a` as string | null,
    stateVidId_waiting: `${itemName}_b` as string | null,
    //
    sliceVidState: "unloaded" as SliceVidState,
    //
    nowSlice: { time: 0, duration: 1 },
    goalSlice: null as VidSlice | null,
    wantToLoad: false,
    wantToUnload: false,
    wantToLoop: false,
    switchSlice_keepProgress: true, // maybe always default to true
    //
    newPlayingVidStartedTime: 0, // timestamp when the video starts playing after vidLetter_play changes
    nowSliceSeekedTime: 0, // timestamp when the new slice seeked (but not played yet)
    //
  });

  const refs = () => ({
    waitingForPlayToDoLoopRuleName: null as null | string,
    // waitingForPlayToChangeSliceRuleName: null as null | string,
  });

  function makeStartStatesForPlaces() {
    // enable autocompleted names and properties , (when using name directly)
    const newStartStates = {} as Record<PlaceName, ReturnType<typeof state>>;
    // enable autocompleted properties when using a variable for name
    // const newStartStates = {} as InitialItemsState<typeof state>;

    forEach(placeNames as PlaceName[], (placeName) => (newStartStates[placeName] = state(placeName)));
    return newStartStates;
  }

  const startStates = makeStartStatesForPlaces();

  return { state, refs, startStates };
}
