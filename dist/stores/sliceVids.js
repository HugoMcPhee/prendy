import { forEach } from "chootils/dist/loops";
export default function sliceVids(prendyAssets) {
    const { placeNames } = prendyAssets;
    const state = (itemName) => ({
        stateVidId_playing: `${itemName}_a`,
        stateVidId_waiting: `${itemName}_b`,
        //
        sliceVidState: "unloaded",
        //
        nowSlice: { time: 0, duration: 1 },
        goalSlice: null,
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
        waitingForPlayToDoLoopRuleName: null,
        // waitingForPlayToChangeSliceRuleName: null as null | string,
    });
    function makeStartStatesForPlaces() {
        // enable autocompleted names and properties , (when using name directly)
        const newStartStates = {};
        // enable autocompleted properties when using a variable for name
        // const newStartStates = {} as InitialItemsState<typeof state>;
        forEach(placeNames, (placeName) => (newStartStates[placeName] = state(placeName)));
        return newStartStates;
    }
    const startStates = makeStartStatesForPlaces();
    return { state, refs, startStates };
}
