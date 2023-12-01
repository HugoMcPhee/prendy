export declare const globalVideoRules: {
    start: (ruleName: "whenWantToChooseVideoSlice" | "whenSliceVidChangedAndWantToUpdateNowCamAndSegment" | "whenNowCameraChanges" | "whenPlayingVidElementsChanged") => void;
    stop: (ruleName: "whenWantToChooseVideoSlice" | "whenSliceVidChangedAndWantToUpdateNowCamAndSegment" | "whenNowCameraChanges" | "whenPlayingVidElementsChanged") => void;
    startAll: () => void;
    stopAll: () => void;
    ruleNames: ("whenWantToChooseVideoSlice" | "whenSliceVidChangedAndWantToUpdateNowCamAndSegment" | "whenNowCameraChanges" | "whenPlayingVidElementsChanged")[];
    run: (ruleName: "whenWantToChooseVideoSlice" | "whenSliceVidChangedAndWantToUpdateNowCamAndSegment" | "whenNowCameraChanges" | "whenPlayingVidElementsChanged") => void;
    runAll: () => void;
};
