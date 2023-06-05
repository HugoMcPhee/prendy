import { VidState } from "../../stores/stateVids";
import { PrendyStoreHelpers } from "../../stores/typedStoreHelpers";

export function get_safeVidUtils<StoreHelpers extends PrendyStoreHelpers>(storeHelpers: StoreHelpers) {
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

  function doWhenSafeVidStateReady(
    stateVidId: string,
    vidStateToCheck: VidState,
    callback: () => void,
    checkInitial: boolean = true
  ) {
    return doWhenStateVidStateChanges(stateVidId, (newState) => newState === vidStateToCheck, callback, checkInitial);
  }

  function doWhenSafeVidPlayOrPause(stateVidId: string, callback: () => void, checkInitial: boolean = true) {
    return doWhenStateVidStateChanges(
      stateVidId,
      (newState) => newState === "play" || newState === "pause",
      callback,
      checkInitial
    );
  }

  return { doWhenSafeVidPlayOrPause, doWhenSafeVidStateReady };
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
