export function story_fake() {
    const state = () => {
        const initialState = {
            // screen stickers
            screenStickerIsVisible: false,
            screenStickerText: "🎵",
            screenStickerPosition: { x: 0.7, y: 0.3 },
            // to know what to start with when a place loads
            chapterName: "hallways",
            storyPart: "010_before_start", // to know which part of the chapter is happening
            //
            //
            // showSmellParticles: false,
            //
            // didWearGeo: false,
            // didPickupKey: false,
            // didOpenDoor: false,
            // didShowEnding: false,
            //
            // gotMuddy: false,
        };
        // return initialState as typeof initialState & { [key: string]: any };
        return initialState;
    };
    const refs = () => ({
        alienFollowInterval: null,
        showSmellsTimeout: null,
    });
    // const startStates: InitialItemsState<typeof state> = {
    const startStates = {
        main: state(),
    };
    const story = { startStates, state, refs };
    return story;
}
