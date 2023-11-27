import { RepondHelpers } from "../../declarations";
import { VidState } from "../../stores/stateVids";

export function get_safeVidUtils(storeHelpers: RepondHelpers) {
  const { getState, startItemEffect, stopEffect } = storeHelpers;

  function doWhenStateVidStateChanges(
    stateVidId: string,
    checkShouldRun: (newVidState: VidState) => boolean,
    callback: () => void,
    checkInitial: boolean = true
  ) {
    const initialVidState = getState().stateVids[stateVidId].vidState;
    if (checkInitial && checkShouldRun(initialVidState)) {
      callback();
      return null;
    }

    const ruleName = "doWhenStateVidStateChanges" + Math.random();
    startItemEffect({
      name: ruleName,
      run: ({ newValue: newVidState }) => {
        if (!checkShouldRun(newVidState)) return;
        stopEffect(ruleName);
        callback();
      },
      check: { type: "stateVids", prop: "vidState", name: stateVidId },
      atStepEnd: true,
      step: "stateVidStateUpdates",
    });
    return ruleName;
  }

  function doWhenStateVidStateSeeked(stateVidId: string, callback: () => void) {
    const ruleName = "doWhenStateVidStateSeeked" + Math.random();
    startItemEffect({
      name: ruleName,
      run: ({ newValue: newVidState }) => {
        stopEffect(ruleName);
        callback();
      },
      check: { type: "stateVids", prop: "doneSeekingTime", name: stateVidId },
      atStepEnd: true,
      step: "stateVidStateUpdates",
    });
    return ruleName;
  }

  function doWhenStateVidStateReady(
    stateVidId: string,
    vidStateToCheck: VidState,
    callback: () => void,
    checkInitial: boolean = true
  ) {
    return doWhenStateVidStateChanges(stateVidId, (newState) => newState === vidStateToCheck, callback, checkInitial);
  }

  function doWhenStateVidPlayOrPause(stateVidId: string, callback: () => void, checkInitial: boolean = true) {
    return doWhenStateVidStateChanges(
      stateVidId,
      (newState) => newState === "play" || newState === "pause",
      callback,
      checkInitial
    );
  }

  return { doWhenStateVidPlayOrPause, doWhenStateVidStateReady, doWhenStateVidStateSeeked };
}

export function makeVideoElementFromPath(filepath: string) {
  const videoElement = document.createElement("video");
  videoElement.controls = false;
  videoElement.muted = true; // allow playing without interaction
  videoElement.playsInline = true;
  videoElement.loop = true;
  videoElement.src = filepath;
  const randomVideoId = Math.random().toString();
  videoElement.id = randomVideoId;
  return videoElement;
}
