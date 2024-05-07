import { CSSProperties } from "react";
import { getState, onNextTick, setState, startNewItemEffect, stopNewEffect } from "repond";
import { II, chainDo, makeEventTypes, runEvents, setLiveEventState } from "repond-events";
import { length } from "stringz";
import { getCharDollStuff } from "../helpers/prendyUtils/characters";
import { getGlobalState, setGlobalState } from "../helpers/prendyUtils/global";
import { getTypingDelayForText } from "../helpers/prendyUtils/speechBubbles";
import { meta } from "../meta";
import { CharacterName, DollName, SpeechBubbleName } from "../types";

const RESET_CAMERA_FOCUS_CHAIN_ID = "resetCameraFocus";
const HIDE_ALARM_TEXT_CHAIN_ID = "hideAlarmText";
const getCloseCharacterSpeechBubbleChainId = (character: CharacterName) => `closeSpeechBubble_${character}`;
const getCloseCharacterMiniBubbleChainId = (character: CharacterName) => `closeMiniBubble_${character}`;

const speechRefs = {
  shownTextBools: {} as Record<string, boolean>, // { ["hello"] : true }
  aSpeechIsShowing: false, // NOTE probably better as global state or refs
  originalZoomAmount: 1,
  originalFocusedDoll: null as null | DollName,
};

const SPEECH_ZOOM_AMOUNT = 1.2;
const SPEECH_CLOSE_DELAY = 700; // close if no more messages from the character after 1this time
const MIN_AUTO_SPEECH_TIME = 1500;

