import { getCharDollStuff } from "../helpers/prendyUtils/characters";
import { getGlobalState, setGlobalState } from "../helpers/prendyUtils/global";
import { getTypingDelayForText } from "../helpers/prendyUtils/speechBubbles";
import { meta } from "../meta";
import { CharacterName, DollName, SpeechBubbleName } from "../types";
import { CSSProperties } from "react";
import { getState, onNextTick, setState, startNewItemEffect, stopNewEffect } from "repond";
import { chainDo, makeEventTypes, runEvents, setLiveEventState, toDo } from "repond-events";
import { length } from "stringz";

// TODO update the timeouts to use repond's new timeout system

type ATimeout = ReturnType<typeof setTimeout> | undefined;

type CharacterNameUntyped = string;

type ShowSpeechOptions = {
  time?: number;
  showOnce?: boolean;
  character?: SpeechBubbleName & CharacterName; // NOTE SpeechBubble names and CharacterNames match at the moment
  zoomAmount?: number;
  lookAtPlayer?: boolean;
  returnToZoomBeforeConversation?: boolean; // remembers the previous zoom instead of going to the default when the convo ends
  // TODO rename stylesByKeyword or keywordStyles
  stylesBySpecialText?: Record<string, CSSProperties>; // { "golden banana": { color: "yellow" } } // style snippets of text
};

const RESET_CAMERA_FOCUS_CHAIN_ID = "resetCameraFocus";
const HIDE_ALARM_TEXT_CHAIN_ID = "hideAlarmText";
const getCloseCharacterSpeechBubbleChainId = (character: CharacterName) => `closeSpeechBubble_${character}`;
const getCloseCharacterMiniBubbleChainId = (character: CharacterName) => `closeMiniBubble_${character}`;

const showSpeechRefs = {
  shownTextBools: {} as Record<string, boolean>, // { ["hello"] : true }
  aSpeechIsShowing: false, // NOTE probably better as global state or refs
  originalZoomAmount: 1,
  originalFocusedDoll: null as null | DollName,
};

const SPEECH_ZOOM_AMOUNT = 1.2;
const SPEECH_CLOSE_DELAY = 700; // close if no more messages from the character after 1this time
const MIN_AUTO_SPEECH_TIME = 1500;

