import { ReactNode } from "react";
import { PrendyConcepFuncs } from "../concepts/typedConcepFuncs";
import { PrendyArt, PrendyOptions } from "../declarations";
declare type Props = {
    children?: ReactNode;
};
export declare function makeLoadingModels<ConcepFuncs extends PrendyConcepFuncs>(concepFuncs: ConcepFuncs, prendyStartOptions: PrendyOptions, prendyArt: PrendyArt): ({ children }: Props) => JSX.Element;
export {};
