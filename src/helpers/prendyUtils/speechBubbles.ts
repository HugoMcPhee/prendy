import { getState } from "repond";
import { PrendyStores } from "../../declarations";

type SpeechBubbleName = keyof PrendyStores["speechBubbles"]["startStates"] extends never
  ? string
  : keyof PrendyStores["speechBubbles"]["startStates"];

export function getTypingDelayForLetter(letter: string, speechBubbleName: SpeechBubbleName) {
  const { typingSpeed } = getState().speechBubbles[speechBubbleName];

  let typingDelay = typingSpeed;
  if (isSpecialLetter(letter)) typingDelay = typingSpeed * 5;
  if (isWhitespace(letter)) typingDelay = typingSpeed;

  return typingDelay;
}

export function getTypingDelayForText(text: string, speechBubbleName: SpeechBubbleName) {
  let totalTime = 0;

  for (let index = 0; index < text.length; index++) {
    totalTime += getTypingDelayForLetter(text[index], speechBubbleName);
  }

  return totalTime;
}

export function isSpecialLetter(text: string) {
  return text.match(/[^a-z]/i);
}

export function isWhitespace(text: string) {
  return !text.match(/[^\s]/i);
}

// return {
//   getTypingDelayForLetter,
//   getTypingDelayForText,
//   isSpecialLetter,
//   isWhitespace,
// };
// }
