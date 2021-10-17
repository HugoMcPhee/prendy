import delay from "delay";
import { makeGetCharDollStuff } from "../../../concepts/characters/utils";
import { makeGlobalStoreUtils } from "../../../concepts/global/utils";
import { makeSpeechBubblesStoreUtils } from "../../../concepts/speechBubbles/utils";
import { makeSetStoryState } from "../../../storyRuleMakers";
import { clearTimeoutSafe } from "../../../utils";
import { length } from "stringz";
export function makeSpeechStoryHelpers(concepFuncs, backdopConcepts, backdopStartOptions, characterNames) {
    const { getState, onNextTick, setState, startItemEffect, stopEffect, } = concepFuncs;
    const getCharDollStuff = makeGetCharDollStuff(concepFuncs);
    const { setGlobalState } = makeGlobalStoreUtils(concepFuncs);
    const { getTypingDelayForText } = makeSpeechBubblesStoreUtils(concepFuncs, backdopConcepts);
    const setStoryState = makeSetStoryState(concepFuncs);
    const showSpeechRefs = {
        closeTimeouts: {},
        waitTimeouts: {},
        zoomTimeout: undefined,
        shownTextBools: {},
        aSpeechIsShowing: false,
        originalZoomAmount: 1,
    };
    const SPEECH_ZOOM_AMOUNT = 1.2;
    const SPEECH_CLOSE_DELAY = 400; // close if no more messages from the character after 1this time
    const MIN_AUTO_SPEECH_TIME = 1500;
    async function showSpeech(text, options) {
        return new Promise((resolve, _reject) => {
            const { 
            // time = 2600,
            time, showOnce = false, character = characterNames[0], zoomAmount = SPEECH_ZOOM_AMOUNT, returnToZoomBeforeConversation = false, stylesBySpecialText, } = options !== null && options !== void 0 ? options : {};
            const { dollName } = getCharDollStuff(character);
            const { playerCharacter, planeZoom: prevPlaneZoom, } = getState().global.main;
            const { dollName: playerDollName } = getCharDollStuff(playerCharacter);
            getTypingDelayForText(text, character);
            const timeBasedOnText = MIN_AUTO_SPEECH_TIME + getTypingDelayForText(text, character) * 2;
            const editedTime = time !== null && time !== void 0 ? time : timeBasedOnText;
            if (showOnce && showSpeechRefs.shownTextBools[text])
                return;
            function handlePressButton() {
                const { typingFinished, goalText } = getState().speechBubbles[character];
                if (typingFinished) {
                    // reading done!
                    clearTimeoutSafe(showSpeechRefs.waitTimeouts[character]);
                    whenWaitingDone();
                }
                else {
                    // finish writing!
                    setState({
                        speechBubbles: {
                            [character]: { visibleLetterAmount: length(goalText) },
                        },
                    });
                }
            }
            const ruleName = "showSpeech_handlePressButton" + Math.random();
            onNextTick(() => {
                // on next tick so it doesnt react to the first press that shows the speech bubble
                startItemEffect({
                    name: ruleName,
                    onItemEffect() {
                        handlePressButton();
                    },
                    check: { type: "players", prop: "interactButtonPressTime" },
                });
            });
            clearTimeoutSafe(showSpeechRefs.closeTimeouts[character]);
            clearTimeoutSafe(showSpeechRefs.zoomTimeout);
            if (!showSpeechRefs.aSpeechIsShowing) {
                showSpeechRefs.originalZoomAmount = prevPlaneZoom;
                showSpeechRefs.aSpeechIsShowing = true;
            }
            const newPlaneZoom = Math.min(showSpeechRefs.originalZoomAmount * zoomAmount, backdopStartOptions.zoomLevels.max);
            setState({
                speechBubbles: {
                    [character]: {
                        isVisible: true,
                        goalText: text,
                        stylesBySpecialText,
                    },
                },
                global: {
                    main: { focusedDoll: dollName, planeZoomGoal: newPlaneZoom },
                },
            });
            showSpeechRefs.shownTextBools[text] = true;
            function whenClosingBubble() {
                setState({ speechBubbles: { [character]: { isVisible: false } } });
            }
            function whenRessettingBubble() {
                showSpeechRefs.aSpeechIsShowing = false;
                setGlobalState({
                    focusedDoll: playerDollName,
                    planeZoomGoal: returnToZoomBeforeConversation
                        ? showSpeechRefs.originalZoomAmount
                        : backdopStartOptions.zoomLevels.default,
                });
            }
            function whenWaitingDone() {
                stopEffect(ruleName);
                showSpeechRefs.closeTimeouts[character] = setTimeout(whenClosingBubble, SPEECH_CLOSE_DELAY);
                showSpeechRefs.zoomTimeout = setTimeout(whenRessettingBubble, SPEECH_CLOSE_DELAY);
                resolve();
            }
            clearTimeoutSafe(showSpeechRefs.waitTimeouts[character]);
            showSpeechRefs.waitTimeouts[character] = setTimeout(whenWaitingDone, editedTime);
        });
    }
    const showMiniBubbleRefs = {
        closeTimeout: null, // TODO might need to have it per character if other characts have mini bubbles
    };
    function showMiniBubble(text, time = 100000) {
        setState({ miniBubbles: { walkerMiniBubble: { isVisible: true, text } } });
        // 10 second timeout incase the hideMiniBubble() didn't run from leaving a trigger
        clearTimeoutSafe(showMiniBubbleRefs.closeTimeout);
        showMiniBubbleRefs.closeTimeout = setTimeout(() => {
            setState({ miniBubbles: { walkerMiniBubble: { isVisible: false } } });
        }, time);
    }
    function hideMiniBubble() {
        if (showMiniBubbleRefs.closeTimeout !== null) {
            clearTimeout(showMiniBubbleRefs.closeTimeout);
        }
        setState({ miniBubbles: { walkerMiniBubble: { isVisible: false } } });
    }
    async function showAlarmText(text, time) {
        // NOTE alarm text in 'global' instead of project-specific 'story' ?
        setStoryState({ alarmText: text, alarmTextIsVisible: true });
        await delay(time);
        setStoryState({ alarmTextIsVisible: false });
    }
    return {
        showSpeech,
        showMiniBubble,
        hideMiniBubble,
        showAlarmText,
    };
}