export const speechEvents = makeEventTypes(({ event }) => ({
  showSpeech: event({
    run: async ({ text, options }, { runMode, liveId, isFirstAdd, elapsedTime }) => {
      const playerCharacter = getGlobalState().playerCharacter as CharacterName;
      const {
        time, // time = 2600,
        showOnce = false,
        character = playerCharacter,
        zoomAmount = SPEECH_ZOOM_AMOUNT,
        returnToZoomBeforeConversation: returnToZoomBeforeConversation = false,
        stylesBySpecialText,
      } = options ?? {};

      const closeCharacterSpeechChainId = getCloseCharacterSpeechBubbleChainId(character);

      // const effectId = "showSpeech_handlePressButton" + Math.random();
      const progressButtonEffectId = "showSpeech_handlePressButton" + liveId;

      if (runMode === "end") {
        stopNewEffect(progressButtonEffectId);
        chainDo("cancel", closeCharacterSpeechChainId);
        chainDo("cancel", RESET_CAMERA_FOCUS_CHAIN_ID);

        runEvents(
          [
            toDo("basic", "wait", { duration: SPEECH_CLOSE_DELAY }),
            toDo("speech", "hideSpeech", { character, returnToZoomBeforeConversation }),
          ],
          { chainId: closeCharacterSpeechChainId }
        );

        runEvents(
          [toDo("basic", "wait", { duration: SPEECH_CLOSE_DELAY }), toDo("speech", "resetCameraFocus", { character })],
          {
            chainId: RESET_CAMERA_FOCUS_CHAIN_ID,
          }
        );
      }

      if (runMode !== "start") return;

      const endEvent = () => setState({ liveEvents: { [liveId]: { goalEndTime: 0 } } });

      if (showOnce && showSpeechRefs.shownTextBools[text]) endEvent();

      const { prendyOptions } = meta.assets!;

      const { slateZoom: initialSlateZoom } = getGlobalState();

      const { dollName } = getCharDollStuff(character);
      const { dollName: playerDollName } = getCharDollStuff(playerCharacter);

      // NOTE at the moment CharacterName and SpeechBubbleName are the same
      const timeBasedOnText = MIN_AUTO_SPEECH_TIME + getTypingDelayForText(text, character as any) * 2;
      const waitTime = time ?? timeBasedOnText;

      // setLiveEventState(liveId, { goalEndTime: elapsedTime + waitTime });
      setState({ liveEvents: { [liveId]: { goalEndTime: elapsedTime + waitTime } } });

      // TODO set the end time based on the elpased time and the waitTime

      function handlePressProgressButton() {
        console.log("handlePressProgressButton");

        const speechBubbleState = getState().speechBubbles[character];
        const { typingFinished, goalText } = speechBubbleState;

        // typing done!
        if (!typingFinished) {
          setState({ speechBubbles: { [character]: { visibleLetterAmount: length(goalText) } } });
          // reading done!
        } else endEvent();
      }

      // on next tick so it doesnt react to the first press that shows the speech bubble
      onNextTick(() => {
        startNewItemEffect({
          id: progressButtonEffectId,
          run: handlePressProgressButton,
          check: { type: "players", prop: "interactButtonPressTime" },
        });
      });

      chainDo("cancel", closeCharacterSpeechChainId);
      chainDo("cancel", RESET_CAMERA_FOCUS_CHAIN_ID);

      if (!showSpeechRefs.aSpeechIsShowing) {
        showSpeechRefs.originalZoomAmount = initialSlateZoom;
        showSpeechRefs.aSpeechIsShowing = true;
      }

      const newSlateZoom = Math.min(showSpeechRefs.originalZoomAmount * zoomAmount, prendyOptions.zoomLevels.max);
      onNextTick(() => {
        setState({
          speechBubbles: {
            [character]: {
              isVisible: true,
              goalText: text,
              stylesBySpecialText,
              visibleLetterAmount: 0,
              typingFinished: false, // NOTE could make this automatic with an effect
            },
          },
          global: { main: { focusedDoll: dollName, slateZoomGoal: newSlateZoom + Math.random() * 0.001 } },
        });
      });
      showSpeechRefs.shownTextBools[text] = true;
    },
    params: { text: "", options: undefined as undefined | ShowSpeechOptions },
    duration: Infinity,
  }),
  hideSpeech: event({
    run: ({ character, returnToZoomBeforeConversation }, { runMode }) => {
      if (runMode !== "start") return;
      setState({ speechBubbles: { [character]: { isVisible: false } } });
    },
    params: { character: "" as CharacterName, returnToZoomBeforeConversation: false },
  }),
  resetCameraFocus: event({
    run: ({ character, returnToZoomBeforeConversation }, { runMode }) => {
      if (runMode !== "start") return;

      const { prendyOptions } = meta.assets!;

      const playerCharacter = getGlobalState().playerCharacter as CharacterName;

      const { dollName } = getCharDollStuff(character);
      const { dollName: playerDollName } = getCharDollStuff(playerCharacter);

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
    },
    params: { character: "" as CharacterName, returnToZoomBeforeConversation: false },
  }),
  showMiniBubble: event({
    run: ({ text, time }, { runMode }) => {
      // TODO add character param

      const { playerCharacter } = getState().global.main;
      const closeCharacterMiniBubbleChainId = getCloseCharacterMiniBubbleChainId(playerCharacter);

      if (runMode !== "start") return;
      setState({ miniBubbles: { [playerCharacter]: { isVisible: true, text } } });
      // 10 second timeout incase the hideMiniBubble() didn't run, like from leaving a trigger
      chainDo("cancel", closeCharacterMiniBubbleChainId);
      runEvents([toDo("basic", "wait", { duration: time }), toDo("speech", "hideMiniBubble", {})], {
        chainId: closeCharacterMiniBubbleChainId,
      });
    },
    params: { text: "", time: 100000 },
  }),
  hideMiniBubble: event({
    run: (_, { runMode }) => {
      const { playerCharacter } = getState().global.main;
      setState({ miniBubbles: { [playerCharacter]: { isVisible: false } } });
    },
    params: {},
  }),
  showAlarmText: event({
    run: async ({ text, time }, { runMode, liveId, elapsedTime }) => {
      if (runMode !== "start") return;
      // NOTE alarm text in 'global' instead of project-specific 'story' ?
      setGlobalState({ alarmText: text, alarmTextIsVisible: true });
      setLiveEventState(liveId, { goalEndTime: elapsedTime + time });
      // Set it to close the next one
      chainDo("cancel", HIDE_ALARM_TEXT_CHAIN_ID);
      runEvents([toDo("basic", "wait", { duration: time }), toDo("speech", "hideAlarmText", {})], {
        chainId: HIDE_ALARM_TEXT_CHAIN_ID,
      });
    },
    params: { text: "", time: 1000 },
  }),
  hideAlarmText: event({
    run: (_, { runMode }) => {
      if (runMode !== "start") return;
      setGlobalState({ alarmTextIsVisible: false });
    },
    params: {},
  }),
}));
