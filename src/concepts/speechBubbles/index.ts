// import { VideoGui } from "libraries/gamey/utils/babylonjs/VideoGui";
//
import { CSSProperties } from "react";
import { forEach } from "shutils/dist/loops";
import { defaultPosition } from "shutils/dist/points2d";
import { CharacterOptionsPlaceholder } from "../typedConceptoFuncs";

export default function speechBubbles<
  CharacterName extends string,
  DollName extends string,
  FontName extends string,
  SpeechvidName extends string,
  CharacterOptions extends CharacterOptionsPlaceholder<
    CharacterName,
    DollName,
    FontName
  >
>(
  characterNames: readonly CharacterName[],
  characterOptions: CharacterOptions,
  fontNames: readonly FontName[]
) {
  const state = <T_ItemName extends string>(
    _itemName: T_ItemName,
    options?: { font?: FontName; character?: CharacterName } // TODO maybe this should be a partial of the initial statea, but might need to add types twice..
  ) => ({
    isVisible: false,
    isFullyHidden: true,
    goalText: "",
    visibleLetterAmount: 0,
    typingSpeed: 60, // milliseconds between characters
    // typingSpeed: 16, // milliseconds between characters
    // typingSpeed: 12, // milliseconds between characters
    // typingSpeed: 1, // milliseconds between characters
    stylesBySpecialText: {} as Record<string, CSSProperties>, // { "golden banana": { color: "yellow" } } // style snippets of text
    _specialTextByLetterIndex: {} as Record<number, string>, // { 0: "golden banana", 1:"golden banana" , 2:"golden banana"}
    _goalTextWordLetterArrays: [[]] as string[][],
    forCharacter: (options?.character ?? "walker") as CharacterName | null,
    position: defaultPosition(),
    typingFinished: true,
    nowVideoName: "flying_stork" as SpeechvidName,
    // font: options?.font ?? ("Schoolbell" as FontName),
    font: options?.font ?? fontNames[0],
    // shouldStartRemovoing: false, // (so it can fade out)
    // shouldRemove: false, // (after it’s faded out)
    zIndex: 0,
  });

  const refs = () => ({
    bubbleRef: null as null | any,
    textRef: null as null | any,
    currentTimeout: null as null | ReturnType<typeof setTimeout>,
    videoRef: null as null | HTMLVideoElement, // note: only the source changes, the video element is the same?
    // videoGuiRef: null as null | VideoGui,
  });

  // automatically make atleast a speechBubble for each character
  // NOTE could have more exact types if using more generic types like in 'dolls'
  type SpeechBubbleStartStates = {
    [K_CharacterName in CharacterName]: ReturnType<typeof state>;
  };
  function makeAutmaticCharacterSpeechbubbleStartStates() {
    const partialStates = {} as Partial<SpeechBubbleStartStates>;
    forEach(characterNames, (characterName) => {
      partialStates[characterName] = state(characterName, {
        character: characterName,
        font: characterOptions[characterName].font,
      });
    });
    return partialStates as SpeechBubbleStartStates;
  }

  // const startStates: InitialItemsState<typeof state> = {
  const startStates = {
    ...makeAutmaticCharacterSpeechbubbleStartStates(),
    // cat: state("cat", { character: "cat", font: "Monoton" }),
  };

  // export
  type SpeechBubbleName = keyof typeof startStates;

  // export
  // const speechBubbleNames = Object.keys(startStates) as SpeechBubbleName[];

  return { state, refs, startStates };
}
