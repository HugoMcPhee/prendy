export declare const globalChangePlaceRules: {
    start: (ruleName: "whenPlaceNameChanges" | "whenSegmentNameChanges" | "whenGoalCamNameChanges" | "whenOverlayFadedOut" | "whenOverlayToggledOff" | "whenReadyToSwapPlace" | "whenEverythingsLoaded") => void;
    stop: (ruleName: "whenPlaceNameChanges" | "whenSegmentNameChanges" | "whenGoalCamNameChanges" | "whenOverlayFadedOut" | "whenOverlayToggledOff" | "whenReadyToSwapPlace" | "whenEverythingsLoaded") => void;
    startAll: () => void;
    stopAll: () => void;
    ruleNames: ("whenPlaceNameChanges" | "whenSegmentNameChanges" | "whenGoalCamNameChanges" | "whenOverlayFadedOut" | "whenOverlayToggledOff" | "whenReadyToSwapPlace" | "whenEverythingsLoaded")[];
    run: (ruleName: "whenPlaceNameChanges" | "whenSegmentNameChanges" | "whenGoalCamNameChanges" | "whenOverlayFadedOut" | "whenOverlayToggledOff" | "whenReadyToSwapPlace" | "whenEverythingsLoaded") => void;
    runAll: () => void;
};
