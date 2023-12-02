export declare const globalSlateRules: {
    start: (ruleName: "whenSlatePositionChanges" | "whenShouldFocusOnDoll" | "whenSlateZoomChangesToSlatePanOverEdges" | "whenNowCamChanges" | "whenScreenResizes") => void;
    stop: (ruleName: "whenSlatePositionChanges" | "whenShouldFocusOnDoll" | "whenSlateZoomChangesToSlatePanOverEdges" | "whenNowCamChanges" | "whenScreenResizes") => void;
    startAll: () => void;
    stopAll: () => void;
    ruleNames: ("whenSlatePositionChanges" | "whenShouldFocusOnDoll" | "whenSlateZoomChangesToSlatePanOverEdges" | "whenNowCamChanges" | "whenScreenResizes")[];
    run: (ruleName: "whenSlatePositionChanges" | "whenShouldFocusOnDoll" | "whenSlateZoomChangesToSlatePanOverEdges" | "whenNowCamChanges" | "whenScreenResizes") => void;
    runAll: () => void;
};
