import { substring, length, toArray, indexOf } from "stringz";
import { forEach } from "chootils/dist/loops";
import { makeSpeechBubblesStoreUtils } from "./utils";
import { CSSProperties } from "react";
import {
  PrendyStoreHelpers,
  PlaceholderPrendyStores,
} from "../typedStoreHelpers";
import { StoreHelperTypes } from "pietem";

let zIndexCounter = 100;
/*
Dynamic rules

When characters position changes
  bubble position to character
*/

export function makeSpeechBubbleRules<
  StoreHelpers extends PrendyStoreHelpers,
  PrendyStores extends PlaceholderPrendyStores
>(storeHelpers: StoreHelpers, prendyStores: PrendyStores) {
  const { makeRules, setState, getRefs } = storeHelpers;

  // AllItemsState,
  // ItemRefs,
  // ItemState,

  type ItemType = keyof ReturnType<PrendyStoreHelpers["getState"]>;
  type HelperType<T extends ItemType> = StoreHelperTypes<
    PrendyStoreHelpers["getState"],
    PrendyStoreHelpers["getRefs"],
    T
  >;
  type AllItemsState<T extends ItemType> = HelperType<T>["AllItemsState"];
  type ItemState<T extends ItemType> = HelperType<T>["ItemState"];
  type ItemRefs<T extends ItemType> = HelperType<T>["ItemRefs"];

  const { getTypingDelayForLetter } = makeSpeechBubblesStoreUtils(
    storeHelpers,
    prendyStores
  );

  return makeRules(({ itemEffect, effect }) => ({
    whenGoalTextChanges: itemEffect({
      run({ itemName, itemRefs, itemState }) {
        const { goalText, stylesBySpecialText } = itemState;
        setState({
          speechBubbles: {
            [itemName]: {
              typingFinished: false,
              visibleLetterAmount: 0,
              _specialTextByLetterIndex: getSpecialTextByLetterIndex(
                goalText,
                stylesBySpecialText
              ),
              _goalTextWordLetterArrays: textToWordLetterArrays(goalText),
            },
          },
        });

        showNewLetter({ itemName, itemRefs, itemState });
      },
      check: { prop: "goalText", type: "speechBubbles" },
    }),
    whenVisibleTextChanges: itemEffect({
      run({ itemRefs, itemState, itemName }) {
        showNewLetter({ itemName, itemRefs, itemState });
      },
      check: { prop: "visibleLetterAmount", type: "speechBubbles" },
    }),
    whenTypingFinishedBecomesFalse: itemEffect({
      run({ itemRefs, itemState, itemName }) {
        showNewLetter({ itemName, itemRefs, itemState });
      },
      check: {
        prop: "typingFinished",
        type: "speechBubbles",
        becomes: false,
      },
    }),
    // The position changing based on camera and character position are inside the SpeechBubble component
    whenAddedOrRemoved: effect({
      run(diffInfo) {
        // forEach(diffInfo.itemsAdded.speechBubbles, (itemName) => {
        //   // speechBubbleDynamicRules.startAll character position
        // });

        forEach(diffInfo.itemsRemoved.speechBubbles, (itemName) => {
          // speechBubbleDynamicRules.stopAll
          const speechBubblesRefs = getRefs().speechBubbles;
          const { currentTimeout } =
            speechBubblesRefs[itemName as keyof typeof speechBubblesRefs];
          if (currentTimeout !== null) clearTimeout(currentTimeout);
        });
      },
      check: { addedOrRemoved: true, type: "speechBubbles" },
    }),
    whenBecameVisible: itemEffect({
      run({ itemName }) {
        setState({
          speechBubbles: {
            [itemName]: { isFullyHidden: false, zIndex: zIndexCounter },
          },
        });
        zIndexCounter += 1;
      },
      check: { prop: "isVisible", type: "speechBubbles", becomes: true },
      step: "positionUi",
    }),
    // whenShouldRemoveBecomesTrue: itemEffect({
    //   run({ itemName }) {
    //     // removeItem()
    //     removeItem({ name: itemName, type: "speechBubbles" });
    //   },
    //   check: { prop: "shouldRemove", type: "speechBubbles" },
    // }),
  }));

  // utils
  function textToWordLetterArrays(text: string) {
    const words = text.split(/(\S+)/).filter((word) => word); // filter removes "" blank words
    const wordLetterArrays = [] as string[][];

    words.forEach((word) => {
      const lettersForWord = toArray(word).filter((letter) => letter);
      wordLetterArrays.push(lettersForWord);
    });

    return wordLetterArrays;
  }

  function findIndexesOf(text: string, whatToFind: string) {
    const foundIndexes: number[] = [];
    let keepLooking = true;
    let searchFromIndex = 0;
    const whatToFindLength = length(whatToFind);

    while (keepLooking) {
      const foundIndex = indexOf(text, whatToFind, searchFromIndex);
      const didFind = foundIndex > -1;
      if (didFind) {
        foundIndexes.push(foundIndex);
        searchFromIndex = foundIndex + whatToFindLength;
      } else {
        keepLooking = false;
      }
    }

    return foundIndexes;
  }

  function getSpecialTextByLetterIndex(
    text: string,
    stylesBySpecialText: Record<string, CSSProperties>
  ) {
    const specialTexts = Object.keys(stylesBySpecialText);

    const specialTextByLetterIndex: Record<number, string> = {};

    forEach(specialTexts, (specialText) => {
      const specialTextLength = length(specialText);
      const foundStartIndexes = findIndexesOf(text, specialText);
      forEach(foundStartIndexes, (startIndex) => {
        for (
          let index = startIndex;
          index < startIndex + specialTextLength;
          index++
        ) {
          specialTextByLetterIndex[index] = specialText;
        }
      });
    });

    return specialTextByLetterIndex;
  }

  function showNewLetter({
    itemRefs,
    itemState,
    itemName,
  }: {
    itemRefs: ItemRefs<"speechBubbles">;
    itemState: ItemState<"speechBubbles">;
    itemName: keyof AllItemsState<"speechBubbles">;
  }) {
    if (itemRefs.currentTimeout !== null) clearTimeout(itemRefs.currentTimeout);

    // If visible/goal Text length not the same
    const {
      goalText,
      typingFinished,
      stylesBySpecialText,
      visibleLetterAmount,
    } = itemState;
    const goalLength = length(goalText);
    let newVisibleLetterAmount = visibleLetterAmount;
    let latestLetter = substring(
      goalText,
      Math.max(visibleLetterAmount, 0) - 1,
      Math.max(visibleLetterAmount, 1)
    );

    let newTypingFinished = typingFinished;
    if (visibleLetterAmount < length(goalText)) {
      newVisibleLetterAmount += 1;
    }
    if (newVisibleLetterAmount === length(goalText)) {
      newTypingFinished = true;
    }

    const typingDelay = getTypingDelayForLetter(latestLetter, itemName);

    itemRefs.currentTimeout = setTimeout(() => {
      setState({
        speechBubbles: {
          [itemName]: {
            visibleLetterAmount: newVisibleLetterAmount,
            typingFinished: newTypingFinished,
          },
        },
      });
    }, typingDelay);
  }
}
