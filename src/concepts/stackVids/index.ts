import { InitialItemsState } from "concepto";
import { forEach } from "shutils/dist/loops";
import { abLetters } from "../../utils/consts";

export type StackVidState =
  | "beforePlay" // (this is what triggers the play to happen)
  | "waitingForPlay" // ( while not playing but waiting to play )
  | "play"
  | "beforeSeek" // (triggers the seek to happen)
  | "waitingForSeek"
  | "beforePause" // (triggers pause)
  | "waitingForPause" // (might not happen if pause is instant)
  | "pause"
  | "beforeLoad" // ?
  | "waitingForLoad"
  | "beforeUnload"
  | "waitingForUnload"
  | "unloaded";

export default function stackVids<PlaceName extends string>(
  placeNames: readonly PlaceName[]
) {
  const state = <T_ItemName extends string>(itemName: T_ItemName) => ({
    vidAId: `${itemName}_color` as string | null,
    vidBId: `${itemName}_depth` as string | null,
    //
    vidState: "unloaded" as StackVidState,
    playType: "pause" as "play" | "pause", // playing | paused (so it knows what it’ll return to after seeking)

    wantedSeekTime: null as null | number, // when this changes, it starts seeking
    wantToPlay: false, // boolean, set to true to start the play state stuff automatically (instead of needing to set to vidState = beforePlayAndPaused etc
    wantToPause: false,
    wantToUnload: false,
    wantToLoad: false,
    videoSourcePath: "",
    autoplay: false,
  });

  const refs = () => ({});

  function makeStartStatesForPlaces() {
    const newStartStates = {} as InitialItemsState<typeof state>;
    // { windynest_a: state("windynest_a") }

    forEach(placeNames, (placeName) => {
      forEach(abLetters, (letter) => {
        const loopedName = `${placeName}_${letter}`;
        newStartStates[loopedName] = state(loopedName);
      });
    });
    return newStartStates;
  }

  const startStates: InitialItemsState<typeof state> = makeStartStatesForPlaces();

  return { state, refs, startStates };
}
