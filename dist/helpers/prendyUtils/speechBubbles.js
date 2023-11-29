import { getState } from "repond";
export function getTypingDelayForLetter(letter, speechBubbleName) {
    const { typingSpeed } = getState().speechBubbles[speechBubbleName];
    let typingDelay = typingSpeed;
    if (isSpecialLetter(letter))
        typingDelay = typingSpeed * 5;
    if (isWhitespace(letter))
        typingDelay = typingSpeed;
    return typingDelay;
}
export function getTypingDelayForText(text, speechBubbleName) {
    let totalTime = 0;
    for (let index = 0; index < text.length; index++) {
        totalTime += getTypingDelayForLetter(text[index], speechBubbleName);
    }
    return totalTime;
}
export function isSpecialLetter(text) {
    return text.match(/[^a-z]/i);
}
export function isWhitespace(text) {
    return !text.match(/[^\s]/i);
}
// return {
//   getTypingDelayForLetter,
//   getTypingDelayForText,
//   isSpecialLetter,
//   isWhitespace,
// };
// }
