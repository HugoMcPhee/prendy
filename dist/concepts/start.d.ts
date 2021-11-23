import { PrendyArt, PrendyOptions } from "../declarations";
import { PrendyConcepFuncs, PlaceholderPrendyConcepts } from "./typedConcepFuncs";
export declare function makeStartPrendyRules<ConcepFuncs extends PrendyConcepFuncs, PrendyConcepts extends PlaceholderPrendyConcepts>(concepFuncs: ConcepFuncs, prendyConcepts: PrendyConcepts, PRENDY_OPTIONS: PrendyOptions, prendyArt: PrendyArt): (fontNames: readonly string[]) => () => void;
