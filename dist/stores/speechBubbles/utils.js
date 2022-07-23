export function makeSpeechBubblesStoreUtils(storeHelpers, prendyStores) {
    const { getState } = storeHelpers;
    function getTypingDelayForLetter(letter, speechBubbleName) {
        const { typingSpeed } = getState().speechBubbles[speechBubbleName];
        let typingDelay = typingSpeed;
        if (isSpecialLetter(letter)) {
            // typingDelay = typingSpeed * 20;
            typingDelay = typingSpeed * 5;
        }
        if (isWhitespace(letter)) {
            // typingDelay = typingSpeed * 5;
            typingDelay = typingSpeed;
        }
        return typingDelay;
    }
    function getTypingDelayForText(text, speechBubbleName) {
        let totalTime = 0;
        for (let index = 0; index < text.length; index++) {
            totalTime += getTypingDelayForLetter(text[index], speechBubbleName);
        }
        return totalTime;
    }
    function isSpecialLetter(text) {
        return text.match(/[^a-z]/i);
    }
    function isWhitespace(text) {
        return !text.match(/[^\s]/i);
    }
    return {
        getTypingDelayForLetter,
        getTypingDelayForText,
        isSpecialLetter,
        isWhitespace,
    };
}
