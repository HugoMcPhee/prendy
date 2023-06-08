import { forEach } from "chootils/dist/loops";
export const abLetters = ["a", "b"];
export default function stateVids(prendyAssets) {
    const { placeNames, placeInfoByName } = prendyAssets;
    function vidNameToPlaceName(vidName) {
        // return vidName.match(/.*?(?=\_|$)/i)![0] as PlaceName;
        // return vidName.match(/.*?(?=_|$)/i)![0] as PlaceName; // only works with one/first underscore
        // Jon - https://stackoverflow.com/questions/11134004/regex-that-will-match-the-last-occurrence-of-dot-in-a-string
        const lastUnderscoreIndex = vidName.lastIndexOf("_");
        if (lastUnderscoreIndex != -1) {
            return vidName.substr(0, lastUnderscoreIndex);
        }
        return vidName;
    }
    const state = (itemName) => ({
        vidState: "unloaded",
        playType: "pause",
        goalSeekTime: null,
        wantToPlay: false,
        wantToPause: false,
        wantToUnload: false,
        wantToLoad: false,
        videoSource: placeInfoByName[vidNameToPlaceName(itemName)].videoFiles.backdrop,
        autoplay: false, // maybe doesn't work well with stackvids beofre (cause they both woudn't play)
        //
        // isControlledExternally: true, // to wait for vidState to be updated externally before playing etc,
    });
    const refs = () => ({
        videoElement: null,
    });
    function makeStartStatesForPlaces() {
        const newStartStates = {};
        // { windynest_a_color: state("windynest_a_color") }
        forEach(placeNames, (placeName) => {
            forEach(abLetters, (letter) => {
                const loopedName = `${placeName}_${letter}`;
                newStartStates[loopedName] = state(loopedName);
            });
        });
        return newStartStates;
    }
    // const startStates: InitialItemsState<typeof state> = {
    const startStates = makeStartStatesForPlaces();
    return { state, refs, startStates };
}
