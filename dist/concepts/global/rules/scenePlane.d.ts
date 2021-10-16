import { GameyConceptoFuncs, GameyStartOptionsUntyped } from "../../typedConceptoFuncs";
export declare function makeGlobalScenePlaneRules<ConceptoFuncs extends GameyConceptoFuncs, GameyStartOptions extends GameyStartOptionsUntyped>(conceptoFuncs: ConceptoFuncs, gameyStartOptions: GameyStartOptions): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
