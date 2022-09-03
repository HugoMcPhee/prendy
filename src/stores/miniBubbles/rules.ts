import { forEach } from "chootils/dist/loops";
import { PrendyStoreHelpers } from "../typedStoreHelpers";

/*
Dynamic rules

When characters position changes
  bubble position to character
*/

export function makeTyped_miniBubbleRules<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers) {
  const { makeRules, setState } = storeHelpers;

  return makeRules(({ itemEffect, effect }) => ({
    // The position changing based on camera and character position are inside the MiniBubble component
    whenAddedOrRemoved: effect({
      run(diffInfo) {
        forEach(diffInfo.itemsAdded.miniBubbles, (itemName) => {
          // speechBubbleDynamicRules.startAll character position
        });
        forEach(diffInfo.itemsRemoved.miniBubbles, (itemName) => {
          // speechBubbleDynamicRules.stopAll
        });
      },
      check: { addedOrRemoved: true, type: "miniBubbles" },
    }),
    whenBecameVisible: itemEffect({
      run({ itemName }) {
        setState({ miniBubbles: { [itemName]: { isFullyHidden: false } } });
      },
      check: { prop: "isVisible", type: "miniBubbles", becomes: true },
    }),
    // whenShouldRemoveBecomesTrue: make({
    //   run({ itemName }) {
    //     // removeItem()
    //     removeItem({ name: itemName, type: "miniBubbles" });
    //   },
    //   check: { prop: "shouldRemove", type: "miniBubbles" },
    // }),
  }));
}
