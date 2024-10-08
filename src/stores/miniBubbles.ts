import { AssetsTypes, PrendyAssets, MyTypes } from "../declarations";
import { defaultPosition, Point2D } from "chootils/dist/points2d";
import { forEach } from "chootils/dist/loops";
import { CharacterName } from "../types";

export default function miniBubbles<T_MyTypes extends MyTypes = MyTypes>(prendyAssets: T_MyTypes["Assets"]) {
  const { characterNames, characterOptions } = prendyAssets;

  const getDefaultState = <T_ItemName extends string>(
    _itemId: T_ItemName,
    options?: { character?: CharacterName } // TODO maybe this should be a partial of the initial statea, but might need to add types twice..
  ) => ({
    isVisible: false,
    isFullyHidden: true,
    text: "❕",
    forCharacter: options?.character ?? ("walker" as CharacterName | null),
    position: defaultPosition(),
  });

  const getDefaultRefs = () => ({
    bubbleRef: null as null | any,
    textRef: null as null | any,
    videoRef: null as null | HTMLVideoElement, // note: only the source changes, the video element is the same?
  });

  type MiniBubbleStartStates = {
    [K_CharacterName in CharacterName]: ReturnType<typeof getDefaultState>;
  };

  function makeAutmaticCharacterMinibubbleStartStates() {
    const partialStates = {} as Partial<MiniBubbleStartStates>;
    forEach(characterNames as CharacterName[], (characterName) => {
      partialStates[characterName] = getDefaultState(characterName, {
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

  return { getDefaultState, getDefaultRefs, startStates };
}

// export type Store_MiniBubbles<T_ItemName extends string, CharacterName> = {
//   state: () => {
//     isVisible: boolean;
//     isFullyHidden: boolean;
//     text: string;
//     forCharacter: CharacterName;
//     position: Point2D;
//   };
//   refs: () => {
//     bubbleRef: null | any;
//     textRef: null | any;
//     videoRef: null | HTMLVideoElement;
//   };
//   startStates: Record<
//     T_ItemName,
//     {
//       isVisible: boolean;
//       isFullyHidden: boolean;
//       text: string;
//       forCharacter: CharacterName;
//       position: Point2D;
//     }
//   >;
// };
