/// <reference types="react" />
import { PrendyConcepFuncs } from "../concepts/typedConcepFuncs";
export declare function makeAllTestVideoStuff<ConcepFuncs extends PrendyConcepFuncs, PlaceName extends string>(concepFuncs: ConcepFuncs, placeNames: readonly PlaceName[]): () => JSX.Element;
