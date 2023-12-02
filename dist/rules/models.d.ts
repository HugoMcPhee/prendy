export declare const modelRules: {
    start: (ruleName: "whenWantsToLoad" | "whenIsLoaded") => void;
    stop: (ruleName: "whenWantsToLoad" | "whenIsLoaded") => void;
    startAll: () => void;
    stopAll: () => void;
    ruleNames: ("whenWantsToLoad" | "whenIsLoaded")[];
    run: (ruleName: "whenWantsToLoad" | "whenIsLoaded") => void;
    runAll: () => void;
};
