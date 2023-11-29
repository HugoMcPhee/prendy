import delay from "delay";
import { getState, onNextTick, setState, startItemEffect, stopEffect } from "repond";
import { length } from "stringz";
import { getTypingDelayForText } from "../../helpers/prendyUtils/speechBubbles";
import { meta } from "../../meta";
import { getCharDollStuff } from "../prendyUtils/characters";
import { getGlobalState, setGlobalState } from "../prendyUtils/global";
import { clearTimeoutSafe } from "../utils";
const showSpeechRefs = {
    closeTimeouts: {},
    waitTimeouts: {},
    zoomTimeout: undefined,
    shownTextBools: {}, // { ["hello"] : true }
    aSpeechIsShowing: false, // NOTE probably better as global state or refs
    originalZoomAmount: 1,
};
// TODO might need to have it per character if other characts have mini bubbles
const showMiniBubbleRefs = { closeTimeout: null };
const SPEECH_ZOOM_AMOUNT = 1.2;
const SPEECH_CLOSE_DELAY = 700; // close if no more messages from the character after 1this time
const MIN_AUTO_SPEECH_TIME = 1500;
export async function showSpeech(text, options) {
    const { prendyOptions } = meta.assets;
    return new Promise((resolve, _reject) => {
        const { slateZoom: prevSlateZoom } = getGlobalState();
        const playerCharacter = getGlobalState().playerCharacter;
        const { time, // time = 2600,
        showOnce = false, character = playerCharacter, zoomAmount = SPEECH_ZOOM_AMOUNT, returnToZoomBeforeConversation = false, stylesBySpecialText, } = options !== null && options !== void 0 ? options : {};
        const { dollName } = getCharDollStuff(character);
        const { dollName: playerDollName } = getCharDollStuff(playerCharacter);
        // NOTE at the moment CharacterName and SpeechBubbleName are the same
        const timeBasedOnText = MIN_AUTO_SPEECH_TIME + getTypingDelayForText(text, character) * 2;
        const waitTime = time !== null && time !== void 0 ? time : timeBasedOnText;
        if (showOnce && showSpeechRefs.shownTextBools[text])
            return;
        function handlePressButton() {
            const speechBubbleState = getState().speechBubbles[character];
            const { typingFinished, goalText } = speechBubbleState;
            // typing done!
            if (!typingFinished) {
                setState({ speechBubbles: { [character]: { visibleLetterAmount: length(goalText) } } });
                // reading done!
            }
            else
                whenWaitingDone();
        }
        const ruleName = "showSpeech_handlePressButton" + Math.random();
        // on next tick so it doesnt react to the first press that shows the speech bubble
        onNextTick(() => {
            startItemEffect({
                name: ruleName,
                run: handlePressButton,
                check: { type: "players", prop: "interactButtonPressTime" },
            });
        });
        clearTimeoutSafe(showSpeechRefs.closeTimeouts[character]);
        clearTimeoutSafe(showSpeechRefs.zoomTimeout);
        if (!showSpeechRefs.aSpeechIsShowing) {
            showSpeechRefs.originalZoomAmount = prevSlateZoom;
            showSpeechRefs.aSpeechIsShowing = true;
        }
        const newSlateZoom = Math.min(showSpeechRefs.originalZoomAmount * zoomAmount, prendyOptions.zoomLevels.max);
        onNextTick(() => {
            setState({
                speechBubbles: { [character]: { isVisible: true, goalText: text, stylesBySpecialText } },
                global: { main: { focusedDoll: dollName, slateZoomGoal: newSlateZoom + Math.random() * 0.001 } },
            });
        });
        showSpeechRefs.shownTextBools[text] = true;
        function whenClosingBubble() {
            setState({ speechBubbles: { [character]: { isVisible: false } } });
        }
        function whenResettingBubbleFocus() {
            showSpeechRefs.aSpeechIsShowing = false;
            const currentFocusedDoll = getGlobalState().focusedDoll;
            const isFocusedOnTalkingCharacter = currentFocusedDoll === dollName;
            // NOTE safer to use the setState((state)=> {}) callback to check the current focused doll
            setGlobalState({
                focusedDoll: isFocusedOnTalkingCharacter ? playerDollName : currentFocusedDoll,
                slateZoomGoal: returnToZoomBeforeConversation
                    ? showSpeechRefs.originalZoomAmount
                    : prendyOptions.zoomLevels.default,
            });
        }
        function whenWaitingDone() {
            stopEffect(ruleName);
            clearTimeoutSafe(showSpeechRefs.waitTimeouts[character]);
            clearTimeoutSafe(showSpeechRefs.closeTimeouts[character]);
            clearTimeoutSafe(showSpeechRefs.zoomTimeout);
            showSpeechRefs.closeTimeouts[character] = setTimeout(whenClosingBubble, SPEECH_CLOSE_DELAY);
            showSpeechRefs.zoomTimeout = setTimeout(whenResettingBubbleFocus, SPEECH_CLOSE_DELAY);
            resolve();
        }
        clearTimeoutSafe(showSpeechRefs.waitTimeouts[character]);
        showSpeechRefs.waitTimeouts[character] = setTimeout(whenWaitingDone, waitTime);
    });
}
export function showMiniBubble(text, time = 100000) {
    const { playerCharacter } = getState().global.main;
    setState({ miniBubbles: { [playerCharacter]: { isVisible: true, text } } });
    // 10 second timeout incase the hideMiniBubble() didn't run from leaving a trigger
    clearTimeoutSafe(showMiniBubbleRefs.closeTimeout);
    showMiniBubbleRefs.closeTimeout = setTimeout(() => {
        setState({ miniBubbles: { [playerCharacter]: { isVisible: false } } });
    }, time);
}
export function hideMiniBubble() {
    const { playerCharacter } = getState().global.main;
    if (showMiniBubbleRefs.closeTimeout !== null) {
        clearTimeout(showMiniBubbleRefs.closeTimeout);
    }
    setState({ miniBubbles: { [playerCharacter]: { isVisible: false } } });
}
export async function showAlarmText(text, time) {
    // NOTE alarm text in 'global' instead of project-specific 'story' ?
    setGlobalState({ alarmText: text, alarmTextIsVisible: true });
    await delay(time);
    setGlobalState({ alarmTextIsVisible: false });
}
