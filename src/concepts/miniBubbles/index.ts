import { CharacterName } from "../../declarations";
import { defaultPosition, Point2D } from "chootils/dist/points2d";
// import { VideoGui } from "../../../utils/babylonjs/VideoGui";

export default function miniBubbles<
  A_CharacterName extends CharacterName = CharacterName
>() {
  const state = <T_ItemName extends string>(_itemName: T_ItemName) => ({
    isVisible: false,
    isFullyHidden: true,
    text: "❕",
    forCharacter: "walker" as A_CharacterName | null,
    position: defaultPosition(),
  });

  const refs = () => ({
    bubbleRef: null as null | any,
    textRef: null as null | any,
    videoRef: null as null | HTMLVideoElement, // note: only the source changes, the video element is the same?
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

export type Store_MiniBubbles<T_ItemName extends string, A_CharacterName> = {
  state: () => {
    isVisible: boolean;
    isFullyHidden: boolean;
    text: string;
    forCharacter: A_CharacterName;
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
      forCharacter: A_CharacterName;
      position: Point2D;
    }
  >;
};
