import { VidState } from "../../concepts/safeVids";
import { PrendyStoreHelpers } from "../typedStoreHelpers";

export function makeSafeVidStoreUtils<StoreHelpers extends PrendyStoreHelpers>(
  storeHelpers: StoreHelpers
) {
  const { getState, startItemEffect, stopEffect } = storeHelpers;

  function doWhenSafeVidStateChanges(
    safeVidId: string,
    checkShouldRun: (newVidState: VidState) => boolean,
    callback: () => void,
    checkInitial: boolean = true
  ) {
    const initialVidState = getState().safeVids[safeVidId].vidState;
    if (checkInitial && checkShouldRun(initialVidState)) {
      callback();
      return null;
    }

    const ruleName = "doWhenSafeVidStateChanges" + Math.random();
    startItemEffect({
      name: ruleName,
      run: ({ newValue: newVidState }) => {
        if (!checkShouldRun(newVidState)) return;
        stopEffect(ruleName);
        callback();
      },
      check: { type: "safeVids", prop: "vidState", name: safeVidId },
      atStepEnd: true,
      step: "safeVidStateUpdates",
    });
    return ruleName;
  }

  // the same but waits for checkShouldRun to be false before checking for true

  // function doWhenSafeVidStateChangesSafer(
  //   safeVidId: string,
  //   checkShouldRun: (newVidState: VidState) => boolean,
  //   callback: () => void
  // ) {
  //   return doWhenSafeVidStateChanges(
  //     safeVidId,
  //     (newState) => !checkShouldRun(newState),
  //     () =>
  //       doWhenSafeVidStateChanges(
  //         safeVidId,
  //         (newState) => checkShouldRun(newState),
  //         callback
  //       )
  //   );
  // }

  function doWhenSafeVidStateReady(
    safeVidId: string,
    vidStateToCheck: VidState,
    callback: () => void,
    checkInitial: boolean = true
  ) {
    return doWhenSafeVidStateChanges(
      safeVidId,
      (newState) => newState === vidStateToCheck,
      callback,
      checkInitial
    );
  }

  function doWhenSafeVidPlayOrPause(
    safeVidId: string,
    callback: () => void,
    checkInitial: boolean = true
  ) {
    return doWhenSafeVidStateChanges(
      safeVidId,
      (newState) => newState === "play" || newState === "pause",
      callback,
      checkInitial
    );
  }

  return {
    doWhenSafeVidPlayOrPause,
    doWhenSafeVidStateReady,
  };
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
