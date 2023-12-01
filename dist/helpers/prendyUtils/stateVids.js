import { getState, startItemEffect, stopEffect } from "repond";
export function doWhenStateVidStateChanges(stateVidId, checkShouldRun, callback, checkInitial = true) {
    const initialVidState = getState().stateVids[stateVidId].vidState;
    if (checkInitial && checkShouldRun(initialVidState)) {
        callback();
        return null;
    }
    const ruleName = "doWhenStateVidStateChanges" + Math.random();
    startItemEffect({
        name: ruleName,
        run: ({ newValue: newVidState }) => {
            if (!checkShouldRun(newVidState))
                return;
            stopEffect(ruleName);
            callback();
        },
        check: { type: "stateVids", prop: "vidState", name: stateVidId },
        atStepEnd: true,
        step: "stateVidStateUpdates",
    });
    return ruleName;
}
export function doWhenStateVidStateSeeked(stateVidId, callback) {
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
export function doWhenStateVidStateReady(stateVidId, vidStateToCheck, callback, checkInitial = true) {
    return doWhenStateVidStateChanges(stateVidId, (newState) => newState === vidStateToCheck, callback, checkInitial);
}
export function doWhenStateVidPlayOrPause(stateVidId, callback, checkInitial = true) {
    return doWhenStateVidStateChanges(stateVidId, (newState) => newState === "play" || newState === "pause", callback, checkInitial);
}
export function makeVideoElementFromPath(filepath) {
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
