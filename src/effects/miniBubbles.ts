import { makeEffects, setState } from "repond";

/*
Param effects?
When characters position changes, bubble position to character?
*/

export const miniBubbleEffects = makeEffects(({ itemEffect, effect }) => ({
  // The position changing based on camera and character position are inside the MiniBubble component
  whenAddedOrRemoved: effect({
    run(diffInfo) {
      // potentially start and stopparam effects here
      // forEach(diffInfo.itemsAdded.miniBubbles, (itemId) => {});
      // forEach(diffInfo.itemsRemoved.miniBubbles, (itemId) => {});
    },
    check: { addedOrRemoved: true, type: "miniBubbles" },
  }),
  whenBecameVisible: itemEffect({
    run({ itemId }) {
      setState({ miniBubbles: { [itemId]: { isFullyHidden: false } } });
    },
    check: { prop: "isVisible", type: "miniBubbles", becomes: true },
  }),
  // whenShouldRemoveBecomesTrue: make({
  //   run({ itemId }) {
  //     // removeItem()
  //     removeItem({ id: itemId, type: "miniBubbles" });
  //   },
  //   check: { prop: "shouldRemove", type: "miniBubbles" },
  // }),
}));
