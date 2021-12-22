import { forEach } from "chootils/dist/loops";
/*
Dynamic rules

When characters position changes
  bubble position to character
*/
export function makeMiniBubbleRules(storeHelpers) {
    const { makeRules, setState } = storeHelpers;
    return makeRules((addItemEffect, addEffect) => ({
        // The position changing based on camera and character position are inside the MiniBubble component
        whenAddedOrRemoved: addEffect({
            onEffect(diffInfo) {
                forEach(diffInfo.itemsAdded.miniBubbles, (itemName) => {
                    // speechBubbleDynamicRules.startAll character position
                });
                forEach(diffInfo.itemsRemoved.miniBubbles, (itemName) => {
                    // speechBubbleDynamicRules.stopAll
                });
            },
            check: { addedOrRemoved: true, type: "miniBubbles" },
        }),
        whenBecameVisible: addItemEffect({
            onItemEffect({ itemName }) {
                setState({ miniBubbles: { [itemName]: { isFullyHidden: false } } });
            },
            check: { prop: "isVisible", type: "miniBubbles", becomes: "true" },
        }),
        // whenShouldRemoveBecomesTrue: make({
        //   onItemEffect({ itemName }) {
        //     // removeItem()
        //     removeItem({ name: itemName, type: "miniBubbles" });
        //   },
        //   check: { prop: "shouldRemove", type: "miniBubbles" },
        // }),
    }));
}
