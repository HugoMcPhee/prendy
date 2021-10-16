import { GameyConceptoFuncs } from "../typedConceptoFuncs";
export declare function makePointersConnectRules<ConceptoFuncs extends GameyConceptoFuncs>(conceptoFuncs: ConceptoFuncs): {
    startAll: () => void;
    stopAll: () => void;
};
