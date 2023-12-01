export declare const safeVidRules: {
    start: (ruleName: "whenWantToLoad" | "whenWantToUnload" | "whenVideoStateChanges" | "whenWantToSeek" | "whenWantToPlay" | "whenWantToPause") => void;
    stop: (ruleName: "whenWantToLoad" | "whenWantToUnload" | "whenVideoStateChanges" | "whenWantToSeek" | "whenWantToPlay" | "whenWantToPause") => void;
    startAll: () => void;
    stopAll: () => void;
    ruleNames: ("whenWantToLoad" | "whenWantToUnload" | "whenVideoStateChanges" | "whenWantToSeek" | "whenWantToPlay" | "whenWantToPause")[];
    run: (ruleName: "whenWantToLoad" | "whenWantToUnload" | "whenVideoStateChanges" | "whenWantToSeek" | "whenWantToPlay" | "whenWantToPause") => void;
    runAll: () => void;
};
