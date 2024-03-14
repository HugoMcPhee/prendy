import { getState, startNewItemEffect, stopNewEffect } from "repond";
import { VidState } from "../../stores/stateVids";

export function doWhenStateVidStateChanges(
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

  const effectId = "doWhenStateVidStateChanges" + Math.random();
  startNewItemEffect({
    id: effectId,
    run: ({ newValue: newVidState }) => {
      if (!checkShouldRun(newVidState)) return;
      stopNewEffect(effectId);
      callback();
    },
    check: { type: "stateVids", prop: "vidState", id: stateVidId },
    atStepEnd: true,
    step: "stateVidStateUpdates",
  });
  return effectId;
}

export function doWhenStateVidStateSeeked(stateVidId: string, callback: () => void) {
  const effectId = "doWhenStateVidStateSeeked" + Math.random();
  startNewItemEffect({
    id: effectId,
    run: ({ newValue: newVidState }) => {
      stopNewEffect(effectId);
      callback();
    },
    check: { type: "stateVids", prop: "doneSeekingTime", id: stateVidId },
    atStepEnd: true,
    step: "stateVidStateUpdates",
  });
  return effectId;
}

export function doWhenStateVidStateReady(
  stateVidId: string,
  vidStateToCheck: VidState,
  callback: () => void,
  checkInitial: boolean = true
) {
  return doWhenStateVidStateChanges(stateVidId, (newState) => newState === vidStateToCheck, callback, checkInitial);
}

export function doWhenStateVidPlayOrPause(stateVidId: string, callback: () => void, checkInitial: boolean = true) {
  return doWhenStateVidStateChanges(
    stateVidId,
    (newState) => newState === "play" || newState === "pause",
    callback,
    checkInitial
  );
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
