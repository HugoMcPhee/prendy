import { GameyConceptoFuncs } from "../typedConceptoFuncs";
export declare function makeKeyboardConnectRules<ConceptoFuncs extends GameyConceptoFuncs>(conceptoFuncs: ConceptoFuncs): {
    startAll: () => void;
    stopAll: () => void;
};
