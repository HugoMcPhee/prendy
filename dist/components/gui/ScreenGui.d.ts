/// <reference types="react" />
import { PrendyConcepFuncs } from "../../concepts/typedConcepFuncs";
import { PrendyArt, PrendyOptions } from "../../declarations";
export declare function makeScreenGui<ConcepFuncs extends PrendyConcepFuncs>(concepFuncs: ConcepFuncs, PRENDY_OPTIONS: PrendyOptions, prendyArt: PrendyArt): (_: {}) => JSX.Element;
