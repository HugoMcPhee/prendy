export function get_safeVidUtils(storeHelpers) {
    const { getState, startItemEffect, stopEffect } = storeHelpers;
    function doWhenSafeVidStateChanges(safeVidId, checkShouldRun, callback, checkInitial = true) {
        const initialVidState = getState().safeVids[safeVidId].vidState;
        if (checkInitial && checkShouldRun(initialVidState)) {
            callback();
            return null;
        }
        const ruleName = "doWhenSafeVidStateChanges" + Math.random();
        startItemEffect({
            name: ruleName,
            run: ({ newValue: newVidState }) => {
                if (!checkShouldRun(newVidState))
                    return;
                stopEffect(ruleName);
                callback();
            },
            check: { type: "safeVids", prop: "vidState", name: safeVidId },
            atStepEnd: true,
            step: "safeVidStateUpdates",
        });
        return ruleName;
    }
    function doWhenSafeVidStateReady(safeVidId, vidStateToCheck, callback, checkInitial = true) {
        return doWhenSafeVidStateChanges(safeVidId, (newState) => newState === vidStateToCheck, callback, checkInitial);
    }
    function doWhenSafeVidPlayOrPause(safeVidId, callback, checkInitial = true) {
        return doWhenSafeVidStateChanges(safeVidId, (newState) => newState === "play" || newState === "pause", callback, checkInitial);
    }
    return {
        doWhenSafeVidPlayOrPause,
        doWhenSafeVidStateReady,
    };
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
