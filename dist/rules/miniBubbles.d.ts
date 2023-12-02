export declare const miniBubbleRules: {
    start: (ruleName: "whenAddedOrRemoved" | "whenBecameVisible") => void;
    stop: (ruleName: "whenAddedOrRemoved" | "whenBecameVisible") => void;
    startAll: () => void;
    stopAll: () => void;
    ruleNames: ("whenAddedOrRemoved" | "whenBecameVisible")[];
    run: (ruleName: "whenAddedOrRemoved" | "whenBecameVisible") => void;
    runAll: () => void;
};
