import { PrendyArt, PrendyOptions } from "../../../declarations";
import { PrendyConcepFuncs, PlaceholderPrendyConcepts } from "../../typedConcepFuncs";
export declare function makeStartAllGlobalRules<ConcepFuncs extends PrendyConcepFuncs, PrendyConcepts extends PlaceholderPrendyConcepts>(concepFuncs: ConcepFuncs, prendyConcepts: PrendyConcepts, prendyStartOptions: PrendyOptions, prendyArt: PrendyArt): () => () => void;
