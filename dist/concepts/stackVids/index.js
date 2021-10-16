import { forEach } from "shutils/dist/loops";
import { abLetters } from "../../utils/consts";
export default function stackVids(placeNames) {
    const state = (itemName) => ({
        vidAId: `${itemName}_color`,
        vidBId: `${itemName}_depth`,
        //
        vidState: "unloaded",
        playType: "pause",
        wantedSeekTime: null,
        wantToPlay: false,
        wantToPause: false,
        wantToUnload: false,
        wantToLoad: false,
        videoSourcePath: "",
        autoplay: false,
    });
    const refs = () => ({});
    function makeStartStatesForPlaces() {
        const newStartStates = {};
        // { windynest_a: state("windynest_a") }
        forEach(placeNames, (placeName) => {
            forEach(abLetters, (letter) => {
                const loopedName = `${placeName}_${letter}`;
                newStartStates[loopedName] = state(loopedName);
            });
        });
        return newStartStates;
    }
    const startStates = makeStartStatesForPlaces();
    return { state, refs, startStates };
}
