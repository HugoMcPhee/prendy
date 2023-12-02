export declare const globalSlateRules: {
    start: (ruleName: string) => void;
    stop: (ruleName: string) => void;
    startAll: () => void;
    stopAll: () => void;
    ruleNames: string[];
    run: (ruleName: string) => void;
    runAll: () => void;
};
