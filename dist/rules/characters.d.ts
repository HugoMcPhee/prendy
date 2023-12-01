export declare const characterDynamicRules: {
    start: <K_ChosenRuleName extends "whenPositionChanges">(ruleName: K_ChosenRuleName, options: Parameters<{
        whenPositionChanges: (options: {
            characterName: string | any;
            dollName: string | any;
        }) => any;
    }[K_ChosenRuleName]>[0]) => void;
    stop: <K_ChosenRuleName_1 extends "whenPositionChanges">(ruleName: K_ChosenRuleName_1, options: Parameters<{
        whenPositionChanges: (options: {
            characterName: string | any;
            dollName: string | any;
        }) => any;
    }[K_ChosenRuleName_1]>[0]) => void;
    ruleNames: "whenPositionChanges"[];
    startAll: (options: {
        characterName: string | any;
        dollName: string | any;
    }) => void;
    stopAll: (options: {
        characterName: string | any;
        dollName: string | any;
    }) => void;
};
export declare function startDynamicCharacterRulesForInitialState(): () => void;
export declare const characterRules: {
    start: (ruleName: "whenAtCamCubes" | "whenPlaceChanges") => void;
    stop: (ruleName: "whenAtCamCubes" | "whenPlaceChanges") => void;
    startAll: () => void;
    stopAll: () => void;
    ruleNames: ("whenAtCamCubes" | "whenPlaceChanges")[];
    run: (ruleName: "whenAtCamCubes" | "whenPlaceChanges") => void;
    runAll: () => void;
};
