import { ReactNode } from "react";
import { BackdopConcepFuncs, PlaceholderBackdopConcepts } from "../concepts/typedConcepFuncs";
import { BackdopArt, BackdopOptions } from "../declarations";
declare type Props = {
    children?: ReactNode;
};
export declare function makeBackdopApp<ConcepFuncs extends BackdopConcepFuncs, BackdopConcepts extends PlaceholderBackdopConcepts>(concepFuncs: ConcepFuncs, backdopConcepts: BackdopConcepts, backdopStartOptions: BackdopOptions, backdopArt: BackdopArt): ({ children }: Props) => JSX.Element;
export {};
