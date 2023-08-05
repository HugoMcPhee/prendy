import { CharacterName, PrendyAssets } from "../declarations";
import { defaultPosition, Point2D } from "chootils/dist/points2d";
import { forEach } from "chootils/dist/loops";

export default function miniBubbles(prendyAssets: PrendyAssets) {
  const { characterNames, characterOptions } = prendyAssets;

  const state = <T_ItemName extends string>(
    _itemName: T_ItemName,
    options?: { character?: CharacterName } // TODO maybe this should be a partial of the initial statea, but might need to add types twice..
  ) => ({
    isVisible: false,
    isFullyHidden: true,
    text: "❕",
    forCharacter: options?.character ?? ("walker" as CharacterName | null),
    position: defaultPosition(),
  });

  const refs = () => ({
    bubbleRef: null as null | any,
    textRef: null as null | any,
    videoRef: null as null | HTMLVideoElement, // note: only the source changes, the video element is the same?
  });

  type MiniBubbleStartStates = {
    [K_CharacterName in CharacterName]: ReturnType<typeof state>;
  };

  function makeAutmaticCharacterMinibubbleStartStates() {
    const partialStates = {} as Partial<MiniBubbleStartStates>;
    forEach(characterNames, (characterName) => {
      partialStates[characterName] = state(characterName, {
        character: characterName,
      });
    });
    return partialStates as MiniBubbleStartStates;
  }

  // const startStates: InitialItemsState<typeof state> = {
  const startStates = {
    ...makeAutmaticCharacterMinibubbleStartStates(),

    // walkerMiniBubble: state("walkerMiniBubble"), // NOTE This only works for "walker" at the moment
    // foxBubble: { ...state("foxBubble"), forCharacter: "fox" as CharacterName },
    // flyBubble: { ...state("flyBubble"), forCharacter: "fly" as CharacterName },
    // eggBubble: {
    //   ...state("eggBubble"),
    //   forCharacter: "startegg" as CharacterName,
    // },
  };

  return { state, refs, startStates };
}

export type Store_MiniBubbles<T_ItemName extends string, CharacterName> = {
  state: () => {
    isVisible: boolean;
    isFullyHidden: boolean;
    text: string;
    forCharacter: CharacterName;
    position: Point2D;
  };
  refs: () => {
    bubbleRef: null | any;
    textRef: null | any;
    videoRef: null | HTMLVideoElement;
  };
  startStates: Record<
    T_ItemName,
    {
      isVisible: boolean;
      isFullyHidden: boolean;
      text: string;
      forCharacter: CharacterName;
      position: Point2D;
    }
  >;
};
