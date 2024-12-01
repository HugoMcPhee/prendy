import { forEach } from "chootils/dist/loops";
import { InitialItemsState } from "repond";
import { MyTypes, PrendyAssets } from "../declarations";

/*
A wrapped way to play/pause/seek videos using repond state
*/

export type VidState =
  | "beforePlay" // (this is what triggers the play to happen)
  | "waitingForPlay" // ( while not playing but waiting to play )
  | "readyToPlay"
  | "play"
  //
  | "beforeSeek" // (triggers the seek to happen)
  | "waitingForSeek"
  //
  | "beforePause" // (triggers pause)
  | "waitingForPause" // (might not happen if pause is instant)
  | "pause"
  //
  | "beforeLoad" // ?
  | "waitingForLoad"
  //
  | "beforeUnload"
  | "waitingForUnload"
  | "unloaded";

export const abLetters = ["a", "b"] as const;

export default function stateVids<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"]) {
  const { placeNames, placeInfoByName } = prendyAssets;

  function vidNameToPlaceName(vidName: string) {
    // return vidName.match(/.*?(?=\_|$)/i)![0] as PlaceName;
    // return vidName.match(/.*?(?=_|$)/i)![0] as PlaceName; // only works with one/first underscore

    // Jon - https://stackoverflow.com/questions/11134004/regex-that-will-match-the-last-occurrence-of-dot-in-a-string
    const lastUnderscoreIndex = vidName.lastIndexOf("_");
    if (lastUnderscoreIndex != -1) {
      return vidName.substr(0, lastUnderscoreIndex);
    }
    return vidName;
  }

  const getDefaultState = <T_ItemName extends string>(itemId: T_ItemName) => ({
    vidState: "unloaded" as VidState,
    playType: "pause" as "play" | "pause", // playing | paused (so it knows what it’ll return to after seeking)
    goalSeekTime: null as null | number, // when this changes, it starts seeking
    wantToPlay: false, // boolean, set to true to start the play state stuff automatically (instead of needing to set to vidState = beforePlayAndPaused etc
    wantToPause: false,
    wantToUnload: false,
    wantToLoad: false,
    // videoSource: placeInfoByName[vidNameToPlaceName(itemId)].videoFiles.backdrop,
    videoSource: null,
    autoplay: false, // maybe doesn't work well with stackvids beofre (cause they both woudn't play)
    //
    // isControlledExternally: true, // to wait for vidState to be updated externally before playing etc,
    doneSeekingTime: null as null | number, // when this changes, it’s finished seeking
  });

  const getDefaultRefs = () => ({
    videoElement: null as null | HTMLVideoElement,
  });

  function makeStartStatesForPlaces() {
    const newStartStates = {} as InitialItemsState<typeof getDefaultState>;
    // { windynest_a_color: state("windynest_a_color") }

    forEach(placeNames, (placeName) => {
      forEach(abLetters, (letter) => {
        const loopedName = `${placeName}_${letter}`;
        newStartStates[loopedName] = getDefaultState(loopedName);
      });
    });
    return newStartStates;
  }

  // const startStates: InitialItemsState<typeof state> = {
  const startStates: InitialItemsState<typeof getDefaultState> = makeStartStatesForPlaces();

  return { getDefaultState, getDefaultRefs, startStates };
}
