import { BackdopArt, BackdopOptions } from "../declarations";
import { BackdopConcepFuncs, PlaceholderBackdopConcepts } from "./typedConcepFuncs";
export declare function makeStartBackdopRules<ConcepFuncs extends BackdopConcepFuncs, BackdopConcepts extends PlaceholderBackdopConcepts>(concepFuncs: ConcepFuncs, backdopConcepts: BackdopConcepts, BACKDOP_OPTIONS: BackdopOptions, backdopArt: BackdopArt): (fontNames: readonly string[]) => () => void;
