import { forEach } from "shutils/dist/loops";
import { abLetters, vidTypes } from "../../utils/consts";
export default function safeVids(placeNames, placeInfoByName) {
    function vidNameToPlaceName(vidName) {
        // return vidName.match(/.*?(?=\_|$)/i)![0] as PlaceName;
        return vidName.match(/.*?(?=_|$)/i)[0];
    }
    const state = (itemName) => ({
        vidState: "unloaded",
        playType: "pause",
        wantedSeekTime: null,
        wantToPlay: false,
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
        videoElement: null,
    });
    function makeStartStatesForPlaces() {
        const newStartStates = {};
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
    const startStates = makeStartStatesForPlaces();
    return { state, refs, startStates };
}
