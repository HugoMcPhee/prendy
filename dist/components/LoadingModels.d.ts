import { ReactNode } from "react";
import { BackdopConcepFuncs } from "../concepts/typedConcepFuncs";
import { BackdopArt, BackdopOptions } from "../declarations";
declare type Props = {
    children?: ReactNode;
};
export declare function makeLoadingModels<ConcepFuncs extends BackdopConcepFuncs>(concepFuncs: ConcepFuncs, backdopStartOptions: BackdopOptions, backdopArt: BackdopArt): ({ children }: Props) => JSX.Element;
export {};
