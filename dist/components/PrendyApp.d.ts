import { ReactNode } from "react";
import { PrendyConcepFuncs, PlaceholderPrendyConcepts } from "../concepts/typedConcepFuncs";
import { PrendyArt, PrendyOptions } from "../declarations";
declare type Props = {
    children?: ReactNode;
};
export declare function makePrendyApp<ConcepFuncs extends PrendyConcepFuncs, PrendyConcepts extends PlaceholderPrendyConcepts>(concepFuncs: ConcepFuncs, prendyConcepts: PrendyConcepts, prendyStartOptions: PrendyOptions, prendyArt: PrendyArt): ({ children }: Props) => JSX.Element;
export {};