export const speechEvents = makeEventTypes(({ event }) => ({
  say: event({
    run: async ({ what: text, ...options }, { runMode, liveId, isFirstAdd, elapsedTime }) => {
      const playerCharacter = getGlobalState().playerCharacter as CharacterName;
      const {
        time, // time = 2600,
        showOnce = false,
        who = playerCharacter,
        zoomAmount = SPEECH_ZOOM_AMOUNT,
        returnToZoomBeforeConversation: returnToZoomBeforeConversation = false,
        stylesBySpecialText,
      } = options ?? {};

      const closeCharacterSpeechChainId = getCloseCharacterSpeechBubbleChainId(who);
      const progressButtonEffectId = "say_handlePressButton" + liveId;

      if (runMode === "end") {
        stopNewEffect(progressButtonEffectId);
        chainDo("cancel", closeCharacterSpeechChainId);
        chainDo("cancel", RESET_CAMERA_FOCUS_CHAIN_ID);

        runEvents([II("basic", "wait", { time: SPEECH_CLOSE_DELAY / 1000 }), II("speech", "hideSay", { who })], {
          chainId: closeCharacterSpeechChainId,
        });

        runEvents(
          [
            II("basic", "wait", { time: SPEECH_CLOSE_DELAY / 1000 }),
            II("speech", "resetCameraFocus", { who, returnToZoomBeforeConversation }),
          ],
          { chainId: RESET_CAMERA_FOCUS_CHAIN_ID }
        );
      }

      if (runMode !== "start") return;
      const endEvent = () => setState({ liveEvents: { [liveId]: { goalEndTime: 0 } } });

      if (showOnce && speechRefs.shownTextBools[text]) endEvent();

      const { prendyOptions } = meta.assets!;
      const { slateZoom: initialSlateZoom } = getGlobalState();
      const { dollName } = getCharDollStuff(who);

      const timeInMilliseconds = time ? time * 1000 : undefined;

      // NOTE at the moment CharacterName and SpeechBubbleName are the same
      const timeBasedOnText = MIN_AUTO_SPEECH_TIME + getTypingDelayForText(text, who as any) * 2;
      const waitTime = timeInMilliseconds ?? timeBasedOnText;

      setLiveEventState(liveId, { goalEndTime: elapsedTime + waitTime });

      function handlePressProgressButton() {
        const speechBubbleState = getState().speechBubbles[who];
        const { typingFinished, goalText } = speechBubbleState;

        if (!typingFinished) {
          // Finish typing
          setState({ speechBubbles: { [who]: { visibleLetterAmount: length(goalText) } } });
          // Finished reading
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

      if (!speechRefs.aSpeechIsShowing) {
        speechRefs.originalZoomAmount = initialSlateZoom;
        speechRefs.aSpeechIsShowing = true;
      }

      const newSlateZoom = Math.min(speechRefs.originalZoomAmount * zoomAmount, prendyOptions.zoomLevels.max);
      onNextTick(() => {
        setState({
          speechBubbles: {
            [who]: {
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
      speechRefs.shownTextBools[text] = true;
    },
    params: {
      what: "",
      time: undefined as number | undefined,
      showOnce: undefined as boolean | undefined,
      who: undefined as undefined | (SpeechBubbleName & CharacterName), // NOTE SpeechBubble names and CharacterNames match at the moment
      zoomAmount: undefined as number | undefined,
      lookAtPlayer: undefined as boolean | undefined,
      returnToZoomBeforeConversation: undefined as boolean | undefined, // remembers the previous zoom instead of going to the default when the convo ends
      // TODO rename stylesByKeyword or keywordStyles
      stylesBySpecialText: undefined as Record<string, CSSProperties> | undefined, // { "golden banana": { color: "yellow" } } // style snippets of text
    },
    duration: Infinity,
  }),
  hideSay: event({
    run: ({ who }, { runMode }) => {
      if (runMode !== "start") return;
      setState({ speechBubbles: { [who]: { isVisible: false } } });
    },
    params: { who: "" as CharacterName },
  }),
  resetCameraFocus: event({
    run: ({ who, returnToZoomBeforeConversation = false }, { runMode }) => {
      if (runMode !== "start") return;

      const { prendyOptions } = meta.assets!;

      const playerCharacter = getGlobalState().playerCharacter as CharacterName;

      const { dollName } = getCharDollStuff(who);
      const { dollName: playerDollName } = getCharDollStuff(playerCharacter);

      speechRefs.aSpeechIsShowing = false;

      const currentFocusedDoll = getGlobalState().focusedDoll;
      const isFocusedOnTalkingCharacter = currentFocusedDoll === dollName;

      // NOTE safer to use the setState((state)=> {}) callback to check the current focused doll
      setGlobalState({
        focusedDoll: isFocusedOnTalkingCharacter ? playerDollName : currentFocusedDoll,
        slateZoomGoal: returnToZoomBeforeConversation
          ? speechRefs.originalZoomAmount
          : prendyOptions.zoomLevels.default,
      });
    },
    params: { who: "" as CharacterName, returnToZoomBeforeConversation: undefined as boolean | undefined },
  }),
  think: event({
    run: ({ what: text, who, time = 100 }, { runMode }) => {
      if (runMode !== "start") return;

      const { playerCharacter } = getState().global.main;
      const character = who || playerCharacter;
      const closeCharacterMiniBubbleChainId = getCloseCharacterMiniBubbleChainId(playerCharacter);
      setState({ miniBubbles: { [character]: { isVisible: true, text } } });

      // 10 second timeout incase the hideMiniBubble() didn't run, like from leaving a trigger
      chainDo("cancel", closeCharacterMiniBubbleChainId);
      runEvents([II("basic", "wait", { time }), II("speech", "hideMiniBubble", {})], {
        chainId: closeCharacterMiniBubbleChainId,
      });
    },
    params: { what: "", who: undefined as CharacterName | undefined, time: undefined as number | undefined },
  }),
  hideThink: event({
    run: ({ who }, { runMode }) => {
      if (runMode !== "start") return;
      const { playerCharacter } = getState().global.main;
      const character = who || playerCharacter;
      setState({ miniBubbles: { [character]: { isVisible: false } } });
    },
    params: { who: undefined as CharacterName | undefined },
  }),
  showTitle: event({
    run: async ({ text, time = 1 }, { runMode, liveId, elapsedTime }) => {
      if (runMode !== "start") return;
      // NOTE alarm text in 'global' instead of project-specific 'story' ?
      setGlobalState({ alarmText: text, alarmTextIsVisible: true });
      setLiveEventState(liveId, { goalEndTime: elapsedTime + time });
      // Set it to close the next one
      chainDo("cancel", HIDE_ALARM_TEXT_CHAIN_ID);
      runEvents([II("basic", "wait", { time }), II("speech", "hideTitle", {})], {
        chainId: HIDE_ALARM_TEXT_CHAIN_ID,
      });
    },
    params: { text: "", time: undefined as number | undefined },
  }),
  hideTitle: event({
    run: (_, { runMode }) => {
      if (runMode !== "start") return;
      setGlobalState({ alarmTextIsVisible: false });
    },
    params: {},
  }),
}));
