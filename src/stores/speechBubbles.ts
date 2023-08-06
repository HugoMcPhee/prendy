import { CSSProperties } from "react";
import { forEach } from "chootils/dist/loops";
import { defaultPosition } from "chootils/dist/points2d";
import { PrendyAssets, CharacterName, FontName, SpeechVidName } from "../declarations";

export default function speechBubbles<
  A_PrendyAssets extends PrendyAssets = PrendyAssets,
  A_CharacterName extends CharacterName = CharacterName,
  A_FontName extends FontName = FontName,
  A_SpeechVidName extends SpeechVidName = SpeechVidName
>(prendyAssets: A_PrendyAssets) {
  const { characterNames, characterOptions, fontNames } = prendyAssets;

  const state = <T_ItemName extends string>(
    _itemName: T_ItemName,
    options?: { font?: A_FontName; character?: A_CharacterName } // TODO maybe this should be a partial of the initial statea, but might need to add types twice..
  ) => ({
    isVisible: false,
    isFullyHidden: true,
    goalText: "",
    visibleLetterAmount: 0,
    typingSpeed: 60, // milliseconds between characters
    stylesBySpecialText: {} as Record<string, CSSProperties>, // { "golden banana": { color: "yellow" } } // style snippets of text
    _specialTextByLetterIndex: {} as Record<number, string>, // { 0: "golden banana", 1:"golden banana" , 2:"golden banana"}
    _goalTextWordLetterArrays: [[]] as string[][],
    forCharacter: (options?.character ?? "walker") as A_CharacterName | null,
    position: defaultPosition(),
    typingFinished: true,
    nowVideoName: null as null | A_SpeechVidName,
    font: options?.font ?? (fontNames[0] as A_FontName),
    // shouldStartRemovoing: false, // (so it can fade out)
    // shouldRemove: false, // (after it’s faded out)
    zIndex: 0,
  });

  const refs = () => ({
    bubbleRef: null as null | any,
    textRef: null as null | any,
    currentTimeout: null as null | ReturnType<typeof setTimeout>,
    videoRef: null as null | HTMLVideoElement, // note: only the source changes, the video element is the same?
  });

  // automatically make atleast a speechBubble for each character
  // NOTE could have more exact types if using more generic types like in 'dolls'
  // type SpeechBubbleStartStates = {
  //   [K_CharacterName in CharacterName]: ReturnType<typeof state>;
  // };
  type SpeechBubbleStartStates = {
    [K_CharacterName in A_CharacterName]: ReturnType<typeof state>;
  };

  function makeAutmaticCharacterSpeechbubbleStartStates() {
    const partialStates = {} as Partial<SpeechBubbleStartStates>;
    forEach(characterNames as A_CharacterName[], (characterName) => {
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
  } as SpeechBubbleStartStates;

  // export
  type SpeechBubbleName = keyof typeof startStates;

  // export
  // const speechBubbleNames = Object.keys(startStates) as SpeechBubbleName[];

  return { state, refs, startStates: startStates as SpeechBubbleStartStates };
}
