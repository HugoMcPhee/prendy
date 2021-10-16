import { forEach } from "shutils/dist/loops";
export default function sectionVids(placeNames) {
    const state = (itemName) => ({
        stackVidId_playing: `${itemName}_a`,
        stackVidId_waiting: `${itemName}_b`,
        //
        sectionVidState: "unloaded",
        //
        nowSection: { time: 0, duration: 1 },
        wantedSection: null,
        wantToLoad: false,
        wantToUnload: false,
        wantToLoop: false,
        switchSection_keepProgress: true,
        // wantedSectionInstant: null as VidSection | null,
        // wantedSectionAtLoop: null as VidSection | null,
        //
        newplayingVidStartedTime: 0,
        nowSectionSeekedTime: 0, // timestamp when the new section seeked (but not played yet)
        //
    });
    const refs = () => ({
        waitingForPlayToDoLoopRuleName: null,
        waitingForPlayToChangeSectionRuleName: null,
        //
        // waitingForWhenPlayingVidChangesRuleName: null as null | string,
        // waitingForWhenLoopingVidChangesRuleName: null as null | string,
    });
    function makeStartStatesForPlaces() {
        // enable autocompleted names and properties , (when using name directly)
        const newStartStates = {};
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
