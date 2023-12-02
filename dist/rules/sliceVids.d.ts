export declare const sliceVidRules: {
    start: (ruleName: "rulesForSettingNewVideoStates" | "whenGoalSliceChanges" | "whenWantToLoad" | "whenWantToUnload" | "whenWantToLoop" | "whenPlayVidChanges" | "whenWaitVidChanges") => void;
    stop: (ruleName: "rulesForSettingNewVideoStates" | "whenGoalSliceChanges" | "whenWantToLoad" | "whenWantToUnload" | "whenWantToLoop" | "whenPlayVidChanges" | "whenWaitVidChanges") => void;
    startAll: () => void;
    stopAll: () => void;
    ruleNames: ("rulesForSettingNewVideoStates" | "whenGoalSliceChanges" | "whenWantToLoad" | "whenWantToUnload" | "whenWantToLoop" | "whenPlayVidChanges" | "whenWaitVidChanges")[];
    run: (ruleName: "rulesForSettingNewVideoStates" | "whenGoalSliceChanges" | "whenWantToLoad" | "whenWantToUnload" | "whenWantToLoop" | "whenPlayVidChanges" | "whenWaitVidChanges") => void;
    runAll: () => void;
};
