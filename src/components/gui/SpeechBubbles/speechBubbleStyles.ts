export const speechBubbleStyles = `
/* @keyframes SpeechBubble-visibleLetterAnimation {
  0% {
    opacity: 0.75;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.75;
  }
} */

.SpeechBubble-hiddenLetter {
  opacity: 0;
  transform: scale(0.5);
  transition: opacity 0s ease-in-out, transform 0s ease-in-out;
  will-change: opacity, transform;
  margin-top: -8px;
  margin-bottom: -8px;
}
.SpeechBubble-visibleLetter {
  opacity: 1;
  transform: scale(1);
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
  will-change: opacity, transform;
  margin-top: -8px;
  margin-bottom: -8px;
  /* animation: SpeechBubble-visibleLetterAnimation 1s 0s infinite; */
}

.SpeechBubble-wordLettersHolder {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: no-wrap;
  white-space: pre;
}

`;
