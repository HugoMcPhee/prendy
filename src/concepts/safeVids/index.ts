import { InitialItemsState } from "concep";
import { forEach } from "shutils/dist/loops";
import { abLetters, vidTypes } from "../../utils/consts";
import { PlaceInfoByNamePlaceholder } from "../typedConceptoFuncs";

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

export default function safeVids<
  PlaceName extends string,
  PlaceInfoByName extends PlaceInfoByNamePlaceholder<PlaceName>
>(placeNames: readonly PlaceName[], placeInfoByName: PlaceInfoByName) {
  function vidNameToPlaceName(vidName: string) {
    // return vidName.match(/.*?(?=\_|$)/i)![0] as PlaceName;
    return vidName.match(/.*?(?=_|$)/i)![0] as PlaceName;
  }

  const state = <T_ItemName extends string>(itemName: T_ItemName) => ({
    vidState: "unloaded" as VidState,
    playType: "pause" as "play" | "pause", // playing | paused (so it knows what it’ll return to after seeking)
    wantedSeekTime: null as null | number, // when this changes, it starts seeking
    wantToPlay: false, // boolean, set to true to start the play state stuff automatically (instead of needing to set to vidState = beforePlayAndPaused etc
    wantToPause: false,
    wantToUnload: false,
    wantToLoad: false,
    videoSource: itemName.includes("color")
      ? placeInfoByName[vidNameToPlaceName(itemName)].videoFiles.color
      : placeInfoByName[vidNameToPlaceName(itemName)].videoFiles.depth,
    autoplay: false, // maybe doesn't work well with stackvids (cause they both woudn't play)
    //
    // isControlledExternally: true, // to wait for vidState to be updated externally before playing etc,
  });

  const refs = () => ({
    videoElement: null as null | HTMLVideoElement,
  });

  function makeStartStatesForPlaces() {
    const newStartStates = {} as InitialItemsState<typeof state>;
    // { windynest_a_color: state("windynest_a_color") }

    forEach(placeNames, (placeName) => {
      forEach(abLetters, (letter) => {
        forEach(vidTypes, (vidType) => {
          const loopedName = `${placeName}_${letter}_${vidType}`;
          newStartStates[loopedName] = state(loopedName);
        });
      });
    });
    return newStartStates;
  }

  // const startStates: InitialItemsState<typeof state> = {
  const startStates: InitialItemsState<typeof state> = makeStartStatesForPlaces();

  return { state, refs, startStates };
}
