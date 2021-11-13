/// <reference types="react" />
import { BackdopConcepFuncs } from "../../concepts/typedConcepFuncs";
import { BackdopArt, BackdopOptions } from "../../declarations";
export declare function makeScreenGui<ConcepFuncs extends BackdopConcepFuncs>(concepFuncs: ConcepFuncs, BACKDOP_OPTIONS: BackdopOptions, backdopArt: BackdopArt): (_: {}) => JSX.Element;
