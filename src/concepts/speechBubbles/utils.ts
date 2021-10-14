import {
  GameyConceptoFuncs,
  PlaceholderGameyConcepts,
} from "../typedConceptoFuncs";

export function makeSpeechBubblesStoreUtils<
  ConceptoFuncs extends GameyConceptoFuncs,
  GameyConcepts extends PlaceholderGameyConcepts
>(conceptoFuncs: ConceptoFuncs, gameyConcepts: GameyConcepts) {
  const { getState } = conceptoFuncs;

  type SpeechBubbleName = keyof typeof gameyConcepts.speechBubbles.startStates;

  function getTypingDelayForLetter(
    letter: string,
    speechBubbleName: SpeechBubbleName
  ) {
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

  function getTypingDelayForText(
    text: string,
    speechBubbleName: SpeechBubbleName
  ) {
    let totalTime = 0;

    for (let index = 0; index < text.length; index++) {
      totalTime += getTypingDelayForLetter(text[index], speechBubbleName);
    }

    return totalTime;
  }

  function isSpecialLetter(text: string) {
    return text.match(/[^a-z]/i);
  }

  function isWhitespace(text: string) {
    return !text.match(/[^\s]/i);
  }

  return {
    getTypingDelayForLetter,
    getTypingDelayForText,
    isSpecialLetter,
    isWhitespace,
  };
}
