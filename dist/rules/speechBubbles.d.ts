export declare const speechBubbleRules: {
    start: (ruleName: "whenGoalTextChanges" | "whenVisibleTextChanges" | "whenTypingFinishedBecomesFalse" | "whenAddedOrRemoved" | "whenBecameVisible") => void;
    stop: (ruleName: "whenGoalTextChanges" | "whenVisibleTextChanges" | "whenTypingFinishedBecomesFalse" | "whenAddedOrRemoved" | "whenBecameVisible") => void;
    startAll: () => void;
    stopAll: () => void;
    ruleNames: ("whenGoalTextChanges" | "whenVisibleTextChanges" | "whenTypingFinishedBecomesFalse" | "whenAddedOrRemoved" | "whenBecameVisible")[];
    run: (ruleName: "whenGoalTextChanges" | "whenVisibleTextChanges" | "whenTypingFinishedBecomesFalse" | "whenAddedOrRemoved" | "whenBecameVisible") => void;
    runAll: () => void;
};
