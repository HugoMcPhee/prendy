import { forEach } from "chootils/dist/loops";
import { defaultPosition } from "chootils/dist/points2d";
export default function speechBubbles(prendyAssets) {
    const { characterNames, characterOptions, fontNames } = prendyAssets;
    const state = (_itemName, options // TODO maybe this should be a partial of the initial statea, but might need to add types twice..
    ) => ({
        isVisible: false,
        isFullyHidden: true,
        goalText: "",
        visibleLetterAmount: 0,
        typingSpeed: 60, // milliseconds between characters
        stylesBySpecialText: {}, // { "golden banana": { color: "yellow" } } // style snippets of text
        _specialTextByLetterIndex: {}, // { 0: "golden banana", 1:"golden banana" , 2:"golden banana"}
        _goalTextWordLetterArrays: [[]],
        forCharacter: (options?.character ?? "walker"),
        position: defaultPosition(),
        typingFinished: true,
        nowVideoName: null,
        font: options?.font ?? fontNames[0],
        // shouldStartRemovoing: false, // (so it can fade out)
        // shouldRemove: false, // (after it’s faded out)
        zIndex: 0,
    });
    const refs = () => ({
        bubbleRef: null,
        textRef: null,
        currentTimeout: null,
        videoRef: null, // note: only the source changes, the video element is the same?
    });
    function makeAutmaticCharacterSpeechbubbleStartStates() {
        const partialStates = {};
        forEach(characterNames, (characterName) => {
            partialStates[characterName] = state(characterName, {
                character: characterName,
                font: characterOptions[characterName].font,
            });
        });
        return partialStates;
    }
    // const startStates: InitialItemsState<typeof state> = {
    const startStates = {
        ...makeAutmaticCharacterSpeechbubbleStartStates(),
        // cat: state("cat", { character: "cat", font: "Monoton" }),
    };
    // export
    // const speechBubbleNames = Object.keys(startStates) as SpeechBubbleName[];
    return { state, refs, startStates: startStates };
}
