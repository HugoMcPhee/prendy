// import { CharacterName } from "art/characters";
// import { Point2D } from "shutils/dist/points2d";

// export type ConvoItemBasic = {
//   character?: CharacterName;
//   position?: Point2D; // (blank is center, for like narrator, or character position with character)
//   text?: string;
// };

// might need to be typed inline? so ConvoItemName can be typed
export type ConvoAnswer<T_ConvoItemName extends string> = {
  text: string;
  next: T_ConvoItemName;
};

// export type ConvoItemBranchable<T_ConvoItemName extends string> =
//   | (ConvoItemBasic & {
//       answers: ConvoAnswer<T_ConvoItemName>[];
//     })
//   | {
//       next: T_ConvoItemName;
//     };

// export type ConvoLinear = ConvoItemBasic[];
// export type ConvoBranching<T_ConvoItemName extends string> = Record<
//   T_ConvoItemName,
//   ConvoItemBranchable<T_ConvoItemName>
// >;

// saved so other things can react to convo choices
// (like starting a new convo, or turning off a light)
export type ConvoChosenAnswers<T_ConvoItemName extends string> = Record<
  T_ConvoItemName, // Question convo name
  T_ConvoItemName // Answer convo name
>;
