import { forEach } from "chootils/dist/loops";
import { makeRules, setState } from "repond";

/*
Dynamic rules

When characters position changes
  bubble position to character
*/

export const miniBubbleRules = makeRules(({ itemEffect, effect }) => ({
  // The position changing based on camera and character position are inside the MiniBubble component
  whenAddedOrRemoved: effect({
    run(diffInfo) {
      forEach(diffInfo.itemsAdded.miniBubbles, (itemId) => {
        // speechBubbleDynamicRules.startAll character position
      });
      forEach(diffInfo.itemsRemoved.miniBubbles, (itemId) => {
        // speechBubbleDynamicRules.stopAll
      });
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
  //     removeItem({ name: itemId, type: "miniBubbles" });
  //   },
  //   check: { prop: "shouldRemove", type: "miniBubbles" },
  // }),
}));
