import { forEach } from "shutils/dist/loops";
import { defaultPosition } from "shutils/dist/points2d";
export default function speechBubbles(characterNames, characterOptions, fontNames) {
    const state = (_itemName, options // TODO maybe this should be a partial of the initial statea, but might need to add types twice..
    ) => {
        var _a, _b;
        return ({
            isVisible: false,
            isFullyHidden: true,
            goalText: "",
            visibleLetterAmount: 0,
            typingSpeed: 60,
            // typingSpeed: 16, // milliseconds between characters
            // typingSpeed: 12, // milliseconds between characters
            // typingSpeed: 1, // milliseconds between characters
            stylesBySpecialText: {},
            _specialTextByLetterIndex: {},
            _goalTextWordLetterArrays: [[]],
            forCharacter: ((_a = options === null || options === void 0 ? void 0 : options.character) !== null && _a !== void 0 ? _a : "walker"),
            position: defaultPosition(),
            typingFinished: true,
            nowVideoName: "flying_stork",
            // font: options?.font ?? ("Schoolbell" as FontName),
            font: (_b = options === null || options === void 0 ? void 0 : options.font) !== null && _b !== void 0 ? _b : fontNames[0],
            // shouldStartRemovoing: false, // (so it can fade out)
            // shouldRemove: false, // (after it’s faded out)
            zIndex: 0,
        });
    };
    const refs = () => ({
        bubbleRef: null,
        textRef: null,
        currentTimeout: null,
        videoRef: null, // note: only the source changes, the video element is the same?
        // videoGuiRef: null as null | VideoGui,
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
    return { state, refs, startStates };
}