import delay from "delay";
import { makeGetCharDollStuff } from "../../../concepts/characters/utils";
import { makeGlobalStoreUtils } from "../../../concepts/global/utils";
import { makeSpeechBubblesStoreUtils } from "../../../concepts/speechBubbles/utils";
import {
  BackdopConcepFuncs,
  BackdopOptionsUntyped,
  PlaceholderBackdopConcepts,
} from "../../../concepts/typedConcepFuncs";
import { makeSetStoryState } from "../../../storyRuleMakers";
import { clearTimeoutSafe } from "../../../utils";
import { CSSProperties } from "react";
import { length } from "stringz";

export function makeSpeechStoryHelpers<
  ConcepFuncs extends BackdopConcepFuncs,
  BackdopConcepts extends PlaceholderBackdopConcepts,
  BackdopOptions extends BackdopOptionsUntyped,
  CharacterName extends string
>(
  concepFuncs: ConcepFuncs,
  backdopConcepts: BackdopConcepts,
  backdopStartOptions: BackdopOptions,
  characterNames: readonly CharacterName[]
) {
  const {
    getState,
    onNextTick,
    setState,
    startItemEffect,
    stopEffect,
  } = concepFuncs;

  const getCharDollStuff = makeGetCharDollStuff<ConcepFuncs, CharacterName>(
    concepFuncs
  );

  const { setGlobalState } = makeGlobalStoreUtils(concepFuncs);
  const { getTypingDelayForText } = makeSpeechBubblesStoreUtils<
    ConcepFuncs,
    BackdopConcepts
  >(concepFuncs, backdopConcepts);

  type SpeechBubbleName = keyof typeof backdopConcepts.speechBubbles.startStates;

  type ATimeout = ReturnType<typeof setTimeout> | undefined;

  const showSpeechRefs = {
    closeTimeouts: {} as Partial<Record<CharacterName, ATimeout>>,
    waitTimeouts: {} as Partial<Record<CharacterName, ATimeout>>,
    zoomTimeout: undefined as ATimeout,
    shownTextBools: {} as Record<string, boolean>, // { ["hello"] : true }
    aSpeechIsShowing: false, // NOTE probably better as global state or refs
    originalZoomAmount: 1,
  };

  const SPEECH_ZOOM_AMOUNT = 1.2;
  const SPEECH_CLOSE_DELAY = 400; // close if no more messages from the character after 1this time
  const MIN_AUTO_SPEECH_TIME = 1500;

  async function showSpeech(
    text: string,
    options?: {
      time?: number;
      showOnce?: boolean;
      character?: SpeechBubbleName & CharacterName; // NOTE SpeechBubble names and ChaarcterNames match at the moment
      zoomAmount?: number;
      lookAtPlayer?: boolean;
      returnToZoomBeforeConversation?: boolean; // remembers the previous zoom instead of going to the default when the convo ends
      stylesBySpecialText?: Record<string, CSSProperties>; // { "golden banana": { color: "yellow" } } // style snippets of text
    }
  ) {
    return new Promise<void>((resolve, _reject) => {
      const {
        // time = 2600,
        time,
        showOnce = false,
        character = characterNames[0],
        zoomAmount = SPEECH_ZOOM_AMOUNT,
        returnToZoomBeforeConversation = false,
        stylesBySpecialText,
      } = options ?? {};

      const { dollName } = getCharDollStuff(character);
      const {
        playerCharacter,
        planeZoom: prevPlaneZoom,
      } = getState().global.main;
      const { dollName: playerDollName } = getCharDollStuff(
        playerCharacter as CharacterName
      );
      getTypingDelayForText(text, character as any); // NOTE at the moment CharacterName and SpeechBubbleName are the same
      const timeBasedOnText =
        MIN_AUTO_SPEECH_TIME +
        getTypingDelayForText(
          text,
          character as any // NOTE at the moment CharacterName and SpeechBubbleName are the same
        ) *
          2;
      const editedTime = time ?? timeBasedOnText;

      if (showOnce && showSpeechRefs.shownTextBools[text]) return;

      function handlePressButton() {
        const { typingFinished, goalText } = getState().speechBubbles[
          character
        ];

        if (typingFinished) {
          // reading done!
          clearTimeoutSafe(
            showSpeechRefs.waitTimeouts[character as CharacterName]
          );
          whenWaitingDone();
        } else {
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

      clearTimeoutSafe(
        showSpeechRefs.closeTimeouts[character as CharacterName]
      );
      clearTimeoutSafe(showSpeechRefs.zoomTimeout);

      if (!showSpeechRefs.aSpeechIsShowing) {
        showSpeechRefs.originalZoomAmount = prevPlaneZoom;
        showSpeechRefs.aSpeechIsShowing = true;
      }

      const newPlaneZoom = Math.min(
        showSpeechRefs.originalZoomAmount * zoomAmount,
        backdopStartOptions.zoomLevels.max
      );

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
        showSpeechRefs.closeTimeouts[character as CharacterName] = setTimeout(
          whenClosingBubble,
          SPEECH_CLOSE_DELAY
        );
        showSpeechRefs.zoomTimeout = setTimeout(
          whenRessettingBubble,
          SPEECH_CLOSE_DELAY
        );
        resolve();
      }

      clearTimeoutSafe(showSpeechRefs.waitTimeouts[character as CharacterName]);
      showSpeechRefs.waitTimeouts[character as CharacterName] = setTimeout(
        whenWaitingDone,
        editedTime
      );
    });
  }

  const showMiniBubbleRefs = {
    closeTimeout: null as ReturnType<typeof setTimeout> | null, // TODO might need to have it per character if other characts have mini bubbles
  };
  function showMiniBubble(text: string, time: number = 100000) {
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

  async function showAlarmText(text: string, time: number) {
    // NOTE alarm text in 'global' instead of project-specific 'story' ?
    setGlobalState({ alarmText: text, alarmTextIsVisible: true });
    await delay(time);
    setGlobalState({ alarmTextIsVisible: false });
  }

  return {
    showSpeech,
    showMiniBubble,
    hideMiniBubble,
    showAlarmText,
  };
}
