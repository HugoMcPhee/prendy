export declare const globalGeneralRules: {
    start: (ruleName: "whenAnythingChangesForRendering" | "whenFrameTickUpdates" | "whenGamePaused" | "whenPauseKeyPressed" | "whenASpeechBubbleShowsOrHides" | "whenGameTimeSpeedChanges") => void;
    stop: (ruleName: "whenAnythingChangesForRendering" | "whenFrameTickUpdates" | "whenGamePaused" | "whenPauseKeyPressed" | "whenASpeechBubbleShowsOrHides" | "whenGameTimeSpeedChanges") => void;
    startAll: () => void;
    stopAll: () => void;
    ruleNames: ("whenAnythingChangesForRendering" | "whenFrameTickUpdates" | "whenGamePaused" | "whenPauseKeyPressed" | "whenASpeechBubbleShowsOrHides" | "whenGameTimeSpeedChanges")[];
    run: (ruleName: "whenAnythingChangesForRendering" | "whenFrameTickUpdates" | "whenGamePaused" | "whenPauseKeyPressed" | "whenASpeechBubbleShowsOrHides" | "whenGameTimeSpeedChanges") => void;
    runAll: () => void;
};
