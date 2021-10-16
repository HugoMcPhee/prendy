import { GameyConceptoFuncs } from "../../concepts/typedConceptoFuncs";
export declare function makeGetSceneOrEngineUtils<ConceptoFuncs extends GameyConceptoFuncs>(conceptoFuncs: ConceptoFuncs): {
    getScene: (sceneType?: "backdrop" | "main") => any;
    getEngine: () => any;
};
