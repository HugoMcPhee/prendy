import { forEach } from "chootils/dist/loops";
import { CSSProperties } from "react";
import { AllRefs, AllState, getRefs, makeEffects, setState } from "repond";
import { indexOf, length, substring, toArray } from "stringz";
import { getTypingDelayForLetter } from "../helpers/prendyUtils/speechBubbles";

let zIndexCounter = 100;
/*
Param Effects?
When characters position changes
  bubble position to character
*/

export const speechBubbleEffects = makeEffects(({ itemEffect, effect }) => ({
  whenGoalTextChanges: itemEffect({
    run({ itemId, itemRefs, itemState }) {
      const { goalText, stylesBySpecialText } = itemState;
      setState({
        speechBubbles: {
          [itemId]: {
            typingFinished: false,
            visibleLetterAmount: 0,
            _specialTextByLetterIndex: getSpecialTextByLetterIndex(goalText, stylesBySpecialText),
            _goalTextWordLetterArrays: textToWordLetterArrays(goalText),
          },
        },
      });

      showNewLetter({ itemId, itemRefs, itemState });
    },
    check: { prop: "goalText", type: "speechBubbles" },
  }),
  whenVisibleTextChanges: itemEffect({
    run({ itemRefs, itemState, itemId }) {
      showNewLetter({ itemId, itemRefs, itemState });
    },
    check: { prop: "visibleLetterAmount", type: "speechBubbles" },
  }),
  whenTypingFinishedBecomesFalse: itemEffect({
    run({ itemRefs, itemState, itemId }) {
      showNewLetter({ itemId, itemRefs, itemState });
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
      // forEach(diffInfo.itemsAdded.speechBubbles, (itemId) => {
      //   potentially start param effects here
      // });

      forEach(diffInfo.itemsRemoved.speechBubbles, (itemId) => {
        // potentially stop param effects here
        const speechBubblesRefs = getRefs().speechBubbles;
        const { currentTimeout } = speechBubblesRefs[itemId as keyof typeof speechBubblesRefs];
        if (currentTimeout !== null) clearTimeout(currentTimeout);
      });
    },
    check: { addedOrRemoved: true, type: "speechBubbles" },
  }),
  whenBecameVisible: itemEffect({
    run({ itemId }) {
      setState({
        speechBubbles: {
          [itemId]: { isFullyHidden: false, zIndex: zIndexCounter },
        },
      });
      zIndexCounter += 1;
    },
    check: { prop: "isVisible", type: "speechBubbles", becomes: true },
    step: "positionUi",
  }),
  // whenShouldRemoveBecomesTrue: itemEffect({
  //   run({ itemId }) {
  //     // removeItem()
  //     removeItem({ id: itemId, type: "speechBubbles" });
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

function getSpecialTextByLetterIndex(text: string, stylesBySpecialText: Record<string, CSSProperties>) {
  const specialTexts = Object.keys(stylesBySpecialText);

  const specialTextByLetterIndex: Record<number, string> = {};

  forEach(specialTexts, (specialText) => {
    const specialTextLength = length(specialText);
    const foundStartIndexes = findIndexesOf(text, specialText);
    forEach(foundStartIndexes, (startIndex) => {
      for (let index = startIndex; index < startIndex + specialTextLength; index++) {
        specialTextByLetterIndex[index] = specialText;
      }
    });
  });

  return specialTextByLetterIndex;
}

function showNewLetter({
  itemRefs,
  itemState,
  itemId,
}: {
  itemRefs: AllRefs["speechBubbles"][keyof AllRefs["speechBubbles"]];
  itemState: AllState["speechBubbles"][keyof AllState["speechBubbles"]];
  itemId: keyof AllState["speechBubbles"];
}) {
  if (itemRefs.currentTimeout !== null) clearTimeout(itemRefs.currentTimeout);

  // If visible/goal Text length not the same
  const { goalText, typingFinished, stylesBySpecialText, visibleLetterAmount } = itemState;
  const goalLength = length(goalText);
  let newVisibleLetterAmount = visibleLetterAmount;
  let latestLetter = substring(goalText, Math.max(visibleLetterAmount, 0) - 1, Math.max(visibleLetterAmount, 1));

  let newTypingFinished = typingFinished;
  if (visibleLetterAmount < length(goalText)) {
    newVisibleLetterAmount += 1;
  }
  if (newVisibleLetterAmount === length(goalText)) {
    newTypingFinished = true;
  }

  const typingDelay = getTypingDelayForLetter(latestLetter, itemId);

  itemRefs.currentTimeout = setTimeout(() => {
    setState({
      speechBubbles: {
        [itemId]: {
          visibleLetterAmount: newVisibleLetterAmount,
          typingFinished: newTypingFinished,
        },
      },
    });
  }, typingDelay);
}
