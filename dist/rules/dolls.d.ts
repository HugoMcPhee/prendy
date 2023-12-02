import { DollName, ModelName } from "../types";
export declare const rangeOptionsQuick: {
    readonly touch: number;
    readonly talk: number;
    readonly see: number;
};
export declare const dollDynamicRules: {
    start: <K_ChosenRuleName extends "waitForModelToLoad" | "whenWholePlaceFinishesLoading">(ruleName: K_ChosenRuleName, options: Parameters<{
        waitForModelToLoad: (options: {
            dollName: DollName;
            modelName: ModelName;
        }) => any;
        whenWholePlaceFinishesLoading: (options: {
            dollName: DollName;
            modelName: ModelName;
        }) => any;
    }[K_ChosenRuleName]>[0]) => void;
    stop: <K_ChosenRuleName_1 extends "waitForModelToLoad" | "whenWholePlaceFinishesLoading">(ruleName: K_ChosenRuleName_1, options: Parameters<{
        waitForModelToLoad: (options: {
            dollName: DollName;
            modelName: ModelName;
        }) => any;
        whenWholePlaceFinishesLoading: (options: {
            dollName: DollName;
            modelName: ModelName;
        }) => any;
    }[K_ChosenRuleName_1]>[0]) => void;
    ruleNames: ("waitForModelToLoad" | "whenWholePlaceFinishesLoading")[];
    startAll: (options: {
        dollName: DollName;
        modelName: ModelName;
    } | {
        dollName: DollName;
        modelName: ModelName;
    }) => void;
    stopAll: (options: {
        dollName: DollName;
        modelName: ModelName;
    } | {
        dollName: DollName;
        modelName: ModelName;
    }) => void;
};
export declare function startDynamicDollRulesForInitialState(): () => void;
export declare const dollRules: {
    start: (ruleName: string) => void;
    stop: (ruleName: string) => void;
    startAll: () => void;
    stopAll: () => void;
    ruleNames: string[];
    run: (ruleName: string) => void;
    runAll: () => void;
};
