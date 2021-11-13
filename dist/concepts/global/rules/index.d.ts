import { BackdopArt, BackdopOptions } from "../../../declarations";
import { BackdopConcepFuncs, PlaceholderBackdopConcepts } from "../../typedConcepFuncs";
export declare function makeStartAllGlobalRules<ConcepFuncs extends BackdopConcepFuncs, BackdopConcepts extends PlaceholderBackdopConcepts>(concepFuncs: ConcepFuncs, backdopConcepts: BackdopConcepts, backdopStartOptions: BackdopOptions, backdopArt: BackdopArt): () => () => void;
