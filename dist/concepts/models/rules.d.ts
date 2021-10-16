import { GameyConceptoFuncs, ModelInfoByNamePlaceholder } from "../typedConceptoFuncs";
export declare function makeModelRules<ConceptoFuncs extends GameyConceptoFuncs, ModelName extends string, ModelInfoByName extends ModelInfoByNamePlaceholder<ModelName>>(conceptoFuncs: ConceptoFuncs, modelInfoByName: ModelInfoByName): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
