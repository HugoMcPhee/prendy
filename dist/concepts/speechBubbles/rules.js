import { substring, length, toArray, indexOf } from "stringz";
import { forEach } from "shutils/dist/loops";
import { makeSpeechBubblesStoreUtils } from "./utils";
let zIndexCounter = 100;
/*
Dynamic rules

When characters position changes
  bubble position to character
*/
export function makeSpeechBubbleRules(conceptoFuncs, gameyConcepts) {
    const { makeRules, setState, getRefs } = conceptoFuncs;
    const { getTypingDelayForLetter } = makeSpeechBubblesStoreUtils(conceptoFuncs, gameyConcepts);
    return makeRules((addItemEffect, addEffect) => ({
        whenGoalTextChanges: addItemEffect({
            onItemEffect({ itemName, itemRefs, itemState }) {
                const { goalText, stylesBySpecialText } = itemState;
                setState({
                    speechBubbles: {
                        [itemName]: {
                            typingFinished: false,
                            visibleLetterAmount: 0,
                            _specialTextByLetterIndex: getSpecialTextByLetterIndex(goalText, stylesBySpecialText),
                            _goalTextWordLetterArrays: textToWordLetterArrays(goalText),
                        },
                    },
                });
                showNewLetter({ itemName, itemRefs, itemState });
            },
            check: { prop: "goalText", type: "speechBubbles" },
        }),
        whenVisibleTextChanges: addItemEffect({
            onItemEffect({ itemRefs, itemState, itemName }) {
                showNewLetter({ itemName, itemRefs, itemState });
            },
            check: { prop: "visibleLetterAmount", type: "speechBubbles" },
        }),
        whenTypingFinishedBecomesFalse: addItemEffect({
            onItemEffect({ itemRefs, itemState, itemName }) {
                showNewLetter({ itemName, itemRefs, itemState });
            },
            check: {
                prop: "typingFinished",
                type: "speechBubbles",
                becomes: "false",
            },
        }),
        // The position changing based on camera and character position are inside the SpeechBubble component
        whenAddedOrRemoved: addEffect({
            onEffect(diffInfo) {
                // forEach(diffInfo.itemsAdded.speechBubbles, (itemName) => {
                //   // speechBubbleDynamicRules.startAll character position
                // });
                forEach(diffInfo.itemsRemoved.speechBubbles, (itemName) => {
                    // speechBubbleDynamicRules.stopAll
                    const speechBubblesRefs = getRefs().speechBubbles;
                    const { currentTimeout } = speechBubblesRefs[itemName];
                    if (currentTimeout !== null)
                        clearTimeout(currentTimeout);
                });
            },
            check: { addedOrRemoved: true, type: "speechBubbles" },
        }),
        whenBecameVisible: addItemEffect({
            onItemEffect({ itemName }) {
                setState({
                    speechBubbles: {
                        [itemName]: { isFullyHidden: false, zIndex: zIndexCounter },
                    },
                });
                zIndexCounter += 1;
            },
            check: { prop: "isVisible", type: "speechBubbles", becomes: "true" },
            flow: "positionUi",
        }),
        // whenShouldRemoveBecomesTrue: addItemEffect({
        //   onItemEffect({ itemName }) {
        //     // removeItem()
        //     removeItem({ name: itemName, type: "speechBubbles" });
        //   },
        //   check: { prop: "shouldRemove", type: "speechBubbles" },
        // }),
    }));
    // utils
    function textToWordLetterArrays(text) {
        const words = text.split(/(\S+)/).filter((word) => word); // filter removes "" blank words
        const wordLetterArrays = [];
        words.forEach((word) => {
            const lettersForWord = toArray(word).filter((letter) => letter);
            wordLetterArrays.push(lettersForWord);
        });
        return wordLetterArrays;
    }
    function findIndexesOf(text, whatToFind) {
        const foundIndexes = [];
        let keepLooking = true;
        let searchFromIndex = 0;
        const whatToFindLength = length(whatToFind);
        while (keepLooking) {
            const foundIndex = indexOf(text, whatToFind, searchFromIndex);
            const didFind = foundIndex > -1;
            if (didFind) {
                foundIndexes.push(foundIndex);
                searchFromIndex = foundIndex + whatToFindLength;
            }
            else {
                keepLooking = false;
            }
        }
        return foundIndexes;
    }
    function getSpecialTextByLetterIndex(text, stylesBySpecialText) {
        const specialTexts = Object.keys(stylesBySpecialText);
        const specialTextByLetterIndex = {};
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
    function showNewLetter({ itemRefs, itemState, itemName, }) {
        if (itemRefs.currentTimeout !== null)
            clearTimeout(itemRefs.currentTimeout);
        // If visible/goal Text length not the same
        const { goalText, typingFinished, stylesBySpecialText, visibleLetterAmount, } = itemState;
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
