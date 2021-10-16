/// <reference types="react" />
import { GameyConceptoFuncs } from "../concepts/typedConceptoFuncs";
export declare function makeAllTestVideoStuff<ConceptoFuncs extends GameyConceptoFuncs, PlaceName extends string>(conceptoFuncs: ConceptoFuncs, placeNames: readonly PlaceName[]): () => JSX.Element;
