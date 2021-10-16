import { GameyConceptoFuncs } from "../../typedConceptoFuncs";
export declare function makeGlobalStoreUtils<ConceptoFuncs extends GameyConceptoFuncs>(conceptoFuncs: ConceptoFuncs): {
    setGlobalState: (newState: Partial<Record<any, any>> | ((state: Record<any, any>) => Partial<Record<any, any>>)) => void;
    getGlobalState: () => Record<any, any>;
};
