import { defaultPosition } from "shutils/dist/points2d";
// import { VideoGui } from "../../../utils/babylonjs/VideoGui";
export default function miniBubbles() {
    const state = (_itemName) => ({
        isVisible: false,
        isFullyHidden: true,
        text: "❕",
        forCharacter: "walker",
        position: defaultPosition(),
    });
    const refs = () => ({
        bubbleRef: null,
        textRef: null,
        videoRef: null, // note: only the source changes, the video element is the same?
    });
    // const startStates: InitialItemsState<typeof state> = {
    const startStates = {
        walkerMiniBubble: state("walkerMiniBubble"), // NOTE This only works for "walker" at the moment
        // foxBubble: { ...state("foxBubble"), forCharacter: "fox" as CharacterName },
        // flyBubble: { ...state("flyBubble"), forCharacter: "fly" as CharacterName },
        // eggBubble: {
        //   ...state("eggBubble"),
        //   forCharacter: "startegg" as CharacterName,
        // },
    };
    return { state, refs, startStates };
}
