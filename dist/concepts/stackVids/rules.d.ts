import { GameyConceptoFuncs } from "../typedConceptoFuncs";
export declare function makeStackVidRules<ConceptoFuncs extends GameyConceptoFuncs>(conceptoFuncs: ConceptoFuncs): {
    stopAll: (...args: any) => any;
    startAll: (...args: any) => any;
    start: (...args: any) => any;
    stop: (...args: any) => any;
    ruleNames: any[];
};
