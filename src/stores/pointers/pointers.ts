import { defaultPosition } from "chootils/dist/points2d";
export { makePointersConnectRules } from "./connect";

// const startStates: InitialItemsState<typeof state> = {
// const startStates = {
//   main: state(),
// };
export default function pointers() {
  return {
    state: () => ({
      pointerPosition: defaultPosition(),
    }),
    refs: () => ({
      pointerId: "noId",
      firstInputPosition: defaultPosition(),
      isFirstMovement: false,
      offset: defaultPosition(),
    }),
  };
}
